<script setup lang="ts">
const config = useRuntimeConfig()

const publishableKey = computed(
  () => config.public.logoDevPublishableKey as string,
)
const domain = computed(() => config.public.logoDomain as string)

/** Rockstar Games mark via logo.dev (favicon + studio credit). */
const logoDevSrc = computed(() => {
  const token = publishableKey.value
  if (!token) return ''
  const params = new URLSearchParams({
    token,
    size: '128',
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

const studioSrc = computed(() => fallbackSrc.value || logoDevSrc.value)

</script>

<template>
  <div
    class="brand-logo animate-logo-in"
    @contextmenu.prevent
    @dragstart.prevent
  >
    <img
      src="/gta-vi-logo-v2.png"
      alt="Grand Theft Auto VI"
      class="brand-logo__mark"
      width="531"
      height="502"
      draggable="false"
      @dragstart.prevent
      @contextmenu.prevent
    >
    <div
      class="brand-logo__shield"
      aria-hidden="true"
      @contextmenu.prevent
      @dragstart.prevent
    />
    <img
      v-if="studioSrc"
      :src="studioSrc"
      :alt="`${domain} logo`"
      class="brand-logo__studio"
      width="64"
      height="64"
      draggable="false"
      referrerpolicy="no-referrer-when-downgrade"
      @error="onError"
    >
  </div>
</template>

<style scoped>
.brand-logo {
  position: relative;
  display: grid;
  place-items: center;
  width: min(40vw, 280px);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.brand-logo__mark {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.45));
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
}

.brand-logo__shield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: default;
  background: transparent;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

/* Visually hidden but loaded — powers favicon via logo.dev */
.brand-logo__studio {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
