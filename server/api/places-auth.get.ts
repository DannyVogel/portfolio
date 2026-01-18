import crypto from 'crypto'

function generateToken(password: string): string {
  return crypto.createHmac('sha256', password).update('places-auth').digest('hex')
}

export default defineEventHandler((event) => {
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
    const validToken = generateToken(password)
    return { authorized: providedToken === validToken }
  }

  // Validate password and return token
  if (providedPassword === password) {
    return { authorized: true, token: generateToken(password) }
  }

  return { authorized: false }
})
