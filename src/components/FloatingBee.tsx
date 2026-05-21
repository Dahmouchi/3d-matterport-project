"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BeePosition {
    x: number;
    y: number;
}

interface TrailDot {
    id: number;
    x: number;
    y: number;
    opacity: number;
    size: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const BEE_SIZE_DESKTOP = 56;  // px on desktop
const BEE_SIZE_MOBILE = 44;  // px on mobile (≤ 640 px)
const TRAIL_LENGTH = 10;
const SPEED = 2.5;            // px per frame
const ARRIVAL_RADIUS = 8;     // px – stop when this close to target
const WING_SPEED = 80;        // ms per wing flap
const MARGIN = 20;            // px from each edge (start position)
const END_MARGIN_DESKTOP = 40; // px – desktop resting spot offset from right/bottom

// ─── Smooth eased lerp ───────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FloatingBee({
    imageSrc = "/betterbeuz-logo.png",
    startDelay = 1200,
}: {
    imageSrc?: string;
    startDelay?: number;
}) {
    const [pos, setPos] = useState<BeePosition>({ x: -200, y: -200 });
    const [angle, setAngle] = useState(0);
    const [trail, setTrail] = useState<TrailDot[]>([]);
    const [wingUp, setWingUp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [arrived, setArrived] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [beeSize, setBeeSize] = useState(BEE_SIZE_DESKTOP);

    const posRef = useRef<BeePosition>({ x: -200, y: -200 });
    const targetRef = useRef<BeePosition>({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const trailIdRef = useRef(0);
    const frameCount = useRef(0);

    // ── Responsive bee size ──────────────────────────────────────────────────
    useEffect(() => {
        const update = () =>
            setBeeSize(window.innerWidth <= 640 ? BEE_SIZE_MOBILE : BEE_SIZE_DESKTOP);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // ── Wing flap ───────────────────────────────────────────────────────────────
    useEffect(() => {
        const id = setInterval(() => setWingUp(w => !w), WING_SPEED);
        return () => clearInterval(id);
    }, []);

    // ── Tooltip easter egg ────────────────────────────────────────────────────
    const handleBeeClick = () => {
        setTooltip(true);
        setTimeout(() => setTooltip(false), 2200);
    };

    // ── Main animation loop ──────────────────────────────────────────────────
    const animate = useCallback(() => {
        const current = posRef.current;
        const target = targetRef.current;

        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Stop when arrived at bottom-right
        if (dist < ARRIVAL_RADIUS) {
            posRef.current = target;
            setPos({ x: target.x, y: target.y });
            setAngle(0);
            setTrail([]);
            setArrived(true);
            return; // no more rAF — bee stays fixed
        }

        // Move toward target
        const nx = lerp(current.x, target.x, SPEED / Math.max(dist, 1));
        const ny = lerp(current.y, target.y, SPEED / Math.max(dist, 1));

        posRef.current = { x: nx, y: ny };

        // Tilt based on direction
        const tilt = Math.max(-18, Math.min(18, (dy / Math.max(dist, 1)) * 18));
        setAngle(tilt);

        // Bobbing wobble while in flight
        const bob = Math.sin(frameCount.current * 0.04) * 4;
        const finalY = ny + bob;

        setPos({ x: nx, y: finalY });

        // Pollen trail (every 3 frames)
        frameCount.current++;
        if (frameCount.current % 3 === 0) {
            setTrail(prev => {
                const newDot: TrailDot = {
                    id: ++trailIdRef.current,
                    x: nx,
                    y: finalY,
                    opacity: 0.6,
                    size: 6 + Math.random() * 4,
                };
                const updated = [newDot, ...prev.slice(0, TRAIL_LENGTH - 1)].map(
                    (d, i) => ({ ...d, opacity: Math.max(0, 0.55 - i * 0.06) })
                );
                return updated;
            });
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    // ── Start after delay — top-left → bottom-right ──────────────────────────
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (typeof window !== "undefined") {
                const isMobile = window.innerWidth <= 640;
                const size = isMobile ? BEE_SIZE_MOBILE : BEE_SIZE_DESKTOP;
                const endMargin = isMobile ? MARGIN : END_MARGIN_DESKTOP;
                const start: BeePosition = { x: MARGIN + size / 2, y: MARGIN + size / 2 };
                const end: BeePosition = {
                    x: window.innerWidth - endMargin - size / 2,
                    y: window.innerHeight - endMargin - size / 2,
                };
                posRef.current = start;
                targetRef.current = end;
                setPos(start);
                setVisible(true);
                rafRef.current = requestAnimationFrame(animate);
            }
        }, startDelay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafRef.current);
        };
    }, [animate, startDelay]);

    if (!visible) return null;

    return (
        <>
            {/* ── Pollen trail ── */}
            {trail.map(dot => (
                <span
                    key={dot.id}
                    style={{
                        position: "fixed",
                        left: dot.x - dot.size / 2,
                        top: dot.y - dot.size / 2,
                        width: dot.size,
                        height: dot.size,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #FFD700 30%, #FFA500 100%)",
                        opacity: dot.opacity,
                        pointerEvents: "none",
                        zIndex: 9997,
                        transform: "translate(-50%,-50%)",
                        transition: "opacity 0.3s",
                        boxShadow: "0 0 4px rgba(255,200,0,0.6)",
                    }}
                />
            ))}

            {/* ── Click tooltip (Bzzzz on click) ── */}
            {tooltip && (
                <div
                    style={{
                        position: "fixed",
                        left: pos.x + beeSize / 2 + 10,
                        top: pos.y - 40,
                        zIndex: 10000,
                        background: "#FFF8E1",
                        border: "1.5px solid #FFD700",
                        borderRadius: 12,
                        padding: "6px 14px",
                        fontSize: 13,
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                        color: "#5A3E00",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        pointerEvents: "none",
                        animation: "gh-bee-pop 0.3s ease",
                    }}
                >
                    🍯 Bzzzz !
                </div>
            )}

            {/* ── Bee ── */}
            <div
                onClick={handleBeeClick}
                style={{
                    position: "fixed",
                    left: pos.x - beeSize / 2,
                    top: pos.y - beeSize / 2,
                    width: beeSize,
                    height: beeSize,
                    zIndex: 9998,
                    cursor: "pointer",
                    userSelect: "none",
                    pointerEvents: "auto",
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "center center",
                    transition: "transform 0.15s ease",
                    filter: arrived
                        ? "drop-shadow(0 6px 14px rgba(255,180,0,0.6))"
                        : "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                }}
            >
                {/* Wings animated separately */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Wing left */}
                    <div
                        style={{
                            position: "absolute",
                            left: -18,
                            top: 8,
                            width: 28,
                            height: 20,
                            background: "rgba(200,220,255,0.35)",
                            borderRadius: "50% 50% 50% 10%",
                            border: "1px solid rgba(100,130,180,0.3)",
                            transform: wingUp ? "rotate(-25deg) scaleY(0.85)" : "rotate(-10deg) scaleY(1.1)",
                            transformOrigin: "right center",
                            transition: `transform ${WING_SPEED}ms ease`,
                        }}
                    />
                    {/* Wing right */}
                    <div
                        style={{
                            position: "absolute",
                            right: -18,
                            top: 8,
                            width: 28,
                            height: 20,
                            background: "rgba(200,220,255,0.35)",
                            borderRadius: "50% 50% 10% 50%",
                            border: "1px solid rgba(100,130,180,0.3)",
                            transform: wingUp ? "rotate(25deg) scaleY(0.85)" : "rotate(10deg) scaleY(1.1)",
                            transformOrigin: "left center",
                            transition: `transform ${WING_SPEED}ms ease`,
                        }}
                    />

                    {/* Bee body (logo image) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt="GoldenHouse bee"
                        style={{
                            width: beeSize,
                            height: beeSize,
                            objectFit: "contain",
                            position: "relative",
                            zIndex: 1,
                            // Idle bounce when arrived
                            animation: arrived ? "gh-bee-idle 0.6s ease-in-out infinite alternate" : "none",
                        }}
                        draggable={false}
                    />
                </div>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
        @keyframes gh-bee-idle {
          from { transform: translateY(0px); }
          to   { transform: translateY(-6px); }
        }
        @keyframes gh-bee-pop {
          from { opacity: 0; transform: scale(0.7) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </>
    );
}