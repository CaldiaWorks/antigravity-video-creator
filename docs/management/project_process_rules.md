# プロジェクトプロセス標準ガイドライン v1.5

本ドキュメントは、AIエージェントとユーザーの協業におけるプロジェクト進行の標準プロセスを定義する。
**「要件定義」を最上流とし、そこからIssue（タスク）が派生するフロー**を基本とする。
本ドキュメントおよび全ての成果物は、ユーザーが管理する `docs/` ディレクトリに配置される。

## 1. プロセス概要 (Process Overview)

プロジェクトは以下の順序で進行する。フェーズ間の移行（Gate通過）にはユーザーの明示的な承認を必須とする。

1.  **要件定義 (Requirements Definition)** - ここで要件IDを決定
2.  **Issue作成 (Issue Creation)** - 要件に基づき、実装タスクをIssueとして切り出す
3.  **基本設計・実装計画 (Design & Planning)**
4.  **実装 (Implementation / Execution)**
5.  **検証 (Verification)**

---

## 2. 成果物管理 (Artifact Management)

全ての成果物は `docs/` ディレクトリで管理し、永続化する。

### 2.1. ディレクトリ構成と管理表

```
PROJECT_ROOT/
└── docs/
    ├── management/
    │   ├── project_process_rules.md # 本ガイドライン
    │   ├── requirements_matrix.md   # 要件管理表（要件ID⇔Issue番号の対応）
    │   ├── project_status.md        # ステータスサマリ
    │   └── task.md                  # エージェント用タスク管理
    ├── requirements/
    │   └── {ReqID}_{Description}_req.md  # 要件定義書（Prefixは要件ID）
    ├── design/
    │   └── issue{N}_{Description}_plan.md  # 実装計画書（PrefixはIssue番号）
    └── verification/
        └── issue{N}_{Description}_report.md # 検証レポート
```

### 2.2. 要件管理表 (Requirements Matrix)
`docs/management/requirements_matrix.md` にて、要件とIssueの関係を一元管理する。

| Req ID | Status | Description | Related Issues | Design Docs |
| :--- | :--- | :--- | :--- | :--- |
| REQ-001 | Done | .pj File Preview | #12, #15 | [Plan](#) |

### 2.3. ファイル命名規則 (Naming Convention)

**A. 要件定義書 (Requirements)**
*   Format: `REQ-{NNN}_{Description}_req.md`
*   Prefix: **手動採番の連番** (例: `REQ-001`)。

**B. 設計・実装・検証 (Design, Impl, Verification)**
*   Format: `issue{N}_{Description}_{Type}.md`
*   Prefix: **GitHub Issue番号** (例: `issue12`)。
*   **ルール**: 実装フェーズに進む前に、必ずGitホスティング（GitHub等）側でIssueを作成し、その番号を使用する。

---

## 3. フェーズ詳細定義

### Phase 1: 要件定義 (Requirements Definition)
*   **アクション**: ビジネス要件（What/Why）のみを定義する。
*   **採番**: 新しい要件ID（例: `REQ-001`）を発番する。
*   **アウトプット**: `docs/requirements/REQ-001_pj-preview_req.md`
*   **完了条件**: ユーザー承認 + `requirements_matrix.md` への行追加。

### Phase 2: Issue作成 (Issue Creation)
*   **アクション**: 承認された要件を、実装可能な粒度のタスク（Issue）に分割・定義する。
*   **ユーザー作業**: GitHub等でIssueを作成し、番号を取得する。
*   **管理表更新**: `requirements_matrix.md` の `Related Issues` 列に番号を記入。

### Phase 3: 基本設計・実装計画 (Design & Planning)
*   **対象**: 特定のIssue（例: #12）に対して設計を行う。
*   **アウトプット**: `docs/design/issue12_pj-webview_plan.md`

### Phase 4: 実装 & Phase 5: 検証
*   **アウトプット**: `docs/verification/issue12_pj-webview_report.md`
*   **ルール**: コードはこまめに `git commit`。

---

## 4. 状態の永続化とリカバリ (Persistence & Recovery)
*   **復帰時の参照順**: `project_status.md` -> `requirements_matrix.md` -> 個別ドキュメント の順で確認し、全体の現在地を把握する。

---

## 5. 運用ルール (Operational Rules)
1.  **Req-First**: Issueを作る前に、必ず要件定義（REQ-xxx）が存在しなければならない。
2.  **Gate Check**: フェーズ完了時は必ず承認を求める。
3.  **Traceability**: 実装・検証ドキュメントには、必ず元となる「要件ID」を記載する。
4.  **Artifact First**: 議論内容は即座に `docs/` 以下のファイルへ反映する。
5.  **Save Before Action**: 不安定な操作前にはタスク状態を保存する。

## 6. コミュニケーション・透明性プロトコル (Communication & Transparency Protocol)

1.  **No Hidden Evidence**: AIは、ユーザーに明示的に提示（`notify_user`等でReview依頼）していない内部ファイル（Agent Brain内のファイルや、未送信の思考ログなど）を、合意や認識の根拠として引用してはならない。内部で作成していても、提示していなければそれは「共有されていない」とみなす。
2.  **Explicit confirmation**: 「言ったつもり」「書いたつもり」を排除するため、重要な計画やゴールは必ずチャットメッセージとして明文化し、ユーザーの確認を得る。
