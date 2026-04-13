<div align="center">

# 💜 phipi | Love of Tech — Content Hub

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000000?style=flat-square)](https://ui.shadcn.com/)

### 🛡️ Your trusted source for cybersecurity, privacy, hardware, and AI insights

<img src="https://phipi.me/og-image.png" alt="phipi Content Hub" width="800"/>

[🌐 Live Site](https://phipi.me) · [📖 Documentation](#-documentation) · [🚀 Quick Start](#-quick-start)

---

</div>

## ✨ Features

### 🔐 **Content Management**
- **🤖 AI-Powered Summaries** — Automated article summarization with LLM integration
- **📝 Full-Text Extraction** — Intelligent content scraping with Readability.js
- **🏷️ Smart Tagging** — AI-generated tags and emoji suggestions for every article
- **⭐ Starred Articles** — Feature important content in the hero section
- **🏠 Category Organization** — Filter content by Cybersecurity, Privacy, Hardware, AI, and more

### 🎛️ **Admin Dashboard**
- **📰 RSS Feed Aggregation** — Auto-fetch from multiple tech news sources
- **✏️ WYSIWYG Article Editor** — Rich text editing with preview
- **🖼️ Image Management** — Automatic featured image extraction and backfill
- **🔍 Content Review Queue** — Approve, reject, or draft workflow
- **📊 Source Attribution** — Track and link multiple sources per article

### 🎨 **UI/UX Design**
- **🌙 Dark-First Aesthetic** — Deep purple gradient theme (`from-gray-900 via-purple-950 to-gray-900`)
- **💠 Glassmorphism** — Frosted glass cards with `backdrop-blur`
- **⚡ Framer Motion** — Smooth animations and micro-interactions
- **📱 Responsive Layout** — Mobile-first design with Tailwind breakpoints
- **🔍 Real-Time Search** — Client-side search with debounced queries

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🎭 Presentation Layer                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   /home     │  │  /article   │  │     /feed          │  │
│  │  (Public)   │  │   [id]      │  │   (Timeline)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                     🔌 API Routes (Next.js)                  │
├─────────────────────────────────────────────────────────────┤
│  📰 /api/articles        🏷️ /api/tags        📂 /api/rss-feeds
│  🔐 /api/auth            🗂️ /api/categories  🔍 /api/search
├─────────────────────────────────────────────────────────────┤
│                    🧠 Business Logic Layer                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ content-parser  │  │ image-extractor │  │  emoji-suggester  │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    💾 Data Layer (Prisma)                    │
├─────────────────────────────────────────────────────────────┤
│   Article ◄──► ArticleCategory ◄──► Category               │
│      │                                              │       │
│      └──► ArticleTag ◄──► Tag                      │       │
│      │                                              │       │
│      └──► AdditionalSource                         │       │
│                                                    │        │
│   RSSFeed │ User │ Session │ Account                │       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Purple Theme */
--background: 222.2 84% 4.9%      /* Deep space gray */
--foreground: 210 40% 98%         /* Pure white text */
--primary: 263 70% 62%            /* Purple 500 #a855f7 */
--accent: 263 70% 62%             /* Purple accent */
--border: 263 35% 30%             /* Subtle purple borders */
--ring: 263 70% 62%               /* Focus ring purple */
```

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Hero `text-5xl` → Headings `text-2xl` → Body `text-base`
- **Prose**: Custom `.prose` class for markdown content

### Components
Built on [shadcn/ui](https://ui.shadcn.com/) primitives:
- 🎴 Cards with hover lift effects
- 🎛️ Dropdowns with dark theme styling
- 📋 Data tables for admin views
- 🗂️ Tabs for content organization
- 🔔 Toast notifications

---

## 🚀 Quick Start

### Prerequisites
- 🟢 Node.js 18+
- 🐘 PostgreSQL 14+
- 🔑 Environment variables configured

### 1️⃣ Clone & Install
```bash
git clone https://github.com/rlocone/phpip.me-Contant-Hub.git
cd phpip.me-Contant-Hub
npm install
```

### 2️⃣ Environment Setup
```bash
# Copy the example env file
cp .env.example .env

# Configure your database
DATABASE_URL="postgresql://user:password@localhost:5432/phpi_db"

# NextAuth.js settings
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# AI Services (optional, for auto-generation)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
YOUTUBE_API_KEY="..."
```

### 3️⃣ Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed with sample data (optional)
npx prisma db seed
```

### 4️⃣ Run Development Server
```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) — Admin at `/admin`

---

## 📁 Project Structure

```
.
├── 📂 app/                      # Next.js App Router
│   ├── 📂 admin/               # Admin dashboard & CRUD
│   ├── 📂 api/                 # REST API endpoints
│   ├── 📂 article/[id]/        # Article detail pages
│   ├── 📂 auth/                # Login/logout flows
│   ├── 📂 feed/                # Timeline view
│   ├── 📂 home/                # Public landing page
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Redirect to /home
│
├── 📂 components/              # React components
│   └── 📂 ui/                  # shadcn/ui components (40+)
│
├── 📂 lib/                     # Utility libraries
│   ├── auth.ts                 # NextAuth configuration
│   ├── content-parser.ts       # HTML scraping logic
│   ├── db.ts                   # Prisma client singleton
│   ├── emoji-suggester.ts      # AI emoji picker
│   ├── image-extractor.ts      # OG image scraping
│   ├── notion.ts               # Notion CMS integration
│   ├── recall.ts               # AI content generation
│   └── utils.ts                # Helper functions
│
├── 📂 prisma/
│   └── schema.prisma          # Database schema
│
└── 📂 scripts/                # Utility scripts
    ├── seed.ts               # Database seeding
    ├── safe-seed.ts          # Non-destructive seed
    └── fix-articles.ts       # Content migration
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Production build
npm run start            # Start production server

# Database
npx prisma studio        # Visual database editor
npx prisma migrate dev   # Create migration
npx prisma db seed       # Seed sample data
npx prisma generate      # Regenerate client

# Utilities (custom scripts)
npx tsx scripts/seed.ts              # Seed articles
npx tsx scripts/fix-articles.ts      # Repair content
npx tsx check_articles.ts            # Validate URLs
npx tsx verify_fix.ts                # Test fixes
```

---

## 🔐 Authentication

👤 **Default Roles:**
- `admin` — Full CRUD access to Content Hub
- `user` — Read-only public access

🔑 **Providers Supported:**
- Credentials (email/password)
- NextAuth.js extensible to OAuth (Google, GitHub, etc.)

---

## 🌟 Key Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| 🎬 YouTube API | Video metadata extraction | ✅ Active |
| 📄 Mozilla Readability | Article content parsing | ✅ Active |
| 🤖 OpenAI/Anthropic | AI summaries & generation | ⚙️ Configurable |
| ⬛ Notion | Alternative CMS sync | ⚙️ Optional |
| 📝 RSS Parser | Feed aggregation | ✅ Active |
| 🗄️ PostgreSQL | Primary database | ✅ Required |

---

## 📸 Screenshots

<div align="center">

| 🏠 Home Page | 🎛️ Admin Dashboard | 📝 Article Editor |
|:------------:|:------------------:|:-----------------:|
| *Gradient hero with search* | *Content review queue* | *Rich text editing* |

</div>

---

## 🛠️ Tech Stack Deep-Dive

### Frontend
- **⚛️ Next.js 14** — React Server Components + App Router
- **🎨 Tailwind CSS** — Utility-first styling
- **🧩 Radix UI** — Headless accessible components
- **🎭 Framer Motion** — Declarative animations

### Backend
- **📡 Next.js API Routes** — Serverless functions
- **🔐 NextAuth.js** — Authentication framework
- **🛡️ Zod** — Schema validation

### Database
- **🐘 PostgreSQL** — Relational data store
- **📦 Prisma ORM** — Type-safe database access
- **🔄 TanStack Query** — Server state management

### AI/ML
- **🧠 GPT/Claude** — Content summarization
- **🎯 Custom prompt engineering** — Article generation pipeline

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🔱 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔀 Open a Pull Request

---

## 📜 License

[MIT](LICENSE) © 2024 phipi | Love of Tech

---

<div align="center">

### 💜 Built with passion for technology

**[🌐 phipi.me](https://phipi.me)** · **[⭐ Star this repo](https://github.com/rlocone/phpip.me-Contant-Hub)** · **[🐛 Report Bug](../../issues)**

</div>
