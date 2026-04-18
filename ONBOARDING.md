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

### Phase 4: Data Architecture & Decoupling (Completed)
- **Architecture State**:
  - Successfully decoupled hardcoded business data (Career Timeline, Portfolio Projects) from React components into static JSON files segregated by language (`public/data/en/`, `public/data/zh/`).
  - Implemented React Router v7 `loader` functions to fetch these JSONs at the Edge using Cloudflare `context.cloudflare.env.ASSETS.fetch()`.
- **Lessons Learned & DON'Ts**:
  - **DON'T** unnecessarily introduce stateful or external databases (like Cloudflare KV or D1) for purely static business data. Always default to Edge-Native static assets (`env.ASSETS`) to maintain architectural simplicity, zero-latency reads, and minimize infrastructure overhead.
- **New Conventions**:
  - **Zero-Dependency Dict**: UI micro-dictionaries remain inside components, while pure business arrays (`jobs`, `projects`) are fetched from `public/data/`.

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
  - **Zero-Dependency Dict**: DO NOT install `react-i18next`. UI strings are hardcoded in `app/root.tsx` and specific page components (`home.tsx`, `about.tsx`, `projects.tsx`) as micro-dictionaries using `useParams()`. This strictly preserves V8 Isolate bundle size while enabling seamless dynamic translations.
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

### Phase 3.3: SEO Infrastructure & Profile Content (Completed)
- **Architecture State**:
  - Implemented `app/utils/seo.ts` as a centralized factory for generating OpenGraph and Twitter meta tags.
  - Injected dynamic, i18n-aware `meta` exports into `home.tsx`, `about.tsx`, and `projects.tsx`.
  - Integrated user profile data (avatar, bio, project history) directly into the React components.
- **New Conventions**:
  - **SEO Factory**: All new routes must utilize `getSeoMeta` from `app/utils/seo.ts` rather than hardcoding meta arrays.
- **UI Refinement (Post-Phase 3.3)**:
  - Removed the large redundant avatar from `home.tsx` to maintain a text-focused, minimalist Hero section ("Shipping solutions, not experiments").
  - Fixed the Cloudinary asset URL for the Favicon in `root.tsx` (removed `b_rgb` background and set width to 128px) to ensure a perfectly transparent, circular, and performant browser tab icon.

### Phase 3.4: Typography & Markdown Styling (Completed)
- **Architecture State**:
  - Integrated `@tailwindcss/typography` for robust Markdown styling.
  - Injected typography classes (`prose`, `lg:prose-xl`, `dark:prose-invert`) directly into the markdown rendering container in `app/routes/article.tsx`.
  - Activated the typography plugin via the `@plugin` directive directly in `app/app.css` following Tailwind v4 conventions.
- **Lessons Learned & DON'Ts**:
  - **DON'T** attempt to configure typography plugins via JS config files in Tailwind v4. The `@plugin` CSS directive is strictly required.
  - **DON'T** forget `dark:prose-invert` when applying typography to a dark-mode enabled site, otherwise text will remain unreadable against dark backgrounds.
- **New Conventions**:
  - **CSS-First Plugin Management**: All Tailwind plugins must be declared in `app/app.css`.

### Phase 3.5: Homepage Minimalist Refactoring (Completed)
- **Architecture State**:
  - Refactored `app/routes/home.tsx` from a verbose hero section into a minimalist, responsive Business Card layout.
  - Re-integrated the Cloudinary avatar with proper cropping and background parameters (`w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35`).
- **New Conventions**:
  - **Minimalism**: Maintain a text-focused, "Shipping solutions, not experiments" philosophy. Avoid unnecessary buttons, redundant links, or verbose descriptions on the index page.

### Phase 5: Profile Data Refresh & Simplification (Completed)
- **Architecture State**:
  - Updated JSON data assets (`timeline.json`, `projects.json`) to reflect the 2026 career state (Added Prodream, merged Heywhale, replaced legacy projects with Prompter SaaS).
  - Stripped the redundant "Core Skills" UI dictionary and section from `app/routes/about.tsx` to strictly enforce the minimalist "Business Card" design philosophy.
- **New Conventions**:
  - **Content-Level Link Embedding**: When modifying static JSON assets without refactoring the underlying React rendering schema, embed external URLs directly into `description` strings (e.g., `🔗 Access: ...`) to guarantee user accessibility, while optionally keeping a `link` field for future UI iterations.
