import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    await logoutAdmin();
    return NextResponse.redirect(new URL("/admin/login", req.url));
  } catch (error) {
    console.error("Admin logout failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
