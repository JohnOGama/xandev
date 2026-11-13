"use client";
import { PROJECTS, initials, projectUsesSkill } from "@/app/config/constants";
import { trackClickEvent } from "@/lib/client-analytics";
import { useState } from "react";

const tabs = ["Projects", "Contributions"];

type TabKey = (typeof tabs)[number];

const WorkExperience = ({ selectedSkills }: { selectedSkills: string[] }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("Projects");

  const filteredProjects =
    selectedSkills.length === 0
      ? PROJECTS
      : PROJECTS.filter((project) =>
          selectedSkills.some((skill) => projectUsesSkill(project, skill))
        );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-sm text-muted">projects</h2>
        <div className="flex rounded-md border border-line p-0.5 font-mono">
          {tabs.map((value) => (
            <button
              key={value}
              aria-pressed={activeTab === value}
              onClick={() => setActiveTab(value)}
              className={`cursor-pointer rounded px-2.5 py-1 text-xs transition-colors ${
                activeTab === value
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {filteredProjects.map((project) => (
          <article key={project.title} className="card flex flex-col">
            <div className="flex items-center gap-3">
              <div
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line font-mono text-sm font-semibold"
              >
                {initials(project.title)}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight md:text-lg">
                  {project.title}
                </h3>
                <span className="text-xs text-muted">{project.country}</span>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 font-mono text-xs text-muted underline underline-offset-4 hover:text-foreground"
                  >
                    {new URL(project.url).hostname} ↗
                  </a>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex-1">
              {activeTab === "Projects" ? (
                <p className="text-[13px] leading-relaxed text-foreground/70">
                  {project.description}
                </p>
              ) : (
                <Contributions contributions={project.contributions} />
              )}
            </div>

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
              {project.builtWith.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
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
    <div className="space-y-2">
      <ul className="space-y-1">
        {visibleContributions.map((contribution, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-foreground/75"
          >
            <span className="mt-2 h-px w-2 shrink-0 bg-muted" />
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
          className="cursor-pointer text-xs font-medium text-muted underline underline-offset-4 hover:text-foreground"
        >
          {expanded ? "See less" : `See more (+${contributions.length - 4})`}
        </button>
      ) : null}
    </div>
  );
}
