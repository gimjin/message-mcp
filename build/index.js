#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import arg from 'arg'
import notifier from 'node-notifier'
const server = new McpServer({
  name: 'coffee-time',
  version: '1.1.0',
  capabilities: {
    resources: {},
    tools: {},
  },
})
const args = arg(
  {
    '--post-url': String,
  },
  {
    permissive: true,
    argv: process.argv.slice(2),
  },
)
const postUrl = args['--post-url']
server.registerTool(
  'notify',
  {
    title: 'Notify Me',
    description: 'Notify me upon successful completion of task execution',
    inputSchema: {
      title: z.string().describe('The title of the notify'),
      message: z.string().describe('The message to notify'),
    },
  },
  async ({ title, message }) => {
    notifier.notify({
      title: title || 'coffee-time',
      message: message || 'Please check results.',
      sound: true,
    })
    let postUrlSuccess = true
    if (postUrl) {
      try {
        const response = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, message }),
        })
        if (!response.ok) {
          throw new Error(`Failed to post notification: ${response.statusText}`)
        }
      } catch (error) {
        postUrlSuccess = false
        console.error('Error posting notification:', error)
      }
    }
    return {
      content: [
        {
          type: 'text',
          text: postUrlSuccess
            ? 'Notification sent successfully!'
            : 'Failed to send the post URL notification.',
        },
      ],
    }
  },
)
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('coffee-time MCP Server running on stdio')
  console.error(`${postUrl ? `Post URL: ${postUrl}` : 'No post URL provided'}`)
}
main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
