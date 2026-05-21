"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HLSVideoSectionProps {
  src: string;
  className?: string;
}

const isHLSSrc = (url: string) => url.includes(".m3u8") || url.includes("hls");

export default function HLSVideoSection({
  src,
  className = "",
}: HLSVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Seek throttling (refs avoid stale closures)
  const currentTargetRef = useRef(0);
  const seekPendingRef = useRef(false);

  // ── Video / HLS setup ──────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: import("hls.js").default | null = null;

    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (isHLSSrc(src)) {
      // ── HLS path ──────────────────────────────────────────────────────────
      if (isSafari && video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else {
        import("hls.js").then(({ default: Hls }) => {
          if (!Hls.isSupported()) return;

          hlsInstance = new Hls({
            maxBufferLength: 120,
            maxMaxBufferLength: 600,
            maxBufferSize: 200 * 1024 * 1024,
            startPosition: 0,
            capLevelToPlayerSize: false,
            startLevel: -1,
            autoStartLoad: true,
          });

          hlsInstance.loadSource(src);
          hlsInstance.attachMedia(video);

          hlsInstance.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
            const maxLevel = data.levels.length - 1;
            hlsInstance!.currentLevel = maxLevel;
            hlsInstance!.startLevel = maxLevel;
          });

          // Buffer progress via hls.js fragment events
          hlsInstance.on(Hls.Events.FRAG_BUFFERED, () => {
            const dur = video.duration;
            if (dur && video.buffered.length > 0) {
              const bufferedEnd = video.buffered.end(video.buffered.length - 1);
              setLoadProgress(Math.round((bufferedEnd / dur) * 100));
            }
          });
        });
      }
    } else {
      // ── Plain MP4 / local file path ────────────────────────────────────────
      video.src = src;

      // Native buffer progress via the 'progress' event
      const onProgress = () => {
        if (!video.duration || video.buffered.length === 0) return;
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        setLoadProgress(Math.round((bufferedEnd / video.duration) * 100));
      };
      video.addEventListener("progress", onProgress);

      // Kick off loading
      video.load();

      return () => {
        video.removeEventListener("progress", onProgress);
      };
    }

    // Hide overlay as soon as enough data is available to play
    const onCanPlay = () => setIsLoaded(true);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      hlsInstance?.destroy();
    };
  }, [src]);

  // Separate canplay listener for the plain-video branch (needs its own cleanup)
  useEffect(() => {
    if (isHLSSrc(src)) return; // handled above
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setIsLoaded(true);
    video.addEventListener("canplay", onCanPlay);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, [src]);

  // ── Scroll-to-seek ─────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const doSeek = (time: number) => {
      seekPendingRef.current = false;
      video.currentTime = time;
    };

    const onSeeked = () => {
      if (seekPendingRef.current) doSeek(currentTargetRef.current);
    };

    video.addEventListener("seeked", onSeeked);

    // Keep playbackRate at 0 so the browser's decoder only serves seeks,
    // not continuous playback — significantly faster on most devices.
    video.playbackRate = 0;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.01, // 100 ms lag instead of the default 1 s
      onUpdate: (self) => {
        const duration = video.duration;
        if (!duration) return;
        const targetTime = self.progress * duration;
        currentTargetRef.current = targetTime;

        if (video.seeking) {
          seekPendingRef.current = true;
        } else {
          doSeek(targetTime);
        }
      },
    });

    return () => {
      video.removeEventListener("seeked", onSeeked);
      st.kill();
    };
  }, []);

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 2;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(wrapper, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="video-showcase"
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
    >
      {/* Video wrapper — receives mouse parallax */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.35]"
          muted
          playsInline
          crossOrigin="anonymous"
          preload="auto"
        />
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center bg-black gap-4">
          <p className="text-white text-2xl font-sans tracking-wide">
            Loading… {loadProgress}%
          </p>
          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-sans animate-bounce pointer-events-none select-none">
        Scroll to explore ↓
      </div>
    </section>
  );
}
