"use client";

import { useState } from "react";
import FeaturedApp from "./FeaturedApp";
import ProfileInformation from "./ProfileInformation";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import WorkTimeline from "./WorkTimeline";
import AnalyticsLifecycle from "./AnalyticsLifecycle";

export default function HomeClient() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="w-full">
      <AnalyticsLifecycle />
      <ProfileInformation />
      <section className="border-t border-line py-12">
        <WorkTimeline />
        <div className="mt-8">
          <Skills
            selectedSkills={selectedSkills}
            onSkillsChange={setSelectedSkills}
          />
        </div>
      </section>
      <section className="pt-12">
        <FeaturedApp />
      </section>
      <section className="py-12">
        <WorkExperience selectedSkills={selectedSkills} />
      </section>
    </div>
  );
}
