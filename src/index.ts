import path from 'path'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
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

export const configSchema = z.object({
  ntfyTopic: z.string().optional().describe('Notification topic for ntfy app'),
  smtpHost: z.string().optional().describe('SMTP server host'),
  smtpPort: z.number().optional().describe('SMTP server port'),
  smtpSecure: z
    .boolean()
    .optional()
    .describe('Use TLS/SSL for SMTP connection'),
  smtpUser: z.string().optional().describe('SMTP username'),
  smtpPass: z.string().optional().describe('SMTP password'),
  apiUrl: z.string().optional().describe('API URL for external service calls'),
  apiHeaders: z
    .string()
    .optional()
    .describe('Additional headers for API requests (JSON string)'),
  apiMethod: z
    .string()
    .optional()
    .describe('HTTP method for API requests (POST, PUT, PATCH)'),
})

export default function ({
  sessionId,
  config,
}: {
  sessionId: string
  config: z.infer<typeof configSchema>
}) {
  // stdio mode is when sessionId starts with 'stdio'
  const isShttpMode = !sessionId.startsWith('stdio')
  // inernal sound
  const internalSoundPath = path.join(__dirname, 'assets', 'notify.mp3')

  // config values
  const disableDesktop = getBoolean(isShttpMode || process.env.DISABLE_DESKTOP)
  const soundPath = process.env.SOUND_PATH || internalSoundPath
  const ntfyTopic = process.env.NTFY_TOPIC || config.ntfyTopic
  const smtpHost = process.env.SMTP_HOST || config.smtpHost
  const smtpPort = Number(process.env.SMTP_PORT || config.smtpPort) || 587
  const smtpSecure = getBoolean(process.env.SMTP_SECURE || config.smtpSecure)
  const smtpUser = process.env.SMTP_USER || config.smtpUser
  const smtpPass = process.env.SMTP_PASS || config.smtpPass
  const apiUrl = process.env.API_URL || config.apiUrl
  const apiHeaders = getHeaders(process.env.API_HEADERS || config.apiHeaders)
  const apiMethod = getApiMethod(process.env.API_METHOD || config.apiMethod)

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
      if (ntfyTopic) {
        const safeTopic = encodeURIComponent(ntfyTopic)
        allNotifyPromise.ntfy = universalRequest(
          `https://ntfy.sh/${safeTopic}`,
          {
            method: 'POST',
            body: notifyMessage,
            headers: {
              Title: rfc2047.encode(notifyTitle),
              Priority: 'urgent',
            },
          },
        )
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
      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          pool: true,
          maxConnections: 5,
        })

        const mailOptions = {
          from: smtpUser,
          to: smtpUser,
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
      if (apiUrl) {
        const headers = {
          'Content-Type': 'application/json',
          ...apiHeaders,
        }

        allNotifyPromise.api = universalRequest(apiUrl, {
          method: apiMethod,
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
      if (!disableDesktop) {
        // Sound notification
        const player = play({})
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

  return server.server
}
