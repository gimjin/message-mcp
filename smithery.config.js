import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read package.json to get version and name
const pkgPath = join(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

export default {
  esbuild: {
    target: 'node18',
    minify: true,
    define: {
      'process.env.MCP_NAME': JSON.stringify(pkg.name),
      'process.env.MCP_VERSION': JSON.stringify(pkg.version),
    },
    banner: {
      js: '#!/usr/bin/env node',
    },
    external: [
      '@modelcontextprotocol/sdk',
      'node-notifier',
      'nodemailer',
      'play-sound',
      'rfc2047',
      'zod',
    ],
  },
}
