# ☕ Coffee Time

[English Document](./README.md)

**让 AI 工作时，你可以安心享受一杯咖啡的时间**

> **告别屏幕苦等！** Coffee Time 是你的 AI 助手搭档，通过 MCP 服务在 AI 完成任务时发送**通知和提示音**，让你真正实现「AI 干活，你喝咖啡」的工作流。

## ✨ 为什么需要 Coffee Time？

还在这样工作吗？

- 👀 盯着进度条等 AI 生成代码
- 🔄 不断切回窗口看 ChatGPT 是否完成回复
- ⏳ 在 Cursor, Copilot, Claude Code and more 运行时不敢离开座位

**Coffee Time 解决这个问题！**

## ✨ 功能特性

- 🔔 **即时通知**: AI 完成任务时自动弹出桌面通知
- 🎵 **提示音**: 配合声音提醒，不错过任何重要进展
- 🌐 **Webhook 支持**: 可发送通知到自定义 URL 端点

> 路线图: 正在开发 iOS/Android 网络通知 webhook

## 🚀 快速开始

### MCP 客户端配置 (Cursor, Claude Code, Copilot and more)

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

> [可选] args 添加 "--post-url=https://your-webhook" 通知你的服务.

## 💡 使用方法

### 示例对话

👤 你: 帮我分析这个大型项目的代码结构，生成详细的文档. <font color="gold">完成后通知我.</font><br>
🤖 AI: 我将开始分析项目代码...<br>

### 示例对话进阶

👤 你: 这是一个空文件夹, 帮我做一款俄罗斯方块网页游戏. <font color="gold">重复修改同一个问题 3 次以上时通知我.</font><br>
🤖 AI: 我将开始做俄罗斯方块游戏...<br>
