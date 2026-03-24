import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/admin-auth";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;
    const username = (body.username || "").trim();
    const password = body.password || "";

    if (username.length < 3 || username.length > 32 || password.length < 8) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ok = await loginAdmin(username, password);
    if (!ok) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
