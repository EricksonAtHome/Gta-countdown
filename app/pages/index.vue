<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)

useHead({
  title: 'GTA 6 Countdown',
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

let targetNormX = 0
let targetNormY = 0
let currentNormX = 0
let currentNormY = 0
let parallaxAnimId: number | null = null

const updateVideoParallax = () => {
  currentNormX += (targetNormX - currentNormX) * 0.075
  currentNormY += (targetNormY - currentNormY) * 0.075

  if (videoRef.value) {
    const shiftX = -currentNormX * 45
    const shiftY = -currentNormY * 30
    videoRef.value.style.transform = `translate(calc(-50% + ${shiftX.toFixed(2)}px), calc(-50% + ${shiftY.toFixed(2)}px)) scale(1.42)`
  }

  parallaxAnimId = requestAnimationFrame(updateVideoParallax)
}

const onMouseMove = (e: MouseEvent) => {
  targetNormX = ((e.clientX / window.innerWidth) - 0.5) * 2
  targetNormY = ((e.clientY / window.innerHeight) - 0.5) * 2
  document.documentElement.style.setProperty('--mouse-norm-x', targetNormX.toFixed(3))
  document.documentElement.style.setProperty('--mouse-norm-y', targetNormY.toFixed(3))
}

const onMouseLeave = () => {
  targetNormX = 0
  targetNormY = 0
  document.documentElement.style.setProperty('--mouse-norm-x', '0')
  document.documentElement.style.setProperty('--mouse-norm-y', '0')
}

onMounted(() => {
  playVideo()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mouseleave', onMouseLeave)
  parallaxAnimId = requestAnimationFrame(updateVideoParallax)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  if (parallaxAnimId) cancelAnimationFrame(parallaxAnimId)
})
</script>

<template>
  <div class="page">
    <div class="top-nav">
      <a
        href="https://www.rockstargames.com/VI"
        target="_blank"
        rel="noopener noreferrer"
        class="preorder-top-btn"
      >
        Pre-Order GTA 6 (PS5 • XBOX)
      </a>

      <NuxtLink
        to="/old_version_v1"
        class="version-switcher"
      >
        View V1 Style
      </NuxtLink>
    </div>

    <div class="bg-video-container" aria-hidden="true">
      <video
        ref="videoRef"
        class="bg-video"
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
    </div>

    <div class="bg-overlay" aria-hidden="true" />

    <div class="page__content">
      <aside
        class="brand"
        aria-label="Brand"
      >
        <BrandLogo class="brand__logo" />
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
  background: transparent;
}

.top-nav {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.preorder-top-btn,
.version-switcher {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(18, 12, 31, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: all 200ms ease;
  white-space: nowrap;
}

.preorder-top-btn:hover,
.version-switcher:hover {
  background: rgba(18, 12, 31, 0.95);
  transform: translateY(-1px);
}

@media (max-width: 580px) {
  .top-nav {
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.4rem;
  }

  .preorder-top-btn,
  .version-switcher {
    padding: 0.4rem 0.75rem;
    font-size: 0.74rem;
  }
}

.bg-video-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.42);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  max-width: none !important;
  max-height: none !important;
  object-fit: cover !important;
  will-change: transform;
}

.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  pointer-events: none;
  z-index: 1;
  background: rgba(0, 0, 0, 0.15);
}

.page__content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
}

.brand {
  position: relative;
  flex: 0 0 46%;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.brand__logo {
  position: relative;
  transform: translate3d(
    calc(var(--mouse-norm-x, 0) * 12px),
    calc(var(--mouse-norm-y, 0) * 12px),
    0
  );
  transition: transform 120ms ease-out;
}

.content {
  position: relative;
  flex: 1 1 auto;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 5vw, 4rem);
  transform: translate3d(
    calc(var(--mouse-norm-x, 0) * -10px),
    calc(var(--mouse-norm-y, 0) * -10px),
    0
  );
  transition: transform 120ms ease-out;
}

@media (max-width: 860px) {
  .page__content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem 1.25rem 3rem;
  }

  .brand {
    flex: 0 0 auto;
    padding: 0;
  }

  .content {
    flex: 0 0 auto;
    padding: 0;
    width: 100%;
  }
}
</style>
