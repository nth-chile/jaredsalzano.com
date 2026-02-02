'use client'

// Implements "continuous corners" (also known as squircles or superellipses)

import React from 'react';

function generateContinuousCornerPath(radius: number, smoothing: number) {
  // Values are normalized 0-1 (act as percentages of width/height)
  // radius: corner radius (0-0.5)
  // smoothing: bezier control point distance multiplier
  //   0.5522847498 ≈ circular arc
  //   0.6 ≈ continuous curve (Apple-like)
  const r = Math.min(0.5, Math.max(0, radius));
  const c = r * smoothing; // control point distance from anchor

  return `
    M ${r}, 0
    C ${r}, 0, ${1 - r}, 0, ${1 - r}, 0
    C ${1 - r + c}, 0, 1, ${r - c}, 1, ${r}
    C 1, ${r}, 1, ${1 - r}, 1, ${1 - r}
    C 1, ${1 - r + c}, ${1 - r + c}, 1, ${1 - r}, 1
    C ${1 - r}, 1, ${r}, 1, ${r}, 1
    C ${r - c}, 1, 0, ${1 - r + c}, 0, ${1 - r}
    C 0, ${1 - r}, 0, ${r}, 0, ${r}
    C 0, ${r - c}, ${r - c}, 0, ${r}, 0
    Z
  `.replace(/\s+/g, ' ').trim();
}

interface ContinuousCornerProps {
  children: React.ReactNode;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  borderWidth?: number;
  borderColor?: string;
}

const ContinuousCorner = ({
  children,
  radius = 0.2,
  className = '',
  style = {},
  borderWidth = 0,
  borderColor = 'transparent'
}: ContinuousCornerProps) => {
  const id = React.useId();
  const path = generateContinuousCornerPath(radius, 1);

  if (borderWidth > 0) {
    const innerId = `${id}-inner`;
    // Calculate inner radius: reduce radius proportionally to border width
    // This is approximate since we're working in normalized space
    const innerRadius = Math.max(0, radius - (borderWidth * 0.002)); // adjust factor as needed
    const innerPath = generateContinuousCornerPath(innerRadius, 1);

    return (
      <>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id={id} clipPathUnits="objectBoundingBox">
              <path d={path} />
            </clipPath>
            <clipPath id={innerId} clipPathUnits="objectBoundingBox">
              <path d={innerPath} />
            </clipPath>
          </defs>
        </svg>
        <div
          style={{
            clipPath: `url(#${id})`,
            WebkitClipPath: `url(#${id})`,
            display: 'inline-block',
            padding: borderWidth,
            backgroundColor: borderColor,
            ...style
          }}
        >
          <div
            className={className}
            style={{
              clipPath: `url(#${innerId})`,
              WebkitClipPath: `url(#${innerId})`
            }}
          >
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>
      <div
        className={className}
        style={{
          clipPath: `url(#${id})`,
          WebkitClipPath: `url(#${id})`,
          display: 'inline-block',
          ...style
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ContinuousCorner;
