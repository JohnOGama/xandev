"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getConsent,
  initializeSessionTracking,
  setConsent,
  subscribeConsent,
} from "@/lib/client-analytics";

// Server render and first hydration pass: show nothing until the stored choice is known.
const getServerSnapshot = () => "unknown" as const;

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    getServerSnapshot
  );
  const isAdmin = usePathname().startsWith("/admin");

  useEffect(() => {
    if (consent === "granted" && !isAdmin) {
      return initializeSessionTracking();
    }
  }, [consent, isAdmin]);

  if (isAdmin || consent === "unknown") {
    return null;
  }

  if (consent !== null) {
    return (
      <footer className="border-t border-line pt-6 font-mono text-[11px] text-muted">
        Visit analytics: {consent === "granted" ? "on" : "off"} ·{" "}
        <button
          type="button"
          onClick={() => setConsent(null)}
          className="cursor-pointer underline underline-offset-4 hover:text-foreground"
        >
          change
        </button>
      </footer>
    );
  }

  return (
    <section
      aria-label="Analytics consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl lg:inset-x-auto lg:right-6 lg:bottom-6 lg:mx-0 lg:max-w-xs border border-line bg-background p-5 shadow-[0_8px_30px_-12px_rgba(10,10,10,0.25)]"
    >
      <p className="text-[13px] leading-relaxed text-foreground/70">
        This site records anonymous visit stats (visits, clicks, rough
        location) in my own database. No ads or third-party trackers.
      </p>
      <div className="mt-4 flex gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="cursor-pointer rounded-md bg-foreground px-3 py-2 text-background transition-opacity hover:opacity-85"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="cursor-pointer rounded-md border border-line px-3 py-2 transition-colors hover:border-foreground/40"
        >
          Decline
        </button>
      </div>
    </section>
  );
}
