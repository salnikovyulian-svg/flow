import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Create a Decision Contract and move from planning into execution.",
  title: "Decision Contract — Flow",
};

type GoalContractLayoutProps = {
  children: ReactNode;
};

export default function GoalContractLayout({
  children,
}: GoalContractLayoutProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </div>
  );
}
