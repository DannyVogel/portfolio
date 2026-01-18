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
  console.log('[api] places-auth called')
  try {
    const config = useRuntimeConfig()
    const password = config.placesPassword
    console.log('[api] password configured:', !!password)

    // No password configured = deny access
    if (!password) {
      console.log('[api] no password configured, denying')
      return { authorized: false, error: 'No password configured' }
    }

    const query = getQuery(event)
    const providedPassword = query.p as string
    const providedToken = query.token as string
    console.log('[api] query params:', { hasPassword: !!providedPassword, hasToken: !!providedToken })

    // Verify existing token
    if (providedToken) {
      console.log('[api] verifying token')
      const validToken = await generateToken(password)
      const isValid = providedToken === validToken
      console.log('[api] token valid:', isValid)
      return { authorized: isValid }
    }

    // Validate password and return token
    if (providedPassword === password) {
      console.log('[api] password correct, generating token')
      const token = await generateToken(password)
      console.log('[api] token generated')
      return { authorized: true, token }
    }

    console.log('[api] password incorrect or not provided')
    return { authorized: false }
  } catch (err) {
    console.error('[api] error:', err)
    return { authorized: false, error: String(err) }
  }
})
