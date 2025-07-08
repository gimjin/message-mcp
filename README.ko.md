<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 다른 언어:
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>실시간 푸시 알림과 알림 소리로 화면을 지켜보지 않아도 됩니다. AI가 작업하는 동안 편안하게 커피 한 잔을 즐기세요.</h3>
  <a href="https://deepwiki.com/gimjin/message-mcp">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki">
  </a>
  <a href="https://smithery.ai/server/@gimjin/message-mcp">
    <img src="https://smithery.ai/badge/@gimjin/message-mcp" alt="smithery badge">
  </a>
  <a href="https://github.com/gimjin/message-mcp/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/gimjin/message-mcp" alt="MIT License">
  </a>
</div>

## 🤔 왜 Message MCP 인가요?

아직도 이런 방식으로 일하고 계신가요?

- 👀 AI가 코드를 생성하는 동안 진행 바를 바라보며 기다리기
- 🔄 ChatGPT가 답변을 완료했는지 확인하기 위해 계속 창을 전환하기
- ⏳ Cursor, Copilot, Claude Code 등이 실행 중일 때 자리를 떠나기 두려워하기

**Message MCP가 이 문제를 해결합니다!**

## ✨ 주요 기능

- 💬 **즉시 알림**: AI 작업 완료 시 데스크톱 알림 자동 표시
- 🔔 **사운드 알림**: 소리로 진행 상황을 알려주어 중요한 진척을 놓치지 않음
- 📧 **이메일 알림**: SMTP를 통한 이메일 알림 지원
- 🧩 **웹훅 지원**: 사용자 지정 URL 엔드포인트로 알림 전송

## 💡 사용법

👤 사용자: 테트리스 웹 게임을 만들어 주세요. **_완료되면 알려주세요._**<br>
🤖 AI: 테트리스 게임을 만들기 시작하겠습니다...

> [!tip]
> Cursor의 [User Rules](https://docs.cursor.com/context/rules#user-rules)에 **_작업 완료 시 알려주세요_**를 추가하여 반복적인 지시와 작별하세요.
> **_복잡한 작업 처리 후 알려주세요_**로 설정하면, AI는 복잡한 작업에 대해서만 알려주고 간단한 작업은 방해하지 않습니다.

[![인스톨_MCP-Cursor](https://img.shields.io/badge/인스톨_MCP-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![인스톨_MCP-VS_Code](https://img.shields.io/badge/인스톨_MCP-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![인스톨_MCP-VS_Code_Insiders](https://img.shields.io/badge/인스톨_MCP-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]})

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

#### 이메일 알림 설정(선택)

이메일 알림을 사용하려면 `args` 배열에 SMTP URL을 추가하세요:

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": [
        "message-mcp@latest",
        "--smtp-url=smtp://your-email@gmail.com:your-app-password@smtp.gmail.com:587"
      ]
    }
  }
}
```

**주요 SMTP URL 예시:**

- **Gmail**: `smtp://user:pass@smtp.gmail.com:587`
- **Outlook**: `smtp://user:pass@smtp-mail.outlook.com:587`
- **Yahoo**: `smtp://user:pass@smtp.mail.yahoo.com:587`
- **QQ메일**: `smtps://user:pass@smtp.qq.com:465`

#### 웹훅 알림 설정(선택)

웹훅 알림을 사용하려면 webhook URL을 추가하세요:

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": [
        "message-mcp@latest",
        "--webhook-url=https://your-webhook-endpoint.com/notify"
      ]
    }
  }
}
```

## 📌 시스템 요구사항

- macOS: 네이티브 알림은 10.8 이상 필요
- Linux: notify-osd 또는 libnotify-bin 설치 필요(Ubuntu는 기본 포함)
- Windows: 8 이상, 또는 8 미만은 작업 표시줄 풍선 알림

## ⚡ 문제 해결

#### Windows 시스템 알림이 비활성화됨

설정 > 알림 및 작업 > 앱 및 기타 발신자로부터 알림 받기 → 사용

#### WSL2 환경에서 OS 알림 누락

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```
