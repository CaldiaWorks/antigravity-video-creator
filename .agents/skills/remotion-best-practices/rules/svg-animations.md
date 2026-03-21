---
name: svg-animations
description: SVG animation patterns for Remotion - rotate, translate, scale, stroke-dasharray
metadata:
  tags: svg, animations, animate, animateTransform, stroke-dasharray
---

## SVG animations in Remotion

SVG is a powerful tool for creating illustrations and infographics in Remotion.
However, SVG's native animation elements do NOT work with Remotion's frame-based rendering.

### Forbidden SVG elements

The following SVG elements are time-based and will not render correctly during video export:

- `<animate>` - attribute animation (e.g. `stroke-dasharray`, `opacity`)
- `<animateTransform>` - transform animation (e.g. `rotate`, `translate`, `scale`)
- `<animateMotion>` - motion path animation
- `<set>` - discrete attribute changes

These may appear to work in the Remotion Studio preview (because the browser runs them in real time),
but during rendering each frame is captured as a static snapshot, so these animations will freeze or behave unpredictably.

### How to animate SVG elements

Drive all SVG animations with `useCurrentFrame()` and `useVideoConfig()`, then apply computed values via JSX attributes.

#### Rotation

```tsx
const { fps } = useVideoConfig();
const frame = useCurrentFrame();

// Full rotation every 4 seconds
const rotation = ((frame / fps) / 4) * 360 % 360;

<circle
  cx="0" cy="0" r="40"
  strokeDasharray="16 12"
  transform={`rotate(${rotation})`}
/>
```

#### Translation (linear loop)

```tsx
// Oscillate Y position between -60 and 60 over 1 second
const translateY = -60 + 120 * ((frame / fps) % 1);

<circle cx="100" cy="200" r="8" transform={`translate(0, ${translateY})`} />
```

#### Scale (pulse)

```tsx
// Pulse between 1.0 and 1.05 over 1 second
const scale = 1 + 0.05 * Math.sin((frame / fps) * Math.PI * 2);

<path d="..." transform={`scale(${scale})`} />
```

#### Stroke dasharray (data flow)

```tsx
// Animate stroke dash over 2 seconds
const dashProgress = ((frame / fps) / 2) % 1;
const dashValue = dashProgress * 200;

<path
  d="M0,0 L100,100"
  strokeDasharray={`${dashValue},${200 - dashValue}`}
/>
```

#### Delayed start

```tsx
// Start animation 1 second after the scene begins
const delayedFrame = Math.max(0, frame - fps);
const dashProgress = ((delayedFrame / fps) / 2) % 1;
```

### Passing frame data to SVG components

When SVG illustrations are extracted into separate components, pass `frame` and `fps` as props:

```tsx
const MyIllustration: React.FC<{
  opacity: number;
  frame: number;
  fps: number;
}> = ({ opacity, frame, fps }) => {
  const rotation = ((frame / fps) / 4) * 360 % 360;

  return (
    <svg viewBox="0 0 600 600" style={{ opacity }}>
      <circle transform={`rotate(${rotation})`} />
    </svg>
  );
};

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return <MyIllustration opacity={1} frame={frame} fps={fps} />;
};
```

### Smooth easing with interpolate

For non-linear motion, use Remotion's `interpolate` with easing:

```tsx
import { interpolate, Easing } from 'remotion';

// Smooth rotation with ease-in-out
const rotation = interpolate(
  frame % (fps * 4),
  [0, fps * 4],
  [0, 360],
  { easing: Easing.inOut(Easing.ease) }
);
```
