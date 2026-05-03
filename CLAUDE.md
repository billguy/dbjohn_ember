# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start          # Dev server at http://localhost:4200 (production env)
npm run build          # Production build
npm run test           # Lint + full ember test suite
npm run test:ember     # Ember tests only
npm run test:ember -- --server  # Interactive test server
npm run lint           # JS, CSS, and Handlebars linting
npm run lint:fix       # Auto-fix lint issues
npm run format         # Prettier formatting
```

Run a single test file by specifying the test filter:
```bash
npm run test:ember -- --filter "my test name"
```

## Architecture

This is a personal portfolio/CMS app (dbjohn.com) built with Ember.js 6.8 (Octane edition), backed by a Rails API at `https://apidbjohncom-production.up.railway.app` (dev: `http://localhost:3000`).

### Authentication

JWT-based auth via `ember-simple-auth` + `ember-simple-auth-token`. The `app/authenticators/jwt.js` handles token refresh. The `app/adapters/application.js` injects JWT headers on all Ember Data requests via ActiveModelAdapter. Protected routes extend `app/routes/authenticated.js`. The `app/services/current-user.js` loads the logged-in user from session on app boot.

### Data Layer

WarpDrive (`@warp-drive/legacy` + `@warp-drive/json-api`) with `active-model-adapter` — the API uses Rails-style snake_case serialization. The store is configured in `app/services/store.js` via `useLegacyStore({ cache: JSONAPICache, legacyRequests: true })`. Custom serializers in `app/serializers/` handle any field mapping. The `app/routes/application.js` loads the current user and slogans on startup. Transform files live in `app/transforms/` and re-export from `@ember-data/serializer/transform`.

### Templates

All components and route templates use **GJS strict mode** (`.gjs` files with `<template>` tag). Every value referenced in the template — components, helpers, modifiers — must be explicitly imported at the top of the file. Class-based components embed `<template>` inside the class body; template-only files (e.g. `pic-caption.gjs`) have only a top-level `<template>`. Route templates live in `app/templates/` as template-only `.gjs` files.

**Route template context**: Ember passes the controller as `@controller` and the route model as `@model` to route templates. Use `@controller.someProperty` / `@controller.someAction` for controller access, and `@model` / `@model.someProperty` for the route model. Do NOT use `this.xxx` in argument positions (modifier args, helper args, component args) — `this` in the scope closure is `undefined` at module evaluation time and only works for simple content expressions via the VM's self-reference mechanism.

Key import paths for GJS:
- `import { on } from '@ember/modifier'`
- `import { fn, hash } from '@ember/helper'`
- `import { LinkTo } from '@ember/routing'`
- `import { didInsert } from '@ember/render-modifiers'`
- `import pageTitle from 'ember-page-title/helpers/page-title'`
- `import BsForm from 'ember-bootstrap/components/bs-form'` (likewise `bs-nav`, `bs-modal`, `bs-modal-simple`)
- `import FlashMessage from 'ember-cli-flash/components/flash-message'`
- `import TagInput from 'ember-tag-input/components/tag-input'`
- Local helpers: `import formatDate from 'dbjohn-ember/helpers/format-date'` etc.
- Local components: `import PicCaption from 'dbjohn-ember/components/pic-caption'` etc.
- `{{outlet}}` is a built-in keyword — no import needed.

**ember-bootstrap contextual components** yield lowercase/camelCase property names — angle bracket invocations must match exactly: `<nav.item>`, `<nav.linkTo>`, `<form.element>`, `<form.submitButton>`, `<modal.header>`, `<modal.body>`. PascalCase variants silently yield `undefined`.

### Key Add-ons

- **ember-bootstrap** — Bootstrap 5 components (bs-nav, bs-modal, bs-form only; configured in `ember-cli-build.js`)
- **quill** — Rich text editor (snow theme); `app/components/quill-editor.gjs` wraps it. CSS imported via `app.import` in `ember-cli-build.js`.
- **@googlemaps/js-api-loader** — Loads the Google Maps JS API; `app/services/google-maps.js` exposes a `load()` method that calls `setOptions({ key: ... })` then preloads the `maps` and `marker` libraries; `app/components/google-map.gjs` calls `load()` then instantiates `google.maps.Map` and `google.maps.marker.AdvancedMarkerElement`
- **active-storage (custom)** — File uploads to ActiveStorage; implemented in `app/services/active-storage.js` using `spark-md5` for checksums. Replaces `@algonauti/ember-active-storage`.
- **ember-cp-validations** — Model validations (currently disabled due to incompatibility with WarpDrive/ember-data ~5.x)
- **dayjs** — Date formatting via `app/helpers/format-date.js` (default format `'LLLL'`, uses `localizedFormat` plugin) and `app/helpers/from-now.js` (uses `relativeTime` plugin)
- **reCAPTCHA v2** — Loaded via script tag in `index.html`; `app/components/g-recaptcha-v2.gjs` wraps the native `grecaptcha.render()` API with a `@verified` callback arg

### Environment & Config

API keys (Google Maps, reCAPTCHA, Google Custom Search) are loaded from `.env` via `config/dotenv.js` and injected into `config/environment.js` as top-level `ENV.*` properties (`GOOGLE_MAPS_API_KEY`, `GOOGLE_MAP_ID`, `CAPTCHA_KEY`, `SEARCH_KEY`). `config/dotenv.js` sets `enabled: true` so `.env` is always loaded (the dev server runs with `--environment=production`). Disqus shortname is `'dbjohn'`.

Optional features enabled: `template-only-glimmer-components`, `no-implicit-route-model`, `default-async-observers`. jQuery integration is disabled.

### Deployment

`Procfile` for Heroku, `nixpacks.toml` for Railway/Nix builds, `Caddyfile` for local reverse proxy. CI runs lint and ember tests in parallel on Node 18 (`.github/workflows/ci.yml`).
