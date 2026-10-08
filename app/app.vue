<script setup lang="ts">
useHead({
  title: 'GTA 6 Countdown',
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div class="page">
    <div
      class="page__dark"
      aria-hidden="true"
    />

    <svg
      class="page__light"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M38,0 C58,16 64,34 65,50 C64,66 58,84 38,100 L100,100 L100,0 Z"
        fill="currentColor"
      />
    </svg>

    <div class="page__stage">
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
  </div>
</template>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: var(--color-brand-dark);
}

.page__dark {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 32% 48%, rgba(214, 48, 140, 0.16), transparent 40%),
    radial-gradient(circle at 48% 70%, rgba(255, 130, 40, 0.1), transparent 46%),
    var(--color-brand-dark);
}

.page__light {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--color-surface);
  filter: drop-shadow(-12px 0 20px rgba(6, 2, 16, 0.28));
  pointer-events: none;
  z-index: 1;
}

.page__stage {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(280px, 42%) minmax(0, 1fr);
  min-height: 100vh;
  min-height: 100dvh;
}

.brand {
  display: grid;
  place-items: center;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  padding-right: clamp(2.5rem, 7vw, 5rem);
}

.content {
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 5vw, 4rem);
  padding-left: clamp(2rem, 6vw, 4.5rem);
}

@media (max-width: 860px) {
  .page__light {
    display: none;
  }

  .page__stage {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .brand {
    padding: 2.5rem 1.25rem 2rem;
    background: transparent;
  }

  .content {
    background: var(--color-surface);
    box-shadow: 0 -14px 30px rgba(6, 2, 16, 0.22);
    padding: 2.25rem 1.25rem 3rem;
    border-radius: 1.75rem 1.75rem 0 0;
  }
}
</style>
