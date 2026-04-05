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
  PaintBrushIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TerminalWindowIcon,
  WaveformIcon,
} from "@phosphor-icons/react/dist/ssr";

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
      { label: "Years Active", value: 92 },
      { label: "Systems Shipped", value: 88 },
      { label: "Team Impact", value: 95 },
      { label: "Problem Solving", value: 90 },
    ],
    infoLines: [
      "[INFO] PLAYER_LEVEL: SENIOR",
      "[INFO] PROFESSIONAL_EXPERIENCE: MULTI_DOMAIN",
      "[INFO] DELIVERY_MODE: CONSISTENT",
    ],
    deployments: [
      {
        period: "CURRENT",
        id: "0X4492",
        title: "LEAD ENGINEER",
        description:
          "Building reliable product systems, aligning engineering decisions with business goals.",
        active: true,
      },
      {
        period: "PREVIOUS",
        id: "0X8123",
        title: "FULL-STACK SPECIALIST",
        description:
          "Shipped user-facing tools and backend flows with emphasis on performance and clarity.",
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
    rightSubtitle: "STACK_PREFERENCE",
    rightTitle: "TOP_LANGUAGES",
    skills: [
      { label: "TypeScript", value: 98 },
      { label: "JavaScript", value: 91 },
      { label: "Python", value: 84 },
      { label: "CSS / HTML", value: 90 },
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
        title: "TYPE-SAFE UI WORK",
        description:
          "Preferred for product surfaces, component systems, and app architecture.",
        active: true,
      },
      {
        period: "SECONDARY",
        id: "0X7702",
        title: "SCRIPTS + AUTOMATION",
        description:
          "Used for fast iteration, data shaping, and small utility workflows.",
      },
      {
        period: "SUPPORT",
        id: "0X7703",
        title: "DESIGN-LEAN CODE",
        description:
          "Useful when building interfaces that need motion, polish, and structure.",
      },
    ],
    channels: [
      { label: "TYPESCRIPT", icon: SparkleIcon },
      { label: "JAVASCRIPT", icon: HardDrivesIcon },
      { label: "PYTHON", icon: ActivityIcon },
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
        title: "HUD / PORTFOLIO EXPERIENCE",
        description:
          "A favorite because it blends motion, state, and presentation into one surface.",
        active: true,
      },
      {
        period: "FEATURED",
        id: "0XA552",
        title: "BRANDED LANDING PAGES",
        description:
          "Strong visual work that keeps the interface memorable without losing clarity.",
      },
      {
        period: "FEATURED",
        id: "0XA201",
        title: "UTILITY / TOOLING PROJECTS",
        description:
          "Small but useful builds that solve a concrete problem and sharpen the stack.",
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
      { label: "Communication", value: 95 },
      { label: "Ownership", value: 94 },
      { label: "Adaptability", value: 92 },
      { label: "Curiosity", value: 97 },
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
        title: "COMMUNICATION",
        description:
          "I like keeping updates short, direct, and useful for the team.",
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
        title: "HOBBIES",
        description:
          "Design exploration, side projects, music, and learning new systems.",
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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const current = useMemo(() => sectionData[activeSection], [activeSection]);

  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden  text-[#e2e2e2]">
      <div className="relative flex h-[calc(100%-5rem)]">
        <aside className="z-20 flex h-full w-64 flex-col border-r border-white/5 bg-[#13131366] py-8 shadow-[20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
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
                  onClick={() => setActiveSection(item.key)}
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

          <div className="mt-auto px-6">
            <button
              type="button"
              className="w-full bg-linear-to-br from-[#ffb4a8] to-[#ff5540] py-4 font-bold uppercase tracking-widest text-[#410000] transition-all hover:shadow-[0_0_20px_rgba(255,85,64,0.4)] active:scale-95"
            >
              INIT_CONTACT
            </button>
          </div>
        </aside>

        <main className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative size-140">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ff554011] blur-[120px]" />
              <div className="absolute inset-12 rounded-full border border-red-400/20" />
            </div>
          </div>

          <div className="absolute left-8 top-12 z-10 w-80 space-y-6">
            <div>
              <p className="mb-1 text-xs text-[#d7ffc5]">{current.subtitle}</p>
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

          <div className="absolute right-8 top-12 z-10 w-96">
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

          <div className="absolute bottom-8 right-8 z-10 w-96 items-end">
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
                className="flex gap-3"
              >
                {current.channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.label}
                      className={`${hudPanel} flex size-24 flex-col items-center justify-center gap-2 border border-[#d7ffc533]`}
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

          <div className="absolute bottom-8 left-8 z-10 flex items-center gap-6">
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
