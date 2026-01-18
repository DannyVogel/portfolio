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
  try {
    const config = useRuntimeConfig()
    const password = config.placesPassword

    if (!password) {
      return { authorized: false, error: 'No password configured' }
    }

    const query = getQuery(event)
    const providedPassword = query.p as string
    const providedToken = query.token as string

    if (providedToken) {
      const validToken = await generateToken(password)
      const isValid = providedToken === validToken
      return { authorized: isValid }
    }

    if (providedPassword === password) {
      const token = await generateToken(password)
      return { authorized: true, token }
    }

    return { authorized: false }
  } catch (err: any) {
    return { authorized: false, error: String(err) }
  }
})
