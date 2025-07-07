<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 可用语言:
    <a href="README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.jp.md">日本語</a>
  </p>
  <h3>实时推送通知与提示音，让你无需紧盯屏幕。AI 工作时，你可以安心享受一杯咖啡。</h3>
</div>

## 🤔 为什么需要 Message MCP？

还在这样工作吗？

- 👀 盯着进度条等 AI 生成代码
- 🔄 不断切回窗口看 ChatGPT 是否完成回复
- ⏳ 在 Cursor, Copilot, Claude Code and more 运行时不敢离开座位

**Message MCP 解决这个问题！**

## ✨ 功能特性

- 💬 **即时通知**: AI 完成任务时自动弹出桌面通知
- 🔔 **提示音**: 配合声音提醒，不错过任何重要进展
- 📧 **邮件通知**: 支持通过 SMTP 发送邮件通知
- 🧩 **Webhook 支持**: 可发送通知到自定义 URL 端点

## 💡 使用方法

👤 你: 做一款俄罗斯方块网页游戏, **_完成后通知我._**<br>
🤖 AI: 我将开始做俄罗斯方块游戏...

#### MacOS / Linux

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["message-mcp"]
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
      "args": ["/c", "npx", "message-mcp"]
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
        "message-mcp",
        "--smtp-url=smtp://your-email@gmail.com:your-app-password@smtp.gmail.com:587"
      ]
    }
  }
}
```

**常见 SMTP URL 配置示例：**

- **Gmail**: `smtp://user:pass@smtp.gmail.com:587`
- **Gmail (SSL)**: `smtps://user:pass@smtp.gmail.com:465`
- **Outlook**: `smtp://user:pass@smtp.office365.com:587`
- **Yahoo**: `smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQ邮箱**: `smtp://user:pass@smtp.qq.com:587`

#### Webhook 通知配置（可选）

如果您想使用 Webhook 通知功能，请添加 webhook URL 配置参数：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": [
        "message-mcp",
        "--webhook-url=https://your-webhook-endpoint.com/notify"
      ]
    }
  }
}
```

## 📌 系统要求

- macOS: 原生通知需要 >= 10.8 版本
- Linux: 需要安装 notify-osd 或 libnotify-bin（Ubuntu 默认包含）
- Windows: >= 8 版本，或 Windows < 8 的任务栏气球提示

## ⚡ 解决异常问题

#### Windows 系统通知未启用

设置 > 通知和操作 > 获取来自应用和其他发送者的通知 → 启用

#### WSL2 环境缺少操作系统通知

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
node_modules_path/snoretoast-x64.exe
node_modules_path/snoretoast-x86.exe

chmod +x node_modules_path/snoretoast-*.exe
```
