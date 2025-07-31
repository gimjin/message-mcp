import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net'
import { up } from 'up-fetch'
import { Command } from 'commander'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import rfc2047 from 'rfc2047'
import play from 'play-sound'
import nodemailer from 'nodemailer'
import notifier from 'node-notifier'
import { getBoolean, getApiMethod, getHeaders } from './utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Parse command line arguments
const program = new Command()
program
  .name(process.env.MCP_NAME!)
  .description(process.env.MCP_DESCRIPTION!)
  .version(process.env.MCP_VERSION!)
  .option('--shttp', 'Streamable HTTP server mode running')
  .parse(process.argv)

const options = program.opts()

// https://github.com/nodejs/node/issues/54359
const fetchTimeout = 5000
setDefaultAutoSelectFamilyAttemptTimeout(fetchTimeout)
const upfetch = up(fetch, () => ({
  timeout: fetchTimeout,
}))

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
  disableDesktop: getBoolean(options.shttp || process.env.DISABLE_DESKTOP),
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
      allNotifyPromise.ntfy = upfetch(`https://ntfy.sh/${safeTopic}`, {
        method: 'POST',
        body: notifyMessage,
        headers: {
          Title: rfc2047.encode(notifyTitle),
          Priority: 'urgent',
        },
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

      allNotifyPromise.nodemailer = transporter.sendMail(mailOptions)
    }

    // API notification
    if (config.apiUrl) {
      allNotifyPromise.api = upfetch(config.apiUrl, {
        method: config.apiMethod,
        headers: config.apiHeaders,
        body: {
          title: notifyTitle,
          message: notifyMessage,
        },
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
          }
        })
        setTimeout(() => {
          resolve({
            message: 'Sound notification played successfully!',
          })
        }, 1500)
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
            }
          },
        )

        setTimeout(() => {
          resolve({
            message: 'Desktop notification sent successfully!',
          })
        }, 1500)
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
      let message = ''

      if (result.status === 'fulfilled') {
        message =
          typeof result.value === 'object'
            ? `successfully! ${JSON.stringify(result.value)}`
            : 'successfully!'
      } else {
        message =
          result.reason instanceof Error
            ? `failed! ${result.reason.message}`
            : 'failed!'
      }

      content.push({
        type: 'text' as const,
        text: `${name} ${message}`,
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
