<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 可用语言:
    <a href="README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>桌面通知、个性化声音、ntfy 手机应用通知、邮件通知和 API 推送，减少 AI 任务等待焦虑，舒适地享用一杯咖啡。​</h3>
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
  <img src="https://s2.loli.net/2025/08/01/29msh4TAULFgGkn.webp" alt="Messsage MCP Exsample">
</div>

## 🚀 提升 AI 使用效率，释放更多时间

等待 AI 完成任务时，您是否希望能同时处理其他工作？现在可以在 AI 执行长时间任务时，安心去处理其他事务。

**Message MCP 让您的 AI 协作更高效！**

```text
🧑：做一款俄罗斯方块网页游戏，完成后通知。
🤖：我将开始做俄罗斯方块游戏
   ...
💬：Message MCP 执行，已发送信息。
```

> [!TIP]
>
> - 在客户端设置里 **允许 MCP 自动执行**。
> - 在 **用户规则** 或 **规则文件** 中加入 “完成后通知” 提示，即可避免重复手动提示。

### ⚡️ 快速安装

[![点击安装-Cursor](https://img.shields.io/badge/点击安装-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![点击安装-VS_Code](https://img.shields.io/badge/点击安装-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![点击安装-VS_Code_Insiders](https://img.shields.io/badge/点击安装-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![smithery.ai](https://smithery.ai/badge/@gimjin/message-mcp)](https://smithery.ai/server/@gimjin/message-mcp)

> 通过 smithery.ai 支持云端安装（如 Dify 等 SaaS 服务），也提供本地一键部署。由于 Message MCP 实际运行于 smithery.ai 云端，暂不支持桌面通知。全程采用端到端加密，保障数据安全。[了解更多](https://smithery.ai/docs/getting_started/quickstart_connect#one-click-connect-to-smithery-servers)

### ⚙️ 标准安装

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

### 🎛️ 可选配置

#### 修改桌面通知

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

> - 默认已开启桌面通知
> - 默认声音 zapsplat 提供。如果不喜欢默认声音，可以到 [zapsplat.com](https://zapsplat.com/) 下载配置。

#### ntfy 手机通知

安装 App：[App Store](https://apps.apple.com/us/app/ntfy/id1625396347)、[Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy)、[F-Droid](https://f-droid.org/en/packages/io.heckel.ntfy/)

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

#### 邮件通知

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

#### API 通知

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

## 📌 系统要求

- Node.js：18 或更高
- macOS：原生通知需要 >= 10.8 版本
- Linux：需要安装 notify-osd 或 libnotify-bin（Ubuntu 默认包含）
- Windows：>= 8 版本，或 Windows < 8 的任务栏气球提示

## ❗️ 解决异常问题

#### Windows 系统通知未启用

设置 > 通知和操作 > 获取来自应用和其他发送者的通知 → 启用

#### WSL2（Ubuntu）没有通知声音

```bash
sudo apt install -y pulseaudio mpg123
```

#### WSL2 环境缺少操作系统通知

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下，让更多人看到它！
