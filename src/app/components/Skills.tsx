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
      <h1 className="text-secondary text-xl font-medium">Skills</h1>

      <div className="flex gap-2 items-center flex-wrap">
        {SKILLS.map((skill, id) => (
          <button
            key={id}
            onClick={() => handleSkillClick(skill)}
            className="flex items-center gap-2 p-1.5 text-nowrap text-sm rounded-md bg-secondary-card hover:bg-secondary-card/80 transition-colors"
          >
            <div className="w-2 h-2 rounded-full border border-white">
              {selectedSkills.includes(skill) && (
                <div className="w-full h-full rounded-full bg-white"></div>
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
