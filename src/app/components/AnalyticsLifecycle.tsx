"use client";

import { useEffect } from "react";
import { initializeSessionTracking } from "@/lib/client-analytics";

export default function AnalyticsLifecycle() {
  useEffect(() => {
    return initializeSessionTracking();
  }, []);

  return null;
}
