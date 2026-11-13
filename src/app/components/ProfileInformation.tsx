"use client";

import Link from "next/link";
import { GITHUB_LINK, LINKEDIN_LINK } from "../config/constants";
import { trackClickEvent } from "@/lib/client-analytics";

const EMAIL = "ogamajohnd@gmail.com";
const MAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Hi John Ogama!",
)}`;

const ProfileInformation = () => {
  return (
    <header className="pt-20 pb-14 sm:pt-28">
      <h1 className="font-pixel text-3xl leading-none sm:text-[2.6rem]">
        John Ogama
      </h1>
      <p className="font-geist mt-6 text-[15px] leading-relaxed text-foreground/70">
        Fullstack Developer with{" "}
        <span className="font-semibold text-foreground">
          3+ years of experience
        </span>{" "}
        building web and mobile apps.
      </p>
      <p className="mt-1 font-mono text-xs text-muted">+63 992 514 3490</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
        <Link
          href="/pdf/JohnOgama.pdf"
          prefetch={false}
          target="_blank"
          rel="noreferrer"
          onClick={() => void trackClickEvent("click.resume")}
          className="rounded-md bg-foreground px-2.5 py-1 text-background transition-opacity hover:opacity-85"
        >
          resume ↗
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={GITHUB_LINK}
          onClick={() => void trackClickEvent("click.github")}
          className="hover:text-foreground"
        >
          github ↗
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={LINKEDIN_LINK}
          onClick={() => void trackClickEvent("click.linkedin")}
          className="hover:text-foreground"
        >
          linkedin ↗
        </Link>
        <Link
          href={MAIL_LINK}
          onClick={() => void trackClickEvent("click.email")}
          className="hover:text-foreground"
        >
          {EMAIL}
        </Link>
      </div>
    </header>
  );
};

export default ProfileInformation;
