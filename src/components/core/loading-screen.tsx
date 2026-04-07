"use client";

import { useLoadingStore } from "@/stores/loading-store";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const isFullyLoaded = useLoadingStore((state) => state.isFullyLoaded());
  const isModelLoaded = useLoadingStore((state) => state.isModelLoaded);
  const isContentLoaded = useLoadingStore((state) => state.isContentLoaded);
  const progress = useLoadingStore((state) => state.getProgress());
  const status = useLoadingStore((state) => state.getStatus());

  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (diff === 0) return prev;
        return prev + diff * 0.15;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  const statusMessages = {
    INITIALIZING: "INITIALIZING NEURAL CORE...",
    "ALMOST THERE": "NEURAL SYNC IN PROGRESS...",
    COMPLETE: "AWAKENING COMPLETE",
  };

  return (
    <AnimatePresence>
      {!isFullyLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Main container */}
          <motion.div
            className="flex flex-col items-center gap-12 relative z-10"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Logo with pulse */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                textShadow: [
                  "0 0 10px rgba(250, 204, 21, 0.5)",
                  "0 0 20px rgba(250, 204, 21, 0.8)",
                  "0 0 10px rgba(250, 204, 21, 0.5)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <h1 className="text-6xl font-bold text-yellow-400 tracking-[8px] drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">
                RAVEN
              </h1>
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400/60"
                animate={{ width: [0, 120, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Status Display */}
            <div className="flex flex-col items-center gap-6">
              {/* Status text */}
              <motion.div
                key={status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="text-sm tracking-[3px] font-mono text-yellow-300"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {statusMessages[status]}
                </motion.p>
              </motion.div>

              {/* Module indicators */}
              <div className="flex gap-6 items-center">
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{
                    opacity: isModelLoaded ? 1 : 0.3,
                  }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      isModelLoaded ? "bg-yellow-400" : "bg-yellow-400/30"
                    }`}
                    animate={
                      isModelLoaded
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(250, 204, 21, 0.5)",
                              "0 0 12px rgba(250, 204, 21, 0.8)",
                              "0 0 0px rgba(250, 204, 21, 0.5)",
                            ],
                          }
                        : { boxShadow: "0 0 0px rgba(250, 204, 21, 0)" }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] tracking-widest text-yellow-400/70">
                    MODEL
                  </span>
                </motion.div>

                <motion.div
                  className="w-8 h-px bg-yellow-400/20"
                  animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{
                    opacity: isContentLoaded ? 1 : 0.3,
                  }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      isContentLoaded ? "bg-yellow-400" : "bg-yellow-400/30"
                    }`}
                    animate={
                      isContentLoaded
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(250, 204, 21, 0.5)",
                              "0 0 12px rgba(250, 204, 21, 0.8)",
                              "0 0 0px rgba(250, 204, 21, 0.5)",
                            ],
                          }
                        : { boxShadow: "0 0 0px rgba(250, 204, 21, 0)" }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[10px] tracking-widest text-yellow-400/70">
                    CONTENT
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Progress bar container with neon border */}
            <motion.div
              className="relative w-72 h-12 border border-yellow-400/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(250, 204, 21, 0.2)",
                  "0 0 20px rgba(250, 204, 21, 0.4)",
                  "0 0 10px rgba(250, 204, 21, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400/60 via-yellow-300/80 to-yellow-400/60 flex items-center justify-center"
                style={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent "
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Outer neon glow */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                animate={{
                  boxShadow: `inset 0 0 20px rgba(250, 204, 21, ${
                    0.2 + (displayProgress / 100) * 0.4
                  })`,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Progress percentage and status */}
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-xl font-mono font-bold text-yellow-400">
                {Math.round(displayProgress)}%
              </div>
              <motion.div
                className="text-xs text-yellow-400/60 tracking-[2px]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {status === "INITIALIZING"
                  ? "AWAKENING..."
                  : status === "ALMOST THERE"
                    ? "ALMOST THERE..."
                    : "READY"}
              </motion.div>
            </motion.div>

            {/* Decorative grid lines */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, transparent 24%, rgba(250, 204, 21, 0.1) 25%, rgba(250, 204, 21, 0.1) 26%, transparent 27%, transparent 74%, rgba(250, 204, 21, 0.1) 75%, rgba(250, 204, 21, 0.1) 76%, transparent 77%, transparent),
                  linear-gradient(90deg, transparent 24%, rgba(250, 204, 21, 0.1) 25%, rgba(250, 204, 21, 0.1) 26%, transparent 27%, transparent 74%, rgba(250, 204, 21, 0.1) 75%, rgba(250, 204, 21, 0.1) 76%, transparent 77%, transparent)
                `,
                backgroundSize: "50px 50px",
              }}
              animate={{ y: [0, 50], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
