<script setup lang="ts">
useHead({
  title: 'GTA 6 Countdown',
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div class="page">
    <aside class="brand" aria-label="Brand">
      <div class="brand__glow" aria-hidden="true" />
      <BrandLogo />
    </aside>

    <svg
      class="divider"
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        class="divider__fill"
        d="M0,0 C78,12 118,28 138,50 C118,72 78,88 0,100 L160,100 L160,0 Z"
      />
    </svg>

    <main class="content">
      <ReleaseCountdown />
    </main>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 42%) minmax(0, 1fr);
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: var(--color-surface);
}

.brand {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  background:
    radial-gradient(circle at 35% 45%, rgba(180, 40, 120, 0.18), transparent 42%),
    radial-gradient(circle at 55% 70%, rgba(255, 120, 40, 0.12), transparent 46%),
    var(--color-brand-dark);
}

.brand__glow {
  position: absolute;
  inset: 18% 22%;
  background: radial-gradient(
    circle,
    rgba(255, 90, 160, 0.16) 0%,
    transparent 70%
  );
  filter: blur(12px);
  pointer-events: none;
}

.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(42% - 7vw);
  width: min(28vw, 320px);
  height: 100%;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(-8px 0 16px rgba(8, 4, 18, 0.22));
}

.divider__fill {
  fill: var(--color-surface);
}

.content {
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 5vw, 4rem);
  padding-left: clamp(2.5rem, 7vw, 5rem);
  background: var(--color-surface);
}

@media (max-width: 860px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(38vh, 300px) 1fr;
  }

  .brand {
    min-height: 38vh;
  }

  .divider {
    left: 0;
    right: 0;
    top: auto;
    bottom: calc(62% - 1px);
    width: 100%;
    height: min(22vw, 140px);
    transform: rotate(90deg);
    transform-origin: center;
    filter: drop-shadow(0 -8px 16px rgba(8, 4, 18, 0.18));
  }

  .content {
    padding: 2rem 1.25rem 3rem;
  }
}
</style>
