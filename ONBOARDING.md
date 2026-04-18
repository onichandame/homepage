# Personal Homepage Architecture

## 1. Architecture State
- **Framework:** React Router v7 (Framework Mode)
- **Runtime:** Cloudflare Workers (V8 Isolate)
- **Routing Topology:** File-based routing (`app/routes.ts`) with Subpath i18n (`/:lang/*`).
  - `/` -> `_index.tsx` (Edge Redirector via Accept-Language)
  - `/:lang` -> `home.tsx` (Hero/Index)
  - `/:lang/about` -> `about.tsx` (Timeline)
  - `/:lang/projects` -> `projects.tsx` (Portfolio Grid)
  - `/:lang/blog` -> `blog.tsx` (Article List)
  - `/:lang/blog/:slug` -> `article.tsx` (Article Detail)
- **Global Layout:** Managed in `app/root.tsx` (Navbar, Footer, Outlet) with Tailwind CSS for styling.
- **Rendering Mechanism:** Standard Worker entry (`workers/app.ts` or similar) delegating fetch requests to React Router.

## 2. Lessons Learned & DON'Ts
- **DON'T** use traditional `createBrowserRouter` in a pure SPA shell for new v7 projects. Use Framework Mode.
- **DON'T** rely on Node.js native APIs. The runtime is Cloudflare Workers.
- **DON'T** bypass the Worker fetch handler for CF bindings.
- **DON'T** use standard `<a>` tags for internal navigation. Always use React Router's `<NavLink>` or `<Link>` to maintain SPA state and prevent full page reloads.

## 3. New Conventions
- **Cloudflare Integration:** Use `@cloudflare/vite-plugin` in Vite config.
- **RR Config:** Ensure `future.v8_viteEnvironmentApi` is active.
- **Styling:** Standardized on Tailwind utility classes. Global CSS resets and custom variables live in `app/app.css`.
- **SEO/Meta Management:** (New) Standardize meta tag generation. Future route additions should consider a shared `app/utils/seo.ts` factory function to prevent duplication.

## 4. Future Architecture Evolution
- **Data Decoupling (Timeline & Portfolio):** Migrate hardcoded static data (e.g., Career Timeline, Core Skills) to Cloudflare KV or D1 databases. Utilize React Router v7's `loader` function to fetch data directly at the Edge for optimal SSR performance.

## 5. Blog Engine Architecture (Phase 2 Closure)
- **Architecture State:** Migrated blog data flow to an Edge-Native Markdown Engine.
  - **Pre-build:** Node.js script (`scripts/prebuild.js`) scans `public/posts/*.md` and generates a `manifest.json`.
  - **Runtime Fetching:** RRv7 loaders utilize Cloudflare `ASSETS.fetch()` to request the manifest and raw markdown files directly from the edge cache.
  - **Rendering:** Markdown is parsed at the edge using `gray-matter` and `marked`.
- **Lessons Learned & DON'Ts:**
  - **DON'T** use Vite's `import.meta.glob` for scaling markdown content in Cloudflare Workers, as it quickly breaches the 1MB/10MB JS bundle size limit.
  - **DON'T** pass relative/absolute local paths to `env.ASSETS.fetch()`. It acts as an HTTP router and requires a fully qualified URL (e.g., `new URL("/path", request.url)`).
  - **DON'T** rely on Node.js `fs` module inside RRv7 loaders.
- **New Conventions:** Run `npm run prebuild` (now integrated into `npm run dev` and `npm run build`) before compiling to ensure the manifest is up-to-date.

### Phase 3.1: Edge-Native i18n Architecture (Completed)
- **Architecture State**: 
  - Implemented Subpath Routing (`/:lang/*`) for SEO-friendly multi-language support.
  - Deployed an Edge Redirector at `app/routes/_index.tsx` that sniffs `Accept-Language` headers and executes 0-latency 302 redirects.
  - Content physically segregated into `public/posts/en` and `public/posts/zh`.
  - `manifest.json` generation logic upgraded to support multi-language namespaces.
- **New Conventions**:
  - **Zero-Dependency Dict**: DO NOT install `react-i18next`. UI strings are hardcoded in `app/root.tsx` as a micro-dictionary to strictly preserve V8 Isolate bundle size.
  - `ASSETS.fetch` URLs must now include the language segment: `/posts/${lang}/${slug}.md`.
- **DON'Ts**:
  - DON'T use client-side JS for language detection. Always rely on Cloudflare Worker headers in the root loader.
  - **i18n UI State Preservation**: When building the language switcher, utilize `useLocation().pathname` and regex replacement (`^\/${currentLang}`) to ensure users remain on the current subpath (e.g., `/en/blog/hello` -> `/zh/blog/hello`) instead of being forcibly redirected to the language root.

### Phase 3.2: Edge-Native Dark Mode & Tailwind v4 (Completed)
- **Architecture State**: 
  - Integrated Tailwind CSS v4 using the "CSS-first" paradigm.
  - Implemented Class-based Dark Mode by hijacking the default media query via `@custom-variant dark (&:where(.dark, .dark *));` in `app/app.css`.
  - Added an inline vanilla JS FOUC (Flash of Unstyled Content) prevention script in `app/root.tsx` `<head>` to evaluate `localStorage` and system preference before React hydration.
- **Lessons Learned & DON'Ts**:
  - **DON'T** attempt to use `tailwind.config.js/ts` or `darkMode: 'class'` for Tailwind v4. The JS config is completely deprecated.
  - **DON'T** rely solely on React state (`useState`/`useEffect`) for initial dark mode rendering. In SSR/Cloudflare Worker environments, this guarantees a white screen flash before hydration completes. The blocking `<script>` in `<head>` is strictly required.
- **New Conventions**:
  - **CSS-First Theming**: All Tailwind configuration and theme variables must reside strictly in `app/app.css`.
  - **Theme State Management**: The Theme Toggle button must update both `document.documentElement.classList` and `localStorage` simultaneously to maintain sync with the FOUC script.
