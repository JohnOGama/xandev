"use client";

const SESSION_KEY = "portfolio_session_id";

function canUseBrowserApis() {
  return typeof window !== "undefined";
}

// Visitor's analytics choice. Nothing is recorded unless this is "granted".
const CONSENT_KEY = "analytics_consent";
const CONSENT_EVENT = "analytics-consent-change";

export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    if (value) {
      window.localStorage.setItem(CONSENT_KEY, value);
    } else {
      window.localStorage.removeItem(CONSENT_KEY);
    }
    if (value !== "granted") {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Storage blocked: the choice just won't persist.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
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
    // The server refuses to store anything without this flag.
    body: JSON.stringify({ ...body, consent: "granted" }),
    keepalive: true,
    cache: "no-store",
  });
}

export async function trackClickEvent(eventName: string) {
  if (!canUseBrowserApis() || getConsent() !== "granted") {
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
  if (!canUseBrowserApis() || getConsent() !== "granted") {
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
    // Consent can be withdrawn mid-session; send nothing after that.
    if (sentEnd || getConsent() !== "granted") {
      return;
    }
    sentEnd = true;

    const durationSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const payload = JSON.stringify({
      action: "end",
      consent: "granted",
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
