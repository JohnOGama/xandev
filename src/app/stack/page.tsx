import type { Metadata } from "next";
import Link from "next/link";
import { SKILL_GROUPS } from "../config/constants";

export const metadata: Metadata = {
  title: "Stack",
  description: "The languages, frameworks, and tools John Ogama works with.",
  alternates: { canonical: "/stack" },
};

export default function StackPage() {
  return (
    <div className="py-14 sm:py-20">
      <Link
        href="/"
        className="font-mono text-xs text-muted hover:text-foreground"
      >
        ← back
      </Link>
      <h1 className="mt-6 text-2xl font-bold leading-none tracking-tight">
        Stack
      </h1>
      <p className="mt-6 mb-14 max-w-xl text-[15px] leading-relaxed text-foreground/70">
        The languages, frameworks, and tools I use to build web and mobile
        apps, from the interface to the API, database, and deployment.
      </p>

      <dl className="divide-y divide-line border-y border-line">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className="grid gap-x-3 gap-y-1 py-4 sm:grid-cols-12 sm:items-baseline"
          >
            <dt className="font-mono text-[11px] text-muted sm:col-span-4">
              {group.label}
            </dt>
            <dd className="text-sm leading-relaxed sm:col-span-8">
              {group.skills.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
