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
  const config = useRuntimeConfig()
  const password = config.placesPassword

  // No password configured = deny access
  if (!password) {
    return { authorized: false }
  }

  const query = getQuery(event)
  const providedPassword = query.p as string
  const providedToken = query.token as string

  // Verify existing token
  if (providedToken) {
    const validToken = await generateToken(password)
    return { authorized: providedToken === validToken }
  }

  // Validate password and return token
  if (providedPassword === password) {
    return { authorized: true, token: await generateToken(password) }
  }

  return { authorized: false }
})
