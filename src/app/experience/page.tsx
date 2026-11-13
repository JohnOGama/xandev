import type { Metadata } from "next";
import Link from "next/link";
import { WORK_TIMELINE, initials } from "../config/constants";

export const metadata: Metadata = {
  title: "Experience",
  description: "John Ogama's full work history.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="py-14 sm:py-20">
      <Link
        href="/"
        className="font-mono text-xs text-muted hover:text-foreground"
      >
        ← back
      </Link>
      <h1 className="mt-6 text-2xl font-bold leading-none tracking-tight">
        Experience
      </h1>
      <p className="mt-6 mb-14 max-w-xl text-[15px] leading-relaxed text-foreground/70">
        Experienced developer with 4+ years of experience, building tools, that
        will help to improve business workflow, utilized ai to build fast,
        secured, and reliable.
      </p>

      <div>
        {WORK_TIMELINE.map((item, index) => (
          <article
            key={`${item.company}-${item.role}`}
            className="flex gap-4 sm:gap-5"
          >
            <div className="flex flex-col items-center">
              <div
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line font-mono text-xs font-semibold"
              >
                {initials(item.company)}
              </div>
              {index !== WORK_TIMELINE.length - 1 ? (
                <div className="mt-2 w-px flex-1 bg-line" />
              ) : null}
            </div>

            <div className="flex-1 pb-12">
              <h2 className="text-base font-semibold leading-snug">
                {item.company}
              </h2>
              <p className="mt-1 font-mono text-xs text-muted">
                {item.employmentType}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-muted">
                {item.location}
              </p>

              <h3 className="mt-5 text-[15px] font-medium">{item.role}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                {item.period}
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/70">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
