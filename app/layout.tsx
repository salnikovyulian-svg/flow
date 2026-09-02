import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flow",
  description: "Build systems. Not motivation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#070b14]" />

          <div className="absolute left-[-220px] top-[-180px] h-[700px] w-[700px] rounded-full bg-violet-700/20 blur-[180px]" />

          <div className="absolute right-[-250px] top-[120px] h-[700px] w-[700px] rounded-full bg-blue-600/15 blur-[220px]" />

          <div className="absolute bottom-[-300px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[260px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.08),transparent_45%)]" />

          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        {children}
      </body>
    </html>
  );
}
