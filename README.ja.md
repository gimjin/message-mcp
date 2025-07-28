<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 利用可能な言語：
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a>
  </p>
  <h3>デスクトップ通知、カスタムサウンド、ntfyモバイル通知、メール通知、APIプッシュにより、AIタスクの待機ストレスを軽減し、心地よく一杯のコーヒーを楽しめます。</h3>
  <a href="https://modelcontextprotocol.io">
    <img src="https://img.shields.io/badge/MCP-Server-gold?labelColor=wheat&color=limegreen" title="MCP Server"/>
  </a>
  <a href="https://deepwiki.com/gimjin/message-mcp">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki">
  </a>
  <a href="https://dash.cloudflare.com">
    <img src="https://message-mcp-werker.kimseongrim.workers.dev/visit-count.svg?v=5" title="Visit Count"/>
  </a>
  <a href="https://github.com/gimjin/message-mcp/blob/main/.github/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/gimjin/message-mcp/ci.yml" alt="MIT License">
  </a>
  <a href="https://www.npmjs.com/package/message-mcp">
    <img src="https://img.shields.io/npm/v/message-mcp" alt="NPM Version">
  </a>
  <a href="https://github.com/gimjin/message-mcp/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/gimjin/message-mcp" alt="MIT License">
  </a>
</div>

## 🚀 AI の使用効率を向上させ、より多くの時間を確保

AIがタスクを完了するのを待っている間、他の作業を同時に処理できればと思いませんか？今では、AIが長時間のタスクを実行している間、安心して他の作業を処理できます。

**Message MCPでAIとのコラボレーションをより効率的にしましょう！**

```text
🧑：テトリスのWebゲームを作って、完了時に通知。
🤖：テトリスゲームの作成を開始します
   ...
💬：Message MCP実行、メッセージ送信完了。
```

> [!TIP]
>
> - クライアント設定で **MCP 自動実行を許可** してください。
> - **ユーザールール** または **ルールファイル** に「完了時に通知」プロンプトを追加すると、反復的な手動プロンプトを避けることができます。

### ⚡️ クイックインストール

[![クリックインストール-Cursor](https://img.shields.io/badge/クリック_インストール-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![クリックインストール-VS_Code](https://img.shields.io/badge/クリック_インストール-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![クリックインストール-VS_Code_Insiders](https://img.shields.io/badge/クリック_インストール-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![smithery.ai](https://smithery.ai/badge/@gimjin/message-mcp)](https://smithery.ai/server/@gimjin/message-mcp)

> smithery.aiを通じてMessage MCPクラウド実行を実現し、DifyなどのSaaSサービスをサポートし、自動認証とキーホスティングで漏洩リスクを確実にゼロにします。[詳細はこちら](https://smithery.ai/docs/getting_started/quickstart_connect#one-click-connect-to-smithery-servers)

### ⚙️ 標準インストール

#### MacOS、Linux、WSL2

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"]
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
      "args": ["/c", "npx", "-y", "message-mcp@latest"]
    }
  }
}
```

### 🎛️ オプション設定

#### デスクトップ通知の変更

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "DISABLE_DESKTOP": "true",
        "SOUND_PATH": "/path/to/your/sound.mp3"
      }
    }
  }
}
```

> - デスクトップ通知はデフォルトで有効
> - デフォルトサウンドはzapsplatが提供しています。デフォルトサウンドが気に入らない場合は、[zapsplat.com](https://zapsplat.com/)からダウンロードして設定できます。

#### ntfyモバイル通知

アプリインストール：[App Store](https://apps.apple.com/us/app/ntfy/id1625396347)、[Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy)、[F-Droid](https://f-droid.org/en/packages/io.heckel.ntfy/)

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "NTFY_TOPIC": "your-unique-topic"
      }
    }
  }
}
```

#### メール通知

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "SMTP_HOST": "smtp.gmail.com",
        "SMTP_PORT": "587",
        "SMTP_SECURE": "false",
        "SMTP_USER": "user@gmail.com",
        "SMTP_PASS": "your_password"
      }
    }
  }
}
```

#### API通知

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "API_URL": "https://httpbin.org/post",
        "API_METHOD": "POST", // POST, PUT, PATCH
        "API_HEADERS": "{\"Authorization\": \"Bearer token\"}"
      }
    }
  }
}
```

```javascript
fetch(API_URL, {
  method: API_METHOD,
  headers: {
    'Content-Type': 'application/json'
    ...JSON.parse(API_HEADERS)
  },
  body: JSON.stringify({
    title: notifyTitle,
    message: notifyMessage,
  }),
})
```

## 📌 システム要件

- Node.js：18以上
- macOS：ネイティブ通知には10.8以上が必要
- Linux：notify-osdまたはlibnotify-binのインストールが必要（Ubuntuはデフォルトで含む）
- Windows：8以上、または8未満はタスクバルーン通知

## ❗️ トラブルシューティング

#### Windowsシステム通知が有効になっていない

設定 > 通知とアクション > アプリやその他の送信者からの通知を受け取る → 有効化

#### WSL2（Ubuntu）に通知音がありません

```bash
sudo apt install -y pulseaudio mpg123
```

#### WSL2環境でOS通知が不足

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

---

このプロジェクトがお役に立った場合は、⭐️を押してサポートし、より多くの人に見てもらいましょう！
