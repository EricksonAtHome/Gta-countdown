type LogoApiResponse = {
  data?: {
    url?: string
    status?: string
  }
}

/**
 * Server-side logo.dev lookup using the secret key.
 * Prefer the CDN URL with the publishable key in the client;
 * this endpoint is available as a signed-URL fallback.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const domain = String(query.domain || config.public.logoDomain || 'rockstargames.com')

  if (!config.logoDevSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing LOGO_DEV secret key',
    })
  }

  const response = await $fetch<LogoApiResponse>(
    'https://api.logo.dev/v2/brands/logo',
    {
      query: {
        domain,
        format: 'png',
        size: 512,
        theme: 'dark',
      },
      headers: {
        Authorization: `Bearer ${config.logoDevSecretKey}`,
      },
    },
  )

  const url = response.data?.url
  if (!url) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Logo not found',
    })
  }

  return {
    domain,
    url,
    status: response.data?.status ?? 'ready',
  }
})
