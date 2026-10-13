export default defineNuxtPlugin(() => {
  const route = useRoute()

  const logView = (pagePath: string) => {
    $fetch('/api/view', {
      method: 'POST',
      body: {
        page: pagePath,
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      },
    }).catch(() => {})
  }

  onNuxtReady(() => {
    logView(route.path)
  })

  const router = useRouter()
  router.afterEach((to) => {
    logView(to.path)
  })
})
