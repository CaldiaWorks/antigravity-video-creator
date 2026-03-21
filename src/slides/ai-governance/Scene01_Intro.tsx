import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

const EditorIllustration: React.FC<{ opacity: number; cursorOpacity: number }> = ({
  opacity,
  cursorOpacity,
}) => (
  <svg
    viewBox="0 0 1000 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', opacity }}
  >
    <rect x="0" y="0" width="1000" height="800" rx="30" fill="#161B22" />
    <rect x="0" y="0" width="1000" height="80" rx="30" fill="#21262D" />
    <circle cx="50" cy="40" r="14" fill="#F85149" opacity="0.8" />
    <circle cx="95" cy="40" r="14" fill="#FFAB00" opacity="0.8" />
    <circle cx="140" cy="40" r="14" fill="#3FB950" opacity="0.8" />
    <rect x="200" y="20" width="300" height="45" rx="10" fill="#0D1117" />
    <text x="230" y="50" fill="#8B949E" fontSize="24" fontFamily="monospace">Legacy.cs</text>

    <text y="180" fontFamily="monospace" fontSize="32">
      <tspan x="80" fill="#FF7B72">public void</tspan>
      <tspan fill="#D2A8FF"> Execute()</tspan>
    </text>
    <text y="240" fontFamily="monospace" fontSize="32">
      <tspan x="120" fill="#FF7B72">for</tspan>
      <tspan fill="#8B949E"> (</tspan>
      <tspan fill="#FF7B72">int</tspan>
      <tspan fill="#C9D1D9"> i = 0...</tspan>
    </text>
    <text y="300" fontFamily="monospace" fontSize="32">
      <tspan x="160" fill="#FF7B72">if</tspan>
      <tspan fill="#8B949E"> (item == 1) </tspan>
      <tspan fill="#D2A8FF">Calc()</tspan>
    </text>
    <text y="360" fontFamily="monospace" fontSize="32">
      <tspan x="80" fill="#8B949E">{'}'}</tspan>
    </text>

    {/* cursor */}
    <rect x="340" y="270" width="20" height="40" fill="#58A6FF" opacity={cursorOpacity} />
  </svg>
);

export const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const illustrationOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [fps * 0.3, fps * 1.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bodyOpacity = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOpacity = Math.round(frame / (fps * 0.5)) % 2 === 0 ? 1 : 0.2;

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
      <div style={{ width: '100%', marginBottom: 80 }}>
        <EditorIllustration
          opacity={illustrationOpacity}
          cursorOpacity={cursorOpacity}
        />
      </div>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <div
          style={{
            fontSize: 48,
            color: '#8B949E',
            fontFamily: 'monospace',
            marginBottom: 40,
            opacity: titleOpacity,
            letterSpacing: 4,
          }}
        >
          // NO_SPEC
        </div>
        <h1
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: '#E6EDF3',
            lineHeight: 1.2,
            opacity: titleOpacity,
            marginBottom: 60,
          }}
        >
          数万行の<br />
          沈黙コード
        </h1>
        <p
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#F85149',
            lineHeight: 1.5,
            opacity: bodyOpacity,
          }}
        >
          仕様書ゼロ。<br />
          設計者は不在。
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
