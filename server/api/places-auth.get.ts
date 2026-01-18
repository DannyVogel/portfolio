import type { H3Event } from 'h3'

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical'

async function log(
  event: H3Event,
  level: LogLevel,
  message: string,
  metadata?: Record<string, any>
) {
  const config = useRuntimeConfig()
  const baseUrl = config.public.placesApiUrl
  const apiKey = config.loggerApiKey

  if (!baseUrl || !apiKey) return

  try {
    await $fetch(`${baseUrl}/logger`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: {
        level,
        message,
        source: 'places-client',
        ip_address: getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip'),
        user_agent: getHeader(event, 'user-agent'),
        metadata,
      },
    })
  } catch {
    // Silently fail - don't let logging errors break auth
  }
}

async function generateToken(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode('places-auth'))
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export default defineEventHandler(async (event) => {
  await log(event, 'debug', 'places-auth called')
  try {
    const config = useRuntimeConfig()
    const password = config.placesPassword

    // No password configured = deny access
    if (!password) {
      await log(event, 'warn', 'No password configured, denying access')
      return { authorized: false, error: 'No password configured' }
    }

    const query = getQuery(event)
    const providedPassword = query.p as string
    const providedToken = query.token as string

    // Verify existing token
    if (providedToken) {
      const validToken = await generateToken(password)
      const isValid = providedToken === validToken
      await log(event, 'debug', 'Token verification', { isValid })
      return { authorized: isValid }
    }

    // Validate password and return token
    if (providedPassword === password) {
      const token = await generateToken(password)
      await log(event, 'info', 'Password authenticated, token generated')
      return { authorized: true, token }
    }

    await log(event, 'debug', 'Authentication failed - invalid password or not provided')
    return { authorized: false }
  } catch (err: any) {
    await log(event, 'error', 'Places auth error', { error: err.message, stack: err.stack })
    return { authorized: false, error: String(err) }
  }
})
