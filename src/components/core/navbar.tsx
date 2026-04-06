"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { FaGithub } from "react-icons/fa6";
import useSound from "use-sound";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

type SoundCloudWidget = {
  bind: (event: string, listener: () => void) => void;
  play: () => void;
  pause: () => void;
};

declare global {
  interface Window {
    SC?: {
      Widget: ((iframe: HTMLIFrameElement) => SoundCloudWidget) & {
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
        };
      };
    };
  }
}

const trackUrl =
  "https://soundcloud.com/monstercat/elypsis-brandon-mignacca-searchlight";

const loadSoundCloudApi = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  if (window.SC?.Widget) return;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://w.soundcloud.com/player/api.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load SoundCloud API script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load SoundCloud API script"));
    document.head.appendChild(script);
  });
};

export default function Navbar() {
  const [play] = useSound("audio/click.mp3", { volume: 0.5 });
  const [embedSrc, setEmbedSrc] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState("SoundCloud Track");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [wantsPlayAfterInit, setWantsPlayAfterInit] = useState(false);
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const path = usePathname();
  const navs = [
    { name: "HOME", href: "/" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "BRAIN GEAR", href: "/brain-gear" },
  ];

  useEffect(() => {
    if (!embedSrc || !iframeRef.current) return;

    const initWidget = async () => {
      await loadSoundCloudApi();
      const iframe = iframeRef.current;

      if (!iframe || !window.SC?.Widget) return;

      const widget = window.SC.Widget(iframe);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        setIsPlayerReady(true);
        setIsTrackLoading(false);
        setTrackError("");

        if (wantsPlayAfterInit) {
          widget.play();
          setWantsPlayAfterInit(false);
        }
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });

      widget.bind(window.SC.Widget.Events.FINISH, () => {
        setIsPlaying(false);
      });
    };

    initWidget();
  }, [embedSrc, wantsPlayAfterInit]);

  const toggleSoundCloud = async () => {
    play();
    setTrackError("");

    if (!embedSrc) {
      setIsTrackLoading(true);
      try {
        const response = await fetch(
          `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch track");
        }
        const data = (await response.json()) as { html?: string };
        const src = data.html?.match(/src="([^"]+)"/)?.[1] ?? "";

        if (!src) {
          throw new Error("Invalid player response");
        }

        setTrackTitle((data as { title?: string }).title ?? "SoundCloud Track");
        setWantsPlayAfterInit(true);
        setEmbedSrc(src);
      } catch {
        setIsTrackLoading(false);
        setTrackError("Track failed to load");
      }
      return;
    }

    if (!isPlayerReady || !widgetRef.current) {
      setWantsPlayAfterInit(true);
      setIsTrackLoading(true);
      return;
    }

    if (isPlaying) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.play();
    }
  };

  return (
    <nav
      className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="text-sm font-bold text-red-500 drop-shadow-[0_0_3px_rgba(255,110,110,0.95)] filter-[drop-shadow(0_0_8px_rgba(239,68,68,0.7))_drop-shadow(0_0_14px_rgba(220,38,38,0.45))] sm:text-base md:text-lg">
        RAVEN
      </div>
      <div className="flex w-full items-center overflow-hidden justify-center gap-2 overflow-x-auto pb-1 md:w-auto md:flex-wrap md:justify-start md:pb-0">
        {navs.map((nav) => (
          <Button
            key={nav.name}
            className={cn(
              "border-0 px-2 py-1 text-[11px] sm:px-3 sm:py-2 md:px-4",
              path === nav.href && "border-b-3! border-red-600 text-red-600",
            )}
            variant="ghost"
            size="lg"
            onClick={() => {
              play();
            }}
            asChild
          >
            <Link href={nav.href}>{nav.name}</Link>
          </Button>
        ))}
      </div>
      <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-end">
        <div className="min-w-0 flex-1 overflow-hidden text-[10px] uppercase tracking-widest text-[#ffb4a8] md:min-w-28 md:max-w-44 md:flex-none">
          {isTrackLoading ? (
            <span className="inline-flex items-center gap-2 text-[#d7ffc5]">
              <span className="size-2 animate-pulse rounded-full bg-[#d7ffc5]" />
              Loading track...
            </span>
          ) : trackError ? (
            <span className="text-[#ff9a9a]">{trackError}</span>
          ) : isPlaying ? (
            <div className="overflow-hidden whitespace-nowrap text-[#d7ffc5]">
              <div className="inline-flex min-w-full gap-8 pr-8 animate-[track-marquee_12s_linear_infinite]">
                <span>Playing:</span>
                <span>{trackTitle}</span>
                <span>Playing:</span>
                <span>{trackTitle}</span>
              </div>
            </div>
          ) : (
            <span className="text-[#ffb4a8b3]">Ready</span>
          )}
        </div>
        <Button
          size={"icon-lg"}
          variant={"ghost"}
          onClick={() => play()}
          className="shrink-0"
        >
          <FaGithub />
        </Button>
        <Button
          size={"icon-lg"}
          variant={"ghost"}
          onClick={toggleSoundCloud}
          disabled={isTrackLoading}
          className="shrink-0"
          aria-label={
            isTrackLoading
              ? "Loading track"
              : isPlaying
                ? "Pause track"
                : "Play track"
          }
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>

      {embedSrc ? (
        <iframe
          ref={iframeRef}
          title="SoundCloud player"
          src={embedSrc}
          className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
          allow="autoplay"
        />
      ) : null}

      <style jsx>{`
        @keyframes track-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </nav>
  );
}
