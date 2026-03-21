# As-Is 仕様書: remotion

**ドキュメントバージョン**: 1.0
**分析日**: 2026-03-21
**対象システム**: Remotionを用いたReactベースのプログラム駆動型動画生成アプリケーション
**言語**: typescript
**フレームワーク**: React 19.2.3, Remotion 4.0.409
**分析スコープ**: `src/` ディレクトリ配下のファイルおよびコードベースのコンポーネント

---

## エグゼクティブサマリー

### システム概要

**システムタイプ**: プログラム駆動型動画生成エンジン

**主な機能**:
- 事前定義されたReactコンポーネントの構成をRemotionを使用してMP4出力としてレンダリングする。
- 複数の音声トラックと動的にタイミング調整されたシーケンスを同期する。
- 音声に反応し、読唇（リップシンク）、まばたき、および呼吸などのアイドルアニメーションをルールベースで描画する2Dアバターをレンダリングする。

**技術スタック**:
- **言語**: typescript ^5.9.3
- **フレームワーク**: React ^19.2.3, Remotion ^4.0.409
- **メディア関連**: @remotion/media, @remotion/media-utils
- **スタイリング**: tailwindcss ^4.1.18

### 分析スコープ

**解析対象ファイル数**: 27 ソースファイル
**解析コンポーネント数**: 28 コンポーネント（構造把握）、2 コンポーネント（詳細ロジック解析）
**抽出した要件数**: 11 件（EARS記法）
**カバレッジ**: コントロールを司る主要コンポーネント（`Avatar`, `AIGovernanceVideo`）の100%

### 主な分析結果（キーファインディング）

- **技術的負債・懸念点**: 2件の疑わしい事象
  - 🔴 クリティカル (Critical): 0
  - 🟡 重要 (Important): 1
  - 🟢 参考情報 (Informational): 1

---

## 技術スタック詳細

| コンポーネント | バージョン | ソース |
|:----------|:--------|:-------|
| typescript | ^5.9.3 | package.json:30 |
| React | ^19.2.3 | package.json:26 |
| Remotion | ^4.0.409 | package.json:29 |
| @remotion/cli | ^4.0.409 | package.json:18 |
| @remotion/media | ^4.0.409 | package.json:19 |
| @remotion/media-utils | ^4.0.438 | package.json:20 |
| chart.js | ^4.5.1 | package.json:25 |
| tailwindcss | ^4.1.18 | package.json:45 |

---

## モジュールカタログ

| カテゴリ | コンポーネント | 説明 | リファレンス行 |
|:---------|:----------|:------------|:----------|
| Core | `RemotionRoot` | すべてのRemotionコンポジションを登録するルートコンポーネント | src/Root.tsx:11 |
| Core | `WorkflowVideo` | `Slide01` から `Slide07` までをワークフロー用に組み立てるコンポジション | src/WorkflowVideo.tsx:11 |
| Core | `AvatarTestVideo` | 音声閾値を利用して `Avatar` コンポーネントをレンダリングするためのテスト用コンポジション | src/AvatarTestVideo.tsx:21 |
| Core | `AIGovernanceVideo` | 再生音声付きのスライドショーとして `Scene01` から `Scene08` までを組み立てるコンポジション | src/AIGovernanceVideo.tsx:63 |
| Core | `AI_GOVERNANCE_TOTAL_FRAMES` | AIガバナンスビデオの計算済み総フレーム数エクスポート（定数） | src/AIGovernanceVideo.tsx:33 |
| Core | `MyComposition` | CaldiaWorksとIntroductionを表示するテストコンポジション | src/Composition.tsx:6 |
| Shared | `CharacterDef` | アバター画像の4状態を定義するインターフェース | src/components/Avatar.tsx:11 |
| Shared | `AvatarProps` | アバターに音声と状態を引き渡すためのインターフェース | src/components/Avatar.tsx:18 |
| Shared | `Avatar` | 音声に反応して話すアバターを描画するRemotionコンポーネント | src/components/Avatar.tsx:25 |
| Slide | `Slide01_Hero` | プロジェクト・ワークフロー開始用のヒーロースライド | src/slides/Slide01_Hero.tsx:4 |
| Slide | `Slide02_Process` | 一般的なプロセスフローを定義するスライド | src/slides/Slide02_Process.tsx:4 |
| Slide | `Slide03_Hearing` | ヒアリングフェーズに関するプレゼンスライド | src/slides/Slide03_Hearing.tsx:23 |
| Slide | `Slide04_Resource` | リソース要件に関するスライド | src/slides/Slide04_Resource.tsx:13 |
| Slide | `Slide05_Narrative` | ナラティブフローに関するスライド | src/slides/Slide05_Narrative.tsx:21 |
| Slide | `Slide06_Timeline` | 開発タイムラインに関するスライド | src/slides/Slide06_Timeline.tsx:21 |
| Slide | `Slide07_Footer` | フッターまたは結論のスライド | src/slides/Slide07_Footer.tsx:4 |
| Slide | `CodeFlow` | コードのアーキテクチャフローを実演するスライド | src/slides/CodeFlow.tsx:4 |
| Slide | `CaldiaWorks` | ブランド紹介用のスライド | src/slides/CaldiaWorks.tsx:4 |
| Slide | `Introduction` | 標準的な導入スライド | src/slides/Introduction.tsx:4 |
| Scene | `Scene01_Intro` | イントロダクションシーン | src/slides/ai-governance/Scene01_Intro.tsx:52 |
| Scene | `Scene02_Temptation` | 誘惑や失敗の回避に関するシーン | src/slides/ai-governance/Scene02_Temptation.tsx:83 |
| Scene | `Scene03_Rule` | プロジェクトルールに関するシーン | src/slides/ai-governance/Scene03_Rule.tsx:66 |
| Scene | `Scene04_Translator` | 「トランスレータ」パラダイムを説明するシーン | src/slides/ai-governance/Scene04_Translator.tsx:82 |
| Scene | `Scene05_ReviewMiss` | レビューとミスワークフローに関するシーン | src/slides/ai-governance/Scene05_ReviewMiss.tsx:63 |
| Scene | `Scene06_Signal` | 信号機（許容・警告・停止）の概念に関するシーン | src/slides/ai-governance/Scene06_Signal.tsx:75 |
| Scene | `Scene07_Conclusion` | AIガバナンスにおける結論のシーン | src/slides/ai-governance/Scene07_Conclusion.tsx:83 |
| Scene | `Scene08_CTA` | ガバナンスビデオのコールトゥアクション（CTA）シーン | src/slides/ai-governance/Scene08_CTA.tsx:11 |
| Scene | `CyberBackground` | サイバーテックテーマの動的SVG背景コンポーネント | src/slides/ai-governance/components/CyberBackground.tsx:4 |

---

## 要件カタログ (EARS)

### モジュール別

**モジュール: Avatar**
- REQ-W001: 【Unwanted】 IF `audioData`がfalsy（無効）である場合、システムは `objectFit: contain` を指定して `characterDef.idle` 画像を返却しなければならない（SHALL）。
- REQ-U002: 【Ubiquitous】 システムは、現在のフレームから16個の音声サンプルの平均をとることで `currentVolume` を計算しなければならない（SHALL）。
- REQ-U003: 【Ubiquitous】 システムは、`currentVolume` が `threshold`（デフォルト0.05）を超えた場合、Avatarを `isSpeaking`（発話中）として識別しなければならない（SHALL）。
- REQ-U004: 【Ubiquitous】 システムは、5フレーム前（またはフレーム0のいずれか大きい方）から16個の音声サンプルを取得することで `pastVolume` を計算しなければならない（SHALL）。
- REQ-S005: 【State-driven】 WHILE 実行中、システムは秒ごとに固定シードによって乱数を生成して `isBlinking` 状態を決定し、その確率が0.3未満である場合、その秒の最初の4フレームにおいてまばたきをトリガーしなければならない（SHALL）。
- REQ-U006: 【Ubiquitous】 システムは、`isSpeaking` と `isBlinking` の真偽値に基づいて、`{idle, speaking, blinkIdle, blinkSpeaking}` の4状態の中から排他的に `targetImage` を割り当てなければならない（SHALL）。
- REQ-U007: 【Ubiquitous】 システムは、`((Math.sin(frame / 20) + 1) / 2)` の計算式を使用して最大0.07の乗数スケールを追加することで、連続的な呼吸アニメーション `breathingScaleY` を適用しなければならない（SHALL）。
- REQ-W008: 【Unwanted】 IF `volumeDelta` が 0.06 を超える AND `isSpeaking` が真である場合、システムは1.0から1.15の間で跳ねるような拡張スケール `jumpScale` を補間生成しなければならない（SHALL）。

**モジュール: AIGovernanceVideo**
- REQ-U009: 【Ubiquitous】 システムは、`Math.ceil(sec * FPS) + 15` フレームを計算することにより、個々のシーンの持続（デュレーション）境界を計算しなければならない（SHALL）。
- REQ-U010: 【Ubiquitous】 システムは、計算された全シーンのパディング済みフレーム上限値の合計を取得（reduce）することにより、コンポジション全体のフレーム総デュレーションを計算しなければならない（SHALL）。
- REQ-U011: 【Ubiquitous】 システムは、定義された `sceneDurationFrames` に従い、連続して進むフレームオフセットを使って一連の `Sequence` 要素をレンダリングしなければならない（SHALL）。

### EARSタイプ別統計

| EARS タイプ | 件数 | 割合 |
|:----------|:------|:-----------|
| Ubiquitous (常態) | 8 | 72.7% |
| Event-driven (イベント駆動) | 0 | 0.0% |
| Unwanted (望まれない/例外) | 2 | 18.2% |
| State-driven (状態駆動) | 1 | 9.1% |
| Optional (オプション) | 0 | 0.0% |
| **合計** | **11** | **100%** |

---

## 付録 A: トレーサビリティマトリクス

| モジュール | 要件ID (REQ-ID) | EARSタイプ | 要件要約 | ソースファイル:行番号 | 根拠の強度 |
|:-------|:-------|:----------|:------------|:-----------------|:------------------|
| Avatar | REQ-W001 | Unwanted | 不正なaudioData時にidle画像を返却する | src/components/Avatar.tsx:56 | ✅ 強 (Strong) |
| Avatar | REQ-U002 | Ubiquitous | 16サンプルの現在ボリューム平均化 | src/components/Avatar.tsx:61 | ✅ 強 (Strong) |
| Avatar | REQ-U003 | Ubiquitous | `isSpeaking` の閾値マッピング | src/components/Avatar.tsx:63 | ✅ 強 (Strong) |
| Avatar | REQ-U004 | Ubiquitous | 5フレーム前の履歴ボリューム計算 | src/components/Avatar.tsx:66 | ✅ 強 (Strong) |
| Avatar | REQ-S005 | State | 秒単位セグメントによる乱数ベースのまばたき判定 | src/components/Avatar.tsx:75 | ✅ 強 (Strong) |
| Avatar | REQ-U006 | Ubiquitous | veadotube形式に準拠した4状態マッピング | src/components/Avatar.tsx:80 | ✅ 強 (Strong) |
| Avatar | REQ-U007 | Ubiquitous | サイン波を用いた呼吸スケーリング | src/components/Avatar.tsx:87 | ✅ 強 (Strong) |
| Avatar | REQ-W008 | Unwanted | 音量の急増（正のデルタ）によるバウンストリガー | src/components/Avatar.tsx:94 | ✅ 強 (Strong) |
| AIGov | REQ-U009 | Ubiquitous | 秒数からフレーム数への固定FPS変換 + 15フレームのパディング | src/AIGovernanceVideo.tsx:30 | ✅ 強 (Strong) |
| AIGov | REQ-U010 | Ubiquitous | 親コンポジションの総デュレーション算出のための配列合計計算 | src/AIGovernanceVideo.tsx:34 | ✅ 強 (Strong) |
| AIGov | REQ-U011 | Ubiquitous | 前のシーンの終了フレームを基点としたシーケンスインスタンスのループ描画 | src/AIGovernanceVideo.tsx:82 | ✅ 強 (Strong) |

---

## 付録 B: 未解決の質問・懸念事項リスト (優先度順)

### 🔴 クリティカル (Critical)
なし

### 🟡 重要 (Important)
- **バウンスアニメーション時のボリューム数学的フィルタリング** — [src/components/Avatar.tsx:94](src/components/Avatar.tsx:94)
  `volumeDelta` の制限を正（上昇）の傾きのみとしているが、このフィルタリングが鋭い破裂音（パピプペポ等）に対して、アバターが不自然に小刻みに震える現象（チャタリング）を防ぐために十分であるか実機検証が必要である。

### 🟢 参考情報 (Informational)
- **`CodeFlow.tsx` の利用状況** — [src/slides/CodeFlow.tsx:4](src/slides/CodeFlow.tsx:4)
  `CodeFlow.tsx` はスライドとして存在しているものの、`Root.tsx` 内で完全に独立した `Composition` として登録されている。標準のワークフロープレゼンテーション（WorkflowVideo）における利用箇所が不明瞭であり、過去のテストや古い構成のメタデータの残りである可能性がある。

---

## 付録 C: 分析時の制約事項

### 信頼性係数 (Confidence Factors)
- **コードコメントの量**: 中程度 (moderate)
- **テストカバレッジ**: 専用の `*.test.tsx` は存在しないが、視覚用テスト `AvatarTestVideo` が用意されている。
- **アーキテクチャパターン**: ルートとしてのCompositionsと、子要素としてのスライドSequenceによる構成。

### 根拠の強度の分布
| 強度 | 件数 | 割合 |
|:---------|:------|:-----------|
| ✅ 強 (Strong) | 11 | 100% |
| ⚠️ 中 (Medium) | 0 | 0% |
| ❌ 弱 (Weak) | 0 | 0% |

---

**文書管理情報 (Document Control)**

| バージョン | 日付 | 説明 |
|:--------|:-----|:------------|
| 1.0 | 2026-03-21 | 現行システム（As-Is）の仕様報告書初版作成 |
