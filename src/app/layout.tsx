import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "./components.css";
import AOSInit from '@/components/AOSInit';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AuditX - Advanced Website Security & Performance Analyzer",
  description: "Comprehensive website security analysis, performance optimization, SEO audit, and accessibility testing platform. Get detailed reports with actionable recommendations to improve your website's security posture, loading speed, search engine optimization, and user experience. Scan your website for OWASP Top 10 vulnerabilities, performance bottlenecks, SEO issues, and accessibility compliance problems. Trusted by developers and businesses worldwide.",
  keywords: ["website security", "performance analyzer", "SEO audit", "accessibility testing", "OWASP", "web security", "site optimization", "vulnerability scanner", "security audit", "web performance", "site speed test"],
  authors: [{ name: "AuditX Team" }],
  creator: "AuditX",
  publisher: "AuditX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // layout remains a server component; AOS is initialized in the client component
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0077ff" />
      </head>
      <body
        className={`${inter.variable} font-body bg-background text-foreground min-h-screen flex flex-col antialiased focus-within:scroll-auto`}
      >
        <div className="blur-backdrop w-[500px] h-[500px] fixed top-0 left-[20%] opacity-10 rounded-full bg-accent-blue" aria-hidden="true"></div>
        <div className="blur-backdrop w-[600px] h-[600px] fixed bottom-0 right-[10%] opacity-10 rounded-full bg-accent-purple" aria-hidden="true"></div>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white p-2 rounded-md z-50">
          Skip to main content
        </a>
        <header>
          <Navbar />
        </header>
        <AOSInit />
        <main id="main-content" className="pt-16 flex-1 relative z-10" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
