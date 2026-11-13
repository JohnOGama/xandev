import type { Metadata } from "next";
import { Geist, Geist_Pixel, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import {
  GITHUB_LINK,
  LINKEDIN_LINK,
  SITE_URL,
  SKILL_GROUPS,
} from "./config/constants";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "John Ogama | Full-stack Developer",
    template: "%s | John Ogama",
  },
  description:
    "John Ogama is a full-stack developer in the Philippines building web and mobile apps with React, Next.js, React Native, TypeScript, NestJS, and PostgreSQL.",
  applicationName: "John Ogama Portfolio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "John Ogama" }],
  creator: "John Ogama",
  publisher: "John Ogama",
  keywords: [
    "John Ogama",
    "Full-stack Engineer",
    "Full-stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "NestJS Developer",
    "TypeScript",
    "Web3 Developer",
    "Portfolio",
    "Software Engineer Philippines",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "John Ogama | Full-stack Developer",
    description:
      "Full-stack developer building web and mobile apps with React, Next.js, React Native, TypeScript, NestJS, and PostgreSQL.",
    siteName: "John Ogama Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Ogama | Full-stack Developer",
    description:
      "Full-stack developer building web and mobile apps with React, Next.js, React Native, TypeScript, NestJS, and PostgreSQL.",
    creator: "@JohnOGama",
  },
  category: "technology",
};

// Structured data so search engines and AI assistants can identify who this site is about.
// Static, hand-written values only: nothing user-supplied is serialized here.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "John Ogama",
  url: SITE_URL,
  jobTitle: "Full-stack Developer",
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  sameAs: [GITHUB_LINK, LINKEDIN_LINK],
  knowsAbout: SKILL_GROUPS.flatMap((group) => group.skills),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${robotoMono.variable} ${geistPixel.variable} ${geist.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div
          aria-hidden
          className="dots pointer-events-none fixed top-0 right-0 h-[70vh] w-[60vw]"
        />
        <main className="relative mx-auto w-full max-w-2xl px-6 pb-16">
          {children}
          <CookieConsent />
        </main>
      </body>
    </html>
  );
}
