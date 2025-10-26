"use client";
import ProfileInformation from "./components/ProfileInformation";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import { useState } from "react";

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="w-full flex flex-col gap-4">
      <ProfileInformation />
      <Skills onSkillsChange={setSelectedSkills} />
      <WorkExperience selectedSkills={selectedSkills} />
    </div>
  );
}
