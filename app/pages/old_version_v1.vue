<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)

useHead({
  title: 'GTA 6 Countdown - Old Version V1',
  htmlAttrs: { lang: 'en' },
})

const TRAILER_START_TIME = 7.0

const playVideo = () => {
  if (videoRef.value) {
    if (videoRef.value.currentTime < TRAILER_START_TIME) {
      videoRef.value.currentTime = TRAILER_START_TIME
    }
    videoRef.value.muted = true
    videoRef.value.defaultMuted = true
    const p = videoRef.value.play()
    if (p !== undefined) {
      p.catch(() => {})
    }
  }
}

const onTimeUpdate = () => {
  if (
    videoRef.value &&
    videoRef.value.currentTime > 0.05 &&
    videoRef.value.currentTime < TRAILER_START_TIME
  ) {
    videoRef.value.currentTime = TRAILER_START_TIME
  }
}

onMounted(() => {
  playVideo()
})
</script>

<template>
  <div class="v1-page">
    <div class="v1-top-nav">
      <a
        href="https://www.rockstargames.com/VI"
        target="_blank"
        rel="noopener noreferrer"
        class="v1-preorder-btn"
      >
        Pre-Order GTA 6 (PS5 • XBOX)
      </a>

      <NuxtLink
        to="/"
        class="version-switcher"
      >
        Go to New Version
      </NuxtLink>
    </div>

    <header
      class="v1-brand"
      aria-label="Brand"
    >
      <div class="v1-video-wrapper">
        <video
          ref="videoRef"
          class="v1-video"
          autoplay
          loop
          muted
          :muted="true"
          playsinline
          webkit-playsinline
          preload="auto"
          @loadedmetadata="playVideo"
          @canplay="playVideo"
          @timeupdate="onTimeUpdate"
        >
          <source
            src="/Grand-Theft-Auto-SnapYT.App.webm"
            type="video/webm"
          >
        </video>
        <div
          class="v1-video-overlay"
          aria-hidden="true"
        />
      </div>

      <BrandLogo class="v1-logo" />
    </header>

    <main class="v1-content">
      <ReleaseCountdown
        theme="light"
        title="WAIT TO PLAY!"
      />
    </main>
  </div>
</template>

<style scoped>
.v1-page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: #f3f4f6;
  overflow-x: hidden;
}

.v1-top-nav {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.v1-preorder-btn,
.version-switcher {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(18, 12, 31, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 200ms ease;
  white-space: nowrap;
}

.v1-preorder-btn:hover,
.version-switcher:hover {
  background: rgba(18, 12, 31, 0.95);
  transform: translateY(-1px);
}

@media (max-width: 580px) {
  .v1-top-nav {
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.4rem;
  }

  .v1-preorder-btn,
  .version-switcher {
    padding: 0.4rem 0.75rem;
    font-size: 0.74rem;
  }
}

.v1-brand {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  min-height: 44vh;
  max-height: 52vh;
  display: grid;
  place-items: center;
  padding: clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(2.5rem, 6vw, 4rem);
  overflow: hidden;
  background: #120c1f;
  /* Convex rounded arc at bottom matching the exact reference */
  border-radius: 0 0 48% 48% / 0 0 20% 20%;
  box-shadow: 0 16px 36px rgba(8, 4, 18, 0.26);
}

.v1-video-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.v1-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.36);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  max-width: none !important;
  max-height: none !important;
  object-fit: cover !important;
}

.v1-video-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(18, 12, 31, 0.2) 0%,
    rgba(18, 12, 31, 0.55) 100%
  );
  pointer-events: none;
}

.v1-logo {
  position: relative;
  z-index: 3;
}

.v1-content {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  display: grid;
  place-items: center;
  padding: clamp(2rem, 5vw, 4rem) 1.5rem;
  background: #f3f4f6;
}

/* On wide screens, split layout */
@media (min-width: 900px) {
  .v1-page {
    flex-direction: row;
  }

  .v1-brand {
    flex: 0 0 46%;
    min-height: 100vh;
    min-height: 100dvh;
    max-height: none;
    border-radius: 0 48% 48% 0;
    box-shadow: 14px 0 32px rgba(8, 4, 18, 0.22);
    padding: clamp(1.5rem, 4vw, 3rem);
    padding-right: clamp(2.5rem, 6vw, 4.5rem);
  }

  .v1-content {
    flex: 1 1 auto;
    padding-left: clamp(1.5rem, 4vw, 3rem);
  }
}
</style>
