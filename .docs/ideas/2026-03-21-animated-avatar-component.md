# Remotion PNGtuberコンポーネント（Animated Avatar）

- Date: 2026-03-21
- Status: Draft

## What

Remotionでveadotube miniのようなPNGtuber（音声反応アバター）コンポーネントを作成する。

`@remotion/media-utils` の `useAudioData` と `visualizeAudio` を用いて、コンポーネント内部で音声ファイルの音量をフレームごとに解析する。veadotube miniと同様に、目の開閉 × 口の開閉の組み合わせによる4枚の完成画像（idle / speaking / blinkIdle / blinkSpeaking）を、音量閾値と瞬きタイミングに基づいて切り替える方式でリップシンクと瞬きを実現する。リアルタイムのマイク入力ではなく、配置済みの音声ファイルを対象とする。

加えて、呼吸ループや音量閾値超え時のBounce（跳ね）リアクションなどのモーションにより、アバターに生命感を持たせる。

複数キャラクター対応で、各アバターが個別の音声ソースに反応する自己完結型コンポーネントとして設計する。

## Why

スライドプレゼンテーション動画や解説動画において、動きのあるアバターを画面に配置することで、視聴者の注目を引きつけ、退屈させない動画体験を提供する。

将来的にキャラクターのバリエーションや表情差分パーツが増えた際にも作り直しを避けるため、初期設計の段階から拡張を見据えた構造にしておく。

## Scope

### In Scope

- アバターコンポーネント（Avatar.tsx）の新規作成
- `@remotion/media-utils` の `useAudioData` / `visualizeAudio` によるコンポーネント内部での音声解析
- veadotube mini方式の4枚完成画像切替（目開閉 × 口開閉 = idle / speaking / blinkIdle / blinkSpeaking）
- 音量の閾値判定による口パク（idle ↔ speaking、blinkIdle ↔ blinkSpeaking の切替）
- `useCurrentFrame()` ベースの瞬きアニメーション（決定論的擬似ランダム間隔で idle/speaking ↔ blinkIdle/blinkSpeaking を切替）
- `useCurrentFrame()` ベースの呼吸ループアニメーション（Sineカーブ）
- 音量が閾値を超えた際のBounce（跳ね）リアクション
- 複数キャラクター対応（Propsでキャラクター定義を渡して画像セットを切替）
- 各アバターが個別の音声ソースに反応する自己完結型の設計
- 画像素材の制作ルール策定（4枚すべてを同一キャンバスサイズ・同一アンカーで書き出す）
- 将来の表情差分（喜怒哀楽等）追加を見据えた拡張可能な構造設計

### Out of Scope

- 実際の表情差分素材の導入・適用（アーキテクチャとしてのサポートのみ）
- 視線トラッキングやマウス・キーボード操作との連動（動画出力用途のため）
- Live2DやSpine等のサードパーティモデリングツール連携

## Stakeholders

- Target users: スライド動画・技術解説動画の視聴者、動画制作者
- Affected systems: `src/components/` 配下のコンポーネント群、Root.tsx のComposition設定

## Approaches

### Approach 1: 自己完結型コンポーネント (Recommended)

音声パスをPropsで受け取り、コンポーネント内部で `useAudioData` / `visualizeAudio` による音声解析を完結させる。各アバターが独立して自分の音声ソースを解析・反応する。

**Feasibility Evaluation:**

- **Differentiation**: `<Avatar audioSrc={...} characterDef={...} />` の1タグで配置が完結する。音声解析の外部依存がなく、使う側のコードが最小
- **Technical risks**: Remotionの並列レンダリング仕様への適合が必要。フレーム間の状態依存（useState等の持ち越し）を避け、`useCurrentFrame()` からの純粋計算でアニメーションを構築する必要がある
- **Pre-mortem**: 失敗するとすれば、画像素材のアンカー統一ルールが守られず座標のズレが泥沼化するか、フレーム間の状態遷移に依存したアニメーションを組んでしまいRemotionの並列レンダリングで破綻すること

### Approach 2: Hook分離型

音声解析を `useAvatarAudio(audioSrc)` のようなカスタムHookに切り出し、アバターコンポーネントはvolume値のみPropsで受け取る。

**Feasibility Evaluation:**

- **Differentiation**: 音声解析とUI描画の責務が分離される。テスト時にvolume値を直接渡せる
- **Technical risks**: 使う側で毎回Hookを呼んでアバターに渡す記述が必要になる。アバターごとに異なる音声を扱う場合、Hookとコンポーネントが常にセットで使われるため、分離のメリットが薄い
- **Pre-mortem**: 「分離したのに結局セットでしか使わない」という過剰設計に陥り、使う側のボイラープレートが増えるだけで終わる

## Decision

**Approach 1: 自己完結型コンポーネント** を採用する。

各アバターが個別の音声ソースに反応する要件において、コンポーネントが自分の音声を内部で解析する構成が最も自然であり、使う側のコードも最小に保てる。Hook分離は現時点では過剰設計であり、必要になった時点で検討すれば十分である。

---

### 参考: 基本的な実装イメージ

veadotube miniと同様に、`@remotion/media-utils` の `useAudioData` と `visualizeAudio` で現在のフレームの音量を取得し、音量閾値と瞬きタイミングから4枚の完成画像を切り替える。

```tsx
import React from 'react';
import { Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

interface CharacterDef {
  idle: string;          // 目開き + 口閉じ
  speaking: string;      // 目開き + 口開き
  blinkIdle: string;     // 目閉じ + 口閉じ
  blinkSpeaking: string; // 目閉じ + 口開き
}

interface PNGTuberProps {
  audioSrc: string;
  characterDef: CharacterDef;
  threshold?: number;    // 音声反応のしきい値（デフォルト: 0.1）
}

export const PNGTuber: React.FC<PNGTuberProps> = ({
  audioSrc,
  characterDef,
  threshold = 0.1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return null;
  }

  const audioVisualizer = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 16,
  });

  const currentVolume =
    audioVisualizer.reduce((acc, val) => acc + val, 0) / audioVisualizer.length;

  const isSpeaking = currentVolume > threshold;
  const isBlinking = /* deterministic pseudo-random blink logic */ false;

  const src = isBlinking
    ? (isSpeaking ? characterDef.blinkSpeaking : characterDef.blinkIdle)
    : (isSpeaking ? characterDef.speaking : characterDef.idle);

  return (
    <Img
      src={src}
      style={{
        width: 400,
        height: 400,
        objectFit: 'contain',
      }}
    />
  );
};
```

呼び出し例:

```tsx
import { AbsoluteFill, Audio } from 'remotion';
import { PNGTuber } from './PNGTuber';

import voiceAudio from './assets/voice.mp3';

const characterA: CharacterDef = {
  idle: '/assets/charA-idle.png',
  speaking: '/assets/charA-speaking.png',
  blinkIdle: '/assets/charA-blink-idle.png',
  blinkSpeaking: '/assets/charA-blink-speaking.png',
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={voiceAudio} />
      <PNGTuber
        audioSrc={voiceAudio}
        characterDef={characterA}
        threshold={0.05}
      />
    </AbsoluteFill>
  );
};
```
