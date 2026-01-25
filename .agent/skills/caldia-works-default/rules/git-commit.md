---
name: git-commit-assistant
description: Analyze staged changes and create a commit message following Conventional Commits. Use this whenever the user asks to "commit", "save changes to git", or "wrap up work".
---

# Smart Git Commit Assistant

## Goal
ステージングされた変更内容を詳細に分析し、規約に基づいた高品質なコミットメッセージを作成・実行することで、リポジトリの履歴品質を維持する。

## Instructions
1. **差分の確認**: 
   `git diff --cached` を実行し、コードの変更点（追加、削除、修正）を把握する。
2. **コンテキストの理解**: 
   変更されたファイル名や内容から、プロジェクトのどのコンポーネント（scope）に関する修正かを特定する。
   - 例: `slides`, `components`, `assets`, `config`, `root` など。
3. **メッセージの構成**: 
   以下の[Conventional Commits](https://www.conventionalcommits.org/)形式でメッセージを生成する。
   - 形式: `<type>(<scope>): <subject>`
   - `type`: 
     - `feat`: 新機能
     - `fix`: バグ修正
     - `docs`: ドキュメントのみの変更
     - `style`: コードの意味に影響しない変更（映像表現・CSSの微調整を含む）
     - `refactor`: バグ修正も機能追加も行わないコード変更
     - `perf`: パフォーマンス向上
     - `test`: テストの追加・修正
     - `chore`: ビルドプロセスやライブラリの更新など
4. **Issue番号の付与**:
   関連する Issue がある場合は、メッセージの末尾に `refs #123` の形式で記載する。
5. **ユーザー確認と実行**: 
   生成したメッセージを提示し、「この内容でコミットしますか？」と確認する。許可を得たら `git commit -m "[メッセージ]"` を実行する。

## Examples
### Example 1: 機能追加（Issue関連）
- Input: `src/slides/CaldiaWorks.tsx` 追加
- Output: `feat(slides): CaldiaWorksスライドの実装 refs #1`

### Example 2: 映像表現の微調整
- Input: `index.css` のグラデーション調整
- Output: `style(assets): 背景のグラデーション密度を調整`

## Constraints
- **1コミット1機能**: 複数の異なる変更が含まれる場合は、分割してコミットすることを提案すること。
- ステージング（git add）されていない場合は、実行前に `git add` を行うようユーザーに促すこと。
- メッセージは日本語で、簡潔に記述すること。
- 破壊的な変更（Breaking Changes）が含まれる場合は、メッセージに `!` を含めるか、フッターに説明を入れること。