import { redirect } from "next/navigation";
import { getDashboardStats } from "@/lib/analytics";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function formatDuration(seconds: number) {
  if (!seconds || seconds < 1) {
    return "0s";
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 1) {
    return `${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

export default async function AdminDashboardPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const stats = await getDashboardStats();

  return (
    <main className="mx-auto mt-8 max-w-3xl space-y-5">
      <header className="rounded-xl bg-primary-card/80 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-white">Analytics dashboard</h1>
            <p className="text-sm text-white/60">Portfolio views, clicks, and engagement</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Unique visitors" value={stats.totalUniqueVisitors} />
        <StatCard label="Sessions" value={stats.totalSessions} />
        <StatCard label="Clicks" value={stats.totalClicks} />
        <StatCard
          label="Avg time on page"
          value={formatDuration(stats.avgDurationSeconds)}
        />
      </section>

      <section className="rounded-xl bg-primary-card/80 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary/90">
          Top click events
        </h2>
        <div className="mt-3 space-y-2">
          {stats.topEvents.length === 0 ? (
            <p className="text-sm text-white/50">No click data yet.</p>
          ) : (
            stats.topEvents.map((item) => (
              <div
                key={item.eventName}
                className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2 text-sm"
              >
                <span className="text-white/80">{item.eventName}</span>
                <span className="text-secondary">{item.count}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-xl bg-primary-card/80 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary/90">
          Recent unique views
        </h2>
        <div className="mt-3 space-y-2">
          {stats.recentViews.length === 0 ? (
            <p className="text-sm text-white/50">No view data yet.</p>
          ) : (
            stats.recentViews.map((view, index) => (
              <div
                key={`${view.firstSeenAt}-${index}`}
                className="rounded-md bg-black/20 px-3 py-2 text-sm text-white/75"
              >
                {new Date(view.firstSeenAt).toLocaleString()} - {view.city || "Unknown"},{" "}
                {view.country || "Unknown"} - {view.path}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-xl bg-primary-card/80 p-3">
      <p className="text-xs uppercase tracking-wider text-white/50">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </article>
  );
}
