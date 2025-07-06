<div align="center">
  <h1>☕ Coffee Time MCP Server</h1>
  <p>
    🌐 利用可能な言語:
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a>
  </p>
  <h3>リアルタイムプッシュ通知とアラート音により、画面を見つめる必要がありません。AIが動作している間、コーヒーを飲みながらリラックスしてください。</h3>
</div>

## ✨ なぜCoffee Time？

まだこのように作業していますか？

- 👀 プログレスバーを見つめながらAIがコードを生成するのを待つ
- 🔄 ChatGPTが返答を完了したかどうかを確認するために絶えずウィンドウを切り替える
- ⏳ Cursor、Copilot、Claude Codeなどが実行中の間、席を離れることを恐れる

**Coffee Timeがこの問題を解決します！**

## ✨ 機能

- 💬 **即座の通知**：AIタスクが完了すると自動的にデスクトップ通知がポップアップ
- 🔔 **音声アラート**：重要な進捗を見逃さないための音声リマインダー
- 🧩 **Webhookサポート**：カスタムURLエンドポイントへの通知送信

> ロードマップ：iOS/Android ネットワーク通知 webhook を開発中

## 🚀 クイックスタート

### MCPクライアント設定（Cursor、Claude Code、Copilotなど）

#### MacOS / Linux

```json
{
  "mcpServers": {
    "coffee-time": {
      "command": "npx",
      "args": ["coffee-time"]
    }
  }
}
```

#### Windows

```json
{
  "mcpServers": {
    "coffee-time": {
      "command": "cmd",
      "args": ["/c", "npx", "coffee-time"]
    }
  }
}
```

> [!TIP]
> 独自のサービスに通知するには、argsに"--post-url=https://your-webhook"を追加してください。

## 💡 使用方法

👤 あなた: テトリスのWebゲームを作って。**_完了したら通知してください。_**<br>
🤖 AI: テトリスゲームの作成を開始します...

## 📌 システム要件

- macOS: ネイティブ通知のために >= 10.8 が必要
- Linux: notify-osd または libnotify-bin がインストールされている必要があります（Ubuntuではデフォルトで含まれています）
- Windows: >= 8、または Windows < 8 の場合はタスクバーバルーン
