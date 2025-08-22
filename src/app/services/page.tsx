'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, Eye, FileText, AlertTriangle, Globe, Lock } from 'lucide-react';

export default function Services() {
  
  const services = [
    {
      icon: Shield,
      title: 'Security Analysis',
      description: 'Comprehensive security audits including OWASP Top 10 vulnerabilities, security headers, SSL/TLS configuration, and potential threats.',
      features: [
        'OWASP Top 10 vulnerability assessment',
        'Security headers analysis',
        'SSL/TLS certificate validation',
        'Content Security Policy checks',
        'XSS and SQL injection detection'
      ],
      color: 'text-red-400',
      bgColor: 'from-red-500/5 to-pink-500/5'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Detailed performance metrics analysis covering Core Web Vitals, page load times, and optimization recommendations.',
      features: [
        'Core Web Vitals measurement',
        'Page load time analysis',
        'Time to First Byte (TTFB)',
        'Resource optimization suggestions',
        'Caching analysis'
      ],
      color: 'text-blue-400',
      bgColor: 'from-blue-500/5 to-cyan-500/5'
    },
    {
      icon: Search,
      title: 'SEO Audit',
      description: 'Complete SEO analysis covering on-page optimization, meta tags, structured data, and search engine visibility.',
      features: [
        'Meta tags optimization',
        'Structured data validation',
        'URL structure analysis',
        'Internal linking review',
        'Mobile-first indexing check'
      ],
      color: 'text-green-400',
      bgColor: 'from-green-500/5 to-emerald-500/5'
    },
    {
      icon: Eye,
      title: 'Accessibility Testing',
      description: 'WCAG compliance testing ensuring your website is accessible to all users, including those with disabilities.',
      features: [
        'WCAG 2.1 AA compliance',
        'ARIA attributes validation',
        'Color contrast analysis',
        'Keyboard navigation testing',
        'Screen reader compatibility'
      ],
      color: 'text-purple-400',
      bgColor: 'from-purple-500/5 to-violet-500/5'
    }
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Comprehensive PDF reports with actionable insights and recommendations.'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Priority-based vulnerability scoring and risk level categorization.'
    },
    {
      icon: Globe,
      title: 'Multi-domain Support',
      description: 'Scan multiple domains and subdomains for enterprise-level solutions.'
    },
    {
      icon: Lock,
      title: 'Privacy Focused',
      description: 'All scans are performed securely with no data retention policy.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-neutral-50 mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Services</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              From security analysis to performance optimization, we provide comprehensive website auditing solutions for businesses of all sizes.
            </p>
          </div>
        </motion.div>

        {/* Main Services Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl overflow-hidden shadow-lg relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-80`}></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_70%)]" />
                <div className="relative p-8 z-10">
                  <div className="bg-neutral-800/50 p-3 rounded-lg inline-block mb-4">
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-50 mb-4">{service.title}</h3>
                  <p className="text-neutral-300 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + 0.05 * i }}
                        className="flex items-center"
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${service.color} mr-3`}></div>
                        <span className="text-neutral-200 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-neutral-50 text-center mb-6">
              Additional <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Features</span>
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto text-center mb-12">
              Our platform offers more than just basic scanning. Discover additional features designed to enhance your website security and performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-neutral-800/50 p-2 rounded-lg inline-block mb-4">
                    <service.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-50 mb-2">{service.title}</h3>
                  <p className="text-neutral-300 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="relative z-10 py-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Secure</span> Your Website?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-3xl mx-auto text-center">
              Start your website audit today and discover vulnerabilities before attackers do.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-neutral-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/20"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
