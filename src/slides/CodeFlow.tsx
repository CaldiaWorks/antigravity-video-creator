import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CodeFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animations
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1.0,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  // Particles
  const particles = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => {
      const x = random(i) * width;
      const y = random(i + 100) * height;
      const size = random(i + 200) * 3 + 1; // 1-4px
      const speed = random(i + 300) * 2 - 1; // -1 to 1 drift
      return { x, y, size, speed };
    });
  }, [height, width]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => {
        const yDrift = p.y + p.speed * frame;
        const opacityP = interpolate(frame, [0, 30], [0, 0.6], { extrapolateRight: 'clamp' }); // Fade in particles too
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: yDrift % height, // simple wrap
              width: p.size,
              height: p.size,
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              opacity: opacityP,
            }}
          />
        );
      })}

      {/* Main Title */}
      <h1
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: 'white',
          fontSize: 120,
          fontWeight: 'bold',
          opacity,
          transform: `scale(${scale})`,
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }}
      >
        CALDIA WORKS
      </h1>
    </AbsoluteFill>
  );
};
