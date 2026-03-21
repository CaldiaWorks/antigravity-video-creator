import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const DelegationInfographic: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <svg viewBox="0 0 600 800" style={{ width: '100%', height: '100%', maxWidth: 600 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Human (Top) */}
      <circle cx="300" cy="150" r="70" fill="#161B22" stroke="#8B949E" strokeWidth="6" />
      <path d="M250,220 Q300,100 350,220" fill="none" stroke="#8B949E" strokeWidth="6" />
      <circle cx="300" cy="120" r="25" fill="#8B949E" />
      <text x="300" y="270" fill="#8B949E" fontSize="36" textAnchor="middle" fontWeight="bold">HUMAN</text>

      {/* AI (Bottom) */}
      <rect x="230" y="550" width="140" height="140" rx="20" fill="#0D2137" stroke="#00B8D4" strokeWidth="6" filter="url(#glow)" />
      <circle cx="270" cy="600" r="10" fill="#00B8D4" />
      <circle cx="330" cy="600" r="10" fill="#00B8D4" />
      <path d="M260,650 Q300,670 340,650" fill="none" stroke="#00B8D4" strokeWidth="6" strokeLinecap="round" />
      <text x="300" y="740" fill="#00B8D4" fontSize="36" textAnchor="middle" fontWeight="bold">AI</text>

      {/* Bad path (Delegation) */}
      <g opacity={Math.min(1, progress * 2)}>
        <line x1="200" y1="300" x2="200" y2="520" stroke="#F85149" strokeWidth="8" strokeDasharray="16 16" opacity="0.6"/>
        <rect x="70" y="380" width="260" height="80" rx="12" fill="#2D0B0B" stroke="#F85149" strokeWidth="4" />
        <text x="200" y="430" fill="#F85149" fontSize="28" textAnchor="middle" fontWeight="bold">「全部よろしく」</text>
        
        {progress > 0.6 && (
          <g transform="translate(200, 500)">
            <line x1="-30" y1="-30" x2="30" y2="30" stroke="#F85149" strokeWidth="12" strokeLinecap="round" />
            <line x1="-30" y1="30" x2="30" y2="-30" stroke="#F85149" strokeWidth="12" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* Good path (Control) */}
      <g opacity={progress > 0.5 ? Math.min(1, (progress - 0.5) * 2) : 0}>
        <line x1="400" y1="300" x2="400" y2="520" stroke="#3FB950" strokeWidth="8" />
        <rect x="270" y="380" width="260" height="80" rx="12" fill="#0D2818" stroke="#3FB950" strokeWidth="4" />
        <text x="400" y="430" fill="#3FB950" fontSize="28" textAnchor="middle" fontWeight="bold">「設計方針」</text>
        
        {progress > 0.8 && (
          <g transform="translate(400, 500)">
            <path d="M-20,0 L-5,15 L25,-15" fill="none" stroke="#3FB950" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </svg>
  );
};

export const Scene03_Rule: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ruleOpacity = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleScale = interpolate(frame, [0, fps * 0.8], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const infographicProgress = interpolate(frame, [fps * 1, fps * 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const detailOpacity = interpolate(frame, [fps * 2.5, fps * 3.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div
        style={{
          textAlign: 'center',
          opacity: ruleOpacity,
          transform: `scale(${ruleScale})`,
          marginBottom: 40
        }}
      >
        <p style={{ fontSize: 40, color: '#8B949E', margin: '0 0 16px 0', fontWeight: 'bold' }}>
          ただ一つのルール
        </p>
        <h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: '#F85149',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          AI丸投げ禁止
        </h1>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DelegationInfographic progress={infographicProgress} />
      </div>

      <div style={{ opacity: detailOpacity, textAlign: 'center', marginTop: 40 }}>
        <p style={{ fontSize: 48, color: '#FFAB00', lineHeight: 1.5, fontWeight: 'bold' }}>
          「全部よろしく」<br/>は絶対NG
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
