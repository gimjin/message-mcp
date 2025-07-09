#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import arg from 'arg'
import notifier from 'node-notifier'
import nodemailer from 'nodemailer'

const server = new McpServer({
  name: '#name',
  version: '#version',
  capabilities: {
    resources: {},
    tools: {},
  },
})

const args = arg(
  {
    '--smtp-url': String,
    '--api-url': String,
  },
  {
    permissive: true,
    argv: process.argv.slice(2),
  },
)
const smtpUrl = args['--smtp-url']
const apiUrl = args['--api-url']

// Parse SMTP URL
function parseSmtpUrl(url: string) {
  try {
    const parsed = new URL(url)
    const protocol = parsed.protocol.slice(0, -1) // Remove trailing ':'
    const secure = protocol === 'smtps' || parsed.port === '465'
    const host = parsed.hostname
    const port = parseInt(parsed.port)
    const user = decodeURIComponent(parsed.username)
    const pass = decodeURIComponent(parsed.password)

    return { host, port, secure, user, pass }
  } catch (error) {
    console.error('Invalid SMTP URL format:', error)
    return null
  }
}

server.registerTool(
  'notify',
  {
    title: 'Send Message Notification',
    description:
      'Send notifications and messages through multiple channels (desktop, email, API). Use this tool to notify users about any important information, progress updates, task completions, alerts, or any other communication needs.',
    inputSchema: {
      message: z
        .string()
        .optional()
        .describe('The main content of the notification message'),
    },
  },
  async ({ message }) => {
    const notifyTitle = 'Message MCP'
    const notifyMessage = message || 'Task completed, please review.'
    const results = []

    // Desktop notification
    notifier.notify({
      title: notifyTitle,
      message: notifyMessage,
      sound: true,
    })
    // BUG: node-notifier callback has very high latency on Windows WSL2 and cannot be used for failure reasoning
    results.push('Desktop notification sent successfully!')

    // Email notification
    if (smtpUrl) {
      const smtpConfig = parseSmtpUrl(smtpUrl)
      if (smtpConfig) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure,
            auth: {
              user: smtpConfig.user,
              pass: smtpConfig.pass,
            },
          })

          const mailOptions = {
            from: smtpConfig.user,
            to: smtpConfig.user,
            subject: notifyTitle,
            text: `${notifyMessage}\n\nhttps://github.com/gimjin/message-mcp`,
          }

          await transporter.sendMail(mailOptions)
          results.push('Email notification sent successfully!')
        } catch (error) {
          results.push(
            `Email notification failed: ${error instanceof Error ? error.message : String(error)}`,
          )
          console.error('Error sending email:', error)
        }
      } else {
        results.push('Email notification failed: Invalid SMTP URL format')
      }
    }

    // API notification
    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: notifyTitle, message: notifyMessage }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        results.push('API notification sent successfully!')
      } catch (error) {
        results.push(
          `API notification failed: ${error instanceof Error ? error.message : String(error)}`,
        )
        console.error('Error posting notification:', error)
      }
    }

    return {
      content: results.map((result) => ({
        type: 'text',
        text: result,
      })),
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error(`${smtpUrl ? `SMTP URL: ${smtpUrl}` : 'No SMTP URL provided'}`)
  console.error(`${apiUrl ? `API URL: ${apiUrl}` : 'No API URL provided'}`)
  console.error('message-mcp MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
