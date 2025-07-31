import { build } from 'esbuild'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copy } from 'esbuild-plugin-copy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkgPath = join(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'build/index.js',
  minify: true,
  define: {
    'process.env.MCP_NAME': JSON.stringify(pkg.name),
    'process.env.MCP_VERSION': JSON.stringify(pkg.version),
    'process.env.MCP_DESCRIPTION': JSON.stringify(pkg.description),
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: [
    'up-fetch',
    'commander',
    '@modelcontextprotocol/sdk',
    'zod',
    'node-notifier',
    'nodemailer',
    'play-sound',
    'rfc2047',
  ],
  plugins: [
    copy({
      assets: [
        {
          from: './src/assets/*',
          to: './assets',
        },
      ],
    }),
  ],
})

console.log('Build completed successfully!')
