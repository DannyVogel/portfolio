export default defineNuxtRouteMiddleware(async (to) => {
  const authCookie = useCookie('places-auth', { maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // Verify existing token with server
  if (authCookie.value) {
    const { authorized } = await $fetch('/api/places-auth', {
      query: { token: authCookie.value },
    })
    if (authorized) return
    // Invalid token - clear it
    authCookie.value = null
  }

  // Check password from query param
  const queryPassword = to.query.p as string
  if (queryPassword) {
    const { authorized, token } = await $fetch<{ authorized: boolean; token?: string }>('/api/places-auth', {
      query: { p: queryPassword },
    })

    if (authorized && token) {
      authCookie.value = token
      return navigateTo({ path: to.path, query: {} }, { replace: true })
    }
  }

  // Not authenticated - redirect to home
  return navigateTo('/')
})
