# GTA 6 Countdown

[![Netlify Status](https://api.netlify.com/api/v1/badges/c2956ac0-4165-41e2-975f-81863abbb0ab/deploy-status)](https://app.netlify.com/projects/readyforgta/deploys)

Nuxt 4 landing page with a live countdown to the Grand Theft Auto VI release.

## Features

- Split-screen layout matching the reference design
- Live countdown (days / hours / minutes / seconds)
- Rockstar Games logo via [logo.dev](https://www.logo.dev)

## Setup

```bash
npm install
cp .env.example .env
```

Add your logo.dev keys to `.env`:

```bash
NUXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY=pk_...
NUXT_LOGO_DEV_SECRET_KEY=sk_...
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Config

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY` | Client-safe CDN token for `img.logo.dev` |
| `NUXT_LOGO_DEV_SECRET_KEY` | Server-only key for `/api/logo` fallback |
| `runtimeConfig.public.releaseDate` | ISO release target (default Fall 2026) |
| `runtimeConfig.public.logoDomain` | Domain used for logo.dev lookup |
