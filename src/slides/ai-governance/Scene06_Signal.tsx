import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const SignalInfographic: React.FC<{ progress: number; frame: number; fps: number }> = ({ progress, frame, fps }) => {
  const reticleScale = 1 + 0.05 * Math.sin((frame / fps) * Math.PI * 2);
  return (
    <svg viewBox="0 0 600 800" style={{ width: '100%', height: '100%', maxWidth: 600 }}>
      {/* 縦型の信号機システム */}
      <defs>
        <filter id="glow-green">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-yellow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-red">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 1. Traffic Light (Top) */}
      <g transform="translate(250, 40)" opacity={Math.min(1, progress * 4)}>
        <rect x="0" y="0" width="100" height="260" rx="30" fill="#161B22" stroke="#30363D" strokeWidth="6" />
        <circle cx="50" cy="50" r="30" fill="#2D0B0B" />
        <circle cx="50" cy="130" r="30" fill="#2D1A00" />
        <circle cx="50" cy="210" r="30" fill="#0D2818" />

        {/* Lit Lights */}
        {progress > 0.2 && <circle cx="50" cy="50" r="30" fill="#F85149" filter="url(#glow-red)" />}
        {progress > 0.4 && <circle cx="50" cy="130" r="30" fill="#FFAB00" filter="url(#glow-yellow)" />}
        {progress > 0.6 && <circle cx="50" cy="210" r="30" fill="#3FB950" filter="url(#glow-green)" />}
      </g>

      {/* 2. Code Block with Focus (Bottom) */}
      <g transform="translate(100, 360)" opacity={progress > 0.7 ? Math.min(1, (progress - 0.7) * 3) : 0}>
        <rect x="0" y="0" width="400" height="300" rx="20" fill="#0D1117" stroke="#30363D" strokeWidth="4" />
        
        {/* Code Lines */}
        <rect x="30" y="30" width="340" height="40" rx="10" fill="#3FB950" opacity="0.3" />
        <text x="50" y="55" fill="#3FB950" fontSize="20" fontWeight="bold">// 明確な変換</text>
        
        <rect x="30" y="90" width="340" height="80" rx="10" fill="#FFAB00" opacity="0.4" stroke="#FFAB00" strokeWidth="2" strokeDasharray="8 8" filter="url(#glow-yellow)" />
        <text x="50" y="115" fill="#FFAB00" fontSize="20" fontWeight="bold">/* 注意！ */</text>
        <text x="50" y="145" fill="#FFAB00" fontSize="20" fontWeight="bold">if (ambiguous_logic) ...</text>

        <rect x="30" y="190" width="340" height="80" rx="10" fill="#F85149" opacity="0.5" stroke="#F85149" strokeWidth="4" filter="url(#glow-red)" />
        <text x="50" y="220" fill="#F85149" fontSize="24" fontWeight="bold">/* 危険箇所 要レビュー */</text>
        <text x="50" y="250" fill="#F85149" fontSize="24" fontWeight="bold">AI_GUESSED_CODE();</text>
        
        {/* Targeting Reticle */}
        <path d="M10,80 L30,80 M10,80 L10,100 M390,80 L370,80 M390,80 L390,100 M10,280 L30,280 M10,280 L10,260 M390,280 L370,280 M390,280 L390,260" stroke="#E6EDF3" strokeWidth="6" fill="none" opacity="0.8" transform={`scale(${reticleScale})`} />
      </g>
    </svg>
  );
};

export const Scene06_Signal: React.FC = () => {
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
            color: '#E6EDF3',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          信号機システム
        </h1>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SignalInfographic progress={infographicProgress} frame={frame} fps={fps} />
      </div>

      <div style={{ opacity: messageOpacity, textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontSize: 44, color: '#F85149', fontWeight: 'bold' }}>
          赤と黄だけを
          <br/>
          狙い撃ちレビュー！
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
