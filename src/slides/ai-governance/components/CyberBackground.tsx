import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const CyberBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 1.5) % 173.2; // 173.2 = Hexagon height for seamless loop

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* はっきりと認識できる明るさのブルーネイビーグラデーション */}
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#0B101E" />
            <stop offset="100%" stopColor="#030814" />
          </linearGradient>

          <radialGradient id="flare1" cx="20%" cy="10%" r="60%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="flare2" cx="80%" cy="90%" r="70%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>

          <pattern
            id="hexGrid"
            width="100"
            height="173.2"
            patternUnits="userSpaceOnUse"
          >
            {/* 線に太さと強めの不透明度を持たせてはっきり描写する */}
            <path
              d="M50 0 L100 28.86 L100 86.6 L50 115.47 L0 86.6 L0 28.86 Z M50 173.2 L100 144.34 L50 115.47 L0 144.34 Z"
              fill="none"
              stroke="#58A6FF"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>

        <rect width="1080" height="1920" fill="url(#bgGrad)" />

        <g transform={`translate(0, ${offset})`}>
            <rect x="-100" y="-200" width="1280" height="2320" fill="url(#hexGrid)" />
        </g>

        <rect width="1080" height="1920" fill="url(#flare1)" />
        <rect width="1080" height="1920" fill="url(#flare2)" />
      </svg>
    </AbsoluteFill>
  );
};
