import { headers } from "next/headers";
import HomeClient from "./components/HomeClient";
import { trackPortfolioView } from "@/lib/analytics";
import { getRequestMeta } from "@/lib/request-meta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const requestHeaders = await headers();
  const meta = getRequestMeta(requestHeaders, "/");

  try {
    await trackPortfolioView(meta);
  } catch (error) {
    console.error("Analytics tracking failed:", error);
  }

  return <HomeClient />;
}
