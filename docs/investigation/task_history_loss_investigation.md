# チャット履歴消失原因の徹底調査

- [ ] 現状および発生時刻の確認
    - [x] ユーザー報告と過去ログの突き合わせ (00:00前後で発生)
    - [x] 00:00前後のシステムログ (`log show`) の確認 -> 目立った削除ログなし。mdworkerのみ活動。
- [ ] 自動実行タスクの調査
    - [x] ユーザーcrontab (`crontab -l`) の確認 -> 設定なし
    - [x] ユーザー LaunchAgents の確認 (`~/Library/LaunchAgents`) -> Limitless.plist, GoogleUpdaterのみ。怪しいものなし。
    - [ ] システム LaunchAgents/Daemons の確認 (`/Library/LaunchAgents`, `/Library/LaunchDaemons`)
- [ ] エージェント関連ファイルの調査
    - [ ] `~/.gemini` ディレクトリのパーミッション確認
    - [ ] エージェントのログファイル探索 (もしあれば)
- [ ] 仮説の検証と対策
    - [ ] "Midnight Cleanup" 仮説の裏付け
    - [ ] 根本解決책の提案 (設定変更、除外設定など)
