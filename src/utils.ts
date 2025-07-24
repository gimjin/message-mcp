import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Fix nodejs fetch issue: https://github.com/nodejs/node/issues/54359#issuecomment-2288886190
// Universal network request function
export async function universalRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const { method = 'GET', body, headers } = options

  // First try using fetch
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    })

    return response
  } catch (fetchError) {
    console.error('Fetch failed, trying curl:', fetchError)

    // If fetch fails, try using curl
    try {
      const curlResponse = await curlRequest(url, options)
      return curlResponse
    } catch (curlError) {
      console.error('Curl failed, trying Powershell:', curlError)

      // If curl fails, try using Powershell
      try {
        const psResponse = await powershellRequest(url, options)
        return psResponse
      } catch (psError) {
        console.error('Powershell failed:', psError)
        throw new Error(
          `Universal request failed:\n  ${fetchError}\n  ${curlError}\n  ${psError}`,
        )
      }
    }
  }
}

// Escape single quotes for shell commands
function escapeShellString(str: string): string {
  // Replace single quotes with '\'' (end quote, escaped quote, start quote)
  return str.replace(/'/g, "'\\''")
}

// Curl request
async function curlRequest(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const { method = 'GET', body, headers } = options

  let curlCommand = `curl -s -X ${method}`

  // Add headers
  if (headers) {
    const headerEntries =
      headers instanceof Headers
        ? Array.from(headers.entries())
        : Object.entries(headers)

    for (const [key, value] of headerEntries) {
      curlCommand += ` -H "${key}: ${value}"`
    }
  }

  // Add request body
  if (body) {
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body)
    curlCommand += ` -d '${escapeShellString(bodyString)}'`
  }

  curlCommand += ` "${url}"`

  const { stdout } = await execAsync(curlCommand)

  return new Response(stdout, {
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
    }),
  })
}

// Check if PowerShell is available
async function getPowerShellCommand(): Promise<string | null> {
  try {
    // First try pwsh (PowerShell Core)
    await execAsync('pwsh -Command "Write-Output test"')
    return 'pwsh'
  } catch {
    try {
      // Then try powershell (Windows PowerShell)
      await execAsync('powershell -Command "Write-Output test"')
      return 'powershell'
    } catch {
      return null
    }
  }
}

// Escape PowerShell string
function escapePowerShellString(str: string): string {
  // Replace single quotes with two single quotes (PowerShell escape method)
  return str.replace(/'/g, "''")
}

// Powershell request
async function powershellRequest(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const { method = 'GET', body, headers } = options

  // Check PowerShell availability
  const psCommand = await getPowerShellCommand()
  if (!psCommand) {
    throw new Error('PowerShell not available')
  }

  // Build PowerShell script
  let psScript = `Invoke-RestMethod -Uri '${escapePowerShellString(url)}' -Method ${method}`

  // Add headers
  if (headers) {
    const headerEntries =
      headers instanceof Headers
        ? Array.from(headers.entries())
        : Object.entries(headers)

    if (headerEntries.length > 0) {
      psScript += ` -Headers @{`
      headerEntries.forEach(([key, value], index) => {
        psScript += `'${escapePowerShellString(key)}' = '${escapePowerShellString(value)}'`
        if (index < headerEntries.length - 1) {
          psScript += '; '
        }
      })
      psScript += '}'
    }
  }

  // Add request body
  if (body) {
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body)
    // Use UTF-8 encoding for PowerShell to support Unicode characters
    psScript += ` -Body ([System.Text.Encoding]::UTF8.GetBytes('${escapePowerShellString(bodyString)}'))`
  }

  // Execute PowerShell command, return response directly
  const { stdout } = await execAsync(`${psCommand} -Command "${psScript}"`)

  return new Response(stdout, {
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
    }),
  })
}
