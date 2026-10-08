<script setup lang="ts">
const config = useRuntimeConfig()

const publishableKey = computed(
  () => config.public.logoDevPublishableKey as string,
)
const domain = computed(() => config.public.logoDomain as string)

const cdnSrc = computed(() => {
  const token = publishableKey.value
  if (!token) return ''
  const params = new URLSearchParams({
    token,
    size: '500',
    format: 'png',
    theme: 'dark',
    retina: 'true',
  })
  return `https://img.logo.dev/${domain.value}?${params.toString()}`
})

const failed = ref(false)
const fallbackSrc = ref('')

async function onError() {
  if (failed.value) return
  failed.value = true
  try {
    const result = await $fetch<{ url: string }>('/api/logo', {
      query: { domain: domain.value },
    })
    fallbackSrc.value = result.url
  } catch {
    fallbackSrc.value = ''
  }
}

const src = computed(() => fallbackSrc.value || cdnSrc.value)
</script>

<template>
  <div class="brand-logo animate-logo-in">
    <img
      v-if="src"
      :src="src"
      :alt="`${domain} logo`"
      class="brand-logo__img"
      width="500"
      height="500"
      referrerpolicy="no-referrer-when-downgrade"
      @error="onError"
    >
    <p
      v-else
      class="brand-logo__fallback"
    >
      Rockstar Games
    </p>
  </div>
</template>

<style scoped>
.brand-logo {
  display: grid;
  place-items: center;
  width: min(58vw, 320px);
  max-width: 100%;
}

.brand-logo__img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.45));
}

.brand-logo__fallback {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: 0.08em;
  text-align: center;
}
</style>
