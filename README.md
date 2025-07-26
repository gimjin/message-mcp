<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 Available in:
    <a href="README.zh.md">中文</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>Desktop notifications, custom sounds, ntfy mobile notifications, email notifications, and API pushes reduce anxiety while waiting for AI tasks, allowing you to comfortably enjoy a cup of coffee.</h3>
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

## 🤔 Are you still using AI in this "micromanaging" way?

Like a worried boss, staring at AI output line by line, clearly able to handle other tasks, but stubbornly unable to leave the screen for a moment.

**Message MCP lets you completely free your attention!**

```text
🧑: Make a Tetris web game, notify when completed.
🤖: I'll start making the Tetris game
   ...
💬: Message MCP executed, message sent
```

> [!TIP]
>
> - **Allow MCP auto-execution** in client settings.
> - Add "notify when completed" prompts in **user rules** or **rule files** to avoid repetitive manual prompts.

### ⚡️ Quick Installation

[![Click_Install-Cursor](https://img.shields.io/badge/Click_Install-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![Click_Install-VS_Code](https://img.shields.io/badge/Click_Install-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![Click_Install-VS_Code_Insiders](https://img.shields.io/badge/Click_Install-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![smithery.ai](https://smithery.ai/badge/@gimjin/message-mcp)](https://smithery.ai/server/@gimjin/message-mcp)

> smithery.ai supports Message MCP cloud execution, automatically handling authentication and key hosting with zero leakage risk. One-click integration with mainstream clients like Cursor, ready to use out of the box, and also supports cloud service deployment like Dify. [Learn more](https://smithery.ai/docs/getting_started/quickstart_connect#one-click-connect-to-smithery-servers)

### ⚙️ Manual Installation

#### MacOS, Linux, WSL2

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

### 🎛️ Optional Configuration

#### Modify Desktop Notifications

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

> - Desktop notifications are enabled by default
> - Default sound provided by zapsplat. If you don't like the default sound, you can download and configure from [zapsplat.com](https://zapsplat.com/).

#### ntfy Mobile Notifications

Install App: [App Store](https://apps.apple.com/us/app/ntfy/id1625396347), [Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy), [F-Droid](https://f-droid.org/en/packages/io.heckel.ntfy/)

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

#### Email Notifications

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

#### API Notifications

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "API_URL": "https://httpbin.org/post",
        "API_METHOD": "POST", // POST, PUT, PATCH
        "API_HEADERS": "{\"Authorization\": \"Token\"}"
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

## 📌 System Requirements

- Node.js: 18 or higher
- macOS: Native notifications require >= 10.8
- Linux: notify-osd or libnotify-bin installed (Ubuntu includes by default)
- Windows: >= 8, or taskbar balloon notifications for Windows < 8

## ❗️ Troubleshooting

#### Windows System Notifications Not Enabled

Settings > Notifications & actions > Get notifications from apps and other senders → Enable

#### WSL2 (Ubuntu) has no notification sound

```bash
sudo apt install -y pulseaudio mpg123
```

#### WSL2 Environment Missing OS Notifications

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

---

If this project is helpful to you, please give it a ⭐️ to support it and let more people see it!
