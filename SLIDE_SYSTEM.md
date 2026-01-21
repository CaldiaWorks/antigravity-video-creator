# Slide Generator Usage Guide

このプロジェクトは、`slides.json` を編集するだけでスライド動画を作成できるシステムを搭載しています。
Remotion Editor拡張機能を開くと、このJSONファイルが読み込まれ、自動的にプレビューが更新されます。

## 1. Quick Start

プロジェクトルート（このファイルと同じ場所）に `slides.json` を作成し、配列形式でスライドを定義します。

```json
[
  {
    "type": "Title",
    "title": "Hello World",
    "subtitle": "Created with Remotion Slide System",
    "durationInFrames": 90
  }
]
```

## 2. Block Types

スライドの種類（`type`）として以下が使用可能です。

### `Title` (表紙)

| Property           | Type    | Required | Description                      |
| ------------------ | ------- | -------- | -------------------------------- |
| `type`             | "Title" | Yes      |                                  |
| `title`            | string  | Yes      | メインタイトル                   |
| `subtitle`         | string  | No       | サブタイトル                     |
| `durationInFrames` | number  | No       | 表示フレーム数（デフォルト: 90） |
| `style`            | object  | No       | CSSプロパティ（背景色など）      |

### `Content` (箇条書き)

| Property           | Type      | Required | Description                       |
| ------------------ | --------- | -------- | --------------------------------- |
| `type`             | "Content" | Yes      |                                   |
| `title`            | string    | Yes      | 見出し                            |
| `items`            | string[]  | Yes      | 箇条書き項目の配列                |
| `durationInFrames` | number    | No       | 表示フレーム数（デフォルト: 120） |

### `Code` (ソースコード)

| Property           | Type   | Required | Description                       |
| ------------------ | ------ | -------- | --------------------------------- |
| `type`             | "Code" | Yes      |                                   |
| `title`            | string | Yes      | 見出し                            |
| `code`             | string | Yes      | 表示するコード本体                |
| `language`         | string | Yes      | 言語名 (例: "typescript", "json") |
| `durationInFrames` | number | No       | 表示フレーム数（デフォルト: 150） |

## 3. Customization (Styling)

すべてのスライドタイプで `style` プロパティを使って外観（CSS）をカスタマイズできます。
プロパティ名は [React Inline Styles](https://react.dev/reference/react-dom/components/common#style) 形式（キャメルケース）で記述します。

**例: 黒背景・白文字にする**

```json
{
  "type": "Title",
  "title": "Dark Mode",
  "style": {
    "backgroundColor": "#000000",
    "color": "#FFFFFF",
    "fontFamily": "Inter"
  }
}
```
