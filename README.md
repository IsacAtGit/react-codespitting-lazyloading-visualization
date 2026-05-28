# Heavy Sidebar Demo

A small React app built to demonstrate **why** code splitting and lazy loading matter.

## The problem (intentional)

- `HeavySidebar` is imported **synchronously** in `App.tsx`
- `generateAnalyticsData.ts` builds **12,000** rows at **module import** time
- The sidebar renders **4,000** DOM rows on first paint
- Each row runs extra work (sparkline string, tags, etc.)

Result: slow initial load, long main-thread tasks, and a sluggish UI before you add `React.lazy` / `Suspense`.

## Run

```bash
npm install
npm run dev
```

Open the app and watch DevTools → **Performance** (record page load) or **Network** (large JS chunk).

## Next steps (for learning)

1. Lazy-load `HeavySidebar` with `React.lazy(() => import('./components/HeavySidebar'))`
2. Wrap it in `<Suspense fallback={...}>`
3. Move data generation out of the static import path (fetch or dynamic import when sidebar opens)
