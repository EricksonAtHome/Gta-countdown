<script setup lang="ts">
const config = useRuntimeConfig()

const publishableKey = computed(
  () => config.public.logoDevPublishableKey as string,
)
const domain = computed(() => config.public.logoDomain as string)

const logoDevSrc = computed(() => {
  const token = publishableKey.value
  if (!token) return ''
  const params = new URLSearchParams({
    token,
    size: '200',
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

const src = computed(() => fallbackSrc.value || logoDevSrc.value)
</script>

<template>
  <div class="brand-logo animate-logo-in">
    <GtaViMark />
    <img
      v-if="src"
      :src="src"
      :alt="`${domain} logo`"
      class="brand-logo__dev"
      width="64"
      height="64"
      referrerpolicy="no-referrer-when-downgrade"
      @error="onError"
    >
  </div>
</template>

<style scoped>
.brand-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.35rem;
  width: min(70vw, 340px);
}

.brand-logo__dev {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 10px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
}
</style>
