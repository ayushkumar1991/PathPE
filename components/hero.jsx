"use client";

import React, { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ------------------ Metallic Gradient Torus Knot ------------------ */
function GlowingTorusKnot() {
  const meshRef = useRef();
  const gradientTexture = useRef();

  if (!gradientTexture.current) {
    const size = 128;
    const data = new Uint8Array(size * 3);
    const color1 = new THREE.Color("#ff6ec4");
    const color2 = new THREE.Color("#7873f5");

    for (let i = 0; i < size; i++) {
      const t = i / (size - 1);
      const color = color1.clone().lerp(color2, t);
      data[i * 3] = Math.floor(color.r * 255);
      data[i * 3 + 1] = Math.floor(color.g * 255);
      data[i * 3 + 2] = Math.floor(color.b * 255);
    }

    const texture = new THREE.DataTexture(data, size, 1, THREE.RGBFormat);
    texture.needsUpdate = true;
    gradientTexture.current = texture;
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.4;
    const scale = 2 + Math.sin(t * 2) * 0.12;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 400, 80]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.15}
        envMapIntensity={2}
        map={gradientTexture.current}
        emissive="#ffffff"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ------------------ Space Particles (More dots + glow) ------------------ */
function SpaceParticles({ count = 350 }) { // increased from 150 to 350
  const groupRef = useRef();
  
  // random positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25; // spread wider
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  const vectors = useMemo(() => {
    const v = [];
    for (let i = 0; i < count; i++) {
      v.push(
        new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        )
      );
    }
    return v;
  }, [positions, count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.025;
    groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.025;
  });

  return (
    <group ref={groupRef}>
      {/* Crisp glowing points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffff"
          size={0.05} // smaller so they're sharper
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>

      {/* Connecting lines */}
      {vectors.map((a, i) =>
        vectors.map((b, j) => {
          if (i < j && a.distanceTo(b) < 3.5) { // more distance for extra lines
            const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
            return (
              <line key={`${i}-${j}`} geometry={geometry}>
                <lineBasicMaterial
                  color="#00ffff"
                  opacity={0.15}
                  transparent
                />
              </line>
            );
          }
          return null;
        })
      )}
    </group>
  );
}

/* ------------------ Hero Section ------------------ */
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-indigo-900/30 via-black to-black" />
      <div className="absolute inset-0 -z-20 opacity-[0.08] bg-[url('/grid.svg')]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 md:pt-36 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <Suspense fallback={null}>
                <GlowingTorusKnot />
              </Suspense>
              <Environment preset="city" />
            </Canvas>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-pink-300">
            Your AI Career Coach for <br /> Professional Success
          </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
          AI-powered career guidance with live industry insights, mock interviews,
          and ATS-optimized resumes — your career growth accelerator.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:scale-105 transition">
              Get Started
            </Button>
          </Link>
          <Link href="/industry-insights">
            <Button variant="outline" size="lg" className="hover:scale-105 transition">
              Explore Insights
            </Button>
          </Link>
        </div>
      </div>

      {/* Main 3D Space Scene */}
      <div className="relative mt-10 h-[500px]">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade />
            <Environment preset="city" />
            <SpaceParticles count={350} /> {/* More particles */}
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>
    </section>
  );
}
