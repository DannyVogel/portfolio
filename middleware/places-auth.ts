export default defineNuxtRouteMiddleware(async (to) => {
  console.log('[middleware] places-auth started', { path: to.path, query: to.query })
  const config = useRuntimeConfig().public
  console.log('config', config)
  const authCookie = useCookie('places-auth', { maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // Verify existing token with server
  if (authCookie.value) {
    console.log('[middleware] verifying existing token')
    try {
      const { authorized } = await $fetch('/api/places-auth', {
        query: { token: authCookie.value },
      })
      console.log('[middleware] token verification result:', authorized)
      if (authorized) return
      // Invalid token - clear it
      authCookie.value = null
    } catch (err) {
      console.error('[middleware] token verification failed:', err)
    }
  }

  // Check password from query param
  const queryPassword = to.query.p as string
  if (queryPassword) {
    console.log('[middleware] checking password from query')
    try {
      const { authorized, token } = await $fetch<{ authorized: boolean; token?: string }>('/api/places-auth', {
        query: { p: queryPassword },
      })
      console.log('[middleware] password check result:', { authorized, hasToken: !!token })

      if (authorized && token) {
        authCookie.value = token
        return navigateTo({ path: to.path, query: {} }, { replace: true })
      }
    } catch (err) {
      console.error('[middleware] password check failed:', err)
    }
  }

  // Not authenticated - redirect to home
  console.log('[middleware] not authenticated, redirecting to home')
  return navigateTo('/')
})
