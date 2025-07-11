<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 可用语言:
    <a href="README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>桌面通知、邮件和 API 推送，减少 AI 任务等待焦虑，舒适地享用一杯咖啡。​</h3>
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
    <img src="https://message-mcp-werker.kimseongrim.workers.dev/visit-count.svg?v=1" title="Visit Count"/>
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

## 🤔 你还在这样 “监工式” 地使用 AI 吗？

像个不放心的老板，盯着 AI 输出一行行跳动，明明可以去处理别的事，却偏偏一刻都离不开屏幕。

**Message MCP 让你彻底解放注意力！**

## 💡 使用方法

[![安装_MCP-Cursor](https://img.shields.io/badge/安装_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![安装_MCP-VS_Code](https://img.shields.io/badge/安装_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![安装_MCP-VS_Code_Insiders](https://img.shields.io/badge/安装_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

🧑 **用户**：做一款俄罗斯方块网页游戏，**_任务完成后通知我_**。  
🤖 **AI**：我将开始做俄罗斯方块游戏...

> [!tip]
>
> - 启用 `Cursor 设置 > 聊天 > 自动运行` 选项，允许自动执行 MCP 操作。
> - 把 **_"任务完成后通知我"_** 添加到 `Cursor 设置 > 规则`，可避免重复指令。

### 手动安装

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

#### 邮件通知配置（可选）

如果您想使用邮件通知功能，请在 `args` 数组中添加 SMTP URL 配置参数：

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

**常见 SMTP URL 配置示例：**

- **Gmail**: `smtp://user@:pass@smtp.gmail.com:587`
- **Outlook**: `smtp://user:pass@smtp-mail.outlook.com:587`
- **Yahoo**: `smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQ邮箱**: `smtps://user:pass@smtp.qq.com:465`

#### API 通知配置（可选）

如果您想使用 API 通知功能，请添加 API URL 配置参数：

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

## 📌 系统要求

- Node.js：18 或更高
- macOS：原生通知需要 >= 10.8 版本
- Linux：需要安装 notify-osd 或 libnotify-bin（Ubuntu 默认包含）
- Windows：>= 8 版本，或 Windows < 8 的任务栏气球提示

## ⚡ 解决异常问题

#### Windows 系统通知未启用

设置 > 通知和操作 > 获取来自应用和其他发送者的通知 → 启用

#### WSL2 环境缺少操作系统通知

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```
