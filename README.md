# AuditX - Advanced Website Security & Performance Analyzer 🔍

<div align="center">

![AuditX Banner](https://img.shields.io/badge/AuditX-Website%20Audit%20Tool-blue?style=for-the-badge&logo=shield)

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

*A comprehensive, enterprise-grade website auditing platform providing detailed security, performance, SEO, and accessibility analysis with real-time reporting and visualization.*

</div>

## 🎯 Problem Statement

Modern websites face increasing security threats, performance challenges, and compliance requirements. Organizations struggle with:
- **Security Vulnerabilities**: Missing security headers, CSP violations, and OWASP compliance gaps
- **Performance Bottlenecks**: Slow load times, poor Core Web Vitals, and optimization issues
- **SEO Deficiencies**: Poor meta tag implementation, structure problems, and search engine penalties
- **Accessibility Barriers**: WCAG non-compliance affecting user experience and legal compliance
- **Manual Audit Overhead**: Time-consuming manual checks and fragmented reporting tools

## 🎯 Project Goals

AuditX addresses these challenges by providing:
1. **Automated Security Analysis**: Comprehensive OWASP-compliant security header validation
2. **Real-time Performance Monitoring**: Core Web Vitals tracking and optimization recommendations
3. **SEO Optimization**: Meta tag analysis, structure validation, and search engine readiness
4. **Accessibility Compliance**: WCAG guideline checks with actionable recommendations
5. **Unified Reporting**: Professional PDF reports and interactive dashboards
6. **Enterprise Scalability**: Modern architecture supporting high-volume scanning

## ✨ Key Features

### 🛡️ Security Analysis
- **OWASP Compliance Checks**: Content Security Policy, XSS protection, frame options
- **Header Validation**: Security header analysis and recommendations
- **Vulnerability Detection**: Common security flaw identification
- **HTTPS Verification**: SSL/TLS configuration validation

### ⚡ Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS measurement and analysis
- **Load Time Analysis**: TTFB, page load speed optimization
- **Resource Optimization**: Image, script, and asset analysis
- **Performance Scoring**: Google PageSpeed-inspired metrics

### 🔍 SEO Optimization
- **Meta Tag Analysis**: Title, description, and structured data validation
- **Content Structure**: Heading hierarchy and semantic HTML checks
- **Technical SEO**: Robots.txt, sitemap, and crawlability analysis
- **Search Readiness**: Mobile-friendly and indexability validation

### ♿ Accessibility Compliance
- **WCAG Guidelines**: Level AA compliance checking
- **Screen Reader Support**: ARIA label and role validation
- **Keyboard Navigation**: Tab order and focus management
- **Color Contrast**: Visual accessibility standards compliance

### 📊 Advanced Reporting
- **Interactive Dashboard**: Real-time results with 3D visualizations
- **PDF Export**: Professional, branded audit reports
- **Historical Tracking**: Scan result storage and comparison
- **API Integration**: RESTful endpoints for automated scanning

## 🏗️ Architecture & Tech Stack

### **Frontend Technologies**
- **Next.js 15.5.0**: React framework with App Router and Server Components
- **TypeScript 5.x**: Static type checking and enhanced developer experience
- **Tailwind CSS 4.x**: Utility-first CSS framework with custom design system
- **Framer Motion 12.x**: Advanced animations and micro-interactions
- **React 19.1.0**: Latest React features with concurrent rendering

### **Data Visualization**
- **C3.js & D3.js**: Interactive 3D charts and advanced data visualization
- **Recharts 3.x**: React-specific charting library for performance metrics
- **Custom Chart Components**: 3D interactive visualizations with hover effects

### **Backend & API**
- **Next.js API Routes**: Server-side logic with TypeScript
- **Axios**: HTTP client for external website analysis
- **Cheerio**: Server-side HTML parsing and DOM manipulation
- **Zod**: Runtime schema validation and type safety

### **Security & Performance**
- **Content Security Policy**: Comprehensive CSP implementation
- **Security Headers**: OWASP-compliant security configuration
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Compression**: Built-in gzip compression and caching strategies

### **Development Tools**
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization
- **TypeScript Config**: Strict type checking configuration
- **VS Code Integration**: Optimized development environment

### **Report Generation**
- **PDFKit**: Dynamic PDF report generation with custom styling
- **JSON Export**: Structured data export for API integration
- **Template System**: Branded report templates with charts

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sitesleuth.git
   cd sitesleuth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎮 Usage Guide

### 1. **Website Scanning**
- Enter any valid URL (https://example.com)
- Watch real-time scanning progress across four analysis stages
- View comprehensive results in the interactive dashboard

### 2. **Dashboard Navigation**
- **Overview Tab**: Overall score and quick metrics summary
- **Security Tab**: Detailed security analysis with OWASP checks
- **Performance Tab**: Core Web Vitals and optimization recommendations
- **SEO Tab**: Search engine optimization analysis
- **Accessibility Tab**: WCAG compliance and usability checks

### 3. **Report Export**
- Click "Export PDF" for professional audit reports
- Download JSON data for API integration
- Share results with stakeholders or development teams

### 4. **API Integration**
```bash
# Scan endpoint
POST /api/scan
Content-Type: application/json
{
  "url": "https://example.com"
}

# Export endpoint  
POST /api/export
Content-Type: application/json
{
  "reportId": "scan-id",
  "format": "pdf" | "json"
}
```

## 📁 Project Structure

```
AuditX/
├── 📁 public/                    # Static assets
│   ├── file.svg                  # File icons
│   ├── globe.svg                 # Globe icon
│   ├── next.svg                  # Next.js logo
│   ├── vercel.svg                # Vercel logo
│   └── window.svg                # Window icon
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── 📄 layout.tsx         # Root layout with navigation
│   │   ├── 📄 page.tsx           # Homepage with scanner
│   │   ├── 📄 globals.css        # Global styles
│   │   ├── 📄 components.css     # Component-specific styles
│   │   ├── 📁 api/               # API endpoints
│   │   │   ├── 📁 scan/          # Website scanning endpoint
│   │   │   │   └── route.ts      # POST /api/scan
│   │   │   ├── 📁 export/        # Report export endpoint
│   │   │   │   └── route.ts      # POST /api/export
│   │   │   └── 📁 headers/       # Security headers test
│   │   │       └── route.ts      # GET /api/headers
│   │   ├── 📁 about/             # About page
│   │   ├── 📁 contact/           # Contact page
│   │   ├── 📁 services/          # Services page
│   │   └── 📁 home/              # Home page content
│   ├── 📁 components/            # Reusable React components
│   │   ├── 📄 Dashboard.tsx      # Main dashboard component
│   │   ├── 📄 ScannerForm.tsx    # URL input and scanning interface
│   │   ├── 📄 Navbar.tsx         # Navigation component
│   │   ├── 📄 Footer.tsx         # Footer component
│   │   ├── 📄 AOSInit.tsx        # Animation on scroll initialization
│   │   ├── 📄 HtmlClassManager.tsx # HTML class management
│   │   ├── 📁 charts/            # Data visualization components
│   │   │   ├── 📄 Interactive3DChart.tsx # 3D chart component
│   │   │   └── 📄 chart-styles.css      # Chart styling
│   │   └── 📁 ui/                # UI component library
│   │       ├── 📄 button.tsx     # Button component
│   │       ├── 📄 card.tsx       # Card component
│   │       ├── 📄 input.tsx      # Input component
│   │       └── 📄 progress.tsx   # Progress bar component
│   ├── 📁 lib/                   # Core business logic
│   │   ├── 📄 scanner.ts         # Website scanning engine (1660 lines)
│   │   ├── 📄 reporting.ts       # PDF/JSON report generation
│   │   ├── 📄 types.ts           # TypeScript type definitions
│   │   └── 📄 utils.ts           # Utility functions
│   ├── 📁 types/                 # Additional type definitions
│   │   ├── 📄 aos.d.ts           # Animation on Scroll types
│   │   └── 📄 global.d.ts        # Global type definitions
│   └── 📄 middleware.ts          # Next.js middleware for security headers
├── 📄 package.json               # Project dependencies and scripts
├── 📄 next.config.ts             # Next.js configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 eslint.config.mjs          # ESLint configuration
├── 📄 postcss.config.mjs         # PostCSS configuration
└── 📄 README.md                  # Project documentation
```

## 🔧 Configuration Files

### Security Configuration
- **`middleware.ts`**: Implements security headers and CSP
- **`next.config.ts`**: Security headers, image optimization, and performance settings
- **`api/headers/route.ts`**: Security header testing endpoint

### Build Configuration
- **`tsconfig.json`**: Strict TypeScript configuration with path mapping
- **`eslint.config.mjs`**: Code quality rules and Next.js best practices
- **`postcss.config.mjs`**: Tailwind CSS processing configuration

## 🚦 API Endpoints

### Scanning API
```typescript
POST /api/scan
{
  "url": "https://example.com"
}

Response:
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "date": "2025-01-XX",
    "security": { score: 85, issues: [], checks: [...] },
    "performance": { score: 92, metrics: {...}, details: {...} },
    "seo": { score: 88, issues: [], checks: [...] },
    "accessibility": { score: 76, issues: [], checks: [...] },
    "recommendations": [...]
  },
  "reportId": "unique-report-id"
}
```

### Export API
```typescript
POST /api/export
{
  "reportId": "scan-report-id",
  "format": "pdf" | "json"
}

Response: PDF file or JSON data download
```

### Security Headers Test
```typescript
GET /api/headers

Response:
{
  "message": "Security headers test endpoint",
  "requestHeaders": {...},
  "expectedSecurityHeaders": {...},
  "timestamp": "2025-01-XX"
}
```

## 🔍 Core Features Deep Dive

### Website Scanner Engine (`lib/scanner.ts`)
The heart of AuditX is a comprehensive 1,660-line scanning engine that performs:

#### Security Analysis
- **HTTPS Verification**: SSL/TLS certificate validation
- **Security Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **OWASP Compliance**: Top 10 vulnerability checks
- **XSS Protection**: Cross-site scripting prevention validation

#### Performance Metrics
- **Core Web Vitals**: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS)
- **Time to First Byte (TTFB)**: Server response time measurement
- **Resource Analysis**: Page size, asset count, optimization opportunities
- **Loading Performance**: First Input Delay (FID) and interactivity metrics

#### SEO Analysis
- **Meta Data Validation**: Title tags, meta descriptions, structured data
- **Content Structure**: Heading hierarchy (H1-H6), semantic HTML
- **Technical SEO**: Robots.txt, XML sitemaps, canonical URLs
- **Mobile Optimization**: Responsive design and mobile-friendly checks

#### Accessibility Compliance
- **WCAG Guidelines**: Level AA compliance validation
- **Screen Reader Support**: ARIA labels, roles, and descriptions
- **Keyboard Navigation**: Tab order and focus management
- **Visual Accessibility**: Color contrast ratios and text readability

### Dashboard Visualization (`components/Dashboard.tsx`)
Interactive dashboard providing:
- **Real-time Scoring**: Dynamic score calculation and visualization
- **3D Charts**: Interactive data visualization with C3.js and D3.js
- **Detailed Reports**: Expandable sections for each analysis category
- **Export Functionality**: PDF and JSON report generation

### Report Generation (`lib/reporting.ts`)
Professional report generation featuring:
- **PDF Export**: Custom-styled reports with charts and recommendations
- **JSON Data**: Structured data for API integration and automation
- **Report Storage**: Temporary storage for report retrieval and sharing

## 🛡️ Security Implementation

### Content Security Policy
Comprehensive CSP implementation preventing:
- Cross-site scripting (XSS) attacks
- Code injection vulnerabilities
- Unsafe inline script execution
- Data exfiltration attempts

### Security Headers
Full implementation of OWASP-recommended headers:
```typescript
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Modern gradient system with primary and accent colors
- **Typography**: Inter font family with optimized loading
- **Spacing**: Consistent 8px grid system
- **Animations**: Framer Motion for smooth micro-interactions

### Responsive Design
- **Mobile-first**: Tailwind CSS responsive utilities
- **Breakpoints**: Optimized for all device sizes
- **Touch-friendly**: Large tap targets and intuitive navigation
- **Accessibility**: High contrast and keyboard navigation support

### Component Architecture
- **Modular Components**: Reusable UI component library
- **TypeScript Integration**: Fully typed component props and states
- **Performance Optimized**: Lazy loading and code splitting

## 🚀 Performance Optimizations

### Build Optimizations
- **Next.js 15**: Latest features including Server Components
- **Image Optimization**: AVIF and WebP format support
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination

### Runtime Optimizations
- **Caching Strategies**: Static asset caching and API response caching
- **Compression**: Gzip compression for reduced payload sizes
- **Lazy Loading**: Dynamic imports for chart components
- **Memory Management**: Efficient component lifecycle management

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals Tracking**: Real user metrics and performance insights
- **Error Tracking**: Client-side error monitoring and reporting
- **Usage Analytics**: Scan frequency and feature utilization metrics

### Quality Assurance
- **TypeScript**: Compile-time error prevention
- **ESLint**: Code quality enforcement
- **Testing Strategy**: Component and integration testing framework ready

## 🤝 Contributing

We welcome contributions to AuditX! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage for new features
- Update documentation for API changes
- Follow the established code style and formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent React framework
- **Vercel**: For hosting and deployment platform
- **Tailwind Labs**: For the utility-first CSS framework
- **OWASP**: For security best practices and guidelines
- **W3C**: For web standards and accessibility guidelines

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/your-username/auditx/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/auditx/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/auditx/discussions)
- **Email**: support@auditx.com

---

<div align="center">

**Built with ❤️ by the AuditX Team**

[🌐 Website](https://auditx.vercel.app) • [📧 Contact](mailto:contact@auditx.com) • [🐛 Report Bug](https://github.com/your-username/auditx/issues) • [✨ Request Feature](https://github.com/your-username/auditx/issues)

</div>
- **JSON Export**: Structured data export for API integration
- **Template System**: Branded report templates with charts

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sitesleuth.git
   cd sitesleuth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎮 Usage Guide

### 1. **Website Scanning**
- Enter any valid URL (https://example.com)
- Watch real-time scanning progress across four analysis stages
- View comprehensive results in the interactive dashboard

### 2. **Dashboard Navigation**
- **Overview Tab**: Overall score and quick metrics summary
- **Security Tab**: Detailed security analysis with OWASP checks
- **Performance Tab**: Core Web Vitals and optimization recommendations
- **SEO Tab**: Search engine optimization analysis
- **Accessibility Tab**: WCAG compliance and usability checks

### 3. **Report Export**
- Click "Export PDF" for professional audit reports
- Download JSON data for API integration
- Share results with stakeholders or development teams

### 4. **API Integration**
```bash
# Scan endpoint
POST /api/scan
Content-Type: application/json
{
  "url": "https://example.com"
}

# Export endpoint  
POST /api/export
Content-Type: application/json
{
  "reportId": "scan-id",
  "format": "pdf" | "json"
}
```
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
