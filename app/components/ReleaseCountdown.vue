<script setup lang="ts">
const config = useRuntimeConfig()
const { parts } = useCountdown(config.public.releaseDate as string)

const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
    title?: string
  }>(),
  {
    theme: 'dark',
    title: 'READY TO PLAY',
  },
)

const units = computed(() => [
  { key: 'days', value: parts.value.days, label: 'DAYS', showColonAfter: false },
  { key: 'hours', value: parts.value.hours, label: 'HRS', showColonAfter: true },
  { key: 'minutes', value: parts.value.minutes, label: 'MINS', showColonAfter: true },
  { key: 'seconds', value: parts.value.seconds, label: 'SECS', showColonAfter: false },
])
</script>

<template>
  <section
    class="countdown animate-fade-rise"
    :class="`countdown--${props.theme}`"
  >
    <h1 class="countdown__title">
      {{ props.title }}
    </h1>

    <div
      class="countdown__board"
      :class="{ 'animate-tick': !parts.isComplete }"
      aria-live="polite"
      :aria-label="`Countdown: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`"
    >
      <template
        v-for="unit in units"
        :key="unit.key"
      >
        <div
          class="countdown__unit"
          :class="{ 'countdown__unit--days': unit.key === 'days' }"
        >
          <span class="countdown__value">{{ unit.value }}</span>
          <span class="countdown__label">{{ unit.label }}</span>
        </div>
        <span
          v-if="unit.showColonAfter"
          class="countdown__colon"
          aria-hidden="true"
        >:</span>
      </template>
    </div>

    <EmailSubscribe :theme="props.theme" />
  </section>
</template>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
  max-width: 620px;
  background: transparent;
}

.countdown__title {
  margin: 0;
  color: #ffffff;
  font-family: var(--font-body);
  font-size: clamp(1.7rem, 3.8vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
}

.countdown__board {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.1rem;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: clamp(2.8rem, 6vw, 5rem);
}

.countdown__unit--days {
  margin-right: clamp(0.7rem, 2.2vw, 1.4rem);
}

.countdown__value {
  color: #ffffff;
  font-family: var(--font-body);
  font-size: clamp(2.6rem, 7.5vw, 5.4rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.92;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
}

.countdown__colon {
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-body);
  font-size: clamp(2.6rem, 7.5vw, 5.4rem);
  font-weight: 700;
  line-height: 0.92;
  margin: 0 0.02rem;
  transform: translateY(-0.03em);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
}

.countdown__label {
  margin-top: 0.55rem;
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-body);
  font-size: clamp(0.68rem, 1.25vw, 0.9rem);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* Light theme for Old Version V1 */
.countdown--light .countdown__title {
  color: #0a0a0a;
  text-shadow: none;
}

.countdown--light .countdown__value {
  color: #0a0a0a;
  text-shadow: none;
}

.countdown--light .countdown__colon {
  color: #0a0a0a;
  text-shadow: none;
}

.countdown--light .countdown__label {
  color: #111827;
  text-shadow: none;
}
</style>
