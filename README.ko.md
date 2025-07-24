<div align="center">
  <h1>💬 Message MCP</h1>
  <p>
    🌐 다른 언어:
    <a href="README.md">English</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
  </p>
  <h3>데스크톱 알림, 개인 맞춤 사운드, ntfy 모바일 알림, 이메일 알림 및 API 푸시로 AI 작업 대기 불안을 줄이고 편안하게 커피 한잔을 즐기세요.</h3>
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

## 🤔 아직도 이런 "감시식"으로 AI를 사용하고 계신가요?

걱정스러운 상사처럼 AI 출력을 한 줄씩 응시하며, 분명히 다른 일을 처리할 수 있음에도 불구하고 화면에서 잠시도 떨어질 수 없어 하고 있습니다.

**Message MCP로 완전히 주의력을 해방시켜 보세요!**

```text
🧑: 테트리스 웹 게임을 만들어 주세요, 완료 시 알림해 주세요.
🤖: 테트리스 게임을 만들기 시작하겠습니다
   ...
💬: Message MCP 실행됨, 메시지 전송 완료
```

> [!TIP]
>
> - 클라이언트 설정에서 **MCP 자동 실행 허용**을 활성화하세요.
> - **사용자 규칙** 또는 **규칙 파일**에 "완료 시 알림" 프롬프트를 추가하면 반복적인 수동 프롬프트를 피할 수 있습니다.

### ⚡️ 빠른 시작

[![클릭_설치-Cursor](https://img.shields.io/badge/클릭_설치-Cursor-171717)](https://cursor.com/install-mcp?name=message-mcp&config=eyJjb21tYW5kIjogIm5weCIsImFyZ3MiOiBbIm1lc3NhZ2UtbWNwQGxhdGVzdCJdfQ==) [![클릭_설치-VS_Code](https://img.shields.io/badge/클릭_설치-VS_Code-0098FF)](https://insiders.vscode.dev/redirect?url=vscode:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![클릭_설치-VS_Code_Insiders](https://img.shields.io/badge/클릭_설치-VS_Code_Insiders-24bfa5)](https://insiders.vscode.dev/redirect?url=vscode-insiders:mcp/install?{%22name%22:%22message-mcp%22,%22command%22:%22npx%22,%22args%22:[%22message-mcp@latest%22]}) [![smithery.ai](https://smithery.ai/badge/@gimjin/message-mcp)](https://smithery.ai/server/@gimjin/message-mcp)

#### smithery.ai 소개

- shttp 모드: MCP를 클라우드에서 실행하고, 인증, TLS 암호화, 키 호스팅을 모두 대신 처리해 줍니다. 로컬 설정 없음, 유출 위험 없음, 브라우저에서 어디서든 안전하게 호출 가능합니다.
- stdio 모드: Claude Desktop, Cursor, Windsurf 등 주요 클라이언트에 원클릭으로 설치 가능하며, 즉시 사용할 수 있습니다.

> 자세한 내용은 [Smithery 서버에 원클릭 연결](https://smithery.ai/docs/getting_started/quickstart_connect#one-click-connect-to-smithery-servers)을 읽어보세요.

### ⚙️ 수동 설치

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

### 🎛️ 선택적 구성

#### 데스크톱 알림 수정

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

> - 데스크톱 알림이 기본적으로 활성화되어 있습니다
> - 기본 사운드는 zapsplat에서 제공됩니다. 기본 사운드가 마음에 들지 않으면 [zapsplat.com](https://zapsplat.com/)에서 다운로드하여 구성할 수 있습니다.

#### ntfy 모바일 알림

앱 설치: [App Store](https://apps.apple.com/us/app/ntfy/id1625396347), [Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy), [F-Droid](https://f-droid.org/en/packages/io.heckel.ntfy/)

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

#### 이메일 알림

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

#### API 알림

```json
{
  "mcpServers": {
    "message-mcp": {
      "command": "npx",
      "args": ["-y", "message-mcp@latest"],
      "env": {
        "API_URL": "https://httpbin.org/post",
        "API_METHOD": "POST",
        "API_HEADERS": "{\"Authorization\": \"Token\"}"
      }
    }
  }
}
```

## 📌 시스템 요구사항

- Node.js: 18 이상
- macOS: 네이티브 알림은 10.8 이상 필요
- Linux: notify-osd 또는 libnotify-bin 설치 필요(Ubuntu는 기본 포함)
- Windows: 8 이상, 또는 8 미만은 작업 표시줄 풍선 알림

## ❗️ 문제 해결

#### Windows 시스템 알림이 활성화되지 않음

설정 > 알림 및 작업 > 앱 및 기타 발신자로부터 알림 받기 → 활성화

#### WSL2 (Ubuntu)에 알림 소리가 없습니다

```bash
sudo apt install -y pulseaudio mpg123
```

#### WSL2 환경에서 OS 알림 누락

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

```bash
sudo find / -type f -name "snoretoast-*.exe" 2>/dev/null
/path/to/.../node_modules/snoretoast-x64.exe
/path/to/.../node_modules/snoretoast-x86.exe

chmod +x /path/to/.../node_modules/snoretoast-*.exe
```

---

이 프로젝트가 도움이 되었다면 ⭐️을 눌러 지원해 주시고 더 많은 사람들이 볼 수 있도록 해주세요!
