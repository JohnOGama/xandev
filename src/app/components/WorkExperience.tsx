"use client";
import { PROJECTS } from "@/app/config/constants";
import Image from "next/image";
import { useState } from "react";

const tabs = ["Projects", "Contributions"];

type TabKey = (typeof tabs)[number];

const WorkExperience = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Projects");

  const handleTabClick = (value: TabKey) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        {tabs.map((value, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(value)}
            className={`
              ${activeTab === value ? "text-secondary underline" : "text-gray"}
              cursor-pointer text-xl font-medium`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="relative bg-primary-card p-3 flex flex-col gap-2 rounded-md"
          >
            <div className="flex flex-col">
              <h1 className="text-primary text-lg font-medium">
                {project.title}
              </h1>
              <span className="text-xs">{project.country}</span>
            </div>
            <div className="w-[80%]">
              {activeTab === "Projects" ? (
                <span className="text-sm text-white/70">
                  {project.description}
                </span>
              ) : (
                <Contributions contributions={project.contributions} />
              )}
            </div>
            <div className="flex gap-1 items-center">
              <div className="text-xs text-gray flex gap-x-2 gap-y-1 items-center flex-wrap">
                BUILD WITH:{" "}
                {project.builtWith.map((item) => (
                  <span key={item} className="text-xs text-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating company logo right side */}
            <Image
              className="absolute top-2 right-2 opacity-30 rounded-2xl"
              src={project.companyLogo}
              alt={project.company}
              width={project.company === "Mobii PH" ? 50 : 100}
              height={project.company === "Mobii PH" ? 50 : 100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;

function Contributions({ contributions }: { contributions: string[] }) {
  return (
    <ul className="list-disc list-inside">
      {contributions.map((contribution, index) => (
        <li key={index} className="text-sm text-white/70">
          {contribution}
        </li>
      ))}
    </ul>
  );
}
