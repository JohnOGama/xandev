import { createHash } from "crypto";

export type RequestMeta = {
  ip: string;
  userAgent: string;
  country: string;
  region: string;
  city: string;
  path: string;
  visitorKey: string;
};

function normalizeValue(value: string | null, fallback = "unknown", max = 255) {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return fallback;
  }

  return trimmed.slice(0, max);
}

function getClientIp(forwardedFor: string | null) {
  const firstIp = (forwardedFor || "").split(",")[0]?.trim();
  return normalizeValue(firstIp || null);
}

export function createVisitorKey(ip: string, userAgent: string) {
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
}

export function getRequestMeta(
  requestHeaders: Headers,
  path: string = "/"
): RequestMeta {
  const ip = getClientIp(requestHeaders.get("x-forwarded-for"));
  const userAgent = normalizeValue(requestHeaders.get("user-agent"), "unknown", 1024);
  const country = normalizeValue(requestHeaders.get("x-vercel-ip-country"), "", 8);
  const region = normalizeValue(
    requestHeaders.get("x-vercel-ip-country-region"),
    "",
    64
  );
  const city = normalizeValue(requestHeaders.get("x-vercel-ip-city"), "", 128);
  const safePath = normalizeValue(path, "/", 255);

  return {
    ip,
    userAgent,
    country,
    region,
    city,
    path: safePath,
    visitorKey: createVisitorKey(ip, userAgent),
  };
}
