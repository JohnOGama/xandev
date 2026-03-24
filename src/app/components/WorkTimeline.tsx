"use client";

import { WORK_TIMELINE } from "../config/constants";

const WorkTimeline = () => {
  return (
    <section className="rounded-xl bg-primary-card/65 p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-secondary md:text-lg">
          Work timeline
        </h2>
        <span className="text-xs text-white/50">Most recent first</span>
      </div>

      <div className="space-y-3">
        {WORK_TIMELINE.map((item, index) => (
          <article key={`${item.company}-${item.role}`} className="relative pl-5">
            <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-secondary" />
            {index !== WORK_TIMELINE.length - 1 ? (
              <span className="absolute left-[3px] top-5 h-[calc(100%-8px)] w-px bg-white/20" />
            ) : null}

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {item.role}
                </h3>
                <span className="text-xs text-white/60">{item.period}</span>
              </div>

              <p className="text-xs text-white/75">
                {item.company} · {item.employmentType} · {item.location}
              </p>

              <ul className="space-y-1 pt-0.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs text-white/80 md:text-sm"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkTimeline;
