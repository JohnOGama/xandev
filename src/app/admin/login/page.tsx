"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-20 max-w-sm rounded-xl bg-primary-card/80 p-5">
      <h1 className="text-lg font-semibold text-white">Admin login</h1>
      <p className="mt-1 text-sm text-white/60">Private analytics dashboard</p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs text-white/70">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md bg-black/25 px-3 py-2 text-sm text-white outline-none"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/70">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-black/25 px-3 py-2 text-sm text-white outline-none"
            autoComplete="current-password"
            required
          />
        </div>
        {error ? <p className="text-xs text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-secondary/20 px-3 py-2 text-sm font-medium text-secondary disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
