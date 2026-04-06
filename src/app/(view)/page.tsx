"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import {
  BarcodeIcon,
  BehanceLogoIcon,
  CpuIcon,
  DatabaseIcon,
  EnvelopeSimpleIcon,
  HeadCircuitIcon,
  LightningIcon,
  LinkedinLogoIcon,
  NetworkIcon,
  SquaresFourIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

type MetricCardItem = {
  icon: typeof LightningIcon | typeof NetworkIcon | typeof CpuIcon;
  title: string;
  value: string;
};

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
} as const;

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
    clipPath: "inset(0 0 100% 0)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

const rowVariants = {
  hidden: { opacity: 0, x: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.1 },
  },
} as const;

const metricCardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const;

const scanlineVariants = {
  hidden: { x: "-120%", opacity: 0 },
  show: {
    x: "220%",
    opacity: [0, 0.9, 0],
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.25 },
  },
} as const;

const idleFloatTransition = {
  duration: 3.2,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
} as const;

const pulseTransition = {
  duration: 1.8,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
} as const;

type RepoItem = {
  id: number;
  name: string;
  htmlUrl: string;
  stars: number;
  updatedAt: string;
};

type ReposResponse = {
  repos: RepoItem[];
};

type OverviewResponse = {
  userDataSpeedMs: number;
  totalRepos: number;
  favoriteLanguage: string;
};

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as T;
};

function MetricCard({ icon: Icon, title, value }: MetricCardItem) {
  return (
    <motion.div
      className="relative flex lg:w-fit items-stretch gap-4 overflow-hidden border w-full border-yellow-400 p-4 shadow-lg shadow-[#CBFFB6]/10 bg-linear-to-br from-background to-zinc-900/80"
      variants={metricCardVariants}
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: "0 0 28px rgba(203,255,182,0.24)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-yellow-300/30 to-transparent"
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "220%", opacity: [0, 0.9, 0] }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2.2,
        }}
      />
      <motion.div
        className="flex w-18 shrink-0 items-center justify-center self-stretch [aspect-ratio:1/1]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={pulseTransition}
      >
        <Icon weight="fill" size={24} className="text-yellow-400" />
      </motion.div>
      <div>
        <h4 className="text-sm text-yellow-400">{title}</h4>
        <p className="text-lg text-red-200">{value}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [showContactMenu, setShowContactMenu] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!showContactMenu) return;
      if (!contactMenuRef.current) return;

      if (!contactMenuRef.current.contains(event.target as Node)) {
        setShowContactMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowContactMenu(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showContactMenu]);

  useEffect(() => {
    const scrollableParent = document.querySelector(
      'section[class*="overflow-y-auto"]',
    ) as HTMLElement;
    if (scrollableParent) {
      scrollableParent.scrollTo({ top: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const {
    data: reposData,
    error: reposError,
    isLoading: reposLoading,
  } = useSWR<ReposResponse>("/api/github/repos?username=kshSiaan", fetcher, {
    dedupingInterval: 0,
    focusThrottleInterval: 0,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  });

  const {
    data: overviewData,
    isLoading: overviewLoading,
    error: overviewError,
  } = useSWR<OverviewResponse>(
    "/api/github/overview?username=kshSiaan",
    fetcher,
    {
      dedupingInterval: 0,
      focusThrottleInterval: 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    },
  );

  const metricCards: MetricCardItem[] = [
    {
      icon: LightningIcon,
      title: "USER DATA SPEED",
      value: overviewError
        ? "OFFLINE"
        : overviewLoading || !overviewData
          ? "SYNCING..."
          : `${overviewData.userDataSpeedMs.toFixed(0)}ms`,
    },
    {
      icon: NetworkIcon,
      title: "TOTAL REPOS",
      value: overviewError
        ? "OFFLINE"
        : overviewLoading || !overviewData
          ? "SYNCING..."
          : String(overviewData.totalRepos),
    },
    {
      icon: CpuIcon,
      title: "FAVORITE LANGUAGE",
      value: overviewError
        ? "OFFLINE"
        : overviewLoading || !overviewData
          ? "SYNCING..."
          : overviewData.favoriteLanguage,
    },
  ];

  const latestTwoProjects =
    reposData?.repos
      ?.toSorted(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 2) ?? [];

  return (
    <motion.div
      className="flex-1 w-full flex justify-between items-start relative"
      variants={pageVariants}
      initial={false}
      animate="show"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute -top-20 left-[18%] h-56 w-56 rounded-full bg-red-500/10 blur-3xl"
          animate={{
            x: [0, 14, -10, 0],
            y: [0, -12, 8, 0],
            opacity: [0.2, 0.4, 0.25, 0.2],
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-[#CBFFB6]/10 blur-3xl"
          animate={{
            x: [0, -18, 10, 0],
            y: [0, -16, 6, 0],
            opacity: [0.12, 0.24, 0.16, 0.12],
          }}
          transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        className="w-14 h-full border-r border-red-600/30 shadow-[1_0_24px_rgba(220,38,38,0.45)] pr-2 flex flex-col justify-around gap-6"
        variants={sectionVariants}
      >
        <div className="">
          <Button
            className="flex-col bg-red-600/10! border-red-600/50! text-red-600"
            size={"icon"}
            variant={"outline"}
          >
            <DatabaseIcon />
          </Button>
          <span className="text-xs font-light text-red-500">DATA</span>
        </div>
        <div className="flex-col flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center animate-pulse">
            <Button
              className="flex-col text-red-400"
              size={"icon"}
              variant={"ghost"}
            >
              <HeadCircuitIcon />
            </Button>
            <span className="text-[10px] font-light text-red-400">NEURAL</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              className="flex-col text-yellow-600"
              size={"icon"}
              variant={"ghost"}
            >
              <BarcodeIcon />
            </Button>
            <span className="text-[10px] font-light text-yellow-600">LOGS</span>
          </div>
        </div>
        <Button
          className="h-28 w-8 self-center border border-red-600/40 bg-red-600/10 px-0 text-[9px] tracking-[0.18em] [writing-mode:vertical-lr] [text-orientation:mixed] text-red-500 hover:bg-red-600/20"
          variant="ghost"
        >
          INITIATE SCAN
        </Button>
      </motion.div>
      <motion.div className="flex-1 h-full" variants={sectionVariants}>
        <motion.div
          className="hidden lg:block fixed overflow-visible top-[20%] left-[12%] z-10 w-fit  border border-l-6 border-red-500 p-6 shadow-lg shadow-red-500/40 bg-linear-to-br from-background to-zinc-900/80"
          variants={panelVariants}
          whileHover={{
            scale: 1.01,
            y: -2,
            boxShadow: "0 0 34px rgba(220,38,38,0.32)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-28 bg-linear-to-r from-transparent via-red-300/25 to-transparent"
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "220%", opacity: [0, 0.9, 0] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.6,
            }}
          />
          <motion.h4
            className="text-xs font-mono! text-[#CBFFB6] tracking-[4px]"
            animate={{ opacity: [1, 0.5, 1, 0.85, 1] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2.2,
            }}
          >
            {/** biome-ignore lint/suspicious/noCommentText: <explanation> */}
            OPERATOR // STATUS: ACTIVE
          </motion.h4>
          <p className="text-xl lg:text-6xl mt-6 font-medium">V_RAVEN_09</p>
          <div className="mt-6 flex gap-3">
            <motion.div
              className="h-2 w-18 bg-red-300"
              animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.94, 1, 0.94] }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="h-2 w-8 bg-mauve-500"
              animate={{ opacity: [0.35, 0.9, 0.35], scaleX: [0.88, 1, 0.88] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            ></motion.div>
            <motion.div
              className="h-2 w-4 bg-mauve-700"
              animate={{ opacity: [0.25, 0.75, 0.25], scaleX: [0.82, 1, 0.82] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            ></motion.div>
          </div>
        </motion.div>
        <div className="relative h-full w-1/2 lg:w-full ">
          <motion.div
            className="absolute bottom-6 hidden left-6 z-20! sm:grid grid-cols-1 lg:flex items-center justify-start gap-4"
            variants={rowVariants}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
          >
            {metricCards.map((card) => (
              <MetricCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="h-full flex flex-col justify-end items-end"
        variants={sectionVariants}
      >
        <div className="h-[30%] col-span-2 hidden lg:block">
          <div className="border-r h-full border-red-600/40 flex flex-col items-end">
            {/* <div className="h-12 w-1 bg-red-600"></div> */}
            <div className="h-12 w-1 bg-red-600 mt-24"></div>
          </div>

          <span className="text-xs font-mono! text-[#CBFFB6] tracking-[6px]">
            {/** biome-ignore lint/suspicious/noCommentText: <explanation> */}
            ACTIVE PROJECTS.LOG
          </span>
        </div>
        {reposLoading ? (
          <motion.div
            className="hidden lg:block border-[#CBFFB6]/30 shadow-lg mt-12 shadow-[#CBFFB6]/10 w-fit border-2 p-6 bg-linear-to-br from-background to-zinc-900/80"
            variants={panelVariants}
          >
            <h4 className="text-xs font-mono! text-[#CBFFB6] tracking-[4px]">
              {/** biome-ignore lint/suspicious/noCommentText: <explanation> */}
              LOADING // GITHUB
            </h4>
            <p className="text-2xl mt-6 font-medium">SYNCING PROJECTS...</p>
            <Progress
              value={35}
              max={100}
              className="mt-6 w-[25dvw] [&_[data-slot=progress-indicator]]:bg-[#CBFFB6]"
            />
          </motion.div>
        ) : reposError ? (
          <motion.div
            className="hidden lg:block border-red-500/40 shadow-lg mt-12 shadow-red-500/10 w-fit border-2 p-6 bg-linear-to-br from-background to-zinc-900/80"
            variants={panelVariants}
          >
            <h4 className="text-xs font-mono! text-red-400 tracking-[4px]">
              {/** biome-ignore lint/suspicious/noCommentText: <explanation> */}
              ERROR // GITHUB
            </h4>
            <p className="text-2xl mt-6 font-medium">PROJECT FETCH FAILED</p>
            <Progress
              value={100}
              max={100}
              className="mt-6 w-[25dvw] [&_[data-slot=progress-indicator]]:bg-red-400"
            />
          </motion.div>
        ) : (
          latestTwoProjects.map((project, idx) => {
            const updatedDate = new Date(project.updatedAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              },
            );
            const maxStars = Math.max(
              latestTwoProjects[0]?.stars ?? 1,
              latestTwoProjects[1]?.stars ?? 1,
              1,
            );
            const starProgress = Math.round((project.stars / maxStars) * 100);

            return (
              <motion.a
                key={project.id}
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:block border-[#CBFFB6]/30 shadow-lg shadow-[#CBFFB6]/10 w-fit border-2 p-6 bg-linear-to-br from-background to-zinc-900/80 ${idx === 0 ? "mt-12" : "mt-6"}`}
                variants={panelVariants}
                whileHover={{
                  x: -4,
                  boxShadow: "0 0 24px rgba(203,255,182,0.2)",
                }}
              >
                <h4 className="text-xs font-mono! text-white/45 tracking-[4px]">
                  {/** biome-ignore lint/suspicious/noCommentText: <explanation> */}
                  {String(idx + 1).padStart(2, "0")} // GITHUB_REPO
                </h4>
                <p className="text-2xl mt-6 font-medium uppercase tracking-tight">
                  {project.name}
                </p>
                <p className="mt-2 text-xs font-mono! tracking-[0.18em] text-[#CBFFB6]">
                  UPDATED {updatedDate}
                </p>
                <Progress
                  value={starProgress}
                  max={100}
                  className="mt-6 w-[25dvw] [&_[data-slot=progress-indicator]]:bg-[#CBFFB6]"
                />
              </motion.a>
            );
          })
        )}
        <motion.div
          variants={sectionVariants}
          // whileHover={{ y: -5, rotate: 4 }}
          transition={{
            y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
          animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
          whileTap={{ scale: 0.96 }}
          className="relative"
          ref={contactMenuRef}
        >
          <Button
            className="size-16 bg-linear-to-br from-red-300 to-red-500 shadow-lg shadow-red-400/40 mt-6 text-xl"
            onClick={() => setShowContactMenu((prev) => !prev)}
            aria-expanded={showContactMenu}
            aria-haspopup="menu"
          >
            <SquaresFourIcon weight="fill" size={36} className="size-8" />
          </Button>

          <AnimatePresence>
            {showContactMenu ? (
              <motion.div
                key="contact-menu"
                role="menu"
                initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-22 right-0 z-50! w-72 border border-red-400/35 bg-zinc-950/90 p-3 shadow-2xl shadow-red-500/25 backdrop-blur-md"
              >
                <p className="mb-3 text-[10px] font-mono! tracking-[0.2em] text-[#CBFFB6]">
                  CONTACT GRID
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    role="menuitem"
                    href="https://www.linkedin.com/in/shahibul-hasan-777395302"
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
                    href="https://www.behance.net/kshsiaan"
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
                    href="mailto:kshsiaan@gmail.com"
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
                    href="https://wa.me/01904387966"
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
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
