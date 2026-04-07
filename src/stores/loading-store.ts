import { create } from "zustand";

type LoadingState = {
  isModelLoaded: boolean;
  isContentLoaded: boolean;
  setModelLoaded: (loaded: boolean) => void;
  setContentLoaded: (loaded: boolean) => void;
  isFullyLoaded: () => boolean;
  getProgress: () => number;
  getStatus: () => "INITIALIZING" | "ALMOST THERE" | "COMPLETE";
};

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isModelLoaded: false,
  isContentLoaded: false,
  setModelLoaded: (loaded: boolean) => set({ isModelLoaded: loaded }),
  setContentLoaded: (loaded: boolean) => set({ isContentLoaded: loaded }),
  isFullyLoaded: () => {
    const state = get();
    return state.isModelLoaded && state.isContentLoaded;
  },
  getProgress: () => {
    const state = get();
    let progress = 0;
    if (state.isModelLoaded) progress += 50;
    if (state.isContentLoaded) progress += 50;
    return progress;
  },
  getStatus: () => {
    const state = get();
    const { isModelLoaded, isContentLoaded } = state;
    
    if (isModelLoaded && isContentLoaded) {
      return "COMPLETE";
    }
    if (isModelLoaded || isContentLoaded) {
      return "ALMOST THERE";
    }
    return "INITIALIZING";
  },
}));
