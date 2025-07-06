# ☕ Coffee Time

[中文文档](./README-CN.md)

**Enjoy a cup of coffee while AI works for you**

> **No more staring at the screen!** Coffee Time is your AI assistant companion. Through the MCP service, it sends you **notifications and sound alerts** when AI tasks are completed, so you can truly experience a workflow where "AI works, you enjoy your coffee."

## ✨ Why Coffee Time？

Are you still working like this？

- 👀 Staring at the progress bar waiting for AI to generate code
- 🔄 Constantly switching windows to check if ChatGPT has finished replying
- ⏳ Afraid to leave your seat while Cursor, Copilot, Claude Code and more are running

**Coffee Time solves this problem！**

## ✨ Features

- 🔔 **Instant Notifications**：Automatically pops up desktop notifications when AI tasks are done
- 🎵 **Sound Alerts**：Audio reminders so you never miss any important progress
- 🌐 **Webhook Support**：Send notifications to custom URL endpoints

> Roadmap：iOS/Android network notification webhook in development

## 🚀 Quick Start

### MCP Client Configuration （Cursor, Claude Code, Copilot and more）

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

> [Optional] Add "--post-url=https://your-webhook" to args to notify your own service.

## 💡 Usage

### Example Conversation

👤 You: Help me analyze the structure of this large project and generate detailed documentation. <font color="gold">Notify me when done.</font><br>
🤖 AI: I'll start analyzing the project code...<br>

### Advanced Example Conversation

👤 You: This is an empty folder, help me make a Tetris web game. <font color="gold">Notify me if you modify the same issue more than 3 times.</font><br>
🤖 AI: I'll start making the Tetris game...<br>
