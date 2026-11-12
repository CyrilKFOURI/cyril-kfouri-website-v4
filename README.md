# Cyril KFOURI — Portfolio (V4)

Personal portfolio built with React 19, Vite, TypeScript and Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # tsc -b && vite build -> dist/
```

## Content

All text lives in JSON under `src/data/` (English). French text is in `src/data/fr/`, keyed by the same record ids, and interface labels are in `src/i18n/ui.ts`. The `EN / FR` toggle switches both.

## Deployment

The GitHub repository is connected to the Vercel project `cyril-kfouri-website-v4`:

- Push to `master` → production deployment.
- Push to any other branch or open a pull request → preview deployment with its own URL.
- If `npm run build` fails (type errors included), Vercel does not deploy and the live site stays unchanged.

Deployment status and logs: Vercel dashboard, or `npx vercel ls`.
