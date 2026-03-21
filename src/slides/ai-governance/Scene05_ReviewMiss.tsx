import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const ReviewMissInfographic: React.FC<{ progress: number; frame: number; fps: number }> = ({ progress, frame, fps }) => {
  const stackY = -100 + 200 * ((frame / fps / 2) % 1);
  const scanX = -50 + 100 * ((frame / fps) % 1);
  return (
    <svg viewBox="0 0 600 800" style={{ width: '100%', height: '100%', maxWidth: 600 }}>
      <defs>
        <filter id="glow-red">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Checklist Stack (Endless) */}
      <g opacity={Math.min(1, progress * 4)}>
        {/* Animated Stack */}
        <g transform={`translate(0, ${stackY})`}>
          <rect x="150" y="50" width="300" height="60" rx="10" fill="#161B22" stroke="#30363D" strokeWidth="4" />
          <path d="M170,80 L190,100 L210,60" fill="none" stroke="#3FB950" strokeWidth="6" strokeLinecap="round" />
          
          <rect x="150" y="150" width="300" height="60" rx="10" fill="#161B22" stroke="#30363D" strokeWidth="4" />
          <path d="M170,180 L190,200 L210,160" fill="none" stroke="#3FB950" strokeWidth="6" strokeLinecap="round" />

          {/* The Missed Bug */}
          <rect x="130" y="250" width="340" height="70" rx="10" fill="#2D0B0B" stroke="#F85149" strokeWidth="6" filter="url(#glow-red)" />
          <text x="300" y="295" fill="#F85149" fontSize="26" textAnchor="middle" fontWeight="bold">CRITICAL_BUG</text>

          <rect x="150" y="350" width="300" height="60" rx="10" fill="#161B22" stroke="#30363D" strokeWidth="4" />
          <path d="M170,380 L190,400 L210,360" fill="none" stroke="#3FB950" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>

      {/* Human Eye Scanning */}
      <g transform="translate(300, 550)" opacity={progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0}>
        <path d="M-60,0 Q0,-60 60,0 Q0,60 -60,0 Z" fill="#0D1117" stroke="#58A6FF" strokeWidth="6" />
        <circle cx="0" cy="0" r="20" fill="#58A6FF" />
        <line x1="0" y1="-80" x2="0" y2="-250" stroke="#58A6FF" strokeWidth="4" strokeDasharray="16 16" opacity="0.6" transform={`translate(${scanX}, 0)`} />
        <text x="0" y="90" fill="#58A6FF" fontSize="28" textAnchor="middle" fontWeight="bold">HUMAN REVIEW</text>
      </g>

      {/* Alert Override */}
      {progress > 0.7 && (
        <g>
          <rect x="100" y="300" width="400" height="120" rx="20" fill="#F85149" filter="url(#glow-red)" />
          <text x="300" y="375" fill="#0D1117" fontSize="48" textAnchor="middle" fontWeight="bold">REVIEW_LIMIT_EXCEEDED</text>
        </g>
      )}
    </svg>
  );
};

export const Scene05_ReviewMiss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const infographicProgress = interpolate(frame, [fps * 1, fps * 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const messageOpacity = interpolate(frame, [fps * 3, fps * 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <CyberBackground />
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '240px 100px 420px 100px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
      <div style={{ textAlign: 'center', opacity: titleOpacity, marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#F85149',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          AIではなく<br/>人間のミス
        </h1>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <ReviewMissInfographic progress={infographicProgress} frame={frame} fps={fps} />
      </div>

      <div style={{ opacity: messageOpacity, textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontSize: 50, color: '#FFAB00', fontWeight: 'bold' }}>
          レビュー量が限界突破
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
