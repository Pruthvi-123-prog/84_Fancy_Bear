'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, Eye } from 'lucide-react';
import { ScannerForm } from '@/components/ScannerForm';
import { Dashboard } from '@/components/Dashboard';
import { ScanResult } from '@/lib/types';
import { CounterAnimation } from '@/components/CounterAnimation';
import { TouchResponsive } from '@/components/TouchResponsive';

export default function Home() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

  useEffect(() => {
    // Handle scrolling to hash on page load
    const hash = window.location.hash;
    if (hash) {
      // Wait a bit for the page to render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);

  const handleExportPDF = async () => {
    if (!scanResult) return;

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: `temp-${Date.now()}`,
          format: 'pdf',
          scanResult: scanResult, // Pass the scan result directly
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `auditx-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        const errorData = await response.json();
        console.error('Export failed:', errorData);
        alert('Failed to export report: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    }
  };

  if (scanResult) {
    return (
      <div className="min-h-screen">
        <Dashboard
          scanResult={scanResult}
          onNewScan={handleNewScan}
          onExportPDF={handleExportPDF}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent-purple/5" />
        <div className="relative z-10 pt-16 pb-24">
          <div className="container-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="font-display text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight">
                Audit<span className="text-gradient">X</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto font-medium">
                Advanced Website Security & Performance Analyzer
              </p>
              <p className="font-body text-lg text-muted mb-12 max-w-2xl mx-auto">
                Analyze your website&apos;s security, performance, SEO, and accessibility in seconds. 
                Get detailed reports with actionable recommendations powered by advanced AI.
              </p>
              <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-muted/80">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    <CounterAnimation from={0} to={100} duration={2} suffix="%" />
                  </span>
                  <span>Accurate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    <CounterAnimation from={0} to={60} duration={2.5} suffix="s" />
                  </span>
                  <span>Scan Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    <CounterAnimation from={0} to={50} duration={2.2} suffix="+" />
                  </span>
                  <span>Security Checks</span>
                </div>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 stagger-children"
            >
              {[
                {
                  icon: Shield,
                  title: 'Security Analysis',
                  description: 'OWASP compliance, headers, vulnerabilities'
                },
                {
                  icon: Zap,
                  title: 'Performance Metrics',
                  description: 'Load times, TTFB, Core Web Vitals'
                },
                {
                  icon: Search,
                  title: 'SEO Audit',
                  description: 'Meta tags, structure, optimization'
                },
                {
                  icon: Eye,
                  title: 'Accessibility Check',
                  description: 'WCAG compliance, ARIA, usability'
                }
              ].map((feature, index) => (
                <TouchResponsive
                  key={feature.title}
                  hoverScale={1.02}
                  className="glass-card group relative overflow-hidden cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl"></div>
                    <div className="p-6 relative z-10">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <feature.icon className="h-6 w-6 text-primary group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-blue-300 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-muted group-hover:text-neutral-200 transition-colors duration-300">{feature.description}</p>
                    </div>
                  </motion.div>
                </TouchResponsive>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scanner Form */}
      <div id="scanner" className="relative -mt-16 pb-20">
        <div className="container-full">
          <div data-aos="fade-up" data-aos-delay="300">
            <ScannerForm onScanComplete={handleScanComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
