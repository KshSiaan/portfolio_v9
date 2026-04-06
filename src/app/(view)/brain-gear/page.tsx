"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIcon,
  BrainIcon,
  ChartLineUpIcon,
  CodeIcon,
  CpuIcon,
  HardDrivesIcon,
  LightningIcon,
  ListIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TerminalWindowIcon,
  WaveformIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  BehanceLogoIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

type SectionKey = "core_bio" | "tech_stack" | "deployments" | "system_status";

type SkillItem = {
  label: string;
  value: number;
};

type DeploymentItem = {
  period: string;
  id: string;
  title: string;
  description: string;
  active?: boolean;
};

type ChannelItem = {
  label: string;
  icon: typeof PaintBrushIcon;
};

type SectionData = {
  subtitle: string;
  title: string;
  rightSubtitle: string;
  rightTitle: string;
  skills: SkillItem[];
  infoLines: string[];
  deployments: DeploymentItem[];
  channels: ChannelItem[];
};

const sections: Array<{
  key: SectionKey;
  label: string;
  icon: typeof BrainIcon;
}> = [
  { key: "core_bio", label: "CORE_BIO", icon: BrainIcon },
  { key: "tech_stack", label: "TECH_STACK", icon: CodeIcon },
  { key: "deployments", label: "DEPLOYMENTS", icon: RocketLaunchIcon },
  { key: "system_status", label: "SYSTEM_STATUS", icon: ChartLineUpIcon },
];

const sectionData: Record<SectionKey, SectionData> = {
  core_bio: {
    subtitle: "PROFESSIONAL_EXPERIENCE",
    title: "PLAYER_LEVEL",
    rightSubtitle: "CAREER_HISTORY",
    rightTitle: "WORK_RECORD",
    skills: [
      { label: "Years Active", value: 6 },
      { label: "Systems Shipped", value: 24 },
      { label: "Team Impact", value: 75 },
      { label: "Problem Solving", value: 84 },
    ],
    infoLines: [
      "[INFO] PLAYER_LEVEL: INTERMEDIATE",
      "[INFO] PROFESSIONAL_EXPERIENCE: MULTI_DOMAIN",
      "[INFO] DELIVERY_MODE: CONSISTENT",
    ],
    deployments: [
      {
        period: "CURRENT",
        id: "Sparktech Agency",
        title: "FRONT END ENGINEER",
        description:
          "Building reliable product systems, aligning engineering decisions with business goals.",
        active: true,
      },
      {
        period: "PREVIOUS",
        id: "Business automation Ltd.",
        title: "SOFTWARE ENGINEERING INTERN",
        description:
          "Contributed to internal tools, improving data workflows and operational efficiency.",
      },
      {
        period: "EARLY",
        id: "0X3010",
        title: "INDEPENDENT BUILDER",
        description:
          "Learned by shipping personal projects, prototypes, and iterative experiments.",
      },
    ],
    channels: [
      { label: "CONSISTENCY", icon: ShieldCheckIcon },
      { label: "COMMUNICATION", icon: WaveformIcon },
      { label: "OWNERSHIP", icon: PaintBrushIcon },
    ],
  },
  tech_stack: {
    subtitle: "FAVORITE_LANGUAGES",
    title: "LANGUAGE_PROFILE",
    rightSubtitle: "TECH PREFERENCES",
    rightTitle: "SKILL MATRIX",
    skills: [
      { label: "TypeScript", value: 78 },
      { label: "React", value: 91 },
      { label: "CSS / HTML", value: 97 },
      { label: "SQL", value: 64 },
    ],
    infoLines: [
      "[INFO] FAVORITE_LANGUAGE: TYPESCRIPT",
      "[INFO] LANGUAGE_FOCUS: WEB + TOOLING",
      "[INFO] STACK_DEPTH: BALANCED",
    ],
    deployments: [
      {
        period: "PRIMARY",
        id: "0X7701",
        title: "NEXT JS",
        description:
          "The main framework I use for building projects, with a focus on clean architecture and performance.",
        active: true,
      },
      {
        period: "SECONDARY",
        id: "0X7702",
        title: "FIGMA",
        description:
          "My go-to design tool for prototyping and UI exploration, helping to bridge the gap between design and development.",
      },
      {
        period: "SUPPORT",
        id: "0X7703",
        title: "MIRO + NOTION",
        description:
          "Essential for planning, documentation, and collaboration, keeping projects organized and on track.",
      },
    ],
    channels: [
      { label: "ELYSIA JS", icon: SparkleIcon },
      { label: "DRIZZLE", icon: HardDrivesIcon },
      { label: "NEON DB", icon: ActivityIcon },
    ],
  },
  deployments: {
    subtitle: "FAVORITE_PROJECTS",
    title: "PROJECT_ARCHIVE",
    rightSubtitle: "PROJECT_CATALOG",
    rightTitle: "TOP_BUILDS",
    skills: [
      { label: "Portfolio Builds", value: 96 },
      { label: "Landing Pages", value: 90 },
      { label: "System Tools", value: 87 },
      { label: "Experimental Work", value: 84 },
    ],
    infoLines: [
      "[INFO] FAVORITE_PROJECTS: HIGH_VALUE",
      "[INFO] ARCHIVE_ACCESS: ENABLED",
      "[INFO] CREATIVE_OUTPUT: ACTIVE",
    ],
    deployments: [
      {
        period: "FEATURED",
        id: "0XA913",
        title: "AETHER",
        description: "Code block management and collaboration platform",
        active: true,
      },
      {
        period: "SUCCESS",
        id: "0XA552",
        title: "VAPE SHOP MAPS",
        description:
          "A B2B B2C Business platform for vape shops across the US, built with Next.js and Laravel.",
      },
      {
        period: "UNDER DEVELOPMENT",
        id: "0XA201",
        title: "POVII",
        description:
          "AI Powered learning companion focused on personalized education and skill development with a easy to navigate kids friendly interface.",
      },
    ],
    channels: [
      { label: "PORTFOLIO", icon: TerminalWindowIcon },
      { label: "TOOLS", icon: RocketLaunchIcon },
      { label: "EXPERIMENTS", icon: ChartLineUpIcon },
    ],
  },
  system_status: {
    subtitle: "SOFT_SKILLS",
    title: "HOBBIES",
    rightSubtitle: "PERSONAL_SIGNAL",
    rightTitle: "DAILY_DRIVE",
    skills: [
      { label: "Music Production", value: 95 },
      { label: "Sketching", value: 94 },
      { label: "Philosophy", value: 72 },
      { label: "Gaming", value: 87 },
    ],
    infoLines: [
      "[INFO] SOFT_SKILLS: STRONG COLLABORATION",
      "[INFO] HOBBIES: BUILDING, READING, DESIGNING",
      "[INFO] PERSONAL_SIGNAL: STEADY",
    ],
    deployments: [
      {
        period: "PERSONAL",
        id: "0XSTAT1",
        title: "MUSIC",
        description:
          "Theres no such thing as emotional dependency when there is music to keep you move on",
        active: true,
      },
      {
        period: "PERSONAL",
        id: "0XSTAT2",
        title: "COLLABORATION",
        description:
          "I work well in shared ownership environments and clear feedback loops.",
      },
      {
        period: "PERSONAL",
        id: "0XSTAT3",
        title: "WRITING",
        description:
          "I enjoy writing as a way to clarify my thoughts and share ideas, whether it's technical blogging or personal journaling.",
      },
    ],
    channels: [
      { label: "TEAMWORK", icon: LightningIcon },
      { label: "CREATIVE", icon: CpuIcon },
      { label: "LEARNING", icon: ActivityIcon },
    ],
  },
};

const fadeVariants = {
  initial: { opacity: 0, y: 14, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(8px)",
    transition: { duration: 0.22, ease: "easeIn" },
  },
} as const;

const hudPanel = "border border-white/10 bg-[#1f1f1f99] backdrop-blur-[15px]";

const formatUptime = (date: Date): string => {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};

export default function BrainGearPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("core_bio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const syncDesktopState = () => {
      const matches = media.matches;
      setIsDesktop(matches);

      if (matches) {
        setIsMenuOpen(true);
      }
    };

    syncDesktopState();

    media.addEventListener("change", syncDesktopState);

    return () => {
      media.removeEventListener("change", syncDesktopState);
    };
  }, []);

  const current = useMemo(() => sectionData[activeSection], [activeSection]);

  return (
    <div className="relative flex min-h-0 w-full flex-1 overflow-hidden text-[#e2e2e2]">
      <div className="relative flex min-h-0 w-full flex-1">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="absolute left-4 top-4 z-40 inline-flex size-10 items-center justify-center border border-[#ffb4a84d] bg-[#131313cc] text-[#ffb4a8] backdrop-blur-xl transition hover:bg-[#ff554022] md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <XIcon className="size-5" weight="bold" />
          ) : (
            <ListIcon className="size-5" weight="bold" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && !isDesktop ? (
            <motion.button
              key="menu-overlay"
              type="button"
              className="absolute inset-0 z-20 bg-black/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu overlay"
            />
          ) : null}
        </AnimatePresence>

        <motion.aside
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { x: 0, opacity: 1 },
            closed: { x: -320, opacity: 0.9 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="absolute inset-y-0 left-0 z-30 flex h-full w-64 flex-col border-r border-white/5 bg-[#131313f2] py-8 shadow-[20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:relative md:inset-auto md:z-10 md:shrink-0 md:translate-x-0 md:opacity-100"
        >
          <div className="mb-12 flex items-center gap-4 px-6">
            <div className="flex size-10 items-center justify-center border border-[#ffb4a84d] bg-[#ff554022]">
              <BrainIcon className="size-5 text-[#ffb4a8]" weight="fill" />
            </div>
            <div>
              <p className="font-bold uppercase tracking-widest text-red-500">
                RAVEN_OS
              </p>
              <p className="text-[10px] text-white/40">v9.0.2-stable</p>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {sections.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.key);
                    if (!isDesktop) {
                      setIsMenuOpen(false);
                    }
                  }}
                  className={`flex w-full items-center gap-4 px-6 py-3 text-left text-xs tracking-tight transition-all ${
                    isActive
                      ? "border-r-2 border-red-500 bg-red-500/10 text-red-500"
                      : "text-white/40 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="font-medium uppercase">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto  pr-6">
            <motion.div
              key="contact-menu"
              role="menu"
              initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full border border-red-400/35 bg-zinc-950/90 p-3 backdrop-blur-md"
            >
              <p className="mb-3 text-[10px] font-mono! tracking-[0.2em] text-[#CBFFB6]">
                CONTACT GRID
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  role="menuitem"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11px] tracking-wide text-red-100 transition-colors hover:bg-red-500/20"
                >
                  <LinkedinLogoIcon
                    weight="fill"
                    size={16}
                    className="text-red-300"
                  />
                  LinkedIn
                </a>
                <a
                  role="menuitem"
                  href="https://www.behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11px] tracking-wide text-red-100 transition-colors hover:bg-red-500/20"
                >
                  <BehanceLogoIcon
                    weight="fill"
                    size={16}
                    className="text-red-300"
                  />
                  Behance
                </a>
                <a
                  role="menuitem"
                  href="mailto:hello@example.com"
                  className="flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11px] tracking-wide text-red-100 transition-colors hover:bg-red-500/20"
                >
                  <EnvelopeSimpleIcon
                    weight="fill"
                    size={16}
                    className="text-red-300"
                  />
                  Email
                </a>
                <a
                  role="menuitem"
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11px] tracking-wide text-red-100 transition-colors hover:bg-red-500/20"
                >
                  <WhatsappLogoIcon
                    weight="fill"
                    size={16}
                    className="text-red-300"
                  />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </motion.aside>

        <main className="relative flex-1 overflow-y-auto">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative size-140">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ff554011] blur-[120px]" />
              <div className="absolute inset-12 rounded-full border border-red-400/20" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 px-4 pb-6 pt-18 md:px-6 xl:h-full xl:px-8 xl:pb-8 xl:pt-12">
            <div className="w-full space-y-6 xl:absolute xl:left-8 xl:top-12 xl:w-80">
              <div>
                <p className="mb-1 text-xs text-[#d7ffc5]">
                  {current.subtitle}
                </p>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
                  {current.title}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-skills`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  {current.skills.map((skill) => (
                    <div key={skill.label} className="space-y-2">
                      <div className="flex items-end justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/60">
                          {skill.label}
                        </span>
                        <span className="text-[10px] text-[#d7ca00]">
                          {skill.value}% SYNAPSE
                        </span>
                      </div>
                      <div className="relative h-1 bg-[#2a2a2a]">
                        <div
                          className="absolute inset-y-0 left-0 bg-[#d7ca00] shadow-[0_0_10px_#d7ca00]"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-info`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`${hudPanel} border-l-2 border-[#d7ca0080] p-4`}
                >
                  <p className="text-[9px] leading-relaxed text-[#d7ca00cc]">
                    {current.infoLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full xl:absolute xl:right-8 xl:top-12 xl:w-96">
              <div className="mb-6">
                <p className="mb-1 text-xs text-[#d7ffc5]">
                  {current.rightSubtitle}
                </p>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
                  {current.rightTitle}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-deployments`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  {current.deployments.map((item) => (
                    <div
                      key={item.id}
                      className={`${hudPanel} border-l-2 p-4 transition-all ${
                        item.active ? "border-[#ff554099]" : "border-white/10"
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className="text-[10px] text-[#d7ffc5]">
                          {item.period}
                        </span>
                        <span className="text-[10px] text-white/40">
                          ID: {item.id}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full xl:absolute xl:bottom-8 xl:right-8 xl:w-96 xl:items-end">
              <div className="mb-4 text-right">
                <p className="mb-1 text-xs text-[#d7ffc5]">AUXILIARY_FREQ</p>
                <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                  SIDE_CHANNELS
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-channels`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                >
                  {current.channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <div
                        key={channel.label}
                        className={`${hudPanel} flex h-20 w-full flex-col items-center justify-center gap-2 border border-[#d7ffc533] sm:size-24`}
                      >
                        <Icon className="size-5 text-[#d7ffc5]" />
                        <span className="px-2 text-center text-[8px] uppercase text-white/60">
                          {channel.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-4 xl:absolute xl:bottom-8 xl:left-8 xl:gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="h-3 w-1 bg-[#d7ffc5]" />
                  <div className="h-3 w-1 bg-[#d7ffc5]" />
                  <div className="h-3 w-1 bg-[#d7ffc5]" />
                  <div className="h-3 w-1 bg-[#d7ffc54d]" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#d7ffc5]">
                  POWER_LEVEL
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tighter tabular-nums text-white">
                  {formatUptime(now)}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                  UPTIME_COUNTER
                </span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background:linear-gradient(to_bottom,transparent_50%,rgba(47,248,1,0.05)_50%)] bg-size-[100%_4px]" />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-32 bg-white/20" />
          <div className="pointer-events-none absolute left-0 top-0 h-32 w-px bg-white/20" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-px w-32 bg-white/20" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-px bg-white/20" />
        </main>
      </div>
    </div>
  );
}
