import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "./components.css";
import AOSInit from '@/components/AOSInit';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SiteSleuth - Website Audit & Security Tool",
  description: "Comprehensive website security, performance, SEO, and accessibility auditing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // layout remains a server component; AOS is initialized in the client component
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-body bg-background text-foreground min-h-screen flex flex-col antialiased`}
      >
        <div className="blur-backdrop w-[500px] h-[500px] fixed top-0 left-[20%] opacity-10 rounded-full bg-accent-blue"></div>
        <div className="blur-backdrop w-[600px] h-[600px] fixed bottom-0 right-[10%] opacity-10 rounded-full bg-accent-purple"></div>
        <Navbar />
        <AOSInit />
        <main className="pt-16 flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
