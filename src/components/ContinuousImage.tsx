'use client'

/*
 * Image wrapper that applies:
 * 1. Continuous corners
 * 2. Optional drop shadow (handled via a wrapper div since clip-path cuts off standard box-shadow)
 * 3. Optional 3D material overlay effect
 * 4. Automatic bleed for fill images: expands the image beyond its layout box to visually compensate
 *    for the continuous corner inset. The amount is derived from the corner math:
 *    the bezier midpoint of the continuous corner arc sits r/8 inset from the bounding box corner,
 *    so bleedPx = radiusPx / 8. Requires parent to be position: relative.
 */

import { useRef, useState, useLayoutEffect } from "react";
import Image, { ImageProps } from "next/image";
import ContinuousCorner from "@/components/ContinuousCorner";
import Material3D from "@/components/Material3D";

interface ContinuousImageProps extends ImageProps {
  radius: number;
  shadow?: boolean | string;
  material3d?: boolean;
  children?: React.ReactNode;
  bleed?: boolean;
}

export default function ContinuousImage({
  radius,
  shadow,
  material3d,
  children,
  bleed = true,
  ...imageProps
}: ContinuousImageProps) {
  const needsPositioning = "fill" in imageProps && imageProps.fill;
  const measureRef = useRef<HTMLDivElement>(null);
  const [bleedPx, setBleedPx] = useState(0);

  useLayoutEffect(() => {
    if (!needsPositioning || !bleed) return;
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setBleedPx(radius * Math.sqrt(width * height) / 8);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [needsPositioning, bleed, radius]);

  const baseStyle = needsPositioning
    ? { position: "relative" as const, width: "100%", height: "100%" }
    : {};

  const shadowFilter = shadow
    ? (typeof shadow === "string"
        ? shadow
        : "drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))")
    : null;

  const corner = (
    <ContinuousCorner radius={radius} style={baseStyle}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
      {material3d && <Material3D />}
      {children}
    </ContinuousCorner>
  );

  const withShadow = shadowFilter ? (
    <div style={needsPositioning
      ? { filter: shadowFilter, width: "100%", height: "100%" }
      : { filter: shadowFilter, display: "inline-block" }}>
      {corner}
    </div>
  ) : corner;

  if (needsPositioning && bleed) {
    return (
      <>
        {/* Sibling measuring div — always matches parent size, unaffected by bleed expansion */}
        <div ref={measureRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -bleedPx, right: -bleedPx, bottom: -bleedPx, left: -bleedPx }}>
          {withShadow}
        </div>
      </>
    );
  }

  return withShadow;
}
