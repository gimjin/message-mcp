// scripts/postbuild-inject.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { replaceInFile } from 'replace-in-file'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pkgPath = path.resolve(__dirname, '../package.json')
const buildFile = path.resolve(__dirname, '../build/index.js')

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const version = pkg.version
const name = pkg.name

;(async () => {
  try {
    const results = await replaceInFile({
      files: buildFile,
      from: [/#version/g, /#name/g],
      to: [version, name],
    })
    if (results.some((r) => r.hasChanged)) {
      console.log(
        `Version and name replaced to ${version}, ${name} in build/index.js`,
      )
    } else {
      console.log('No #version or #name found to replace.')
    }
  } catch (error) {
    console.error('Error occurred:', error)
    process.exit(1)
  }
})()
