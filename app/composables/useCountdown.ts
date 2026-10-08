export type CountdownParts = {
  days: string
  hours: string
  minutes: string
  seconds: string
  isComplete: boolean
}

function pad(value: number, size = 2) {
  return String(Math.max(0, value)).padStart(size, '0')
}

export function useCountdown(targetIso: MaybeRefOrGetter<string>) {
  const parts = ref<CountdownParts>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isComplete: false,
  })

  let timer: ReturnType<typeof setInterval> | undefined

  const tick = () => {
    const target = new Date(toValue(targetIso)).getTime()
    const now = Date.now()
    const distance = target - now

    if (Number.isNaN(target) || distance <= 0) {
      parts.value = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        isComplete: true,
      }
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((distance / (1000 * 60)) % 60)
    const seconds = Math.floor((distance / 1000) % 60)

    parts.value = {
      days: String(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      isComplete: false,
    }
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { parts }
}
