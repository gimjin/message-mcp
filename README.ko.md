<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 다른 언어:
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>실시간 푸시 알림과 알림 소리로 화면을 지켜보지 않아도 됩니다. AI가 작업하는 동안 편안하게 커피 한 잔을 즐기세요.</h3>
</div>

## 🤔 왜 Coffee Time인가요？

아직도 이런 방식으로 일하고 계신가요？

- 👀 AI가 코드를 생성하는 동안 진행 바를 바라보며 기다리기
- 🔄 ChatGPT가 답변을 완료했는지 확인하기 위해 계속 창을 전환하기
- ⏳ Cursor, Copilot, Claude Code 등이 실행 중일 때 자리를 떠나기 두려워하기

**Coffee Time이 이 문제를 해결합니다！**

## ✨ 기능

- 💬 **즉시 알림**：AI 작업이 완료되면 자동으로 데스크톱 알림이 나타납니다
- 🔔 **소리 알림**：중요한 진행 상황을 놓치지 않도록 오디오 알림을 제공합니다
- 🧩 **웹훅 지원**：사용자 정의 URL 엔드포인트로 알림을 전송합니다

> 로드맵：iOS/Android 네트워크 알림 웹훅 개발 중

## 🚀 빠른 시작

### MCP 클라이언트 구성 (Cursor, Claude Code, Copilot 등)

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

> [!TIP]
> 자신만의 서비스에 알림을 보내려면 args에 "--post-url=https://your-webhook"를 추가하세요.

## 💡 사용법

👤 사용자: 테트리스 웹 게임을 만들어 주세요. **_완료되면 알려주세요._**<br>
🤖 AI: 테트리스 게임을 만들기 시작하겠습니다...

## 📌 시스템 요구사항

- macOS: 네이티브 알림을 위해 >= 10.8 필요
- Linux: notify-osd 또는 libnotify-bin이 설치되어 있어야 함 (Ubuntu는 기본적으로 포함됨)
- Windows: >= 8, 또는 Windows < 8의 경우 작업 표시줄 풍선
