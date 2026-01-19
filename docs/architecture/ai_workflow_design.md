# AI-Driven Video Production Workflow Concept

## 概要

VS Code Extension と生成AI (Antigravity/Gemini) を組み合わせ、企画から素材生成、編集までを効率化するためのアーキテクチャ設計案。コスト(API利用料)を抑えつつ、高いユーザー体験(UX)を実現することを目的とする。

## アーキテクチャ図

```mermaid
graph TD
    User((User))
    Ext[VS Code Extension]
    AI_CLI[AI CLI (Claude Code / Gemini)]
    AI_Web[Antigravity (Web Chat)]
    FS[(File System)]

    subgraph "VS Code Workspace"
        Ext
        FS
    end

    User -- 1. Selects Plan/Scene --> Ext

    %% Path A: Direct CLI Execution (Automated)
    Ext -- 2a. Executes Command --> AI_CLI
    AI_CLI -- 3a. Generates Assets --> FS

    %% Path B: Manual Copy-Paste (High Control)
    Ext -- 2b. Copies Prompt --> User
    User -- 3b. Pastes Prompt --> AI_Web
    AI_Web -- 4b. Generates Assets --> FS

    FS -- 5. Watcher Trigger --> Ext
    Ext -- 6. Updates UI (Sidebar/Timeline) --> User
```

## ワークフロー詳細

### 1. アセット生成フロー (ハイブリッド構成)

#### A. CLI自動連携 (推奨: Claude Code CLI / Gemini CLI)

- **概要**: Extensionが裏側で `claude` や `gemini` コマンドを実行する。
- **メリット**: ユーザーのサブスクリプション(定額)権限で動作するため、追加のAPIコスト不要で自動化が可能。
- **Action**: Extension上の「Generate」ボタンで直接ファイル生成が完了する。

#### B. 手動プロンプト連携 (Webチャット経由)

- **概要**: クリップボード経由でプロンプトを渡し、Webチャットで生成する。
- **メリット**: より対話的に調整したい場合や、複雑な指示を行いたい場合に使用。
- **Action**: 「AIへの指示をコピー」ボタン等でクリップボードにコピー。

### 2. アセット生成 (AI側)

- AIは指示に従い、成果物（テロップ情報が含まれたJSON、画像、音声ファイルなど）を指定されたディレクトリ（例: `assets/generated/`）に出力する。

### 3. 自動連携 (File System & Extension)

- **File Watcher**: Extensionは `assets/` ディレクトリを常時監視する。
- **Auto Import**: 新しいファイルが生成されると即座に検知し、Extension内の「Elements」や「Project Bin」パネルに自動追加する。
- **UX**: ユーザーはAIに依頼した後、Extensionに戻るとすでに素材がそこにあり、ドラッグ＆ドロップで使える状態になっている。

## メリット

- **Cost Efficiency**: ユーザー自身のサブスクリプション（定額）を利用するため、従量課金のAPIコストが発生しない。
- **Simulated Integration**: API連携していないにもかかわらず、ファイルシステムを介することで「つながっている」かのようなスムーズな連携感を実現できる。
- **Flexibility**: AIモデルが進化した際も、Extension側の改修なしにプロンプトや生成物の質を向上させることができる。

## 実装ロードマップ案

1.  **アセット監視機能**: 特定フォルダへのファイル追加を検知する `FileSystemWatcher` の実装。
2.  **サイドバーUI更新**: ファイル検知時に動的にリストを更新する仕組み。
3.  **プロンプト生成機能**: 選択したMarkdown（企画書）から、コンテキストに沿ったプロンプト文字列を組み立てるロジックの実装。
