"use client";
import { PROJECTS } from "@/app/config/constants";
import { trackClickEvent } from "@/lib/client-analytics";
import Image from "next/image";
import { useState, useMemo } from "react";

const tabs = ["Projects", "Contributions"];

type TabKey = (typeof tabs)[number];

interface WorkExperienceProps {
  selectedSkills?: string[];
}

const WorkExperience = ({ selectedSkills = [] }: WorkExperienceProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("Projects");

  const filteredProjects = useMemo(() => {
    if (selectedSkills.length === 0) {
      return PROJECTS;
    }

    return PROJECTS.filter((project) =>
      selectedSkills.some((skill) =>
        project.builtWith.some(
          (tech) =>
            tech.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(tech.toLowerCase())
        )
      )
    );
  }, [selectedSkills]);

  const handleTabClick = (value: TabKey) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        {tabs.map((value, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(value)}
            className={`
              ${
                activeTab === value
                  ? "bg-secondary/15 text-secondary"
                  : "text-gray hover:text-white"
              }
              cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium transition-colors`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg bg-primary-card/90 p-3 md:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <h1 className="text-primary text-base font-semibold md:text-lg">
                  {project.title}
                </h1>
                <span className="text-xs text-gray">{project.country}</span>
              </div>

              <div className="shrink-0 rounded-md bg-white/5 p-1">
                <Image
                  className="rounded-md object-contain opacity-80"
                  src={project.companyLogo}
                  alt={project.company}
                  width={project.company === "Mobii PH" ? 28 : 60}
                  height={project.company === "Mobii PH" ? 28 : 60}
                />
              </div>
            </div>

            <div className="mt-2 md:max-w-[90%]">
              {activeTab === "Projects" ? (
                <span className="text-sm text-white/70">
                  {project.description}
                </span>
              ) : (
                <Contributions contributions={project.contributions} />
              )}
            </div>

            <div className="mt-3 flex gap-1 items-start">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray">
                <span className="mr-1 text-[10px] font-semibold tracking-wider text-white/50">
                  BUILT WITH
                </span>
                {project.builtWith.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/8 px-2 py-0.5 text-[11px] text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;

function Contributions({ contributions }: { contributions: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleContributions = expanded ? contributions : contributions.slice(0, 4);

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary/90">
        Key contributions
      </p>
      <ul className="space-y-1">
        {visibleContributions.map((contribution, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-white/80">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
            <span>{contribution}</span>
          </li>
        ))}
      </ul>
      {contributions.length > 4 ? (
        <button
          type="button"
          onClick={() => {
            void trackClickEvent("click.contributions.toggle");
            setExpanded((prev) => !prev);
          }}
          className="cursor-pointer text-xs font-medium text-secondary/90 hover:text-secondary"
        >
          {expanded ? "See less" : `See more (+${contributions.length - 4})`}
        </button>
      ) : null}
    </div>
  );
}
