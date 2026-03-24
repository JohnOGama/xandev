import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const limited = rateLimit(req, "admin-logout", 20, 60_000);
    if (!limited.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    await logoutAdmin();
    return NextResponse.redirect(new URL("/admin/login", req.url));
  } catch (error) {
    console.error("Admin logout failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
