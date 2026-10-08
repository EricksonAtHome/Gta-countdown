<script setup lang="ts">
const config = useRuntimeConfig()
const { parts } = useCountdown(config.public.releaseDate as string)

const units = computed(() => [
  { key: 'days', value: parts.value.days, label: 'DAYS', showColonAfter: false },
  { key: 'hours', value: parts.value.hours, label: 'HRS', showColonAfter: true },
  { key: 'minutes', value: parts.value.minutes, label: 'MINS', showColonAfter: true },
  { key: 'seconds', value: parts.value.seconds, label: 'SECS', showColonAfter: false },
])
</script>

<template>
  <section class="countdown animate-fade-rise">
    <h1 class="countdown__title">
      SET FOR RELEASE!
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
  </section>
</template>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(1.1rem, 2.8vw, 1.75rem);
  width: 100%;
}

.countdown__title {
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: clamp(1.85rem, 4.2vw, 3.1rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}

.countdown__board {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.15rem;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: clamp(3rem, 6.5vw, 5.25rem);
}

.countdown__unit--days {
  margin-right: clamp(0.65rem, 2vw, 1.35rem);
}

.countdown__value {
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: clamp(2.8rem, 8.2vw, 5.9rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 0.92;
  font-variant-numeric: tabular-nums;
}

.countdown__colon {
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: clamp(2.8rem, 8.2vw, 5.9rem);
  font-weight: 700;
  line-height: 0.92;
  margin: 0 0.05rem;
  transform: translateY(-0.04em);
}

.countdown__label {
  margin-top: 0.6rem;
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: clamp(0.72rem, 1.35vw, 0.95rem);
  font-weight: 500;
  letter-spacing: 0.12em;
}
</style>
