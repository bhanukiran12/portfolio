# Two independent sites, one repository

Both sites build and deploy together in the existing Vercel `portfolio` project.

| Host | Site | Entry point |
| --- | --- | --- |
| `bhanubeyond.com`, `www.bhanubeyond.com` | Bhanu Kiran Vemula professional portfolio | `professional.html` / `src/professional.tsx` |
| `bhanukiran.vercel.app` | Professional portfolio alias | `professional.html` |
| `bbtech.bhanubeyond.com` | BB Technologies | `index.html` / `src/main.tsx` |

The existing apex-to-www redirect remains in place. There are no navigation links between the two sites. Each site has its own metadata, favicon, contact details, sitemap, and robots file. The professional entry point does not load the business assistant, pricing, advertising tags, or business cookie banner.

## Local development

Run `npm run dev`. Open `/professional.html` for the professional portfolio and `/` for the business site. Vite does not apply Vercel's hostname-based rewrites locally.

Run `npm run build` and `npm run lint` before publishing. Run `node scripts/make-personal-og.mjs` after editing `public/personal-og.svg` to regenerate the professional sharing image.

## Hosting and DNS

Keep all domains on the existing Vercel project. The `vercel.json` host conditions separate page routing and search assets. The business canonical URLs all use `https://bbtech.bhanubeyond.com`; the professional canonical uses `https://www.bhanubeyond.com`.

The domain uses external GoDaddy nameservers. Add a `CNAME` record named `bbtech` pointing to the target recommended by Vercel's domain settings. Do not change the existing apex, www, MX, or email records. Attaching the subdomain in Vercel does not create this external DNS record.

## Content

Personal project, skill, experience, education, training, and contact details are in `src/professional/ProfessionalPortfolio.tsx`. Content is aligned with the resume supplied by Vemula Bhanu Kiran on 28 October 2026. The original supplied portrait is served from `public/images/vemula-bhanu-kiran.jpg`. Update this information as your experience changes.
