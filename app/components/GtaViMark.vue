<template>
  <svg
    class="gta-mark"
    viewBox="0 0 560 460"
    role="img"
    aria-label="Grand Theft Auto VI"
  >
    <defs>
      <linearGradient
        id="viGradient"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
      >
        <stop
          offset="0%"
          stop-color="#ff1fc7"
        />
        <stop
          offset="35%"
          stop-color="#ff4b9a"
        />
        <stop
          offset="68%"
          stop-color="#ff7a33"
        />
        <stop
          offset="100%"
          stop-color="#ffd24a"
        />
      </linearGradient>
      <linearGradient
        id="palmFade"
        x1="0%"
        y1="35%"
        x2="0%"
        y2="100%"
      >
        <stop
          offset="0%"
          stop-color="#3a0720"
          stop-opacity="0"
        />
        <stop
          offset="100%"
          stop-color="#1a0410"
          stop-opacity="0.55"
        />
      </linearGradient>
      <filter
        id="viGlow"
        x="-25%"
        y="-25%"
        width="150%"
        height="150%"
      >
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="5"
          flood-color="#b24dff"
          flood-opacity="0.65"
        />
      </filter>
      <clipPath id="viClip">
        <path d="M70 36 h108 l96 348 h-108 z M268 36 h118 v348 h-118 z" />
      </clipPath>
    </defs>

    <g filter="url(#viGlow)">
      <path
        fill="url(#viGradient)"
        stroke="#7a35ff"
        stroke-width="7"
        stroke-linejoin="round"
        d="M70 36 h108 l96 348 h-108 z"
      />
      <path
        fill="url(#viGradient)"
        stroke="#7a35ff"
        stroke-width="7"
        stroke-linejoin="round"
        d="M268 36 h118 v348 h-118 z"
      />
    </g>

    <g clip-path="url(#viClip)">
      <rect
        x="70"
        y="36"
        width="316"
        height="348"
        fill="url(#palmFade)"
      />
      <g
        fill="#14030e"
        opacity="0.5"
      >
        <path d="M150 250 c10-46 36-78 56-92 -24 12-44 38-52 88z" />
        <path d="M178 230 c26-14 52-10 72 8 -30 2-54 16-72 38z" />
        <path d="M178 230 c-22-16-48-22-74-10 26 12 48 28 74 50z" />
        <path d="M250 280 c12-52 42-86 68-100 -28 16-50 44-60 94z" />
        <path d="M286 255 c30-12 56-4 76 18 -32 0-58 14-76 38z" />
        <path d="M286 255 c-24-18-54-24-82-12 28 14 54 30 82 52z" />
        <path d="M330 318 c10-36 28-58 46-70 -20 10-36 28-42 66z" />
        <path d="M120 310 c8-30 22-48 36-58 -16 8-28 22-34 54z" />
      </g>
    </g>

    <g
      fill="#ffffff"
      stroke="#050309"
      stroke-width="11"
      paint-order="stroke fill"
      stroke-linejoin="round"
    >
      <text
        x="280"
        y="178"
        text-anchor="middle"
        font-family="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
        font-size="62"
        font-weight="700"
        letter-spacing="1"
      >grand</text>
      <text
        x="280"
        y="246"
        text-anchor="middle"
        font-family="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
        font-size="62"
        font-weight="700"
        letter-spacing="1"
      >theft</text>
      <text
        x="280"
        y="314"
        text-anchor="middle"
        font-family="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
        font-size="62"
        font-weight="700"
        letter-spacing="1"
      >auto</text>
    </g>
  </svg>
</template>

<style scoped>
.gta-mark {
  width: min(70vw, 340px);
  max-width: 100%;
  height: auto;
  overflow: visible;
}
</style>
