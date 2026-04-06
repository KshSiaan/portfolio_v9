import { create } from "zustand";

export type RavenVariantName = "landing" | "portfolio" | "scan";

export type PageMotionVariant = {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit: Record<string, unknown>;
};

export type RavenVariant = {
  name: RavenVariantName;
  route: string;
  position: [number, number, number];
  rotation: [number, number, number];
  pageMotion: PageMotionVariant;
};

export const ravenVariants = [
  {
    name: "landing",
    route: "/",
    position: [0, -0.1, 2.5],
    rotation: [0.4, Math.PI * 1.3, 0],
    pageMotion: {
      initial: { opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        y: -14,
        scale: 0.985,
        filter: "blur(10px)",
        transition: { duration: 0.28, ease: "easeIn" },
      },
    },
  },
  {
    name: "portfolio",
    route: "/portfolio",
    position: [-0.2, -0.02, 2.3],
    rotation: [0.2, Math.PI * 0.3, 0.08],
    pageMotion: {
      initial: { opacity: 0, x: 24, scale: 0.985, filter: "blur(10px)" },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.52, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        x: -24,
        scale: 0.985,
        filter: "blur(10px)",
        transition: { duration: 0.28, ease: "easeIn" },
      },
    },
  },
  {
    name: "scan",
    route: "/scan",
    position: [-0.3, -0.4, 2.35],
    rotation: [0.3, Math.PI * -0.5, 0],
    pageMotion: {
      initial: { opacity: 0, x: -20, scale: 0.985, filter: "blur(10px)" },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.52, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        x: 20,
        scale: 0.985,
        filter: "blur(10px)",
        transition: { duration: 0.28, ease: "easeIn" },
      },
    },
  },
] as const satisfies readonly RavenVariant[];

type RavenVariantState = {
  activeVariant: RavenVariantName;
  variants: readonly RavenVariant[];
  activeScene: RavenVariant;
  setVariant: (variant: RavenVariantName) => void;
  setVariantFromPath: (pathname: string) => void;
};

const resolveVariantFromPath = (pathname: string): RavenVariantName => {
  if (pathname === "/") {
    return "landing";
  }

  if (pathname.startsWith("/portfolio")) {
    return "portfolio";
  }

  return "scan";
};

const resolveSceneFromPath = (pathname: string): RavenVariant => {
  const activeName = resolveVariantFromPath(pathname);

  return ravenVariants.find((variant) => variant.name === activeName) ?? ravenVariants[0];
};

export const getRavenSceneFromPath = (pathname: string): RavenVariant =>
  resolveSceneFromPath(pathname);

export const useRavenVariantStore = create<RavenVariantState>((set) => ({
  activeVariant: "landing",
  variants: ravenVariants,
  activeScene: ravenVariants[0],
  setVariant: (variant) =>
    set({
      activeVariant: variant,
      activeScene:
        ravenVariants.find((item) => item.name === variant) ?? ravenVariants[0],
    }),
  setVariantFromPath: (pathname) =>
    set({
      activeVariant: resolveVariantFromPath(pathname),
      activeScene: resolveSceneFromPath(pathname),
    }),
}));