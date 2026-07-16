import { getPool } from "./db";
import type { RequestMeta } from "./request-meta";

type TrackEventInput = {
  sessionId: string;
  eventName: string;
  path: string;
};

export type DashboardStats = {
  totalUniqueVisitors: number;
  totalSessions: number;
  totalClicks: number;
  avgDurationSeconds: number;
  recentViews: Array<{
    firstSeenAt: string;
    country: string | null;
    city: string | null;
    path: string;
  }>;
  topEvents: Array<{
    eventName: string;
    count: number;
  }>;
};

let ensuredTable = false;

async function ensureAnalyticsTable() {
  if (ensuredTable) {
    return;
  }

  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_views (
      id BIGSERIAL PRIMARY KEY,
      visitor_key TEXT UNIQUE NOT NULL,
      ip_address TEXT NOT NULL,
      country TEXT,
      region TEXT,
      city TEXT,
      user_agent TEXT,
      path TEXT NOT NULL DEFAULT '/',
      first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_sessions (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT UNIQUE NOT NULL,
      visitor_key TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      country TEXT,
      region TEXT,
      city TEXT,
      user_agent TEXT,
      path TEXT NOT NULL DEFAULT '/',
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ended_at TIMESTAMPTZ,
      duration_seconds INTEGER
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_events (
      id BIGSERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      visitor_key TEXT NOT NULL,
      event_name TEXT NOT NULL,
      path TEXT NOT NULL DEFAULT '/',
      ip_address TEXT NOT NULL,
      country TEXT,
      region TEXT,
      city TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`UPDATE portfolio_views SET ip_address = 'encrypted' WHERE ip_address <> 'encrypted'`);
  await pool.query(`UPDATE portfolio_sessions SET ip_address = 'encrypted' WHERE ip_address <> 'encrypted'`);
  await pool.query(`UPDATE portfolio_events SET ip_address = 'encrypted' WHERE ip_address <> 'encrypted'`);

  ensuredTable = true;
}

export async function trackPortfolioView(meta: RequestMeta) {
  await ensureAnalyticsTable();

  const pool = getPool();

  await pool.query(
    `
      INSERT INTO portfolio_views (
        visitor_key,
        ip_address,
        country,
        region,
        city,
        user_agent,
        path
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (visitor_key) DO NOTHING
    `,
    [
      meta.visitorKey,
      "encrypted",
      meta.country || null,
      meta.region || null,
      meta.city || null,
      meta.userAgent || null,
      meta.path,
    ]
  );
}

export async function startPortfolioSession(sessionId: string, meta: RequestMeta) {
  await ensureAnalyticsTable();
  const pool = getPool();

  await pool.query(
    `
      INSERT INTO portfolio_sessions (
        session_id,
        visitor_key,
        ip_address,
        country,
        region,
        city,
        user_agent,
        path
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (session_id) DO NOTHING
    `,
    [
      sessionId,
      meta.visitorKey,
      "encrypted",
      meta.country || null,
      meta.region || null,
      meta.city || null,
      meta.userAgent || null,
      meta.path,
    ]
  );
}

export async function endPortfolioSession(
  sessionId: string,
  durationSeconds: number,
  meta: RequestMeta
) {
  await ensureAnalyticsTable();
  const pool = getPool();

  await pool.query(
    `
      UPDATE portfolio_sessions
      SET ended_at = NOW(),
          duration_seconds = GREATEST($1::int, 0)
      WHERE session_id = $2
        AND visitor_key = $3
        AND ended_at IS NULL
    `,
    [durationSeconds, sessionId, meta.visitorKey]
  );
}

export async function trackPortfolioEvent(input: TrackEventInput, meta: RequestMeta) {
  await ensureAnalyticsTable();
  const pool = getPool();

  await pool.query(
    `
      INSERT INTO portfolio_events (
        session_id,
        visitor_key,
        event_name,
        path,
        ip_address,
        country,
        region,
        city,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [
      input.sessionId,
      meta.visitorKey,
      input.eventName,
      input.path,
      "encrypted",
      meta.country || null,
      meta.region || null,
      meta.city || null,
      meta.userAgent || null,
    ]
  );
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await ensureAnalyticsTable();
  const pool = getPool();

  const [visitorsResult, sessionsResult, clicksResult, avgDurationResult, recentViewsResult, topEventsResult] =
    await Promise.all([
      pool.query<{ count: string }>("SELECT COUNT(*)::text AS count FROM portfolio_views"),
      pool.query<{ count: string }>("SELECT COUNT(*)::text AS count FROM portfolio_sessions"),
      pool.query<{ count: string }>("SELECT COUNT(*)::text AS count FROM portfolio_events"),
      pool.query<{ avg: string | null }>(
        "SELECT AVG(duration_seconds)::text AS avg FROM portfolio_sessions WHERE duration_seconds IS NOT NULL"
      ),
      pool.query<{
        first_seen_at: string;
        country: string | null;
        city: string | null;
        path: string;
      }>(
        `
          SELECT first_seen_at, country, city, path
          FROM portfolio_views
          ORDER BY first_seen_at DESC
          LIMIT 20
        `
      ),
      pool.query<{ event_name: string; count: string }>(
        `
          SELECT event_name, COUNT(*)::text AS count
          FROM portfolio_events
          GROUP BY event_name
          ORDER BY COUNT(*) DESC
          LIMIT 10
        `
      ),
    ]);

  return {
    totalUniqueVisitors: Number(visitorsResult.rows[0]?.count || "0"),
    totalSessions: Number(sessionsResult.rows[0]?.count || "0"),
    totalClicks: Number(clicksResult.rows[0]?.count || "0"),
    avgDurationSeconds: Math.round(Number(avgDurationResult.rows[0]?.avg || "0")),
    recentViews: recentViewsResult.rows.map((row) => ({
      firstSeenAt: row.first_seen_at,
      country: row.country,
      city: row.city,
      path: row.path,
    })),
    topEvents: topEventsResult.rows.map((row) => ({
      eventName: row.event_name,
      count: Number(row.count),
    })),
  };
}
