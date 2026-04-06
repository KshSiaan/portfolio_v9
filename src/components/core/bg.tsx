"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Raven from "./raven";
import { useRavenVariantStore } from "@/stores/raven-variant-store";

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const perspCamera = camera as any;

      if (width < 768) {
        perspCamera.position.set(0, 0.5, 6.5);
        perspCamera.fov = 55;
      } else if (width < 1024) {
        perspCamera.position.set(0, 0, 5.5);
        perspCamera.fov = 48;
      } else {
        perspCamera.position.set(0, 0, 5);
        perspCamera.fov = 45;
      }
      perspCamera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return null;
}

export default function BG() {
  const pathname = usePathname();
  const setVariantFromPath = useRavenVariantStore(
    (state) => state.setVariantFromPath,
  );
  const activeScene = useRavenVariantStore((state) => state.activeScene);

  useEffect(() => {
    setVariantFromPath(pathname);
  }, [pathname, setVariantFromPath]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        {/* <color attach="background" args={["#210200"]} /> */}
        <ambientLight color="#ffffff" intensity={0.35} />
        <hemisphereLight args={["#ffffff", "#111111", 0.8]} />
        <directionalLight color="#ffffff" intensity={3} position={[4, 5, 5]} />
        <spotLight
          color="#ffffff"
          intensity={1}
          position={[0, 2.5, 6]}
          angle={0.55}
          penumbra={0.45}
        />
        <directionalLight
          color="#ffffff"
          intensity={1.2}
          position={[-4, 1.5, 3]}
        />
        <Environment preset="forest" />
        <ResponsiveCamera />
        <Raven
          position={activeScene.position}
          rotation={activeScene.rotation}
        />
      </Canvas>
    </div>
  );
}
