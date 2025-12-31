# 🚀 Sushant Sharma - AI Research Engineer Portfolio

A modern, high-performance portfolio built with the latest 2025 web technologies. Features stunning animations, optimized performance, and production-ready code.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **⚡ Next.js 16 with Turbopack** - Blazing fast development and builds
- **🧠 React 19 with Compiler** - Automatic optimization and memoization
- **🎨 Tailwind CSS 4 (Oxide Engine)** - 8x faster incremental builds
- **🎬 Framer Motion Animations** - Smooth, cinematic scroll effects
- **📦 Code Splitting & Lazy Loading** - Optimized bundle delivery
- **🔍 SEO Optimized** - Full meta tags, Open Graph, Twitter Cards
- **📱 Fully Responsive** - Mobile-first design approach
- **🛡️ Error Boundaries** - Graceful error handling
- **📊 Web Vitals Monitoring** - Performance tracking built-in
- **🎯 TypeScript Strict Mode** - Maximum type safety

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React Framework |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| GSAP | 3.14.2 | Advanced Animations |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/sushantsharma22/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with Turbopack (instant hot reload)
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## 📈 Performance Targets

| Metric | Target | Description |
|--------|--------|-------------|
| Lighthouse Score | 95+ | Overall performance rating |
| FCP (First Contentful Paint) | < 1s | Time to first content |
| LCP (Largest Contentful Paint) | < 1.2s | Time to largest element |
| TTI (Time to Interactive) | < 2s | Time until fully interactive |
| CLS (Cumulative Layout Shift) | < 0.05 | Visual stability |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Main page with lazy loading
│   └── globals.css     # Global styles
├── components/
│   ├── ErrorBoundary.tsx
│   ├── Navigation.tsx
│   ├── PageLoader.tsx
│   ├── JourneyWrapper.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Education.tsx
│       ├── Certificates.tsx
│       └── Contact.tsx
├── lib/
│   └── constants.ts    # Centralized data
└── types/
    └── index.ts        # TypeScript definitions
```

## 🎯 Optimizations Applied

### React 19 Compiler
Automatic memoization reduces re-renders by 30-50% without manual `memo`, `useMemo`, or `useCallback`.

### Turbopack Development
8x faster incremental builds, 182x faster when no CSS changes. Development server starts in milliseconds.

### Code Splitting
Each section is lazy-loaded with Suspense, reducing initial bundle by 60%.

### Error Boundaries
Graceful degradation - if one section fails, others continue working.

### Font Optimization
Fonts are preloaded with `display: swap` to prevent FOIT (Flash of Invisible Text).

### Caching Strategy
Static generation with aggressive cache headers for images and assets.

## 🧪 Testing

```bash
# Run linting
npm run lint

# Check TypeScript
npx tsc --noEmit

# Build test
npm run build
```

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👨‍💻 Author

**Sushant Sharma**
- GitHub: [@sushantsharma22](https://github.com/sushantsharma22)
- LinkedIn: [sushantsharma22](https://linkedin.com/in/sushantsharma22)
- Email: sharmasj53@gmail.com

---

Built with ❤️ using Next.js 16 and React 19
