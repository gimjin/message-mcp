<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 利用可能な言語：
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a>
  </p>
  <h3>デスクトップ通知、メール、APIプッシュにより、AIタスクの待機ストレスを軽減し、心地よく一杯のコーヒーを楽しめます。</h3>
  <a href="https://modelcontextprotocol.io">
    <img src="https://img.shields.io/badge/MCP-Server-gold?labelColor=wheat&color=limegreen" title="MCP Server"/>
  </a>
  <a href="https://deepwiki.com/gimjin/message-mcp">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki">
  </a>
  <a href="https://smithery.ai/server/@gimjin/message-mcp">
    <img src="https://smithery.ai/badge/@gimjin/message-mcp" alt="smithery badge">
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

## 🤔 まだこんな「監視式」でAIを使っていますか？

心配な上司のように、AIの出力を一行一行見つめて、明らかに他のことを処理できるのに、頑固に画面から一瞬も離れられない。

**Message MCPで完全に注意力を解放しましょう！**

## 💡 使い方

[![インストール_MCP-Cursor](https://img.shields.io/badge/インストール_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![インストール_MCP-VS_Code](https://img.shields.io/badge/インストール_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![インストール_MCP-VS_Code_Insiders](https://img.shields.io/badge/インストール_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

🧑 **ユーザー**：テトリスのWebゲームを作って。**_完了時に通知_**。  
🤖 **AI**：テトリスゲームの作成を開始します...

> ⚠️ 通常 MCP クライアントは設定が必要です
>
> - 自動実行を有効にして、MCPが自動実行されるようにします。
> - ユーザールールに「完了時に通知」を追加して、繰り返しの指示を避けます。

### 手動インストール

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
        "--smtp-url=smtp://user@gmail.com:pass@smtp.gmail.com:587"
      ]
    }
  }
}
```

**主なSMTP URL例：**

- **Gmail**：`smtp://user:pass@smtp.gmail.com:587`
- **Outlook**：`smtp://user:pass@smtp-mail.outlook.com:587`
- **Yahoo**：`smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQメール**：`smtps://user:pass@smtp.qq.com:465`

#### API通知設定（オプション）

API通知を利用したい場合は、API URLを追加してください：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["message-mcp@latest", "--api-url=https://httpbin.org/post"]
    }
  }
}
```

## 📌 システム要件

- Node.js: 18以降
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
