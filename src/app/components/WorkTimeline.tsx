import Link from "next/link";
import { WORK_TIMELINE } from "../config/constants";

const WorkTimeline = () => {
  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-mono text-sm text-muted">experience</h2>
        <Link
          href="/experience"
          className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-foreground"
        >
          full history →
        </Link>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {WORK_TIMELINE.map((item) => (
          <div
            key={`${item.company}-${item.role}`}
            className="grid grid-cols-12 items-baseline gap-x-3 gap-y-0.5 py-3"
          >
            <span className="col-span-12 font-mono text-[11px] text-muted sm:col-span-4">
              {item.period}
            </span>
            <span className="col-span-7 text-sm font-medium sm:col-span-5">
              {item.role}
            </span>
            <span className="col-span-5 text-right text-[13px] text-muted sm:col-span-3">
              {item.company}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkTimeline;
