'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, Eye } from 'lucide-react';
import { ScannerForm } from '@/components/ScannerForm';
import { Dashboard } from '@/components/Dashboard';
import { ScanResult } from '@/lib/types';

export default function Home() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

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
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sitesleuth-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (scanResult) {
    return (
      <div className="min-h-screen p-4 md:p-8">
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
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="font-display text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight">
                Site<span className="text-gradient">Sleuth</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto font-medium">
                Comprehensive Website Audit & Security Reporting Tool
              </p>
              <p className="font-body text-lg text-muted mb-12 max-w-2xl mx-auto">
                Analyze your website's security, performance, SEO, and accessibility in seconds. 
                Get detailed reports with actionable recommendations.
              </p>
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
                <div
                  key={feature.title}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                  className="glass-card"
                >
                  <div className="p-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scanner Form */}
      <div className="relative -mt-16 pb-20">
        <div className="container">
          <div data-aos="fade-up" data-aos-delay="300">
            <ScannerForm onScanComplete={handleScanComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
