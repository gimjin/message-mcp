<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 利用可能な言語:
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a>
  </p>
  <h3>リアルタイムプッシュ通知とアラート音により、画面を見つめる必要がありません。AIが動作している間、コーヒーを飲みながらリラックスしてください。</h3>
  <a href="https://deepwiki.com/gimjin/message-mcp">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki">
  </a>
  <a href="https://smithery.ai/server/@gimjin/message-mcp">
    <img src="https://smithery.ai/badge/@gimjin/message-mcp" alt="smithery badge">
  </a>
  <a href="https://github.com/gimjin/message-mcp/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/gimjin/message-mcp" alt="MIT License">
  </a>
</div>

## 🤔 なぜ Message MCP なのか？

まだこんな働き方をしていますか？

- 👀 進捗バーを見つめてAIがコードを生成するのを待つ
- 🔄 ChatGPTの返信が終わったか何度もウィンドウを切り替えて確認する
- ⏳ Cursor、Copilot、Claude Codeなどの実行中は席を離れられない

**Message MCP がこの問題を解決します！**

## ✨ 機能一覧

- 💬 **即時通知**: AIタスク完了時にデスクトップ通知を自動表示
- 🔔 **サウンド通知**: 音で進捗をお知らせ、重要な進展を見逃さない
- 📧 **メール通知**: SMTP経由でメール通知を送信可能
- 🧩 **Webhook対応**: カスタムURLエンドポイントへ通知送信

## 💡 使い方

👤 あなた: テトリスのWebゲームを作って。**_完了したら通知してください。_**<br>
🤖 AI: テトリスゲームの作成を開始します...

[![インストール_MCP-Cursor](https://img.shields.io/badge/インストール_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![インストール_MCP-VS_Code](https://img.shields.io/badge/インストール_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![インストール_MCP-VS_Code_Insiders](https://img.shields.io/badge/インストール_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

#### MacOS / Linux

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["message-mcp@latest"]
    }
  }
}
```

#### Windows

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "cmd",
      "args": ["/c", "npx", "message-mcp@latest"]
    }
  }
}
```

#### メール通知設定（オプション）

メール通知を利用したい場合は、`args` 配列にSMTP URLを追加してください：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": [
        "message-mcp@latest",
        "--smtp-url=smtp://your-email@gmail.com:your-app-password@smtp.gmail.com:587"
      ]
    }
  }
}
```

**主なSMTP URL例：**

- **Gmail**: `smtp://user:pass@smtp.gmail.com:587`
- **Outlook**: `smtp://user:pass@smtp-mail.outlook.com:587`
- **Yahoo**: `smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQメール**: `smtps://user:pass@smtp.qq.com:465`

#### Webhook通知設定（オプション）

Webhook通知を利用したい場合は、webhook URLを追加してください：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": [
        "message-mcp@latest",
        "--webhook-url=https://your-webhook-endpoint.com/notify"
      ]
    }
  }
}
```

## 📌 システム要件

- macOS: ネイティブ通知にはバージョン10.8以上が必要
- Linux: notify-osdまたはlibnotify-binがインストールされている必要があります（Ubuntuはデフォルトで含む）
- Windows: 8以上、または8未満はタスクバルーン通知

## ⚡ トラブルシューティング

#### Windows システム通知が無効

設定 > 通知とアクション > アプリやその他の送信者からの通知を受け取る → 有効化

#### WSL2 環境でOS通知が不足

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```
