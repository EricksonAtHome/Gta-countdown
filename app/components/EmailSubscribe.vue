<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'dark' | 'light'
    sourcePage?: string
  }>(),
  {
    theme: 'dark',
    sourcePage: '/',
  },
)

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedbackMessage = ref('')

async function onSubmit() {
  const cleanEmail = email.value.trim()
  if (!cleanEmail) return

  status.value = 'loading'
  feedbackMessage.value = ''

  try {
    const res = await $fetch<{
      success: boolean
      message: string
      alreadySubscribed?: boolean
    }>('/api/subscribe', {
      method: 'POST',
      body: {
        email: cleanEmail,
        sourcePage: props.sourcePage,
      },
    })

    if (res.success) {
      status.value = 'success'
      feedbackMessage.value = res.message
      email.value = ''
    } else {
      status.value = 'error'
      feedbackMessage.value = res.message || 'Something went wrong. Please try again.'
    }
  } catch (err: any) {
    status.value = 'error'
    feedbackMessage.value =
      err?.data?.statusMessage ||
      err?.message ||
      'Could not subscribe right now. Please try again later.'
  }
}
</script>

<template>
  <div
    class="subscribe-wrapper"
    :class="`subscribe-wrapper--${props.theme}`"
  >
    <form
      class="input-pill"
      @submit.prevent="onSubmit"
    >
      <svg
        class="input-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>

      <input
        v-model="email"
        type="email"
        placeholder="Enter your email to get notified..."
        required
        class="input-field"
        :disabled="status === 'loading'"
      >

      <button
        type="submit"
        class="submit-btn"
        :disabled="status === 'loading' || !email"
      >
        <span v-if="status === 'loading'" class="btn-spinner" />
        <span v-else class="btn-text">
          NOTIFY ME
        </span>
      </button>
    </form>

    <!-- Floating status feedback -->
    <transition name="fade">
      <div
        v-if="feedbackMessage"
        class="status-msg"
        :class="{
          'status-msg--success': status === 'success',
          'status-msg--error': status === 'error',
        }"
      >
        <span class="status-icon">{{ status === 'success' ? '✓' : '!' }}</span>
        <span>{{ feedbackMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.subscribe-wrapper {
  width: 100%;
  max-width: 460px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.input-pill {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 9999px;
  padding: 0.25rem 0.35rem 0.25rem 0.85rem;
  transition: all 220ms ease;
}

/* Dark Theme (Transparent Floating Over Video) */
.subscribe-wrapper--dark .input-pill {
  background: rgba(18, 12, 31, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.subscribe-wrapper--dark .input-pill:focus-within {
  border-color: #ff4182;
  box-shadow: 0 0 20px rgba(255, 65, 130, 0.45), 0 8px 24px rgba(0, 0, 0, 0.5);
  background: rgba(18, 12, 31, 0.85);
}

/* Light Theme (V1 Page) */
.subscribe-wrapper--light .input-pill {
  background: #ffffff;
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.subscribe-wrapper--light .input-pill:focus-within {
  border-color: #111827;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
}

.input-icon {
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
  margin-left: 0.4rem;
  margin-right: 0.5rem;
}

.subscribe-wrapper--dark .input-icon {
  color: rgba(255, 255, 255, 0.5);
}

.subscribe-wrapper--light .input-icon {
  color: #9ca3af;
}

.input-field {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.65rem 0.4rem;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-body);
  font-size: 16px; /* 16px prevents iOS Safari from automatically zooming in */
}

.subscribe-wrapper--dark .input-field {
  color: #ffffff;
}

.subscribe-wrapper--dark .input-field::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.subscribe-wrapper--light .input-field {
  color: #111827;
}

.subscribe-wrapper--light .input-field::placeholder {
  color: #9ca3af;
}

.submit-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.62rem 1.25rem;
  border: none;
  border-radius: 9999px;
  background: linear-gradient(135deg, #ff4182 0%, #a855f7 100%);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 65, 130, 0.35);
  transition: all 180ms ease;
  white-space: nowrap;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 6px 18px rgba(255, 65, 130, 0.55);
  filter: brightness(1.08);
}

.submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-msg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.35;
  text-align: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.status-msg--success {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.35);
}

.status-msg--error {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);
}

.status-icon {
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
