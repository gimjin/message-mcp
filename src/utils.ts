export function getBoolean(value?: string | boolean): boolean {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1'
  }
  return false
}

const API_METHODS = ['POST', 'PUT', 'PATCH'] as const
export type ApiMethod = (typeof API_METHODS)[number]
export function getApiMethod(method?: string): ApiMethod {
  if (!method) return 'POST'

  const upperCaseMethod = method.toUpperCase()
  return API_METHODS.includes(upperCaseMethod as ApiMethod)
    ? (upperCaseMethod as ApiMethod)
    : 'POST'
}

export function getHeaders(headers?: string): HeadersInit {
  if (!headers) return {}

  try {
    const parsed = JSON.parse(headers)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {}
  } catch (error) {
    console.error('Invalid headers format, using empty headers:', error)
    return {}
  }
}
