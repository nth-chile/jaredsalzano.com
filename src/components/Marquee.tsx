"use client";

import { useRef, useEffect, useCallback } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

export default function Marquee({
  children,
  className = "",
  style,
  duration = 20,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    offset: 0,
    currentSpeed: 1,
    targetSpeed: 1,
    rafId: 0,
    lastTime: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = stateRef.current;
    const groups = container.querySelectorAll<HTMLElement>(".marquee-group");
    if (groups.length === 0) return;

    const tick = (time: number) => {
      if (!state.lastTime) state.lastTime = time;
      const dt = time - state.lastTime;
      state.lastTime = time;

      // Exponential ease toward target speed (frame-rate independent)
      const lerpFactor = 1 - Math.pow(0.8, dt / 16.667);
      state.currentSpeed +=
        (state.targetSpeed - state.currentSpeed) * lerpFactor;
      if (Math.abs(state.currentSpeed - state.targetSpeed) < 0.001) {
        state.currentSpeed = state.targetSpeed;
      }

      // Calculate movement
      const groupWidth = groups[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      const totalWidth = groupWidth + gap;
      const pxPerMs = totalWidth / (duration * 1000);

      state.offset += pxPerMs * dt * state.currentSpeed;

      if (totalWidth > 0 && state.offset >= totalWidth) {
        state.offset -= totalWidth;
      }

      const tx = `translateX(${-state.offset}px)`;
      groups.forEach((group) => {
        group.style.transform = tx;
      });

      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.rafId);
      state.lastTime = 0;
    };
  }, [duration]);

  const setTarget = useCallback((speed: number) => {
    if (window.matchMedia("(hover: hover)").matches) {
      stateRef.current.targetSpeed = speed;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      onMouseEnter={() => setTarget(0)}
      onMouseLeave={() => setTarget(1)}
      onFocus={() => setTarget(0)}
      onBlur={() => setTarget(1)}
    >
      {children}
    </div>
  );
}
