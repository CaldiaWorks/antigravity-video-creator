import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import { CyberBackground } from './components/CyberBackground';

export const Scene08_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const contactOpacity = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: 'center',
          marginBottom: 80,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#E6EDF3',
            lineHeight: 1.4,
            marginBottom: 20,
          }}
        >
          レガシーシステム刷新
          <br />
          内製化支援
        </h1>
        <p
          style={{
            fontSize: 48,
            color: '#8B949E',
            fontWeight: 600,
          }}
        >
          ご相談はお気軽に
        </p>
      </div>

      {/* Contact Info */}
      <div
        style={{
          opacity: contactOpacity,
          textAlign: 'center',
          backgroundColor: '#161B22',
          padding: '60px',
          borderRadius: 24,
          border: '2px solid #30363D',
          width: '90%',
          maxWidth: 900,
        }}
      >
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
          <svg width="240" height="60" viewBox="0 0 200 40" fill="none">
            {/* CaldiaWorks Logo representation */}
            <rect x="0" y="0" width="40" height="40" rx="8" fill="#3FB950" />
            <path d="M10 20 L20 10 L30 20 L20 30 Z" fill="#fff" />
            <text x="60" y="28" fill="#E6EDF3" fontSize="24" fontWeight="bold">
              Caldia Works
            </text>
          </svg>
        </div>

        <p
          style={{
            fontSize: 60,
            color: '#58A6FF',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: 2,
            margin: 0,
          }}
        >
          caldiaworks.jp
        </p>
      </div>
      </div>
    </AbsoluteFill>
  );
};
