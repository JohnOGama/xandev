import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { trackPortfolioEvent } from "@/lib/analytics";
import { getRequestMeta } from "@/lib/request-meta";

type EventBody = {
  sessionId?: string;
  eventName?: string;
  path?: string;
};

function isValidSessionId(value: string) {
  return /^[a-zA-Z0-9-_]{8,128}$/.test(value);
}

function isValidEventName(value: string) {
  return /^[a-z0-9._-]{2,64}$/i.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as EventBody;
    const sessionId = (body.sessionId || "").trim();
    const eventName = (body.eventName || "").trim();
    const path = (body.path || "/").trim().slice(0, 255);

    if (!isValidSessionId(sessionId) || !isValidEventName(eventName)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const requestHeaders = await headers();
    const meta = getRequestMeta(requestHeaders, path);

    await trackPortfolioEvent({ sessionId, eventName, path }, meta);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Event analytics failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
