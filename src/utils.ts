// Parse SMTP URL
export function parseSmtpUrl(url: string) {
  try {
    const parsed = new URL(url)
    const protocol = parsed.protocol.slice(0, -1) // Remove trailing ':'
    const secure = protocol === 'smtps' || parsed.port === '465'
    const host = parsed.hostname
    const port = parseInt(parsed.port)
    const user = decodeURIComponent(parsed.username)
    const pass = decodeURIComponent(parsed.password)

    return { host, port, secure, user, pass }
  } catch (error) {
    console.error('Invalid SMTP URL format:', error)
    return null
  }
}
