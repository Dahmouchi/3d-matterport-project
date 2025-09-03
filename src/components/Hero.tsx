/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { motion } from "framer-motion";
import GLBModelPage from "./glb-model";
import GLBModelViewer from "./glb-model";
import { WavyBackground } from "./ui/wavy-background";

/**
 * MatterportHero + AboutUs Section
 */
export default function MatterportHero({
  modelId = "UoqjwziqrZs",
  title = "Capture reality Explore in 360°.",
  subtitle = "Scan real spaces, generate Matterport tours, and share immersive 3D experiences—right in your browser.",
  ctaPrimary = "Open 360° Tour",
  ctaSecondary = "How it works",
}: {
  modelId?: string;
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}) {
  const [open, setOpen] = useState(false);

  const mpUrl = useMemo(() => {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "1",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }, [modelId]);

  return (
    <>
      <div className="">
        {/* Hero Section */}
        <WavyBackground >
          {/* Content */}
          <div className="mx-auto min-h-screen  max-w-7xl flex flex-col items-center gap-0 px-6 py-24 md:flex-row justify-between md:px-12 lg:gap-16 lg:py-28">
            <motion.div
                className="w-full h-full flex justify-center items-center md:hidden"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/images/room.png"
                  alt="Hero Background"
                  className="w-2/3 h-auto object-cover"
                />
              </motion.div>
            <div className="relative z-10  lg:w-1/2">
              <HeroTitle>{title}</HeroTitle>
              <p className="mt-4 max-w-xl text-base/7 text-black dark:text-white/70 md:text-lg/8">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition  shadow-lg shadow-gray-400 hover:border-gray-400  dark:shadow-white/50 hover:bg-gray-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:border-white/25 dark:hover:bg-white/15"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 transition group-hover:scale-110"
                  >
                    <path d="M8 5v14l11-7-11-7z" />
                  </svg>
                  {ctaPrimary}
                </button>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#ffab05] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-400 transition hover:shadow-gray-400/20 d dark:shadow-white/50 dark:hover:shadow-white/20"
                >
                  <span>{ctaSecondary}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-xs text-white/60">
                <Badge>GLB / glTF ready</Badge>
                <Badge>Matterport Embed</Badge>
                <Badge>360° Viewer</Badge>
                <Badge>Next.js + R3F</Badge>
              </div>
            </div>

            <div className="relative z-10 lg:w-1/2 hidden md:block">
              {/* Right Section (Hero Image) */}
              <motion.div
                className="w-full h-full flex justify-center items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/images/room.png"
                  alt="Hero Background"
                  className="w-2/3 h-auto object-cover"
                />
              </motion.div>
              {/* <GlowCard>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                  <div className="absolute inset-px rounded-2xl bg-black/40 ring-1 ring-white/10" />

                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-32 top-10 h-64 w-64 rotate-12 rounded-full bg-gradient-to-tr from-indigo-500/30 to-cyan-400/30 blur-2xl" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 -rotate-6 rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-rose-400/30 blur-2xl" />
                  </div>

                  <div className="relative z-10 flex h-full items-center justify-center">
                    <button
                      onClick={() => setOpen(true)}
                      className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-white/25 hover:bg-white/15"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M8 5v14l11-7-11-7z" />
                      </svg>
                      Preview tour
                    </button>
                  </div>

                  <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/80 ring-1 ring-white/20">
                    MATTERPORT
                  </div>
                </div>
              </GlowCard> Visual / Preview Card */}
            </div>
          </div>

          {open && (
            <div
              className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur"
              style={{ zIndex: 1000 }}
              onClick={() => setOpen(false)}
            >
              <div
                className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span className="text-sm font-semibold text-white/80">
                    360° Tour
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20 hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>
                <div className="relative aspect-[16/9] w-full">
                  <iframe
                    key={mpUrl}
                    src={mpUrl}
                    allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    title="Matterport 360 Tour"
                  />
                </div>
              </div>
            </div>
          )}
        </WavyBackground>
        {/* About Us Section with R3F Canvas */}
        <section
          id="about"
          className="relative text-black dark:text-white scroll-mt-24"
        >
          <div className="mx-auto max-w-7xl lg:px-6 px-2">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                About Us
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
                We specialize in immersive 3D experiences — from Matterport
                virtual tours to custom WebGL models. Our mission is to make
                spaces come alive online.
              </p>
            </div>

            {/* Content grid: text (left) + canvas (right) */}
            <div className="mt-12 grid items-start gap-10 md:grid-cols-3 grid-cols-1">
              {/* LEFT: copy, features, steps, stats */}
              <div className="space-y-8 lg:col-span-2 h-full">
                {/* Feature highlights */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl shadow border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4">
                    <h3 className="font-semibold">Fast Capture</h3>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                      Scan any space in minutes with Matterport and phone LiDAR.
                    </p>
                  </div>
                  <div className="rounded-xl shadow border border-black/10 dark:border:white/10 bg-white/50 dark:bg-white/5 p-4">
                    <h3 className="font-semibold">WebGL Ready</h3>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                      Optimized GLB/glTF models that load quickly and look
                      great.
                    </p>
                  </div>
                  <div className="rounded-xl shadow border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4">
                    <h3 className="font-semibold">360° Tours</h3>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                      Seamless Matterport embeds with clean UI and deep linking.
                    </p>
                  </div>
                  <div className="rounded-xl shadow border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4">
                    <h3 className="font-semibold">Custom Branding</h3>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                      Match your brand with themes, lighting, and controls.
                    </p>
                  </div>
                </div>

                {/* How it works */}
                <div className="rounded-2xl border shadow  border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6">
                  <h3 className="text-xl font-bold">How it works</h3>
                  <ol className="mt-4 space-y-4">
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-bold">
                        1
                      </span>
                      <div>
                        <p className="font-semibold">Capture</p>
                        <p className="text-sm text-black/70 dark:text-white/70">
                          We scan your space with Matterport (or use your
                          existing model).
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-bold">
                        2
                      </span>
                      <div>
                        <p className="font-semibold">Process</p>
                        <p className="text-sm text-black/70 dark:text-white/70">
                          We optimize geometry, textures, and lighting for web
                          delivery.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg:white dark:text-black text-sm font-bold">
                        3
                      </span>
                      <div>
                        <p className="font-semibold">Publish</p>
                        <p className="text-sm text-black/70 dark:text-white/70">
                          Embed the 360° tour or 3D viewer in your site with one
                          line.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* RIGHT: Canvas (kept same size) */}
              <div className="mx-auto md:mx-0 place-items-center  w-full h-full rounded-2xl border  dark:bg-black/40 p-4 shadow-xl backdrop-blur">
                <Canvas
                  camera={{
                    position: [8, 2, 2],
                    fov: 50,
                    near: 0.1,
                    far: 1000,
                  }}
                  style={{ height: "450px", width: "100%" }} // ✅ SAME SIZE
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                  shadows
                >
                  <Suspense fallback={<Loader />}>
                    {/* Lights */}
                    <ambientLight intensity={0.6} />
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={1}
                      castShadow
                      shadow-mapSize={[1024, 1024]}
                    />
                    <directionalLight position={[-5, -5, -5]} intensity={0.5} />

                    {/* Environment */}
                    <Environment preset="city" background={false} blur={0.5} />

                    {/* Model */}
                    <Model />

                    {/* Controls */}
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 4}
                      enableDamping
                      dampingFactor={0.05}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* -------------------- Subcomponents -------------------- */

function HeroTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
      <span className="relative inline-block">
        <span className="relative z-10 bg-gradient-to-b from-black to-slate-700 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
          {children}
        </span>
      </span>
    </h1>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-black dark:text-white rounded-full border dark:border-white/15 dark:bg-white/5 border-black/15 bg-black/5 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
      {children}
    </span>
  );
}

function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-tr from-white/25 via-white/5 to-transparent opacity-60 blur-xl" />
      <div className="rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur">
        {children}
      </div>
    </div>
  );
}

/* -------------------- Model Component -------------------- */

// Model component with optimizations
function Model() {
  const modelRef = useRef<any>(null);
  const gltf = useLoader(GLTFLoader, "/Untitled3.glb");

  // Smooth rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; // Adjust rotation speed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, -1, 0]} // Adjust based on your model's center
      scale={[1, 1, 1]} // Adjust scale as needed
      rotation={[0, 0, 0]}
    />
  );
}

// Fallback component while loading
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
