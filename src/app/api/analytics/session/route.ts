import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { endPortfolioSession, startPortfolioSession } from "@/lib/analytics";
import { getRequestMeta } from "@/lib/request-meta";

type SessionBody = {
  action?: "start" | "end";
  sessionId?: string;
  durationSeconds?: number;
  path?: string;
};

function isValidSessionId(value: string) {
  return /^[a-zA-Z0-9-_]{8,128}$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SessionBody;
    const action = body.action;
    const sessionId = (body.sessionId || "").trim();
    const path = (body.path || "/").trim().slice(0, 255);

    if (!action || !isValidSessionId(sessionId)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const requestHeaders = await headers();
    const meta = getRequestMeta(requestHeaders, path);

    if (action === "start") {
      await startPortfolioSession(sessionId, meta);
      return NextResponse.json({ ok: true });
    }

    const durationRaw = Number(body.durationSeconds);
    const durationSeconds = Number.isFinite(durationRaw)
      ? Math.max(0, Math.min(86400, Math.floor(durationRaw)))
      : 0;

    await endPortfolioSession(sessionId, durationSeconds, meta);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Session analytics failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
