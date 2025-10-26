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
  title: "John Ogama | Portfolio",
  description:
    "Fullstack Engineer with 2+ years of experience in React, Next.js, TypeScript, and modern web technologies. View my portfolio and project contributions.",
  authors: [{ name: "John Ogama" }],
  creator: "John Ogama",
  keywords: [
    "John Ogama",
    "Fullstack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    type: "website",
    url: "https://johnogama-portfolio.vercel.app",
    title: "John Ogama | Fullstack Engineer Portfolio",
    description:
      "Fullstack Engineer with 2+ years of experience in React, Next.js, TypeScript, and modern web technologies.",
    siteName: "John Ogama Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "John Ogama - Fullstack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Ogama | Fullstack Engineer Portfolio",
    description:
      "Fullstack Engineer with 2+ years of experience in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/opengraph-image"],
  },
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
