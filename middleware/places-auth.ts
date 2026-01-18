export default defineNuxtRouteMiddleware(async (to) => {
  const authCookie = useCookie('places-auth', { maxAge: 60 * 60 * 24 * 7 })

  if (authCookie.value) {
    try {
      const { authorized } = await $fetch('/api/places-auth', {
        query: { token: authCookie.value },
      })
      if (authorized) return
      authCookie.value = null
    } catch (err) {
    }
  }

  const queryPassword = to.query.p as string
  if (queryPassword) {
    try {
      const { authorized, token } = await $fetch<{ authorized: boolean; token?: string }>('/api/places-auth', {
        query: { p: queryPassword },
      })

      if (authorized && token) {
        authCookie.value = token
        return navigateTo({ path: to.path, query: {} }, { replace: true })
      }
    } catch (err) {
    }
  }

  return navigateTo('/')
})
