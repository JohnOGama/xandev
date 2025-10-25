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
  description: "John Ogama's Portfolio",
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
        <main className="w-full text-white h-full p-5 md:p-0 md:py-5 max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
