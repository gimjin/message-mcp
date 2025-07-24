import path from 'path'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import rfc2047 from 'rfc2047'
import play from 'play-sound'
import nodemailer from 'nodemailer'
import notifier from 'node-notifier'
import { universalRequest } from './utils.js'

export const configSchema = z.object({
  disableDesktop: z
    .boolean()
    .optional()
    .describe('Disable desktop notifications and sound'),
  soundPath: z.string().optional().describe('Path to the sound files'),
  ntfyTopic: z.string().optional().describe('Notification topic for ntfy'),
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
    .record(z.string(), z.string())
    .optional()
    .describe('Additional headers for API requests (JSON string)'),
  apiMethod: z
    .preprocess(
      (method) => (typeof method === 'string' ? method.toUpperCase() : method),
      z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']),
    )
    .optional()
    .describe('HTTP method for API requests (case insensitive)'),
})

export default function ({ config }: { config: z.infer<typeof configSchema> }) {
  const disableDesktop = process.env.DISABLE_DESKTOP
    ? process.env.DISABLE_DESKTOP === 'true'
    : config.disableDesktop
  const soundPath = process.env.SOUND_PATH || config.soundPath
  const ntfyTopic = process.env.NTFY_TOPIC || config.ntfyTopic
  const smtpHost = process.env.SMTP_HOST || config.smtpHost
  const smtpPort = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT)
    : config.smtpPort
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : config.smtpSecure
  const smtpUser = process.env.SMTP_USER || config.smtpUser
  const smtpPass = process.env.SMTP_PASS || config.smtpPass
  const apiUrl = process.env.API_URL || config.apiUrl
  let apiHeaders: Record<string, string> = {}
  try {
    apiHeaders = process.env.API_HEADERS
      ? JSON.parse(process.env.API_HEADERS)
      : config.apiHeaders
  } catch (error) {
    console.error('Invalid API_HEADERS format:', error)
  }
  const apiMethod = process.env.API_METHOD || config.apiMethod

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
        allNotifyPromise.ntfy = universalRequest(
          `https://ntfy.sh/${ntfyTopic}`,
          {
            method: 'POST',
            body: notifyMessage,
            headers: {
              Title: rfc2047.encode(notifyTitle),
              Priority: 'urgent',
            },
          },
        ).then((response) =>
          response.ok
            ? 'NTFY notification sent successfully!'
            : `NTFY notification failed with status: ${response.status}`,
        )
      }

      // Email notification
      if (smtpHost && smtpUser && smtpPass) {
        const smtpConfig = {
          host: smtpHost,
          port: smtpPort || 587,
          secure: smtpSecure || false,
          user: smtpUser,
          pass: smtpPass,
        }

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

        allNotifyPromise.nodemailer = transporter
          .sendMail(mailOptions)
          .then(
            (info) => `Email sent successfully! Message ID: ${info.messageId}`,
          )
      }

      // API notification
      if (apiUrl) {
        const defaultHeaders = {
          'Content-Type': 'application/json',
        }

        // Parse additional headers from API_HEADERS environment variable
        let additionalHeaders = {}
        if (apiHeaders) {
          try {
            additionalHeaders = apiHeaders
          } catch (error) {
            console.error(
              'Invalid API_HEADERS format, using default headers only:',
              error,
            )
          }
        }

        const headers = { ...defaultHeaders, ...additionalHeaders }

        allNotifyPromise.api = universalRequest(apiUrl, {
          method: (apiMethod || 'POST').toUpperCase(),
          headers,
          body: JSON.stringify({
            title: notifyTitle,
            message: notifyMessage,
          }),
        }).then((response) =>
          response.ok
            ? 'API notification sent successfully!'
            : `API notification failed with status: ${response.status}`,
        )
      }

      // Desktop play sound notification
      if (!disableDesktop) {
        // Sound notification
        const player = play({})
        const defaultSoundPath = path.join(__dirname, 'assets', 'notify.mp3')
        const audioPath = soundPath || defaultSoundPath

        allNotifyPromise.sound = new Promise((resolve, reject) => {
          player.play(audioPath, (error) => {
            if (error) {
              reject(new Error(`Error playing sound: ${error.message}`))
            } else {
              resolve('Sound notification played successfully!')
            }
          })
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
                reject(
                  new Error(
                    `Error sending desktop notification: ${error.message}`,
                  ),
                )
              } else {
                resolve('Desktop notification sent successfully!')
              }
            },
          )
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
