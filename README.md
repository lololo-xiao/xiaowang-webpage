# xiaowang.lol — Next.js + Tailwind + MDX starter

Minimal, fast, and easy to customize.

## Quickstart

```bash
# 1) install deps
npm install

# 2) run locally
npm run dev

# 3) build & run prod
npm run build && npm start
```

## Content model

- **Home**: `app/page.tsx` — edit hero, links.
- **Projects**: `app/projects/page.tsx` — cards.
- **Writing**: MDX posts live under `app/writing/<slug>/page.mdx` and are linked from `app/writing/page.tsx`.
- **Now**: `app/now/page.tsx`
- **Contact**: `app/contact/page.tsx`

## Styling

TailwindCSS is prewired. Edit `app/globals.css` or component classes.

## Deploy

- Push to GitHub.
- Import into Vercel, select the repo and root.
- Add your domain `xiaowang.lol` in Vercel → Project → Settings → Domains.
- In GoDaddy DNS:
  - Apex (`@`) A record → `76.76.21.21` (Vercel).
  - `www` CNAME → the target Vercel shows (e.g. `cname.vercel-dns.com`).
- Wait for DNS to propagate, done.

## Notes

- MDX is enabled via `@next/mdx` + `mdx-components.tsx`.
- For a blog index that auto-lists posts, consider `contentlayer` later.
- Replace placeholder `public/resume.pdf` and social links.
