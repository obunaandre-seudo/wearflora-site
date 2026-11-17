# The Daily Brief Newsroom

A lightweight newsroom for this repository. The public site uses HTML, CSS and vanilla JavaScript; the single Express server serves pages and JSON APIs, with PostgreSQL storing articles, categories, editors, newsletter sign-ups and sessions.

## Requirements

- Node.js 24.x
- PostgreSQL 14 or compatible (Neon works)
- A password manager for production secrets

## Local setup

1. Create a PostgreSQL database and copy its connection string.

2. On first API access, the server creates the newsroom tables and categories. It also adds clearly labeled demonstration stories for Politics, Companies, and Markets, then fills any other empty home sections. You can edit or delete these in the dashboard.

3. Copy `.env.example` to `.env`. Set `DATABASE_URL` to the PostgreSQL connection string and provide a long random `SESSION_SECRET`. To enable the editor, also set `ADMIN_EMAIL` and `ADMIN_PASSWORD` (at least 12 characters). Keep `.env` private.

4. Install and run:

   ```sh
   npm install
   npm start
   ```

   Open http://localhost:3100. When editor credentials are configured, the first API request creates the account with bcrypt hashing if it is not already in `admins`.

## Publishing

Visit `/admin/login.html`. The editorial desk supports draft/published status, category selection, optional image upload (JPG/PNG/WebP/GIF, max 5 MB), image alt text, editing and deletion. Mark a published article as featured to use it as the home lead; only one article is featured at a time. Published articles flow into Latest News and their matching home category automatically.

Public data routes: `GET /api/articles`, `GET /api/articles?category=markets`, `GET /api/articles/featured`, `GET /api/articles/:slug`, and `GET /api/categories`. Editor routes require a database-backed session: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `GET/POST /api/admin/articles`, `PUT/DELETE /api/admin/articles/:id`, and `POST /api/admin/upload`.

## Notes

- Uploaded image bytes are stored in the `article_images` PostgreSQL table and served at `/api/images/:id`; back up that table together with the rest of the database.
- Serve production traffic over HTTPS so the session cookie is marked secure.
- The contact form opens the visitor’s email application. Newsletter subscriptions are written to PostgreSQL.
- Images use uploaded files when present. The home lead has an editorial city image as its visual default until an editor features a story.
- For Vercel, set the Root Directory to the folder containing `package.json` and add the environment values listed in `.env.example`. The server creates its tables and populates the home sections on first API access. `vercel.json` selects Express as the framework.
