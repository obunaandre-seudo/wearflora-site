# JPMorgan Newsroom

A lightweight newsroom for this repository. The public site uses HTML, CSS and vanilla JavaScript; the single Express server serves pages and JSON APIs, with MySQL storing articles, categories, editors, newsletter sign-ups and sessions.

## Requirements

- Node.js 18 or newer
- MySQL 8.0 or compatible
- A password manager for production secrets

## Local setup

1. Create a database and application account in MySQL:

   ```sql
   CREATE DATABASE jpmorgan_news CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'jpmorgan_app'@'localhost' IDENTIFIED BY 'use-a-unique-password';
   GRANT ALL PRIVILEGES ON jpmorgan_news.* TO 'jpmorgan_app'@'localhost';
   ```

2. Apply the schema: `mysql -u root -p < database/schema.sql`. To preview the design with sample stories, optionally run `mysql -u root -p < database/sample-data.sql`. The optional sample copy is explicitly fictional.

3. Copy `.env.example` to `.env`. Set MySQL connection values, a long random `SESSION_SECRET`, and an initial editor email and password (at least 12 characters). Keep `.env` private.

4. Install and run:

   ```sh
   npm install
   npm start
   ```

   Open http://localhost:3100. The first server startup creates the configured editor account with bcrypt hashing if it is not already in `admins`.

## Publishing

Visit `/admin/login.html`. The editorial desk supports draft/published status, category selection, optional image upload (JPG/PNG/WebP/GIF, max 5 MB), image alt text, editing and deletion. Mark a published article as featured to use it as the home lead; only one article is featured at a time. Published articles flow into Latest News and their matching home category automatically.

Public data routes: `GET /api/articles`, `GET /api/articles?category=markets`, `GET /api/articles/featured`, `GET /api/articles/:slug`, and `GET /api/categories`. Editor routes require a MySQL-backed session: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `GET/POST /api/admin/articles`, `PUT/DELETE /api/admin/articles/:id`, and `POST /api/admin/upload`.

## Notes

- Uploaded files are stored in `public/uploads`; back up that directory together with the database.
- Serve production traffic over HTTPS so the session cookie is marked secure.
- The contact form opens the visitor’s email application. Newsletter subscriptions are written to MySQL.
- Images use uploaded files when present. The home lead has an editorial city image as its visual default until an editor features a story.
- The existing Next.js/Prisma storefront source files are left in the repository, but `npm start` and `npm run dev` now start the Express newsroom.
