"use client";

import { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import WorkTimeline from "./WorkTimeline";
import AnalyticsLifecycle from "./AnalyticsLifecycle";

export default function HomeClient() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="w-full flex flex-col gap-5 md:gap-6">
      <AnalyticsLifecycle />
      <ProfileInformation />
      <WorkTimeline />
      <section className="rounded-xl bg-primary-card/70 p-3 md:p-4">
        <Skills onSkillsChange={setSelectedSkills} />
      </section>
      <section className="rounded-xl bg-primary-card/60 p-3 md:p-4">
        <WorkExperience selectedSkills={selectedSkills} />
      </section>
    </div>
  );
}
