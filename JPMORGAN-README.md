# JPMorgan Newsroom

A lightweight newsroom for this repository. The public site uses HTML, CSS and vanilla JavaScript; the single Express server serves pages and JSON APIs, with MySQL storing articles, categories, editors, newsletter sign-ups and sessions.

## Requirements

- Node.js 24.x
- MySQL 8.0 or compatible
- A password manager for production secrets

## Local setup

1. Create a database and application account in MySQL:

   ```sql
   CREATE DATABASE jpmorgan_news CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'jpmorgan_app'@'localhost' IDENTIFIED BY 'use-a-unique-password';
   GRANT ALL PRIVILEGES ON jpmorgan_news.* TO 'jpmorgan_app'@'localhost';
   ```

2. Apply the schema: `mysql -u root -p < database/schema.sql`. To fill the homepage and Latest News with editable demonstration stories, run `mysql -u root -p < database/sample-data.sql`. The sample headlines are explicitly labeled and can be edited or deleted in the dashboard.

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

- Uploaded image bytes are stored in the `article_images` MySQL table and served at `/api/images/:id`; back up that table together with the rest of the database.
- Serve production traffic over HTTPS so the session cookie is marked secure.
- The contact form opens the visitor’s email application. Newsletter subscriptions are written to MySQL.
- Images use uploaded files when present. The home lead has an editorial city image as its visual default until an editor features a story.
- For Vercel, set the Root Directory to the folder containing `package.json`, add the environment values listed in `.env.example`, and apply both `database/schema.sql` and `database/sample-data.sql` to a remotely reachable MySQL database. `vercel.json` selects Express as the framework.
