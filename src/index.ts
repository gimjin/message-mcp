import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import rfc2047 from 'rfc2047'
import play from 'play-sound'
import nodemailer from 'nodemailer'
import notifier from 'node-notifier'
import {
  universalRequest,
  getBoolean,
  getApiMethod,
  getHeaders,
} from './utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

type MessageMcpConfig = {
  disableDesktop?: boolean
  soundPath?: string
  ntfyTopic?: string
  smtpHost?: string
  smtpPort?: number
  smtpSecure?: boolean
  smtpUser?: string
  smtpPass?: string
  apiUrl?: string
  apiMethod?: string
  apiHeaders?: HeadersInit
}

const config: MessageMcpConfig = {
  disableDesktop: getBoolean(process.env.DISABLE_DESKTOP),
  soundPath: process.env.SOUND_PATH,
  ntfyTopic: process.env.NTFY_TOPIC,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpSecure: getBoolean(process.env.SMTP_SECURE),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  apiUrl: process.env.API_URL,
  apiHeaders: getHeaders(process.env.API_HEADERS),
  apiMethod: getApiMethod(process.env.API_METHOD),
}

const server = new McpServer({
  name: process.env.MCP_NAME!,
  version: process.env.MCP_VERSION!,
})

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
    const allNotifyPromise: { [key: string]: Promise<unknown> } = {}

    // NTFY notification
    if (config.ntfyTopic) {
      const safeTopic = encodeURIComponent(config.ntfyTopic)
      allNotifyPromise.ntfy = universalRequest(`https://ntfy.sh/${safeTopic}`, {
        method: 'POST',
        body: notifyMessage,
        headers: {
          Title: rfc2047.encode(notifyTitle),
          Priority: 'urgent',
        },
      })
        .then((response) =>
          response.ok
            ? 'NTFY notification sent successfully!'
            : `NTFY notification failed with status: ${response.status}`,
        )
        .catch((error) => {
          throw new Error(`NTFY notification error: ${error.message}`)
        })
    }

    // Email notification
    if (config.smtpHost && config.smtpUser && config.smtpPass) {
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.smtpSecure,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPass,
        },
        pool: true,
        maxConnections: 5,
      })

      const mailOptions = {
        from: config.smtpUser,
        to: config.smtpUser,
        subject: notifyTitle,
        text: notifyMessage,
      }

      allNotifyPromise.nodemailer = transporter
        .sendMail(mailOptions)
        .then((info) => {
          transporter.close()
          return `Email sent successfully! Message ID: ${info.messageId}`
        })
        .catch((error) => {
          transporter.close()
          throw new Error(`Email notification failed: ${error.message}`)
        })
    }

    // API notification
    if (config.apiUrl) {
      const headers = {
        'Content-Type': 'application/json',
        ...config.apiHeaders,
      }

      allNotifyPromise.api = universalRequest(config.apiUrl, {
        method: config.apiMethod,
        headers,
        body: JSON.stringify({
          title: notifyTitle,
          message: notifyMessage,
        }),
      })
        .then((response) =>
          response.ok
            ? 'API notification sent successfully!'
            : `API notification failed with status: ${response.status}`,
        )
        .catch((error) => {
          throw new Error(`API notification error: ${error.message}`)
        })
    }

    // Desktop play sound notification
    if (!config.disableDesktop) {
      // Sound notification
      const player = play({})
      const internalSoundPath = join(__dirname, 'assets', 'notify.mp3')
      const soundPath = config.soundPath || internalSoundPath

      allNotifyPromise.sound = new Promise((resolve, reject) => {
        player.play(soundPath, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve('Sound notification played successfully!')
          }
        })
      })
        .then((result) => result)
        .catch((error) => {
          throw new Error(`Sound notification error: ${error.message}`)
        })

      // Desktop notification
      allNotifyPromise.desktop = new Promise((resolve, reject) => {
        notifier.notify(
          {
            title: notifyTitle,
            message: notifyMessage,
            sound: false,
          },
          (error) => {
            if (error) {
              reject(error)
            } else {
              resolve('Desktop notification sent successfully!')
            }
          },
        )
      })
        .then((result) => result)
        .catch((error) => {
          throw new Error(`Desktop notification error: ${error.message}`)
        })
    }

    // Wait for all notifications to complete
    if (Object.keys(allNotifyPromise).length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'No notification channels configured.',
          },
        ],
      }
    }

    // Collect results from all notifications
    const entries = Object.entries(allNotifyPromise)
    const results = await Promise.allSettled(entries.map(([, p]) => p))
    const content: { type: 'text'; text: string }[] = []

    results.forEach((result, i) => {
      const [name] = entries[i]
      content.push({
        type: 'text' as const,
        text: `${name}: ${result.status === 'fulfilled' ? result.value : 'notification failed. ' + (result.reason instanceof Error ? result.reason.message : String(result.reason))}`,
      })
    })

    return {
      content,
    }
  },
)

// Create the transport for the server
const transport = new StdioServerTransport()

// Connect the server to the transport
server
  .connect(transport)
  .then(() => {
    console.log('Server connected successfully')
  })
  .catch((error) => {
    console.error('Error occurred while connecting server:', error)
  })
