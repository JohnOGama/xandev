import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johnogama.is-a.dev"),
  title: {
    default: "John Ogama | Full-stack Developer",
    template: "%s | John Ogama",
  },
  description:
    "Full-stack Developer building modern, high-performance web apps with Next.js, React, TypeScript, and NestJS.",
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
    "NestJS Developer",
    "TypeScript",
    "Web3 Developer",
    "Portfolio",
    "Software Engineer Philippines",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnogama.is-a.dev",
    title: "John Ogama | Full-stack Engineer",
    description:
      "Modern, scalable web products built with React, Next.js, TypeScript, NestJS, and PostgreSQL.",
    siteName: "John Ogama Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "John Ogama portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Ogama | Full-stack Engineer",
    description:
      "Modern, scalable web products built with React, Next.js, TypeScript, NestJS, and PostgreSQL.",
    creator: "@JohnOGama",
    images: ["/opengraph-image.png"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${robotoMono.variable} antialiased`}
      >
        <main className="w-full text-white h-full p-5 md:p-0 md:py-5 lg:my-10 max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
