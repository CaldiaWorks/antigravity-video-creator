import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const ConclusionInfographic: React.FC<{ progress: number; frame: number; fps: number }> = ({ progress, frame, fps }) => {
  const gearRotation = ((frame / fps) / 4) * 360 % 360;
  return (
    <svg viewBox="0 0 600 800" style={{ width: '100%', height: '100%', maxWidth: 600 }}>
      {/* 縦型インフォグラフィック */}
      <defs>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3FB950" />
        </marker>
      </defs>

      {/* 1. Silver Bullet (Top) */}
      <g transform="translate(300, 150)" opacity={progress < 0.3 ? Math.min(1, progress * 4) : Math.max(0, 1 - (progress - 0.3) * 4)}>
        <path d="M-60,-20 L40,-20 Q70,0 40,20 L-60,20 Z" fill="#8B949E" stroke="#E6EDF3" strokeWidth="4" />
        <rect x="-70" y="-30" width="20" height="60" fill="#E6EDF3" />
        <text x="0" y="80" fill="#8B949E" fontSize="36" textAnchor="middle" fontWeight="bold">SILVER BULLET</text>
        
        {/* Red X */}
        {progress > 0.1 && (
          <g>
            <line x1="-80" y1="-50" x2="80" y2="50" stroke="#F85149" strokeWidth="16" strokeLinecap="round" />
            <line x1="-80" y1="50" x2="80" y2="-50" stroke="#F85149" strokeWidth="16" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* 2. Process & 10x (Bottom) */}
      <g opacity={progress > 0.3 ? Math.min(1, (progress - 0.3) * 4) : 0}>
        
        {/* Human Node */}
        <g transform="translate(150, 400)">
          <circle cx="0" cy="0" r="60" fill="#161B22" stroke="#FFAB00" strokeWidth="6" filter="url(#glow-gold)" />
          <path d="M-30,30 Q0,-50 30,30" fill="none" stroke="#FFAB00" strokeWidth="6" />
          <circle cx="0" cy="-10" r="15" fill="#FFAB00" />
          <text x="0" y="100" fill="#FFAB00" fontSize="32" textAnchor="middle" fontWeight="bold">HUMAN</text>
        </g>

        {/* AI Node */}
        <g transform="translate(450, 400)">
          <rect x="-50" y="-50" width="100" height="100" rx="15" fill="#0D2137" stroke="#00B8D4" strokeWidth="6" />
          <circle cx="-15" cy="0" r="6" fill="#00B8D4" />
          <circle cx="15" cy="0" r="6" fill="#00B8D4" />
          <text x="0" y="100" fill="#00B8D4" fontSize="32" textAnchor="middle" fontWeight="bold">AI</text>
        </g>

        {/* Gear Sync */}
        <g transform="translate(300, 400)">
          <circle cx="0" cy="0" r="40" fill="none" stroke="#3FB950" strokeWidth="4" strokeDasharray="16 12" transform={`rotate(${gearRotation})`} />
          <path d="M-70,-10 L70,-10" stroke="#3FB950" strokeWidth="6" markerEnd="url(#arrow-green)" />
          <path d="M70,10 L-70,10" stroke="#00B8D4" strokeWidth="6" />
        </g>

        {/* 10x Graph */}
        {progress > 0.6 && (
          <g transform="translate(300, 650)" opacity={Math.min(1, (progress - 0.6) * 3)}>
            <path d="M-150,50 L-50,-20 L50,-10 L150,-150" fill="none" stroke="#3FB950" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="150" cy="-150" r="12" fill="#3FB950" filter="url(#glow-gold)"/>
            <text x="150" y="-180" fill="#E6EDF3" fontSize="64" fontWeight="bold" textAnchor="middle">10x</text>
            <text x="150" y="-240" fill="#FFAB00" fontSize="28" fontWeight="bold" textAnchor="middle">OUTPUT</text>
          </g>
        )}
      </g>
    </svg>
  );
};

export const Scene07_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const infographicProgress = interpolate(frame, [fps * 1, fps * 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Opacity = interpolate(frame, [fps * 3, fps * 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div style={{ opacity: line1Opacity, textAlign: 'center', marginBottom: 20 }}>
        <p
          style={{
            fontSize: 60,
            color: '#8B949E',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          AIは<br/>
          <span style={{ color: '#E6EDF3', fontSize: 72 }}>銀の弾丸</span>ではない。
        </p>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <ConclusionInfographic progress={infographicProgress} frame={frame} fps={fps} />
      </div>

      <div style={{ opacity: line3Opacity, textAlign: 'center', paddingTop: 20 }}>
        <p
          style={{
            fontSize: 54,
            color: '#3FB950',
            lineHeight: 1.5,
            fontWeight: 800,
            margin: '0 0 20px 0',
          }}
        >
          プロセス設計で、
          <br/>
          人は10倍になる。
        </p>
        <p
          style={{
            fontSize: 36,
            color: '#00B8D4',
            fontWeight: 600,
            margin: 0,
          }}
        >
          バイブコーディングを捨てよ。
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
