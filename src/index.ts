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
    '--webhook-url': String,
    '--smtp-url': String,
  },
  {
    permissive: true,
    argv: process.argv.slice(2),
  },
)
const webhookUrl = args['--webhook-url']
const smtpUrl = args['--smtp-url']

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
    title: 'Notify Me',
    description: 'Notify me upon successful completion of task execution',
    inputSchema: {
      title: z.string().optional().describe('The title of the notify'),
      message: z.string().optional().describe('The message to notify'),
    },
  },
  async ({ title, message }) => {
    const notifyTitle = title || 'Message MCP'
    const notifyMessage = message || 'Task completed, please review.'
    const notifications = []

    // Desktop notification
    notifier.notify({
      title: notifyTitle,
      message: notifyMessage,
      sound: true,
    })

    // Webhook notification
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, message }),
        })

        if (!response.ok) {
          throw new Error(`Failed to post notification: ${response.statusText}`)
        }
        notifications.push('Webhook notification sent successfully!')
      } catch (error) {
        notifications.push('Failed to send webhook notification.')
        console.error('Error posting notification:', error)
      }
    }

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
          notifications.push('Email notification sent successfully!')
        } catch (error) {
          notifications.push('Failed to send email notification.')
          console.error('Error sending email:', error)
        }
      } else {
        notifications.push('Invalid SMTP URL format.')
      }
    }

    // Always include desktop notification status
    notifications.unshift('Desktop notification sent successfully!')

    return {
      content: [
        {
          type: 'text',
          text: notifications.join(' '),
        },
      ],
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('message-mcp MCP Server running on stdio')
  console.error(
    `${webhookUrl ? `Webhook URL: ${webhookUrl}` : 'No webhook URL provided'}`,
  )
  console.error(
    `${smtpUrl ? `SMTP URL: ${smtpUrl}` : 'No SMTP configuration provided'}`,
  )
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
