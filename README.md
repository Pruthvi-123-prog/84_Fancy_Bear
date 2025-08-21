<<<<<<< HEAD
# SiteSleuth - Website Audit & Security Reporting Tool

A comprehensive, modern website auditing tool built with Next.js 14 that provides detailed security, performance, SEO, and accessibility analysis.

## 🚀 Features

- **Security Analysis**: OWASP compliance checks, header validation, vulnerability scanning
- **Performance Metrics**: Load times, TTFB, Core Web Vitals monitoring
- **SEO Audit**: Meta tags, structure optimization, search engine readiness
- **Accessibility Check**: WCAG compliance, ARIA validation, usability assessment
- **Interactive Dashboard**: Real-time results with charts and visualizations
- **PDF Reports**: Export comprehensive audit reports
- **Dark Theme**: Professional, modern interface

## 🛠️ Tech Stack

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Zod** for schema validation
- **Axios** & **Cheerio** for web scraping
- **PDFKit** for report generation
- **Lucide React** for icons

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sitesleuth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Usage

1. **Enter a URL**: Input any website URL you want to analyze
2. **Run Scan**: Click "Start Scan" to begin the comprehensive audit
3. **View Results**: Review detailed findings across all categories
4. **Export Report**: Generate and download PDF reports
5. **Take Action**: Follow the provided recommendations to improve your website

## 🔧 API Endpoints

- `POST /api/scan` - Perform website scan
- `POST /api/export` - Export scan results as PDF/JSON

## 📊 Scan Categories

### Security
- HTTPS enforcement
- Security headers (HSTS, CSP, X-Frame-Options)
- Cookie security flags
- Potential data leaks
- Open port detection

### Performance
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- Page load time
- Resource optimization
- File size analysis

### SEO
- Title and meta description
- Heading structure
- Robots.txt validation
- Sitemap detection
- Canonical URLs

### Accessibility
- Alt text for images
- ARIA labels
- Semantic HTML structure
- Form label associations
- Keyboard navigation support

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── page.tsx        # Main landing page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── Dashboard.tsx  # Results dashboard
│   └── ScannerForm.tsx # URL input form
└── lib/               # Utility functions
    ├── scanner.ts     # Core scanning logic
    ├── reporting.ts   # PDF generation
    ├── types.ts       # TypeScript definitions
    └── utils.ts       # Helper functions
```

## 🎨 Features Showcase

- **Live Progress Indicators**: Real-time scan progress with animated stages
- **Interactive Charts**: Visual representation of audit scores
- **Responsive Design**: Optimized for all device sizes
- **Professional Reports**: Comprehensive PDF exports with recommendations
- **Error Handling**: Robust error handling with user-friendly messages

## 🚦 Development

To build for production:
```bash
npm run build
```

To run linting:
```bash
npm run lint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Cicada
>>>>>>> 0baa070a9087a36455b10e0ba42629ac0ece0a36
