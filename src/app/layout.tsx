import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import ExitGuard from "@/components/core/exit-guard";
const suse = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Raven",
  description:
    "A personal portfolio website showcasing my projects and skills, built with Next.js, React Three Fiber, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn("h-full dark", "antialiased", suse.className)}
      >
        <body className="h-dvh w-dvw overflow-hidden flex flex-col">
          <ExitGuard />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
