# JPMorgan Newsroom

This repository runs a lightweight editorial news site with HTML, CSS, vanilla JavaScript, Node.js, Express and MySQL. It is an Express application, not a Next.js project.

See [JPMORGAN-README.md](JPMORGAN-README.md) for local setup, database configuration, and publishing instructions.

## Deploying to Vercel

The included `vercel.json` selects Vercel's **Express** framework. Set the project Root Directory to the directory containing this `package.json`, and configure these environment variables in Vercel:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` for a MySQL database reachable from Vercel
- `SESSION_SECRET` with a random value at least 32 characters long
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the initial editor account (password at least 12 characters)
- `NODE_ENV=production`

Apply `database/schema.sql` to the production database before opening the newsroom. On first API access, the app initializes the session table, creates the configured editor if needed, and adds clearly labeled demonstration stories to any empty homepage sections and short feeds. You can edit or delete them in the dashboard. Article images are stored in MySQL, so they persist across serverless invocations.
