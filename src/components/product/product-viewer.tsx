"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ProductViewer() {
  const modelUrl = "https://market-assets.pmnd.rs/models/chair/chair.glb";

  return (
    <div className="w-full h-[500px] rounded-lg bg-neutral-200 dark:bg-neutral-800">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <React.Suspense fallback={null}>
          <Model url={modelUrl} />
          <Environment preset="city" />
        </React.Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
