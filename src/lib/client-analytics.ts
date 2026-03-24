"use client";

const SESSION_KEY = "portfolio_session_id";

function canUseBrowserApis() {
  return typeof window !== "undefined";
}

function getOrCreateSessionId() {
  if (!canUseBrowserApis()) {
    return "";
  }

  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID().replace(/-/g, "");
  window.sessionStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

async function postJson(url: string, body: Record<string, unknown>) {
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
    cache: "no-store",
  });
}

export async function trackClickEvent(eventName: string) {
  if (!canUseBrowserApis()) {
    return;
  }

  const sessionId = getOrCreateSessionId();
  if (!sessionId) {
    return;
  }

  try {
    await postJson("/api/analytics/event", {
      sessionId,
      eventName,
      path: window.location.pathname,
    });
  } catch {
    // Ignore analytics failures to avoid affecting UX.
  }
}

export function initializeSessionTracking() {
  if (!canUseBrowserApis()) {
    return () => {};
  }

  const sessionId = getOrCreateSessionId();
  if (!sessionId) {
    return () => {};
  }

  const startedAt = Date.now();
  void postJson("/api/analytics/session", {
    action: "start",
    sessionId,
    path: window.location.pathname,
  });

  let sentEnd = false;
  const sendEnd = () => {
    if (sentEnd) {
      return;
    }
    sentEnd = true;

    const durationSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const payload = JSON.stringify({
      action: "end",
      sessionId,
      durationSeconds,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/session", blob);
      return;
    }

    void postJson("/api/analytics/session", JSON.parse(payload));
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      sendEnd();
    }
  };

  window.addEventListener("beforeunload", sendEnd);
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    sendEnd();
    window.removeEventListener("beforeunload", sendEnd);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
