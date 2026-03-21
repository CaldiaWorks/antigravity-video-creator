# Output Format

## Standard Structure

```markdown
## 解説

<Main explanation in Japanese - what the text means in context>

### 技術的背景

<Technical background that helps understand the text.
Only include this section when the text involves concepts
that need additional context beyond the immediate content.>

### 用語

| English | 日本語 | 補足 |
|---------|--------|------|
| term    | 訳語   | How the term is used in this specific context |
```

## Adaptation Rules

- **Short, simple texts**: Main explanation only. Skip 技術的背景 and 用語 if unnecessary.
- **Moderate complexity**: Main explanation + 用語 table for non-obvious terms.
- **Complex texts**: All sections. 技術的背景 provides the conceptual foundation needed to understand the explanation.

## 用語 Table Guidelines

Only list terms that meet at least one of these criteria:

- The term has a context-specific meaning different from its general usage
- The term is domain jargon that may not be immediately recognizable
- The term has a nuanced Japanese equivalent that deserves explanation

Skip common programming terms (function, variable, class, file, etc.) unless they carry a special meaning in the specific context.

## Examples

### Simple: Error Message

```
FATAL: password authentication failed for user "deploy"
```

```markdown
## 解説

PostgreSQL へのユーザー "deploy" によるパスワード認証が失敗しました。パスワードが間違っているか、`pg_hba.conf` の認証設定でこのユーザーのアクセスが許可されていない可能性があります。
```

### Moderate: Code Comment

```
// Debounce the resize handler to avoid layout thrashing
```

```markdown
## 解説

ウィンドウのリサイズイベントに対してデバウンス処理を適用しています。リサイズ中はイベントが高頻度で発火し、その都度レイアウトを再計算すると「layout thrashing」が起きてパフォーマンスが低下します。デバウンスにより、操作が止まってから一定時間後に1回だけハンドラを実行します。

### 用語

| English | 日本語 | 補足 |
|---------|--------|------|
| debounce | デバウンス | 連続するイベントを間引き、最後のイベントから一定時間後に1回だけ実行する手法 |
| layout thrashing | レイアウトスラッシング | DOM読み取りと書き込みが交互に発生し、ブラウザが何度もレイアウトを再計算してしまう問題 |
```

### Complex: Architectural Concept

```
The event loop dequeues microtasks before yielding back to the macrotask queue,
which is why resolved promises execute before setTimeout callbacks.
```

```markdown
## 解説

JavaScript のイベントループにおけるマイクロタスクとマクロタスクの実行順序について説明しています。

イベントループは1つのマクロタスク（setTimeout、setInterval、I/Oコールバック等）を実行した後、次のマクロタスクに移る前に、マイクロタスクキューをすべて空にします。Promise の `.then()` コールバックはマイクロタスクとして登録されるため、`setTimeout` のコールバック（マクロタスク）よりも先に実行されます。

この仕組みにより `Promise.resolve().then(fn)` は `setTimeout(fn, 0)` よりも必ず先に実行されます。

### 技術的背景

イベントループの1サイクル:
1. マクロタスクキューから1つ取り出して実行
2. マイクロタスクキューをすべて処理（途中で追加されたものも含む）
3. レンダリング更新（必要な場合）
4. 1に戻る

### 用語

| English | 日本語 | 補足 |
|---------|--------|------|
| microtask | マイクロタスク | Promise コールバック、MutationObserver 等。マクロタスク間に優先的に処理される |
| macrotask | マクロタスク | setTimeout、setInterval、I/O 等。イベントループの各サイクルで1つずつ処理される |
| dequeue | デキュー | キューから要素を取り出すこと |
| yield back | 制御を戻す | 処理の主導権を別のキューに返すこと |
```
