"use client";

import { GITHUB_LINK, LINKEDIN_LINK } from "../config/constants";
import { trackClickEvent } from "@/lib/client-analytics";

const EMAIL = "ogamajohnd@gmail.com";
const MAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Hi John Ogama!"
)}`;

const ProfileInformation = () => {
  return (
    <header className="pt-20 pb-14 sm:pt-28">
      <h1 className="text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-none">
        John Ogama
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-foreground/70">
        Fullstack Developer with{" "}
        <span className="font-semibold text-foreground">
          4+ years of experience
        </span>{" "}
        building web and mobile apps.
      </p>
      <p className="mt-1 font-mono text-xs text-muted">+63 992 514 3490</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
        <a
          href="/pdf/JohnOgama.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() => void trackClickEvent("click.resume")}
          className="rounded-md bg-foreground px-2.5 py-1 text-background transition-opacity hover:opacity-85"
        >
          resume ↗
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={GITHUB_LINK}
          onClick={() => void trackClickEvent("click.github")}
          className="hover:text-foreground"
        >
          github ↗
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={LINKEDIN_LINK}
          onClick={() => void trackClickEvent("click.linkedin")}
          className="hover:text-foreground"
        >
          linkedin ↗
        </a>
        <a
          href={MAIL_LINK}
          onClick={() => void trackClickEvent("click.email")}
          className="hover:text-foreground"
        >
          {EMAIL}
        </a>
      </div>
    </header>
  );
};

export default ProfileInformation;
