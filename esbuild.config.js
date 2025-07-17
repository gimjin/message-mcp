import { build } from 'esbuild'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copy } from 'esbuild-plugin-copy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read package.json to get version and name
const pkgPath = join(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: 'build/index.js',
  external: [
    '@modelcontextprotocol/sdk',
    'arg',
    'node-notifier',
    'nodemailer',
    'play-sound',
    'rfc2047',
    'zod',
  ],
  define: {
    'process.env.MCP_NAME': JSON.stringify(pkg.name),
    'process.env.MCP_VERSION': JSON.stringify(pkg.version),
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
  minify: true,
  sourcemap: false,
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
