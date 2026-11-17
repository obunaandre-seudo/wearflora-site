# The Daily Brief

This repository runs a lightweight editorial news site with HTML, CSS, vanilla JavaScript, Node.js, Express and PostgreSQL.

See [THE-DAILY-BRIEF-README.md](THE-DAILY-BRIEF-README.md) for local setup, database configuration, and publishing instructions.

## Deploying to Vercel

The included `vercel.json` selects Vercel's **Express** framework. Set the project Root Directory to the directory containing this `package.json`, and configure these environment variables in Vercel:

- `DATABASE_URL` for a PostgreSQL database reachable from Vercel
- `SESSION_SECRET` with a random value at least 32 characters long (the configured `JWT_SECRET` is used if this is absent)
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` to enable the initial editor account (password at least 12 characters)
- `NODE_ENV=production`

On first API access, the app creates its PostgreSQL tables, initializes the session store, creates the configured editor if needed, and adds clearly labeled demonstration stories to the Politics, Companies, and Markets sections. You can edit or delete them in the dashboard. Article images are stored in PostgreSQL, so they persist across serverless invocations.
