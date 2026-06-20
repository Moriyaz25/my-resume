# Mohd Riyaz — Portfolio

A full-stack portfolio built with Next.js 14 (App Router) + PostgreSQL (via Prisma), styled in a claymorphism design system — soft inflated cards, dual-tone shadows, and a hand-built animated illustration in the hero. Includes a working admin panel to manage projects, experience, and skills, plus a contact form that saves messages to your database.

## Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Framer Motion, lucide-react icons
- **Backend:** Next.js API routes (Route Handlers)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** JWT in an httpOnly cookie, bcrypt-hashed admin password
- **Validation:** Zod on every API route

## 1. Install dependencies

```bash
npm install
```

## 2. Set up PostgreSQL

You need a Postgres database. Easiest free options:

- **Neon** (neon.tech) — free tier, serverless Postgres, takes 2 minutes to set up
- **Supabase** (supabase.com) — free tier, also gives you a dashboard
- **Local Postgres** — if you already have it installed

Once you have a database, copy your connection string.

## 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="your-postgres-connection-string-here"
ADMIN_EMAIL="moriyaz933@gmail.com"
ADMIN_PASSWORD="choose-a-real-password-here"
JWT_SECRET="generate-with: openssl rand -base64 32"
```

**Important:** Change `ADMIN_PASSWORD` before deploying — the example value is not secure.

## 4. Push the schema and seed your data

```bash
npm run db:push
npm run db:seed
```

This creates all tables and fills them with your real resume data (projects, experience, skills) plus your admin login.

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, and `http://localhost:3000/admin/login` to manage content.

Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

## What you can edit from the admin panel

- **Projects** — add/edit/delete, set featured (wider card), reorder, edit case-study content shown on `/projects/[slug]`
- **Experience** — add/edit/delete work history entries with bullet points
- **Skills** — add/remove skills grouped by category
- **Messages** — read every contact form submission, mark read/unread, delete

Changes save straight to Postgres and show up on the live site immediately (no rebuild needed).

## Project structure

```
app/
  page.js                    → homepage (fetches all data server-side)
  layout.js                  → root layout, fonts, metadata
  globals.css                → claymorphism design tokens & utility classes
  projects/[slug]/page.js    → individual project case-study pages
  admin/login/page.js        → admin login form
  admin/dashboard/page.js    → admin CRUD dashboard (client component)
  admin/dashboard/layout.js  → server-side auth gate for the dashboard
  api/contact/route.js       → public contact form endpoint
  api/admin/.../route.js     → protected CRUD endpoints (require admin session)

components/                  → all UI sections (Hero, About, Skills, Projects, etc.)
lib/
  prisma.js                  → Prisma client singleton
  auth.js                    → JWT sign/verify helpers
  requireAdmin.js            → session check used by every protected API route
  validation.js               → Zod schemas for all forms/API input

prisma/
  schema.prisma               → database schema (Project, Experience, Skill, Message, AdminUser)
  seed.js                      → populates DB with your real resume data
```

## Deploying

**Recommended: Vercel (frontend + API) + Neon or Supabase (database)**

1. Push this project to a GitHub repo
2. Import it into Vercel
3. Add the same environment variables (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`) in Vercel's project settings
4. Deploy — Vercel runs `npm run build` automatically
5. After first deploy, run `npm run db:push` and `npm run db:seed` once (locally, pointed at your production `DATABASE_URL`) to set up production tables and seed data

## Customizing the design

All claymorphism tokens live in two places:

- `tailwind.config.js` — colors (`kiln`, `sage`, `lavender`, `canvas`, `ink`), border radii, and the custom `shadow-clay-*` shadows
- `app/globals.css` — reusable classes: `.clay`, `.clay-sm`, `.clay-interactive`, `.clay-button`, `.clay-input`, `.clay-tag`

To change the accent color, edit the `kiln` value in `tailwind.config.js` — it cascades through buttons, links, and highlights automatically.

## Notes

- Next.js is pinned to `14.2.35`, the latest patched 14.x release as of writing (there was a December 2025 security advisory affecting earlier 14.x versions). Run `npm audit` periodically and bump the patch version if a new advisory drops.
- The hero illustration is hand-built from CSS/SVG shapes (no external image), so it loads instantly and matches the palette exactly — not an AI-generated image.
- If you ever forget your admin password, just change `ADMIN_PASSWORD` in `.env` and re-run `npm run db:seed` — it upserts the admin user with the new password.
