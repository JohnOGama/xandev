import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getPool } from "./db";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;

let ensuredAdminTables = false;

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const digest = hashPassword(password, salt);
  return `${salt}:${digest}`;
}

function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedDigest] = passwordHash.split(":");
  if (!salt || !storedDigest) {
    return false;
  }

  const computedDigest = hashPassword(password, salt);
  const left = Buffer.from(storedDigest, "hex");
  const right = Buffer.from(computedDigest, "hex");

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export async function ensureAdminTables() {
  if (ensuredAdminTables) {
    return;
  }

  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id BIGSERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id BIGSERIAL PRIMARY KEY,
      session_token TEXT UNIQUE NOT NULL,
      user_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  ensuredAdminTables = true;
}

export async function loginAdmin(username: string, password: string) {
  await ensureAdminTables();
  const pool = getPool();

  const userResult = await pool.query<{ id: string; password_hash: string }>(
    "SELECT id, password_hash FROM admin_users WHERE username = $1 LIMIT 1",
    [username]
  );
  const user = userResult.rows[0];
  if (!user || !verifyPassword(password, user.password_hash)) {
    return false;
  }

  const token = randomBytes(32).toString("hex");
  await pool.query(
    `
      INSERT INTO admin_sessions (session_token, user_id, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '${SESSION_DAYS} days')
    `,
    [token, user.id]
  );

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return true;
}

export async function logoutAdmin() {
  await ensureAdminTables();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (token) {
    const pool = getPool();
    await pool.query("DELETE FROM admin_sessions WHERE session_token = $1", [token]);
  }
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  await ensureAdminTables();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }

  const pool = getPool();
  const sessionResult = await pool.query<{ id: string }>(
    `
      SELECT id
      FROM admin_sessions
      WHERE session_token = $1
        AND expires_at > NOW()
      LIMIT 1
    `,
    [token]
  );

  return Boolean(sessionResult.rows[0]);
}
