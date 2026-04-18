# Personal Homepage Architecture

## 1. Architecture State
- **Framework:** React Router v7 (Framework Mode)
- **Runtime:** Cloudflare Workers (V8 Isolate)
- **Routing Topology:** File-based routing (via `app/` directory).
  - `/` -> Hero/Index
  - `/about` -> Timeline
  - `/projects` -> Portfolio Grid
  - `/blog` -> Article List
  - `/blog/:slug` -> Article Detail
- **Rendering Mechanism:** Standard Worker entry (`workers/app.ts` or similar) delegating fetch requests to React Router.

## 2. Lessons Learned & DON'Ts
- **DON'T** use traditional `createBrowserRouter` in a pure SPA shell for new v7 projects. We use Framework Mode.
- **DON'T** rely on Node.js native APIs. The runtime is Cloudflare Workers; standard Node APIs will crash the edge environment.
- **DON'T** bypass the Worker fetch handler. All Cloudflare bindings (KV, D1) must be injected here.

## 3. New Conventions
- **Cloudflare Integration:** Use `@cloudflare/vite-plugin` in Vite config.
- **RR Config:** Ensure `future.v8_viteEnvironmentApi` is active for CF Worker compatibility.
