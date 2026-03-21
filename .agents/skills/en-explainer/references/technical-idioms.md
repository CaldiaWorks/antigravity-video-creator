# Technical Idioms

English technical writing uses idioms that lose meaning when translated literally. This reference covers common idioms organized by category. When these appear in text being explained, weave the meaning naturally into the explanation.

## Software Design & Architecture

| Idiom | Meaning | Context |
|-------|---------|---------|
| out of the box | すぐに使える状態で（追加設定なしで） | Feature works without configuration |
| footgun | 使い方を間違えやすい危険な機能 | API or feature that's easy to misuse |
| leaky abstraction | 内部実装が漏れ出している抽象化 | Abstraction that exposes underlying complexity |
| opinionated | 特定の設計方針を強制する | Framework that enforces conventions |
| batteries included | 必要な機能が標準で同梱されている | Ships with everything needed |
| escape hatch | 制約を回避するための手段 | Way to bypass framework conventions when needed |
| first-class citizen | 他の要素と同等に扱われる対象 | Entity treated equally in a language/framework |
| boilerplate | 定型コード | Repetitive code required by a framework |
| syntactic sugar | 糖衣構文 | Shorter syntax for common patterns |
| guard clause | ガード節（早期リターンによる条件チェック） | Early return to handle edge cases |

## Development Process

| Idiom | Meaning | Context |
|-------|---------|---------|
| bikeshedding | 些末な議論に時間を費やすこと | Disproportionate debate on trivial details |
| yak shaving | 本来の目的から派生した連鎖的な作業 | Chain of prerequisites before the actual task |
| dogfooding | 自社製品を社内で使うこと | Using your own product internally |
| rubber ducking | 問題を声に出して説明することで解決策に気づく手法 | Explaining a problem to find the solution |
| cargo culting | 仕組みを理解せず形だけ真似ること | Copying patterns without understanding them |
| bike-shed color | 些末な選択（bikesheddingの対象） | Trivial choice that receives outsized attention |
| shaving a yak | yak shaving と同義 | Currently doing prerequisite work |

## Performance & Operations

| Idiom | Meaning | Context |
|-------|---------|---------|
| thundering herd | 多数のプロセスが同時に同じリソースに殺到する問題 | Many processes competing for same resource |
| hot path | 高頻度で実行されるコードパス | Performance-critical code section |
| cold start | 初回起動時の遅延 | Initial latency before warm state |
| back pressure | 下流の処理能力を超えたデータ流入への対処 | Flow control when downstream is overwhelmed |
| circuit breaker | 連続障害時に自動的にリクエストを遮断する仕組み | Pattern to prevent cascade failures |
| graceful degradation | 部分的障害時に機能を制限しつつ動作を維持すること | Maintaining core function during partial failure |
| fail fast | 問題を検出したら即座にエラーにする方針 | Report errors immediately rather than propagating |

## Code Review & Discussion

| Idiom | Meaning | Context |
|-------|---------|---------|
| nit / nitpick | 些細な指摘（機能に影響しない） | Minor style/preference comment |
| LGTM | 問題なし、承認 | Looks Good To Me — approval |
| WIP | 作業中 | Work In Progress |
| PTAL | 確認お願いします | Please Take A Look |
| TL;DR | 要約すると | Too Long; Didn't Read — summary follows |
| AFAIK | 私の知る限り | As Far As I Know |
| YMMV | 結果は環境により異なる | Your Mileage May Vary |
| YAGNI | 今必要ないものは作らない | You Aren't Gonna Need It |
| DRY | 同じことを繰り返さない原則 | Don't Repeat Yourself |
| KISS | シンプルに保つ原則 | Keep It Simple, Stupid |
