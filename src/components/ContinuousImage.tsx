'use client'

/*
 * Image wrapper that applies:
 * 1. Continuous corners
 * 2. Optional drop shadow (handled via SVG for fill images to avoid Safari compositing bugs
 *    with CSS filter + backdrop-filter, or CSS filter for non-fill images)
 * 3. Optional 3D material overlay effect
 * 4. Automatic bleed for fill images: expands the image beyond its layout box to visually compensate
 *    for the continuous corner inset. The amount is derived from the corner math:
 *    the bezier midpoint of the continuous corner arc sits r/8 inset from the bounding box corner,
 *    so bleedPx = radiusPx / 8. Requires parent to be position: relative.
 */

import React, { useRef, useState, useLayoutEffect } from "react";
import Image, { ImageProps } from "next/image";
import ContinuousCorner, { generateContinuousCornerPath } from "@/components/ContinuousCorner";
import Material3D from "@/components/Material3D";

interface ContinuousImageProps extends ImageProps {
  radius: number;
  shadow?: boolean | string;
  material3d?: boolean;
  children?: React.ReactNode;
  bleed?: boolean;
  /** Makes the wrapper block-level at 100% width for natural-aspect-ratio images */
  block?: boolean;
}

function SquircleShadow({ width, height, radiusPx }: { width: number; height: number; radiusPx: number }) {
  const id = React.useId();
  const path = generateContinuousCornerPath(width, height, radiusPx, 1);
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id={id} x="-50%" y="-30%" width="200%" height="200%">
          {/* Shadow 1: matches drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="7.5" result="b1"/>
          <feOffset in="b1" dy="10" result="o1"/>
          <feFlood floodColor="#000" floodOpacity="0.1" result="c1"/>
          <feComposite in="c1" in2="o1" operator="in" result="s1"/>
          {/* Shadow 2: matches drop-shadow(0 4px 6px rgb(0 0 0 / 0.1)) */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b2"/>
          <feOffset in="b2" dy="4" result="o2"/>
          <feFlood floodColor="#000" floodOpacity="0.1" result="c2"/>
          <feComposite in="c2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
          </feMerge>
        </filter>
      </defs>
      <path d={path} filter={`url(#${id})`} />
    </svg>
  );
}

export default function ContinuousImage({
  radius,
  shadow,
  material3d,
  children,
  bleed = true,
  block,
  ...imageProps
}: ContinuousImageProps) {
  const needsPositioning = "fill" in imageProps && imageProps.fill;
  const measureRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0, bleedPx: 0 });

  useLayoutEffect(() => {
    if (!needsPositioning || !bleed) return;
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setDims({
        width,
        height,
        bleedPx: radius * Math.sqrt(width * height) / 8,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [needsPositioning, bleed, radius]);

  const baseStyle = needsPositioning
    ? { position: "relative" as const, width: "100%", height: "100%" }
    : block ? { display: "block" as const, width: "100%" }
    : {};

  const corner = (
    <ContinuousCorner radius={radius} style={baseStyle}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
      {material3d && <Material3D />}
      {children}
    </ContinuousCorner>
  );

  // For fill images, use SVG shadow to avoid Safari compositing bugs
  // (CSS filter: drop-shadow + descendant backdrop-filter breaks Safari rendering)
  if (needsPositioning && bleed) {
    const { bleedPx, width: mw, height: mh } = dims;
    const expandedW = mw + 2 * bleedPx;
    const expandedH = mh + 2 * bleedPx;
    const radiusPx = radius * Math.sqrt(expandedW * expandedH);

    return (
      <>
        {/* Sibling measuring div — always matches parent size, unaffected by bleed expansion */}
        <div ref={measureRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -bleedPx, right: -bleedPx, bottom: -bleedPx, left: -bleedPx }}>
          {shadow && expandedW > 0 && (
            <SquircleShadow width={expandedW} height={expandedH} radiusPx={radiusPx} />
          )}
          {corner}
        </div>
      </>
    );
  }

  // For non-fill images, CSS filter is safe (no backdrop-filter descendants)
  if (shadow) {
    const shadowFilter = typeof shadow === "string"
      ? shadow
      : "drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))";
    return (
      <div style={block
        ? { filter: shadowFilter, display: "block", transform: "translateZ(0)" }
        : { filter: shadowFilter, display: "inline-block", transform: "translateZ(0)" }}>
        {corner}
      </div>
    );
  }

  return corner;
}
