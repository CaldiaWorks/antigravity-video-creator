# EARS Transformation Examples

Before/After examples showing how to convert ambiguous specifications into EARS-patterned specifications.

---

## Ubiquitous

**Before**: The system should store data securely.
**After**: The system shall encrypt all stored data using AES-256-GCM.

**Before**: All API responses include error codes.
**After**: The API shall include an error code and a human-readable message in every error response body.

---

## Event-Driven (WHEN)

**Before**: Users can reset their password.
**After**: WHEN the user clicks "Reset Password" and submits a registered email address, the system shall send a password reset link valid for 30 minutes.

**Before**: The system notifies the admin about new signups.
**After**: WHEN a new user completes registration, the system shall send a notification email to the admin distribution list within 1 minute.

**Before (Japanese)**: ユーザーがログインしたらダッシュボードを表示する。
**After (Japanese)**: ユーザーがログインに成功した時 (WHEN)、システムはダッシュボードページを表示するものとする (shall)。

---

## State-Driven (WHILE)

**Before**: The system limits features for trial users.
**After**: WHILE the user is on a trial plan, the system shall limit API calls to 100 requests per day.

**Before**: Show a progress bar during file upload.
**After**: WHILE a file upload is in progress, the system shall display a progress bar showing the percentage of bytes transferred.

**Before (Japanese)**: メンテナンス中はサービスを停止する。
**After (Japanese)**: システムがメンテナンスモードである間 (WHILE)、システムはすべてのユーザーリクエストに対しメンテナンスページを返すものとする (shall)。

---

## Unwanted Behavior (IF-THEN)

**Before**: Handle network errors gracefully.
**After**: IF the API request fails due to a network timeout, THEN the system shall retry the request up to 3 times with exponential backoff (1s, 2s, 4s).

**Before**: Prevent duplicate submissions.
**After**: IF the user clicks the submit button while a submission is already in progress, THEN the system shall ignore the duplicate click and display "Processing..." on the button.

**Before (Japanese)**: エラーが発生した場合は適切に処理する。
**After (Japanese)**: 決済サービスからエラーレスポンスを受信した場合 (IF)、システムは注文をキャンセルし、ユーザーに「決済に失敗しました。別の支払い方法をお試しください。」と表示するものとする (THEN...shall)。

---

## Optional Feature (WHERE)

**Before**: Two-factor authentication is supported.
**After**: WHERE two-factor authentication is enabled by the user, the system shall require a 6-digit TOTP code after successful password authentication.

**Before**: Premium users get extra storage.
**After**: WHERE the premium plan is active, the system shall allow file storage up to 100 GB per account.

**Before (Japanese)**: 通知機能がある場合はプッシュ通知を送る。
**After (Japanese)**: プッシュ通知機能が有効である場合 (WHERE)、新しいメッセージを受信した時 (WHEN)、システムは送信者名とメッセージプレビューを含むプッシュ通知を表示するものとする (shall)。

---

## Complex (Combined)

**Before**: Offline users should be able to work and sync later.
**After**: WHILE the system is in offline mode, WHEN the user creates a new record, the system shall store the record in local storage and queue it for synchronization. WHEN network connectivity is restored, the system shall synchronize all queued records within 30 seconds.

**Before**: Rate-limited users should get proper error messages.
**After**: IF the user has exceeded the rate limit, THEN WHEN the user sends a new API request, the system shall return HTTP 429 with a `Retry-After` header indicating the remaining cooldown period in seconds.

**Before (Japanese)**: オフラインでも使えるようにして、オンラインに戻ったら同期する。
**After (Japanese)**: システムがオフラインモードである間 (WHILE)、ユーザーが新規データを作成した時 (WHEN)、システムはデータをローカルストレージに保存し同期キューに追加するものとする (shall)。ネットワーク接続が回復した時 (WHEN)、システムはキュー内の全データを30秒以内に同期するものとする (shall)。

---

## Anti-Pattern Table

| Anti-Pattern | Problem | Corrected Version |
|-------------|---------|-------------------|
| The system should be fast. | "should" = weak; "fast" = ambiguous | The system shall respond to search queries within 200 ms at the 95th percentile. |
| Handle errors appropriately. | "handle" and "appropriately" are vague | IF the database query fails, THEN the system shall return HTTP 503 and retry after 5 seconds. |
| The system supports PDF export. | "supports" is ambiguous | WHEN the user clicks "Export as PDF", the system shall generate a PDF file and initiate a download within 3 seconds. |
| Users are notified of changes. | Passive voice hides actor and trigger | WHEN a document is modified by a collaborator, the system shall send an email notification to all subscribed users within 2 minutes. |
| The system should handle concurrent users. | No measurable criteria | The system shall process up to 10,000 concurrent user sessions without exceeding 500 ms average response time. |
