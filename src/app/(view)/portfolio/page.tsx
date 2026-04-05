"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";
import useSWR from "swr";
import {
  DotsNineIcon,
  FunnelSimpleIcon,
  PersonIcon,
  TerminalIcon,
  WifiHighIcon,
} from "@phosphor-icons/react/dist/ssr";

type RepoItem = {
  id: number;
  name: string;
  htmlUrl: string;
  private: boolean;
  stars: number;
  updatedAt: string;
};

type ReposResponse = {
  repos: RepoItem[];
};

const fetcher = async (url: string): Promise<ReposResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to fetch GitHub repos");
  }

  return (await response.json()) as ReposResponse;
};

const hudPanel =
  "relative border border-[#ff8bc14d] bg-[#110d14cc] backdrop-blur-[16px] shadow-[0_0_28px_rgba(255,102,163,0.12),inset_0_0_22px_rgba(47,248,1,0.06)]";

const nodeCard = "relative flex flex-col border-l-2 p-4";

type LiveSystemInfo = {
  browser: string;
  platform: string;
  language: string;
  resolution: string;
  timezone: string;
  memoryLabel: string;
};

const formatHudTime = (date: Date): string => {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
};

const parseBrowser = (ua: string): string => {
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  return "Unknown";
};

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [systemInfo, setSystemInfo] = useState<LiveSystemInfo | null>(null);
  const [hudNow, setHudNow] = useState(() => new Date());

  const [playClick] = useSound("/audio/click.mp3", {
    volume: 0.2,
    interrupt: true,
  });
  const [playDrop] = useSound("/audio/drop.mp3", {
    volume: 0.34,
    interrupt: true,
  });

  const hudTime = formatHudTime(hudNow);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHudNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const hasPlayedDrop = window.sessionStorage.getItem("raven-drop-played");

    if (!hasPlayedDrop) {
      playDrop();
      window.sessionStorage.setItem("raven-drop-played", "1");
    }
  }, [playDrop]);

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

  const sortedRepos =
    reposData?.repos?.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ) || [];
  const activeModule = sortedRepos[activeIndex];
  const orderedModules =
    sortedRepos.length > 0
      ? [activeModule, ...sortedRepos.filter((_, idx) => idx !== activeIndex)]
      : [];

  useEffect(() => {
    const browser = parseBrowser(navigator.userAgent);
    const platform = navigator.platform || "Unknown";
    const language = navigator.language || "Unknown";
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";

    const navWithMemory = navigator as Navigator & { deviceMemory?: number };
    const perfWithMemory = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };

    const deviceMemory =
      typeof navWithMemory.deviceMemory === "number"
        ? `${navWithMemory.deviceMemory} GB (approx device RAM)`
        : "N/A";

    const jsHeap = perfWithMemory.memory
      ? `${Math.round(perfWithMemory.memory.usedJSHeapSize / 1024 / 1024)} MB / ${Math.round(
          perfWithMemory.memory.jsHeapSizeLimit / 1024 / 1024,
        )} MB (JS heap)`
      : "N/A";

    const memoryLabel = `RAM ${deviceMemory} | Heap ${jsHeap}`;

    setSystemInfo({
      browser,
      platform,
      language,
      resolution,
      timezone,
      memoryLabel,
    });
  }, []);

  const handleNext = () => {
    playClick();
    const repoCount = sortedRepos.length || 1;
    setActiveIndex((prev) => (prev + 1) % repoCount);
  };

  const handlePrev = () => {
    playClick();
    const repoCount = sortedRepos.length || 1;
    setActiveIndex((prev) => (prev - 1 + repoCount) % repoCount);
  };

  return (
    <div className="relative z-20 flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,80,150,0.12),transparent_32%),radial-gradient(circle_at_80%_78%,rgba(47,248,1,0.10),transparent_34%)] p-6 text-[#e2e2e2] select-none">
      <header className="mb-8 flex w-full items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="h-6 w-2 bg-[#ff7ab7] shadow-[0_0_18px_rgba(255,122,183,0.7)]" />
            <h1 className="text-3xl font-bold uppercase tracking-tight text-[#e2e2e2]">
              Raven / Node_Explorer
            </h1>
          </div>
          <div className="flex items-center gap-2 pl-5">
            <TerminalIcon className="size-3.5 text-[#d7ffc5]" weight="fill" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#b9ff8f] drop-shadow-[0_0_6px_rgba(185,255,143,0.55)]">
              Status: System_Optimal | Registry: Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#ebbbb4]">
              System Time
            </span>
            <span className="text-xl font-light text-[#ff8bc1] tabular-nums tracking-[0.08em] drop-shadow-[0_0_10px_rgba(255,139,193,0.55)]">
              {hudTime}
            </span>
          </div>
          <div className="h-10 w-px bg-[#603e39] opacity-30" />
          <button
            type="button"
            className={`${hudPanel} flex size-12 items-center justify-center border-[#ff8bc166] transition-all hover:bg-[#ff8bc126] hover:shadow-[0_0_22px_rgba(255,122,183,0.4)]`}
          >
            <DotsNineIcon className="size-5 text-[#ff8bc1]" weight="fill" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-6">
        <div className="flex w-80 shrink-0 flex-col gap-6">
          <div className={`${hudPanel} flex flex-col gap-4 p-5`}>
            <div className="flex items-center justify-between border-b border-[#603e3933] pb-2">
              <span className="text-xs uppercase text-[#d7ffc5]">
                Neural Load
              </span>
              <span className="text-xs text-[#d7ffc5] animate-pulse">
                88.4%
              </span>
            </div>
            <div className="relative h-1 w-full overflow-hidden bg-[#353535] shadow-[0_0_10px_rgba(255,102,163,0.2)]">
              <div
                className="absolute inset-y-0 left-0 w-[88%] bg-[#5bff2b] shadow-[0_0_14px_rgba(91,255,43,0.75)]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
                }}
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-tight text-[#ebbbb4]">
                  Latency
                </span>
                <span className="text-sm">4.2ms</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-tight text-[#ebbbb4]">
                  Uptime
                </span>
                <span className="text-sm">342:01</span>
              </div>
            </div>
          </div>

          <div
            className={`${hudPanel} flex min-h-0 flex-1 flex-col overflow-hidden bg-black/40 p-4 text-[10px] text-[#ffb4a899]`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#ffb4a8]">
                Live_Feed
              </span>
              <div className="size-2 rounded-full bg-[#ffb4a8] animate-pulse" />
            </div>
            <div className="flex flex-col gap-1 opacity-90">
              <p>&gt; Initializing project scan...</p>
              <p>&gt; Fetching archive/web_core</p>
              <p className="text-[#d7ffc5]">
                &gt; Project: NEURAL_FLOW loaded [OK]
              </p>
              <p>&gt; Scanning GHOST_PROTOCOL segments</p>
              {reposLoading ? <p>&gt; Syncing GitHub repositories...</p> : null}
              {reposError ? (
                <p className="text-[#ffb4ab]">&gt; GitHub sync failed</p>
              ) : null}
              {reposData ? (
                <>
                  <p className="text-[#d7ffc5]">
                    &gt; Repositories loaded: {reposData.repos.length}
                  </p>
                  <p>
                    &gt; Latest repo:{" "}
                    {reposData.repos[0]?.name ?? "No repositories"}
                  </p>
                </>
              ) : null}
              {systemInfo ? (
                <>
                  <p>&gt; Browser: {systemInfo.browser}</p>
                  <p>&gt; Platform: {systemInfo.platform}</p>
                  <p>&gt; Language: {systemInfo.language}</p>
                  <p>&gt; Resolution: {systemInfo.resolution}</p>
                  <p>&gt; TZ: {systemInfo.timezone}</p>
                </>
              ) : (
                <p>&gt; Collecting local system telemetry...</p>
              )}
              <p className="text-[#ffb4ab]">
                &gt; Warning: Encryption leak in VOID_SHELL
              </p>
              <p>&gt; Resolving dependencies...</p>
              <p>&gt; System ready for interaction</p>
              <p>&gt; _</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="absolute left-10 top-10 size-32 border-l border-t border-[#ffb4a866]" />
          <div className="absolute bottom-10 right-10 size-32 border-b border-r border-[#ffb4a866]" />
        </div>

        <div className="flex w-112.5 shrink-0 flex-col gap-4 pr-1">
          <div className="mb-2 flex items-center justify-between px-2">
            <h3 className="text-sm uppercase tracking-widest text-[#e2e2e2]">
              Data Modules [{sortedRepos.length}]
            </h3>
            <FunnelSimpleIcon className="size-4 cursor-pointer text-[#ebbbb4] transition-colors hover:text-[#ffb4a8]" />
          </div>

          <div className="px-2 text-[10px] uppercase tracking-[0.24em] text-[#ebbbb4]">
            {activeModule
              ? `Selected: ${activeModule.name} (${activeIndex + 1}/${sortedRepos.length})`
              : "Loading repositories..."}
          </div>

          <div className="relative flex flex-col gap-3 mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
            {orderedModules.length > 0 ? (
              orderedModules.map((repo, index) => {
                const isActive = index === 0;
                const depthFade = Math.max(0.22, 0.68 - index * 0.18);
                const updatedDate = new Date(repo.updatedAt);
                const dateStr = updatedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={repo.id}
                    className={`${hudPanel} ${nodeCard} transition-all ${
                      isActive ? "opacity-100 saturate-100" : "saturate-0"
                    }`}
                    style={{
                      borderLeftColor: isActive ? "#ffb4a8" : "#603e39",
                      boxShadow: isActive
                        ? "0 0 22px rgba(255, 180, 168, 0.2)"
                        : "0 0 0 transparent",
                      opacity: isActive ? 1 : depthFade,
                    }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-tight text-[#d7ffc5]">
                          REPO_{index + 1}
                        </span>
                        <h4 className="text-lg uppercase tracking-tight text-[#e2e2e2]">
                          {repo.name}
                        </h4>
                      </div>
                      <div className="border border-[#ffb4a833] bg-[#ffb4a81a] px-2 py-1">
                        <span className="text-[9px] uppercase text-[#ffb4a8]">
                          {repo.stars} ★
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 text-xs leading-relaxed text-[#ebbbb4]">
                      Updated {dateStr}
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-widest text-[#d7ffc5] hover:text-[#ffb4a8] hover:shadow-[0_0_12px_rgba(255,180,168,0.6)] hover:drop-shadow-[0_0_8px_rgba(255,180,168,0.5)] transition-all duration-200 cursor-pointer"
                      >
                        View on GitHub →
                      </a>
                      <span className="text-[9px] text-white/40">
                        {repo.private ? "PRIVATE" : "PUBLIC"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : reposLoading ? (
              <div className="px-4 py-3 text-[10px] text-[#ebbbb4]">
                Loading repositories...
              </div>
            ) : reposError ? (
              <div className="px-4 py-3 text-[10px] text-[#ffb4ab]">
                Failed to load repositories
              </div>
            ) : (
              <div className="px-4 py-3 text-[10px] text-[#ebbbb4]">
                No repositories found
              </div>
            )}
          </div>
        </div>
      </div>

      <footer
        className={`${hudPanel} mt-8 grid grid-cols-[1fr_auto_1fr] items-center border-t-2 border-[#ffb4a866] px-4 py-3`}
      >
        <div className="flex items-center gap-8 justify-self-start">
          <div className="flex items-center gap-3">
            <div className="flex h-1 gap-0.5">
              <div className="w-1 bg-[#ffb4a8]" />
              <div className="w-1 bg-[#ffb4a8]" />
              <div className="w-1 bg-[#ffb4a84d]" />
              <div className="w-1 bg-[#ffb4a84d]" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#e2e2e2]">
              Memory: {systemInfo?.memoryLabel ?? "Collecting..."}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <WifiHighIcon className="size-4 text-[#d7ffc5]" weight="fill" />
            <span className="text-[10px] uppercase tracking-widest text-[#e2e2e2]">
              Net_Secure: 100%
            </span>
          </div>
        </div>

        <nav className="flex gap-4 justify-self-center">
          <button
            type="button"
            onClick={handlePrev}
            className="border border-[#ffb4a833] bg-[#ffb4a80d] px-6 py-2 text-[10px] uppercase tracking-widest transition-all hover:bg-[#ffb4a8] hover:text-[#410000]"
          >
            Prev_Node
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="border border-[#ff7ab7] bg-[#ff8bc1] px-6 py-2 text-[10px] uppercase tracking-widest text-[#2d0017] shadow-[0_0_18px_rgba(255,122,183,0.5)] transition-all hover:bg-[#ff7ab7] hover:shadow-[0_0_26px_rgba(255,122,183,0.7)]"
          >
            Next_Node
          </button>
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <div className="text-right">
            <span className="block text-[8px] uppercase text-[#ebbbb4]">
              Auth_User
            </span>
            <span className="block text-xs uppercase text-[#ffb4a8]">
              Oper_001_Raven
            </span>
          </div>
          <div
            className={`${hudPanel} flex size-8 items-center justify-center border-[#ffb4a84d]`}
          >
            <PersonIcon className="size-4 text-[#ffb4a8]" weight="fill" />
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed left-0 top-0 z-50 size-24 border-l border-t border-[#ffb4a833]" />
      <div className="pointer-events-none fixed right-0 top-0 z-50 size-24 border-r border-t border-[#ffb4a833]" />
      <div className="pointer-events-none fixed bottom-0 left-0 z-50 size-24 border-b border-l border-[#ffb4a833]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-50 size-24 border-b border-r border-[#ffb4a833]" />
    </div>
  );
}
