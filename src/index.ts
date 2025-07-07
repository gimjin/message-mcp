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
    const results = []

    // Desktop notification
    try {
      await new Promise((resolve, reject) => {
        notifier.notify(
          {
            title: notifyTitle,
            message: notifyMessage,
            sound: true,
          },
          (error) => {
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          },
        )
      })
      results.push('Desktop notification sent successfully!')
    } catch (error) {
      results.push(
        `Desktop notification failed: ${error instanceof Error ? error.message : String(error)}`,
      )
      console.error('Error sending desktop notification:', error)
    }

    // Webhook notification
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: notifyTitle, message: notifyMessage }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        results.push('Webhook notification sent successfully!')
      } catch (error) {
        results.push(
          `Webhook notification failed: ${error instanceof Error ? error.message : String(error)}`,
        )
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
