'use client'

// Implements "continuous corners" (also known as squircles or superellipses)

import React, { useRef, useState, useLayoutEffect } from 'react';

function generateContinuousCornerPath(width: number, height: number, radiusPx: number, smoothing: number) {
  const r = Math.min(Math.min(width, height) / 2, Math.max(0, radiusPx));
  const c = r * smoothing;
  return [
    `M ${r} 0`,
    `L ${width - r} 0`,
    `C ${width - r + c} 0 ${width} ${r - c} ${width} ${r}`,
    `L ${width} ${height - r}`,
    `C ${width} ${height - r + c} ${width - r + c} ${height} ${width - r} ${height}`,
    `L ${r} ${height}`,
    `C ${r - c} ${height} 0 ${height - r + c} 0 ${height - r}`,
    `L 0 ${r}`,
    `C 0 ${r - c} ${r - c} 0 ${r} 0`,
    'Z',
  ].join(' ');
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setSize({ width: el.offsetWidth, height: el.offsetHeight });
    const observer = new ResizeObserver(() => {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasSize = size.width > 0 && size.height > 0;
  const radiusPx = radius * Math.sqrt(size.width * size.height);
  const path = hasSize ? generateContinuousCornerPath(size.width, size.height, radiusPx, 1) : null;
  const clipValue = hasSize ? `url(#${id})` : undefined;

  if (borderWidth > 0) {
    const innerId = `${id}-inner`;
    const innerW = Math.max(0, size.width - 2 * borderWidth);
    const innerH = Math.max(0, size.height - 2 * borderWidth);
    const innerRadiusPx = Math.max(0, radiusPx - borderWidth);
    const innerPath = hasSize ? generateContinuousCornerPath(innerW, innerH, innerRadiusPx, 1) : null;
    const innerClipValue = hasSize ? `url(#${innerId})` : undefined;

    return (
      <>
        {hasSize && (
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <clipPath id={id}>
                <path d={path!} />
              </clipPath>
              <clipPath id={innerId}>
                <path d={innerPath!} />
              </clipPath>
            </defs>
          </svg>
        )}
        <div
          ref={containerRef}
          style={{
            clipPath: clipValue,
            WebkitClipPath: clipValue,
            display: 'inline-block',
            padding: borderWidth,
            backgroundColor: borderColor,
            ...style,
            opacity: hasSize ? (style.opacity ?? 1) : 0,
          }}
        >
          <div
            className={className}
            style={{
              clipPath: innerClipValue,
              WebkitClipPath: innerClipValue,
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
      {hasSize && (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id={id}>
              <path d={path!} />
            </clipPath>
          </defs>
        </svg>
      )}
      <div
        ref={containerRef}
        className={className}
        style={{
          clipPath: clipValue,
          WebkitClipPath: clipValue,
          display: 'inline-block',
          ...style,
          opacity: hasSize ? (style.opacity ?? 1) : 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ContinuousCorner;
