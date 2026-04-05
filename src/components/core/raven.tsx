import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "motion/react";
import * as THREE from "three";

type RavenProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export default function Raven({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: RavenProps) {
  const gltf = useGLTF("/model/scene.gltf");
  const groupRef = useRef<THREE.Group>(null);

  const positionX = useSpring(useMotionValue(position[0]), {
    stiffness: 80,
    damping: 20,
    mass: 1.1,
  });
  const positionY = useSpring(useMotionValue(position[1]), {
    stiffness: 80,
    damping: 20,
    mass: 1.1,
  });
  const positionZ = useSpring(useMotionValue(position[2]), {
    stiffness: 80,
    damping: 20,
    mass: 1.1,
  });
  const rotationX = useSpring(useMotionValue(rotation[0]), {
    stiffness: 70,
    damping: 18,
    mass: 1.1,
  });
  const rotationY = useSpring(useMotionValue(rotation[1]), {
    stiffness: 70,
    damping: 18,
    mass: 1.1,
  });
  const rotationZ = useSpring(useMotionValue(rotation[2]), {
    stiffness: 70,
    damping: 18,
    mass: 1.1,
  });

  useEffect(() => {
    positionX.set(position[0]);
    positionY.set(position[1]);
    positionZ.set(position[2]);
    rotationX.set(rotation[0]);
    rotationY.set(rotation[1]);
    rotationZ.set(rotation[2]);
  }, [
    position,
    rotation,
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
  ]);

  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.2;
    const scale = targetSize / maxAxis;

    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        material.transparent = false;
        material.opacity = 1;
        material.depthWrite = true;
        material.alphaTest = 0;
        material.side = THREE.FrontSide;

        if ("transmission" in material) {
          material.transmission = 0;
        }

        material.needsUpdate = true;
      });
    });

    return scene;
  }, [gltf.scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.set(
      positionX.get(),
      positionY.get(),
      positionZ.get(),
    );
    groupRef.current.rotation.set(
      rotationX.get(),
      rotationY.get(),
      rotationZ.get(),
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/model/scene.gltf");
