<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 可用语言:
    <a href="README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>桌面通知、个性声音、ntfy 手机应用通知、邮件通知和 API 推送，减少 AI 任务等待焦虑，舒适地享用一杯咖啡。​</h3>
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

## 🤔 你还在这样 “监工式” 地使用 AI 吗？

像个不放心的老板，盯着 AI 输出一行行跳动，明明可以去处理别的事，却偏偏一刻都离不开屏幕。

**Message MCP 让你彻底解放注意力！**

## 💡 使用方法

[![安装_MCP-Cursor](https://img.shields.io/badge/安装_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![安装_MCP-VS_Code](https://img.shields.io/badge/安装_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![安装_MCP-VS_Code_Insiders](https://img.shields.io/badge/安装_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

🧑 **用户**：做一款俄罗斯方块网页游戏，**_完成后通知_**。  
🤖 **AI**：我将开始做俄罗斯方块游戏...

> ⚠️ 通常 MCP 客户端需要设置
>
> - 启用自动运行，允许 MCP 自动执行。
> - 用户规则添加 “完成后通知” 可避免重复指令。

### 手动安装

#### MacOS / Linux / WSL2

<details open>
<summary>点击展开</summary>

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

</details>

#### Windows

<details>
<summary>点击展开</summary>

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

</details>

#### 个性声音通知配置（可选）

<details>
<summary>点击展开</summary>

如果您想使用自定义声音通知功能，请添加声音文件路径配置参数：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["message-mcp@latest", "--sound-path=/path/to/your/sound.mp3"]
    }
  }
}
```

**默认个性声音**：默认声音来自于 [zapsplat.com](https://zapsplat.com/)。如果不喜欢默认个性声音，可以到这个网站下载配置。

</details>

#### ntfy 手机端通知配置（可选）

<details>
<summary>点击展开</summary>

如果您想使用 ntfy 手机端通知功能，请添加 topic 配置参数：

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["message-mcp@latest", "--ntfy-topic=your-unique-topic-name"]
    }
  }
}
```

**ntfy 应用下载地址：**

- [App Store](https://apps.apple.com/us/app/ntfy/id1625396347)
- [Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
- [F-Droid](https://f-droid.org/en/packages/io.heckel.ntfy/)

</details>

#### 邮件通知配置（可选）

<details>
<summary>点击展开</summary>

如果您想使用邮件通知功能，请添加 SMTP URL 配置参数：

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

</details>

#### API 通知配置（可选）

<details>
<summary>点击展开</summary>

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

</details>

## 📌 系统要求

- Node.js：18 或更高
- macOS：原生通知需要 >= 10.8 版本
- Linux：需要安装 notify-osd 或 libnotify-bin（Ubuntu 默认包含）
- Windows：>= 8 版本，或 Windows < 8 的任务栏气球提示

## ⚡ 解决异常问题

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
