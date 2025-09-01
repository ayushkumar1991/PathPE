"use client";

import React, { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

// Stand-in components for Button and Link to resolve import errors.
const Button = ({ children, variant, size, className, ...props }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const sizeStyle = size === 'lg' ? "h-11 px-8" : "h-10 px-4 py-2";
    const variantStyle = variant === 'outline'
        ? "border border-white/20 bg-transparent hover:bg-white/10 text-white"
        : "text-white";
    return (
        <button className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Link = ({ href, children }) => <a href={href}>{children}</a>;

/* ------------------ Starfield attracted by the AI Core ------------------ */
function Starfield({ count = 10000 }) {
  const pointsRef = useRef();

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = Math.random() * 150 + 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);

        const t = new THREE.Vector3(pos[i3], pos[i3+1], pos[i3+2]).normalize().cross(new THREE.Vector3(0,1,0));
        vel[i3] = t.x * 0.05;
        vel[i3+1] = t.y * 0.05;
        vel[i3+2] = t.z * 0.05;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(({ mouse }) => {
    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array;
      const G = 0.05; 

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const p = new THREE.Vector3(posArray[i3], posArray[i3 + 1], posArray[i3 + 2]);
        const distSq = p.lengthSq();
        
        if(distSq > 1) {
            const force = (G / distSq);
            const acceleration = p.clone().normalize().multiplyScalar(-force);
            
            velocities[i3] += acceleration.x;
            velocities[i3 + 1] += acceleration.y;
            velocities[i3 + 2] += acceleration.z;
        }

        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
       pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * Math.PI * 0.05, 0.05);
       pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, mouse.y * Math.PI * 0.05, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        sizeAttenuation 
        transparent
        alphaMap={circleTexture}
        alphaTest={0.01}
        color="#ffffff" 
       />
    </points>
  );
}

/* ------------------ Central AI Core Object with Nebula/Sun shader and Particle Disk ------------------ */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Simplex noise function for a more organic look
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float noise = snoise(vec3(uv * 4.0, uTime * 0.1));
    float FBM = snoise(vec3(uv * 2.0, uTime * 0.2)) * 0.5;
    FBM += snoise(vec3(uv * 8.0, uTime * 0.3)) * 0.25;
    float finalNoise = noise + FBM;
    
    vec3 color1 = vec3(1.0, 0.53, 0.8); // Pink
    vec3 color2 = vec3(0.66, 0.53, 1.0); // Purple
    vec3 mixedColor = mix(color1, color2, finalNoise);

    float dist = length(uv - 0.5);
    float intensity = pow(1.0 - dist, 3.0);
    
    vec3 finalColor = mixedColor * intensity;
    
    gl_FragColor = vec4(finalColor, intensity * 2.0);
  }
`;

function AICore() {
  const groupRef = useRef();
  const materialRef = useRef();
  const particlesRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.5;
    }
    if (particlesRef.current) {
        particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * Math.PI * 0.2, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * Math.PI * 0.2, 0.05);
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  const particlePositions = useMemo(() => {
    const count = 5000; // Increased particle count
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = 2.0 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.3;
        pos[i3] = r * Math.cos(theta);
        pos[i3 + 1] = y;
        pos[i3 + 2] = r * Math.sin(theta);
    }
    return pos;
  }, []);

  return (
    <group ref={groupRef}>
        <pointLight color="#ff88cc" intensity={100} distance={30} />
      {/* Sun-like core */}
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} /> {/* Increased sphere size */}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Orbiting particles (accretion disk) */}
      <points ref={particlesRef}>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={particlePositions.length / 3}
                array={particlePositions}
                itemSize={3}
            />
        </bufferGeometry>
        <pointsMaterial
            size={0.05}
            color="#aa88ff"
            sizeAttenuation
            transparent
            alphaMap={circleTexture}
            alphaTest={0.01}
            blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------ Hero Section ------------------ */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Unified Canvas for all 3D elements */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 40], fov: 75 }}>
            <color attach="background" args={["#000004"]} />
            <Suspense fallback={null}>
                <Starfield />
                <group position={[0, 10, 0]} scale={2.4}>
                  <AICore />
                </group>
            </Suspense>
        </Canvas>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 mx-auto max-w-6xl h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div className="h-[40vh]"></div> {/* Spacer to push content down */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-pink-300">
          Navigate Your Career Path<br />
          with AI Precision
        </h1>
        <p className="mt-4 max-w-2xl text-white/80 text-lg">
          Gain an intelligent edge. Leverage cutting-edge AI for personalized
          interview coaching, real-time industry insights, and resumes built to
          beat the bots.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 pointer-events-auto">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:scale-105 transition"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/industry-insights">
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition"
            >
              Explore Insights
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

