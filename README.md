# Sisters of Pearl

Static marketing homepage for **Sisters of Pearl** — Chinese / Cantonese dining in Glen Waverley.

## Stack

- Next.js (App Router)
- React (JavaScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger
- `next/image`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> On this Windows environment, webpack is used (`next dev --webpack` / `next build --webpack`) because Turbopack native bindings may be blocked.

## Business data

All contact, hours, menu, and offer data lives in:

`data/sistersOfPearl.js`

**Pricing rule:** prices are only set when visibly verified. Current research could not confirm legible menu prices, so the UI shows **Enquire**.

## Images

Temporary editorial placeholders live in:

`public/images/sisters-of-pearl/`

Replace these with client-supplied photography when available. Filenames are stable for easy swaps.
