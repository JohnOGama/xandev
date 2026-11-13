"use client";

import Image from "next/image";
import { trackClickEvent } from "@/lib/client-analytics";

const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.strivio.fitness";
const WEBSITE_LINK = "https://strivio.fitness";

const STACK = ["React Native", "Expo", "Next Js", "Nest Js", "PostgreSQL"];

const FeaturedApp = () => {
  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-mono text-sm text-muted">featured</h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          personal project
        </span>
      </div>

      <article className="card">
        <div className="flex items-center gap-4">
          <Image
            src="/Icons/webp/strivio.webp"
            alt="Strivio app icon"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-2xl"
          />
          <div>
            <h3 className="text-xl font-bold tracking-tight">Strivio</h3>
            <p className="text-[13px] text-muted">
              A coaching platform that connects fitness coaches with their
              clients.
            </p>
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-foreground/70">
          Coaches build workout and meal plans, manage their roster, and track
          client progress from their phone. Clients follow their plan, log food
          and personal records, and message their coach in real time. I built
          the mobile app, landing page, admin dashboard, and backend.
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {STACK.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs">
          <a
            href={PLAY_STORE_LINK}
            target="_blank"
            rel="noreferrer"
            onClick={() => void trackClickEvent("click.strivio.playstore")}
            className="block transition-opacity hover:opacity-80"
          >
            <Image
              src="/Icons/webp/google-play-trimmed.webp"
              alt="Get it on Google Play"
              width={564}
              height={168}
              className="h-10 w-auto"
            />
          </a>
          <Image
            src="/Icons/webp/app-store.webp"
            alt="Coming soon to the App Store"
            width={900}
            height={275}
            className="h-10 w-auto rounded-md"
          />
          <a
            href={WEBSITE_LINK}
            target="_blank"
            rel="noreferrer"
            onClick={() => void trackClickEvent("click.strivio.website")}
            className="ml-3 text-muted hover:text-foreground"
          >
            strivio.fitness ↗
          </a>
        </div>
      </article>
    </div>
  );
};

export default FeaturedApp;
