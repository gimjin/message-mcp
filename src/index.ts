#!/usr/bin/env node
import { fileURLToPath } from 'url'
import path from 'path'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import arg from 'arg'
import rfc2047 from 'rfc2047'
import play from 'play-sound'
import nodemailer from 'nodemailer'
import notifier from 'node-notifier'
import { parseSmtpUrl, universalRequest } from './utils.js'

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
    '--sound-path': String,
    '--ntfy-topic': String,
    '--smtp-url': String,
    '--api-url': String,
  },
  {
    permissive: true,
    argv: process.argv.slice(2),
  },
)

const soundPath = args['--sound-path']
const ntfyTopic = args['--ntfy-topic']
const smtpUrl = args['--smtp-url']
const apiUrl = args['--api-url']

server.registerTool(
  'notify',
  {
    title: 'Send Message Notification',
    description:
      'Send notifications and messages through multiple channels (desktop, email, API). Use this tool to notify users about any important information, progress updates, task completions, alerts, or any other communication needs.',
    inputSchema: {
      title: z.string().optional().describe('The title of the notification'),
      message: z
        .string()
        .optional()
        .describe('The main content of the notification message'),
    },
  },
  async ({ title, message }) => {
    const notifyTitle = title || 'Message MCP'
    const notifyMessage = message || 'Task completed, please review.'
    const results = []

    // NTFY notification
    if (ntfyTopic) {
      try {
        await universalRequest(`https://ntfy.sh/${ntfyTopic}`, {
          method: 'POST',
          body: notifyMessage,
          headers: {
            Title: rfc2047.encode(notifyTitle),
            Priority: 'urgent',
          },
        })
        results.push('NTFY notification sent successfully!')
      } catch (error) {
        results.push(
          `NTFY notification failed: ${error instanceof Error ? error.message : String(error)}`,
        )
        console.error('Error sending NTFY notification:', error)
      }
    }

    // Email notification
    if (smtpUrl) {
      try {
        const smtpConfig = parseSmtpUrl(smtpUrl)

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
          text: notifyMessage,
        }

        await transporter.sendMail(mailOptions)
        results.push('Email notification sent successfully!')
      } catch (error) {
        results.push(
          `Email notification failed: ${error instanceof Error ? error.message : String(error)}`,
        )
        console.error('Error sending email:', error)
      }
    }

    // API notification
    if (apiUrl) {
      try {
        const response = await universalRequest(apiUrl, {
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

    // Desktop notification
    try {
      await new Promise((resolve, reject) => {
        notifier.notify(
          {
            title: notifyTitle,
            message: notifyMessage,
            sound: false,
          },
          (err) => {
            if (err) {
              // Because the callback function will not be entered until the notification is closed, only the immediate error is captured
              reject(
                new Error(`Error sending desktop notification: ${err.message}`),
              )
            }
          },
        )

        setTimeout(() => {
          results.push('Desktop notification sent successfully!')
          resolve(true)
        }, 500)
      })
    } catch (error) {
      results.push(
        `Desktop notification failed: ${error instanceof Error ? error.message : String(error)}`,
      )
      console.error('Error sending desktop notification:', error)
    }

    // Play sound notification
    try {
      const player = play({})
      const defaultSoundPath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'assets',
        'notify.mp3',
      )
      const audioPath = soundPath || defaultSoundPath

      await new Promise((resolve, reject) => {
        player.play(audioPath, (err) => {
          if (err) {
            reject(new Error(`Error playing sound: ${err.message}`))
          } else {
            results.push('Sound notification played successfully!')
            resolve(true)
          }
        })
      })
    } catch (error) {
      results.push(
        `Sound notification failed: ${error instanceof Error ? error.message : String(error)}`,
      )
      console.error('Error playing sound:', error)
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

  console.error(
    `${soundPath ? `Sound Path: ${soundPath}` : 'No Sound Path provided'}`,
  )
  console.error(
    `${ntfyTopic ? `NTFY Topic: ${ntfyTopic}` : 'No NTFY Topic provided'}`,
  )
  console.error(`${smtpUrl ? `SMTP URL: ${smtpUrl}` : 'No SMTP URL provided'}`)
  console.error(`${apiUrl ? `API URL: ${apiUrl}` : 'No API URL provided'}`)

  console.error('message-mcp MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
