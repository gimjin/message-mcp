<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 Available in:
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>Desktop notifications, emails, and API pushes reduce anxiety while waiting for AI tasks, allowing you to comfortably enjoy a cup of coffee.</h3>
  <span>
    <img src="https://badge.mcpx.dev?type=server" title="MCP Server"/>
  </span>
  <a href="https://deepwiki.com/gimjin/message-mcp">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki">
  </a>
  <a href="https://smithery.ai/server/@gimjin/message-mcp">
    <img src="https://smithery.ai/badge/@gimjin/message-mcp" alt="smithery badge">
  </a>
  <span>
    <img src="https://message-mcp-werker.kimseongrim.workers.dev/analytics.png" title="MCP Analytics"/>
  </span>
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

## 🤔 Are you still using AI in this "micromanaging" way?

Like a worried boss, staring at AI output line by line, clearly able to handle other tasks, but stubbornly unable to leave the screen for a moment.

**Message MCP lets you completely free your attention!**

## 💡 Usage

[![Install_MCP-Cursor](https://img.shields.io/badge/Install_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![Install_MCP-VS_Code](https://img.shields.io/badge/Install_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![Install_MCP-VS_Code_Insiders](https://img.shields.io/badge/Install_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

🧑 **User**: Make a Tetris web game. **_Notify me when the task is complete_**.  
🤖 **AI**: I'll start making the Tetris game...

> [!tip]
>
> - Enable this option in `Cursor Settings > Chat > Auto-run` to allow the AI assistant to automatically execute commands.
> - Add **_"Notify me when task is complete"_** in `Cursor Settings > Rules` to avoid repetitive instructions.

### Install manually

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

#### Email Notification Setup (Optional)

If you want to use email notifications, add the SMTP URL configuration parameter to the `args` array:

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

**Common SMTP URL Examples:**

- **Gmail**: `smtp://user:pass@smtp.gmail.com:587`
- **Outlook**: `smtp://user:pass@smtp-mail.outlook.com:587`
- **Yahoo**: `smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQ Mail**: `smtps://user:pass@smtp.qq.com:465`

#### API Notification Setup (Optional)

If you want to use API notifications, add the API URL configuration parameter:

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

## 📌 System Requirements

- Node.js: 18 or newer
- macOS: Native notifications require >= 10.8
- Linux: notify-osd or libnotify-bin installed (Ubuntu includes by default)
- Windows: >= 8, or taskbar balloon notifications for Windows < 8

## ⚡ Troubleshooting

#### Windows System Notifications Disabled

Settings > Notifications & actions > Get notifications from apps and other senders → Enable

#### WSL2 Environment Missing OS Notifications

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```
