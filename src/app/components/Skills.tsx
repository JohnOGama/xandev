"use client";
import Link from "next/link";
import { FILTER_SKILLS } from "../config/constants";

interface SkillsProps {
  selectedSkills: string[];
  onSkillsChange: (selectedSkills: string[]) => void;
}

const Skills = ({ selectedSkills, onSkillsChange }: SkillsProps) => {
  const toggle = (skill: string) =>
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted">
          Stack · filters projects
        </h3>
        <Link
          href="/stack"
          className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-foreground"
        >
          view all →
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_SKILLS.map((skill) => {
          const selected = selectedSkills.includes(skill);
          return (
            <button
              key={skill}
              aria-pressed={selected}
              onClick={() => toggle(skill)}
              className={`cursor-pointer rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {skill}
            </button>
          );
        })}
        <Link
          href="/stack"
          className="rounded-md border border-dashed border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          + more
        </Link>
      </div>
    </div>
  );
};

export default Skills;
