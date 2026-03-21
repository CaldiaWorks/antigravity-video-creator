import React from 'react';
import {
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  random,
} from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

export interface CharacterDef {
  idle: string;
  speaking: string;
  blinkIdle: string;
  blinkSpeaking: string;
}

export interface AvatarProps {
  audioSrc: string;
  characterDef: CharacterDef;
  threshold?: number;
  width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  audioSrc,
  characterDef,
  threshold = 0.05,
  width = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(audioSrc);

  return (
    <AvatarRenderer
      audioSrc={audioSrc}
      characterDef={characterDef}
      threshold={threshold}
      width={width}
      audioData={audioData}
      frame={frame}
      fps={fps}
    />
  );
};

const AvatarRenderer: React.FC<AvatarProps & { audioData: any; frame: number; fps: number }> = ({
  characterDef,
  threshold = 0.05,
  width = 600,
  audioData,
  frame,
  fps,
}) => {
  if (!audioData) {
    return <Img src={characterDef.idle} style={{ width, objectFit: 'contain' }} />;
  }

  // 現フレームの音量レベルを解析
  const audioVisualizer = visualizeAudio({ fps, frame, audioData, numberOfSamples: 16 });
  const currentVolume = audioVisualizer.reduce((acc, val) => acc + val, 0) / audioVisualizer.length;
  const isSpeaking = currentVolume > threshold;
  
  // Bounce効果用: わずかに前(5フレーム前)の音量を解析し、閾値を跨いだ立ち上がり(Bounceトリガー)を検知
  const pastFrame = Math.max(0, frame - 5);
  const pastAudioVisualizer = visualizeAudio({ fps, frame: pastFrame, audioData, numberOfSamples: 16 });
  const pastVolume = pastAudioVisualizer.reduce((acc, val) => acc + val, 0) / pastAudioVisualizer.length;

  // 1. 決定論的 擬似ランダム瞬きロジック
  // 秒(セグメント)の切り替わりごとにシード値を固定して乱数を生む
  const secondIndex = Math.floor(frame / fps);
  const blinkProb = random(`blink-${secondIndex}`);
  // 約30%の確率で、その秒の最初の4フレーム(1/15秒)だけ瞬きを行う
  const isBlinkSecond = blinkProb < 0.3;
  const frameInSecond = frame % fps;
  const isBlinking = isBlinkSecond && frameInSecond < 4;

  // 画像の選択 (veadotube mini の4ステート構造)
  let targetImage = characterDef.idle;
  if (!isBlinking && isSpeaking) targetImage = characterDef.speaking;
  else if (isBlinking && !isSpeaking) targetImage = characterDef.blinkIdle;
  else if (isBlinking && isSpeaking) targetImage = characterDef.blinkSpeaking;

  // 2. 呼吸ループアニメーション (Sine波によるY軸7%の伸縮)
  // (Math.sin(frame / 20) + 1) / 2 で 0〜1 の緩やかな波長を作り、最大7%(0.07)の伸びを加える
  const sineWave = (Math.sin(frame / 20) + 1) / 2;
  const breathingScaleY = 1 + (sineWave * 0.07);

  // 3. Bounce(跳ね) リアクションロジック
  // 音量が閾値を超えた(急激に上がった)瞬間の差分からバウンス強度を計算
  const volumeDelta = currentVolume - pastVolume;
  // 単語ごとの不自然なピクつきを防ぐため、バウンス(跳ね)発動の閾値を「0.06以上急激に音量が上がった瞬間」に厳しく限定
  const jumpScale = (isSpeaking && volumeDelta > 0.06) 
    ? interpolate(volumeDelta, [0.06, 0.15], [1, 1.15], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) 
    : 1;
  // 話している最中に音量の強弱で常時ブルブルと拡大縮小し続けるのを見苦しくないよう、等倍(1)に固定
  const baseScale = 1;
  const finalScale = Math.max(baseScale, jumpScale);

  return (
    <div
      style={{
        width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // 画像をコンテナ中央に固定
        // 全体の跳ねスケール(finalScale)に、Y軸のみ呼吸用スケール(breathingScaleY)を乗算
        transform: `scale(${finalScale}, ${finalScale * breathingScaleY})`,
        transformOrigin: 'center center', // 画像中央を固定して伸縮
      }}
    >
      <Img src={targetImage} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
    </div>
  );
};
