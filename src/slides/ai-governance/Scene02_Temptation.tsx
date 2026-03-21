import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const BlackboxIllustration: React.FC<{
  scale: number;
  opacity: number;
  pulsePhase: number;
  frame: number;
  fps: number;
}> = ({ scale, opacity, pulsePhase, frame, fps }) => {
  const glowOpacity = 0.4 + 0.2 * Math.sin(pulsePhase * 2);
  const ring1Rotation = ((frame / fps) / 10) * 360 % 360;
  const ring2Rotation = 360 - ((frame / fps) / 15) * 360 % 360;
  const dashCycle1 = ((frame / fps) / 2) % 1;
  const dashValue1 = dashCycle1 * 200;
  const dashCycle2 = (Math.max(0, frame - fps) / fps / 2) % 1;
  const dashValue2 = dashCycle2 * 200;

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        maxWidth: 600,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <defs>
        <radialGradient id="boxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#58A6FF" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#0D1117" stopOpacity="0" />
        </radialGradient>
        <filter id="neon">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* バックグラウンドの光 */}
      <circle cx="300" cy="300" r="240" fill="url(#boxGlow)" />
      
      {/* ブラックボックス（アイソメトリック） */}
      <g transform="translate(300, 300)">
        
        {/* 背景のアニメーションリング */}
        <circle cx="0" cy="0" r="160" fill="none" stroke="#58A6FF" strokeWidth="2" strokeDasharray="10 20" opacity="0.5" transform={`rotate(${ring1Rotation})`} />

        <circle cx="0" cy="0" r="200" fill="none" stroke="#FFAB00" strokeWidth="1" strokeDasharray="50 50" opacity="0.3" transform={`rotate(${ring2Rotation})`} />

        {/* Top Face */}
        <path d="M0,-100 L160,-20 L0,60 L-160,-20 Z" fill="#21262D" stroke="#58A6FF" strokeWidth="4" />
        
        {/* Left Face */}
        <path d="M-160,-20 L0,60 L0,200 L-160,120 Z" fill="#0D1117" stroke="#58A6FF" strokeWidth="4" />
        
        {/* Right Face */}
        <path d="M0,60 L160,-20 L160,120 L0,200 Z" fill="#161B22" stroke="#58A6FF" strokeWidth="4" />

        {/* 内部回路・データの流れるライン */}
        <path d="M-80,20 L-40,40 L-40,120" fill="none" stroke="#00B8D4" strokeWidth="4" opacity="0.7" strokeDasharray={`${dashValue1},${200 - dashValue1}`} />
        <path d="M80,20 L40,40 L40,120" fill="none" stroke="#00B8D4" strokeWidth="4" opacity="0.7" strokeDasharray={`${dashValue2},${200 - dashValue2}`} />
        <path d="M0,-60 L50,-35 L0,-10 L-50,-35 Z" fill="none" stroke="#FFAB00" strokeWidth="3" opacity="0.8" />
        
        {/* 謎めいたコアの中心点 */}
        <circle cx="0" cy="60" r="15" fill="#FFAB00" filter="url(#neon)" />
      </g>
    </svg>
  );
};

export const Scene02_Temptation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const illustrationScale = interpolate(
    frame,
    [0, fps * 2, fps * 3],
    [0.85, 1.05, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const illustrationOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [fps * 0.3, fps * 1.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warningOpacity = interpolate(frame, [fps * 2, fps * 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulsePhase = (frame / fps) * Math.PI * 2 * 0.4;

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
      <div style={{ marginBottom: 40, width: '100%' }}>
        <BlackboxIllustration
          scale={illustrationScale}
          opacity={illustrationOpacity}
          pulsePhase={pulsePhase}
          frame={frame}
          fps={fps}
        />
      </div>

      <div style={{ textAlign: 'center', opacity: textOpacity, marginBottom: 60, width: '100%' }}>
        <p
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#FFAB00',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          「コードごと
          <br />
          丸投げしますか？」
        </p>
      </div>

      <div style={{ textAlign: 'center', opacity: warningOpacity, width: '100%' }}>
        <p
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#F85149',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          ブラックボックスを
          <br />
          誰が保証する？
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
