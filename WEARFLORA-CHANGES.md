# Wearflora redesign — what changed

## Look and feel
- New design tokens in `tailwind.config.ts` and `src/app/globals.css` (blush, rose, primary pink, deep berry, ivory, gold). Existing class names (`bg-brand-500`, `text-text`, `bg-surface`, …) were kept, so every page, including checkout, account, orders and the admin area, picks up the new look.
- Fonts: Cormorant Garamond (headings), Jost (body), Pinyon Script (accents), loaded with `next/font/google` in `src/app/layout.tsx`.
- Light theme only (the dark mode toggle was removed). The admin area uses a sans-serif for dense tables (`.admin-scope`).

## Storefront
- Header: announcement bar, Wearflora wordmark, Home / Shop / New Arrivals / Collections / About / Contact, search, account, wishlist, bag. Slide-in mobile menu.
- Homepage: hero + New Arrivals panel, category icon strip (built from your categories), Featured Collection with the info panel, brand statement band, footer.
- Product cards: wishlist heart (uses `/api/wishlist`), "New" / "Sale" / "Sold out" badges, quick add to bag. Stars only show once a product has reviews.
- Product page: portrait gallery, bag / buy now / wishlist.
- New pages: `/new-arrivals`, `/collections`, `/wishlist`, `/shipping-returns`.
- Hero photo, New Arrivals panel and demo product photos are cropped from the supplied reference design (`public/wearflora/`). Replace them with your own photography when you have it.

## Not changed
- Database schema, migrations, API routes, middleware, auth, Paystack, checkout calculation (flat ₦5,000 shipping), cart store, order numbers (`NSH-…`), cookie and localStorage names.

## Things to know
- The schema has no size/colour variants, so size and colour pickers are not shown. Adding them needs a schema change.
- The contact form and the newsletter form were already placeholders (they show a success message but do not send anything). They are restyled only.
- Admin product form still has the original optional technical fields (wattage, voltage, …). They are hidden on the storefront when empty.
- Removed from the homepage: the 3D solar scene and the invented stats/testimonials. The demo login credentials line was removed from the sign-in page.
- `three` and `@react-three/fiber` are no longer used; they were left in `package.json` so the lockfile stays valid.
- Optional: `npm run seed:wearflora` adds the nine categories and five demo products (create-only, placeholder NGN prices and stock). Skip it if you load your own catalogue.
- The contact page still shows the original placeholder email and phone (`support@novasunhub.com`, `+234 800 000 0000`). Replace them with Wearflora's real details in `src/app/contact/page.tsx`.
- I could not run `npm install`, `next build` or `next lint` in my environment (no network), so the redesign has not been build-tested. Run `npm install && npm run build` first and send me any errors.

## Round 2
- Product cards are one per row on phones, then 2 / 3 / 4 / 5 across as the screen widens (home, shop, new arrivals, wishlist, related products, loading skeletons).
- New "Bloom" loader (`src/components/ui/bloom-loader.tsx`): five petals open around a gold centre. It replaces the old loader on every route loading screen (`SolarLoader` now renders it).
- One-time branded intro on the first visit of a browser session (`intro-splash.tsx`); it is skipped on repeat visits and shortened for reduced-motion users. To remove it, delete `<IntroSplash />` in `src/app/layout.tsx`.
- Gold sheen on primary buttons, drifting petals behind the hero headline (large screens only).
