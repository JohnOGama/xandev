import Link from "next/link";
import { FILTER_SKILLS } from "../config/constants";

const Skills = () => (
  <div>
    <div className="mb-4 flex items-baseline justify-between">
      <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted">
        Stack
      </h3>
      <Link
        href="/stack"
        className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-foreground"
      >
        view all →
      </Link>
    </div>

    <ul className="flex flex-wrap gap-2">
      {FILTER_SKILLS.map((skill) => (
        <li
          key={skill}
          className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-foreground/70"
        >
          {skill}
        </li>
      ))}
      <li>
        <Link
          href="/stack"
          className="block rounded-md border border-dashed border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          + more
        </Link>
      </li>
    </ul>
  </div>
);

export default Skills;
