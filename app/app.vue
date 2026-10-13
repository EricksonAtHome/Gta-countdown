<script setup lang="ts">
useHead({
  title: 'GTA 6 Countdown',
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div class="page">
    <aside
      class="brand"
      aria-label="Brand"
    >
      <BrandLogo />
    </aside>

    <main class="content">
      <ReleaseCountdown />
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: #f3f4f6;
}

.brand {
  position: relative;
  z-index: 2;
  flex: 0 0 44%;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  padding-right: clamp(2.5rem, 6vw, 4.5rem);
  overflow: hidden;
  background:
    repeating-linear-gradient(
      -18deg,
      transparent 0 16px,
      rgba(255, 255, 255, 0.03) 16px 17px
    ),
    #120c1f;
  /* Soft convex right edge matching the reference */
  border-radius: 0 48% 48% 0;
  box-shadow: 12px 0 28px rgba(8, 4, 18, 0.22);
}

.content {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 5vw, 4rem);
  padding-left: clamp(1.5rem, 4vw, 3rem);
  background: #f3f4f6;
}

@media (max-width: 860px) {
  .page {
    flex-direction: column;
  }

  .brand {
    flex: 0 0 auto;
    min-height: 42vh;
    border-radius: 0 0 45% 45% / 0 0 18% 18%;
    box-shadow: 0 12px 28px rgba(8, 4, 18, 0.22);
    padding: 2.5rem 1.25rem 2.75rem;
  }

  .content {
    flex: 1 1 auto;
    padding: 2.5rem 1.25rem 3rem;
  }
}
</style>
