# PortfolioHub 🚀

A **multi-user dynamic portfolio platform** built with Next.js, MongoDB, Cloudinary, and Tailwind CSS. Users register, upload projects/certificates/resumes, choose from **10 beautiful themes**, and share a public portfolio URL — all in one place.

---

## ✨ Features

- **Multi-User** — Register, login, manage your own portfolio independently
- **Super Admin Panel** — One admin can view/delete all users
- **Custom Title** — Users can set a dynamic title/position on their public portfolio
- **10 Unique Themes** — Minimalist, Cyberpunk, Corporate, Creative, Newspaper + 5 new themes
- **Responsive Navigation** — Mobile-first navigation across themes
- **Animations** — Subtle motion/hover effects for a more engaging portfolio
- **Cloudinary Uploads** — Images, PDFs, and external links (up to 10 per item)
- **Public Portfolio URL** — `domain.com/[username]` — no login required to view
- **JWT Auth** — Secure HttpOnly cookie-based authentication
- **ISR** — Public pages revalidate every 60 seconds for fast performance

---

## 📁 Project Structure

```
portfolio-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + AuthProvider
│   │   ├── page.tsx                # Landing / Homepage
│   │   ├── auth/
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── register/page.tsx   # Register page
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx          # Dashboard layout + auth guard
│   │   │   └── dashboard/
│   │   │       ├── page.tsx        # Overview / Stats
│   │   │       ├── portfolio/page.tsx  # CRUD portfolio items
│   │   │       ├── themes/page.tsx     # Theme picker
│   │   │       ├── profile/page.tsx    # Profile settings
│   │   │       └── admin/page.tsx      # Super Admin panel
│   │   ├── [username]/page.tsx     # Public portfolio (themed)
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── register/route.ts
│   │       │   ├── login/route.ts
│   │       │   └── logout/route.ts
│   │       ├── me/route.ts         # GET/PUT user profile
│   │       ├── portfolio/
│   │       │   ├── route.ts        # GET/POST items
│   │       │   └── [id]/route.ts   # PUT/DELETE item
│   │       ├── public/
│   │       │   └── [username]/route.ts  # Public data fetch
│   │       ├── upload/
│   │       │   └── sign/route.ts   # Cloudinary signature
│   │       └── admin/
│   │           └── users/route.ts  # Admin CRUD users
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── Sidebar.tsx         # Dashboard sidebar nav
│   │   └── public/
│   │       ├── types.ts            # Shared public types
│   │       ├── ResponsiveNavigation.tsx
│   │       ├── MinimalistTheme.tsx
│   │       ├── CyberpunkTheme.tsx
│   │       ├── CorporateTheme.tsx
│   │       ├── CreativeTheme.tsx
│   │       ├── NewspaperTheme.tsx
│   │       ├── NeoBrutalismTheme.tsx
│   │       ├── GlassmorphismTheme.tsx
│   │       ├── BiophilicTheme.tsx
│   │       ├── Y2KRetroTheme.tsx
│   │       └── LuxuryTheme.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx             # Auth context + provider
│   │   ├── usePortfolio.ts         # Portfolio CRUD hook
│   │   └── useCloudinary.ts        # File upload hook
│   ├── lib/
│   │   ├── db.ts                   # MongoDB connection
│   │   ├── auth.ts                 # JWT sign/verify/cookies
│   │   ├── cloudinary.ts           # Cloudinary config + signature
│   │   └── themes.ts               # Theme config definitions
│   ├── models/
│   │   ├── User.ts                 # Mongoose User model
│   │   └── PortfolioItem.ts        # Mongoose PortfolioItem model
│   └── styles/
│       └── globals.css             # Tailwind + custom CSS
├── scripts/
│   └── seedAdmin.ts                # Seed Super Admin user
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── .env.example
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (free tier works)

### 2. Clone & Install

```bash
git clone <repo-url>
cd portfolio-platform
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db

# JWT
JWT_SECRET=your_secret_min_32_chars
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name  # same as above, for client

# Super Admin (for seeding)
SUPER_ADMIN_EMAIL=admin@portfoliohub.com
SUPER_ADMIN_PASSWORD=securepassword123
SUPER_ADMIN_USERNAME=superadmin

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed Super Admin

```bash
npx tsx scripts/seedAdmin.ts
```

This creates the first Super Admin user. Run it **once**.

### 5. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Themes

| Theme             | Description                     | Best For                 |
| ----------------- | ------------------------------- | ------------------------ |
| **Minimalist**    | Clean white/gray, sans-serif    | Everyone                 |
| **Cyberpunk**     | Dark neon green/pink, monospace | IT / Developers          |
| **Corporate**     | Navy, gold, serif, rigid grid   | Business professionals   |
| **Creative**      | Pastel, rounded, asymmetric     | Designers / Artists      |
| **Newspaper**     | Ink editorial, columns, serif   | Writers / Journalists    |
| **Neo-Brutalism** | Bold borders, bright colors     | Bold personal brands     |
| **Glassmorphism** | Frosted glass + gradients       | Modern creatives         |
| **Biophilic**     | Earth tones + organic feel      | Wellness & nature brands |
| **Y2K Retro**     | Windows 98 vibe + taskbar       | Nostalgic portfolios     |
| **Luxury**        | Elegant serif + gold accents    | Premium professionals    |

---

## 📘 API Reference

### Auth

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login → sets JWT cookie |
| POST   | `/api/auth/logout`   | Clear auth cookie       |

### Profile

| Method | Endpoint  | Description                          |
| ------ | --------- | ------------------------------------ |
| GET    | `/api/me` | Get current user (auth required)     |
| PUT    | `/api/me` | Update profile/theme (auth required) |

### Portfolio

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| POST   | `/api/portfolio`      | Create item (auth required)       |
| GET    | `/api/portfolio`      | List user's items (auth required) |
| PUT    | `/api/portfolio/[id]` | Update item                       |
| DELETE | `/api/portfolio/[id]` | Delete item + Cloudinary files    |

### Public

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/public/[username]` | Get public profile + items |

### Admin (Super Admin only)

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| GET    | `/api/admin/users`            | List all users               |
| DELETE | `/api/admin/users?userId=xxx` | Delete user + all their data |

### Upload

| Method | Endpoint           | Description                     |
| ------ | ------------------ | ------------------------------- |
| POST   | `/api/upload/sign` | Get Cloudinary upload signature |

---

## 🗄️ Database Models

### User

- `username` — unique slug for public URL
- `email` / `password` — auth credentials (password hashed with bcrypt)
- `fullName`, `bio`, `avatarUrl` — profile info
- `title` — custom title/position shown on public portfolio
- `selectedTheme` — one of 10 themes
- `isSuperAdmin` — boolean flag

### PortfolioItem

- `userId` — ref to User
- `title`, `description`, `category` — core content
- `attachments[]` — array of `{ fileType, url, publicId, label }`
- `techStack[]` — string array (for IT projects)
- `startDate` / `endDate` — optional timeline
- `order` — for display ordering

---

## ☁️ Cloudinary Upload Flow

1. User selects file in the dashboard
2. Frontend calls `/api/upload/sign` to get a server-signed signature
3. Frontend POSTs file directly to Cloudinary with the signature
4. Cloudinary returns `secure_url` and `public_id`
5. Frontend includes these in the portfolio item payload
6. On deletion, the server uses `public_id` to destroy the file

---

## 🛡️ Security

- Passwords hashed with **bcrypt** (salt rounds: 12)
- JWT stored in **HttpOnly, Secure, SameSite** cookie
- Cloudinary uploads are **server-signed** (no API secret exposed to client)
- Admin endpoints verify `isSuperAdmin` flag
- Portfolio items can only be edited/deleted by their owner

---

## 📦 Tech Stack

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| Next.js (App Router) | Framework, SSR, API routes |

## 🚀 Deploy to Vercel

1. Push your repo to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework will auto-detect **Next.js**.
4. Add Environment Variables (same as your .env):
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `SUPER_ADMIN_EMAIL`
   - `SUPER_ADMIN_PASSWORD`
   - `SUPER_ADMIN_USERNAME`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)
5. Click **Deploy**.

After the first deploy, run the seed script locally (or via a one-off script) to create the super admin.
| MongoDB + Mongoose | Database |
| Tailwind CSS | Styling |
| Cloudinary | File storage (images, PDFs) |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| react-icons | Icon library |
| TypeScript | Type safety |

---

## 📌 TODO / Enhancements

- [ ] Add drag-and-drop reordering for portfolio items
- [ ] Add password reset / forgot password flow
- [ ] Add video upload support (YouTube embed)
- [ ] Add dark/light mode toggle per theme
- [ ] Add analytics (view count per portfolio)
- [ ] Add social media links to user profile
- [ ] Add rate limiting on auth endpoints

---

_Built with ❤️ using Next.js, MongoDB & Cloudinary_
