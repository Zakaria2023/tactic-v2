# TAKTEEQ — Next.js Website

Multi-page corporate website built with Next.js 14 (App Router), TypeScript, and Three.js.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure

```
takteeq-next/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (navbar, footer, chat, i18n)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # All styles
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── careers/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── cookies/page.tsx
│   └── contexts/
│       └── LanguageContext.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ChatWidget.tsx
│   │   └── Cursor.tsx
│   ├── ui/
│   │   └── PageHero.tsx
│   └── three/
│       ├── HomeScene.tsx
│       ├── IndustriesSphere.tsx
│       ├── WavingFlag.tsx
│       ├── AboutScene.tsx
│       ├── PortfolioScene.tsx
│       ├── BlogScene.tsx
│       └── MiniScene.tsx
├── lib/
│   ├── i18n/translations.ts      # All EN + AR translations
│   └── utils/                    # Helpers
└── public/                       # Static assets
```

## Key Features

- **Next.js 14 App Router** with TypeScript
- **Server Components** by default, Client Components only where needed
- **Bilingual (EN/AR)** with full RTL support
- **Three.js scenes** as client components
- **Floating chat widget** on all pages
- **Mobile-first responsive design**

## Build & Deploy

```bash
npm run build
npm start
```

Deploy easily to Vercel, Netlify, or any Node.js host.

## License

© 2026 TAKTEEQ. All rights reserved.
