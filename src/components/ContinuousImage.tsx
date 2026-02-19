'use client'

/*
 * Image wrapper that applies:
 * 1. Continuous corners
 * 2. Optional drop shadow (handled via a wrapper div since clip-path cuts off standard box-shadow)
 * 3. Optional 3D material overlay effect
 */

import Image, { ImageProps } from "next/image";
import ContinuousCorner from "@/components/ContinuousCorner";
import Material3D from "@/components/Material3D";

interface ContinuousImageProps extends ImageProps {
  radius: number;
  shadow?: boolean | string;
  material3d?: boolean;
  children?: React.ReactNode;
}

export default function ContinuousImage({
  radius,
  shadow,
  material3d,
  children,
  ...imageProps
}: ContinuousImageProps) {
  // Check if this is a fill image that needs positioning context
  const needsPositioning = "fill" in imageProps && imageProps.fill;

  const baseStyle = needsPositioning
    ? { position: "relative" as const, width: "100%", height: "100%" }
    : {};

  const content = (
    <ContinuousCorner radius={radius} style={baseStyle}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
      {material3d && <Material3D />}
      {children}
    </ContinuousCorner>
  );

  if (shadow) {
    const shadowFilter = typeof shadow === "string"
      ? shadow
      : "drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))";

    const wrapperStyle = needsPositioning
      ? { filter: shadowFilter, width: "100%", height: "100%" }
      : { filter: shadowFilter, display: "inline-block" };

    return (
      <div style={wrapperStyle}>
        {content}
      </div>
    );
  }

  return content;
}
