import { randomBytes, scryptSync } from "crypto";
import pg from "pg";

const { Pool } = pg;

function createPasswordHash(password) {
  const salt = randomBytes(16).toString("hex");
  const digest = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}

function generatePassword(length = 20) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

async function main() {
  const connectionString =
    process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

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

  const existing = await pool.query(
    "SELECT id FROM admin_users WHERE username = $1 LIMIT 1",
    ["admin"]
  );
  if (existing.rows.length > 0) {
    console.log("Admin user already exists. No new user created.");
    await pool.end();
    return;
  }

  const password = generatePassword();
  const passwordHash = createPasswordHash(password);
  await pool.query(
    "INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)",
    ["admin", passwordHash]
  );

  console.log("Admin user created.");
  console.log("username: admin");
  console.log(`password: ${password}`);
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
