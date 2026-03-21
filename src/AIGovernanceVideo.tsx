import React from 'react';
import { Sequence, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Scene01_Intro } from './slides/ai-governance/Scene01_Intro';
import { Scene02_Temptation } from './slides/ai-governance/Scene02_Temptation';
import { Scene03_Rule } from './slides/ai-governance/Scene03_Rule';
import { Scene04_Translator } from './slides/ai-governance/Scene04_Translator';
import { Scene05_ReviewMiss } from './slides/ai-governance/Scene05_ReviewMiss';
import { Scene06_Signal } from './slides/ai-governance/Scene06_Signal';
import { Scene07_Conclusion } from './slides/ai-governance/Scene07_Conclusion';
import { Scene08_CTA } from './slides/ai-governance/Scene08_CTA';

// Audio durations in seconds (from ffprobe)
const SCENE_DURATIONS_SEC = [
  13.28, // scene01
  15.2, // scene02
  14.64, // scene03
  16.0, // scene04
  12.24, // scene05
  17.28, // scene06
  14.8, // scene07
  5.76, // scene08
];

const FPS = 30;
// Extra padding frames after audio ends
const PADDING_FRAMES = Math.round(0.5 * FPS);

const sceneDurationFrames = SCENE_DURATIONS_SEC.map(
  (sec) => Math.ceil(sec * FPS) + PADDING_FRAMES
);

export const AI_GOVERNANCE_TOTAL_FRAMES = sceneDurationFrames.reduce(
  (a, b) => a + b,
  0
);

const AUDIO_FILES = [
  'audio/scene01_intro.wav',
  'audio/scene02_temptation.wav',
  'audio/scene03_rule.wav',
  'audio/scene04_translator.wav',
  'audio/scene05_review_miss.wav',
  'audio/scene06_signal.wav',
  'audio/scene07_conclusion.wav',
  'audio/scene08_cta.wav',
];

const SCENES = [
  Scene01_Intro,
  Scene02_Temptation,
  Scene03_Rule,
  Scene04_Translator,
  Scene05_ReviewMiss,
  Scene06_Signal,
  Scene07_Conclusion,
  Scene08_CTA,
];

// BGM volume is pre-adjusted to -20dB peak in the audio file
const BGM_VOLUME = 1.0;

export const AIGovernanceVideo: React.FC = () => {
  let currentFrame = 0;

  return (
    <div style={{ flex: 1, backgroundColor: '#0D1117' }}>
      {/* BGM track — cut from 1:14, looped to cover entire video */}
      <Audio
        src={staticFile('audio/bgm_fastboi_from114.mp3')}
        volume={BGM_VOLUME}
        loop
      />

      {SCENES.map((SceneComponent, i) => {
        const from = currentFrame;
        const duration = sceneDurationFrames[i]!;
        const audioFile = AUDIO_FILES[i]!;
        currentFrame += duration;

        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <SceneComponent />
            <Audio src={staticFile(audioFile)} />
          </Sequence>
        );
      })}
    </div>
  );
};
