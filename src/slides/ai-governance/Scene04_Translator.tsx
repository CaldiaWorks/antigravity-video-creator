import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const PipelineInfographic: React.FC<{ progress: number; frame: number; fps: number }> = ({ progress, frame, fps }) => {
  const ballY1 = -60 + 120 * ((frame / fps) % 1);
  const ballY2 = -60 + 120 * ((frame / fps) % 1);
  const gear1Rotation = ((frame / fps) / 4) * 360 % 360;
  const gear2Rotation = 360 - ((frame / fps) / 3) * 360 % 360;
  return (
    <svg viewBox="0 0 600 800" style={{ width: '100%', height: '100%', maxWidth: 600 }}>
      {/* 縦型のパイプライン */}
      <defs>
        <filter id="glow-blue">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-cyan">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 1. INPUT (Top) */}
      <g transform="translate(150, 50)">
        <rect x="0" y="0" width="300" height="120" rx="16" fill="#161B22" stroke="#8B949E" strokeWidth="4" />
        <path d="M40,30 L100,30 M40,60 L140,60 M40,90 L260,90" stroke="#484F58" strokeWidth="8" strokeLinecap="round" />
        <text x="150" y="60" fill="#8B949E" fontSize="24" textAnchor="middle" fontWeight="bold">Legacy Code</text>
      </g>

      {/* Pipe 1 */}
      <g opacity={progress > 0.1 ? 1 : 0}>
        <rect x="280" y="170" width="40" height="130" fill="#161B22" stroke="#30363D" strokeWidth="4" />
        <circle cx="300" cy="235" r="8" fill="#58A6FF" filter="url(#glow-blue)" transform={progress > 0.1 ? `translate(0, ${ballY1})` : undefined} />
      </g>

      {/* 2. PROCESS / AI (Middle) */}
      <g transform="translate(100, 300)" opacity={progress > 0.2 ? Math.min(1, (progress - 0.2) * 5) : 0}>
        <rect x="0" y="0" width="400" height="200" rx="20" fill="#0D2137" stroke="#00B8D4" strokeWidth="6" filter="url(#glow-cyan)" />
        <text x="200" y="50" fill="#00B8D4" fontSize="28" textAnchor="middle" fontWeight="bold">AI TRANSLATOR</text>
        
        {/* Animated Gears */}
        <g transform="translate(140, 120)">
          <circle cx="0" cy="0" r="40" fill="none" stroke="#58A6FF" strokeWidth="6" strokeDasharray="16 10" transform={`rotate(${gear1Rotation})`} />
          <circle cx="0" cy="0" r="15" fill="#58A6FF" />
        </g>
        <g transform="translate(250, 120)">
          <circle cx="0" cy="0" r="30" fill="none" stroke="#00B8D4" strokeWidth="6" strokeDasharray="12 12" transform={`rotate(${gear2Rotation})`} />
          <circle cx="0" cy="0" r="10" fill="#00B8D4" />
        </g>
      </g>

      {/* Pipe 2 */}
      <g opacity={progress > 0.5 ? 1 : 0}>
        <rect x="280" y="500" width="40" height="130" fill="#161B22" stroke="#30363D" strokeWidth="4" />
        <circle cx="300" cy="565" r="8" fill="#3FB950" filter="url(#glow-cyan)" transform={progress > 0.5 ? `translate(0, ${ballY2})` : undefined} />
      </g>

      {/* 3. OUTPUT (Bottom) */}
      <g transform="translate(150, 630)" opacity={progress > 0.6 ? Math.min(1, (progress - 0.6) * 5) : 0}>
        <rect x="0" y="0" width="300" height="120" rx="16" fill="#0D2818" stroke="#3FB950" strokeWidth="4" />
        <path d="M80,40 L220,40 M80,80 L180,80" stroke="#3FB950" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="40" r="8" fill="#3FB950" />
        <circle cx="50" cy="80" r="8" fill="#3FB950" />
        <text x="150" y="60" fill="#3FB950" fontSize="24" textAnchor="middle" fontWeight="bold">Specification</text>
      </g>
    </svg>
  );
};

export const Scene04_Translator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
      <div style={{ textAlign: 'center', opacity: titleOpacity, marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#E6EDF3',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          AIは「翻訳者」
        </h1>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PipelineInfographic progress={infographicProgress} frame={frame} fps={fps} />
      </div>

      <div style={{ opacity: messageOpacity, textAlign: 'center', marginTop: 40 }}>
        <p style={{ fontSize: 40, color: '#FFAB00', fontWeight: 'bold' }}>
          コードではなく、
          <br/>
          仕様を取り戻す
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
