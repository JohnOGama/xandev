"use client";
import { SKILLS } from "../config/constants";
import { useState } from "react";

interface SkillsProps {
  onSkillsChange?: (selectedSkills: string[]) => void;
}

const Skills = ({ onSkillsChange }: SkillsProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillClick = (skill: string) => {
    const newSelectedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(newSelectedSkills);
    onSkillsChange?.(newSelectedSkills);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-secondary md:text-lg">Skills</h1>
        <span className="text-xs text-white/50">Filter projects by stack</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {SKILLS.map((skill, id) => (
          <button
            key={id}
            onClick={() => handleSkillClick(skill)}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-nowrap text-xs md:text-sm transition-colors ${
              selectedSkills.includes(skill)
                ? "border-secondary/50 bg-secondary/20 text-white"
                : "border-white/10 bg-secondary-card text-white/80 hover:bg-secondary-card/80 hover:text-white"
            }`}
          >
            <div className="h-2 w-2 rounded-full border border-white/80">
              {selectedSkills.includes(skill) && (
                <div className="h-full w-full rounded-full bg-secondary"></div>
              )}
            </div>
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Skills;
