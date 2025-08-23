'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Search, Eye, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { CounterAnimation, AnimatedStats } from '@/components/CounterAnimation';
import { TouchResponsive, TouchResponsiveLink } from '@/components/TouchResponsive';

export default function HomePage() {
  const scrollContainerRef = useRef(null);

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security Scanning',
      description: 'Comprehensive security analysis following OWASP guidelines with real-time threat detection.',
      color: 'text-red-400'
    },
    {
      icon: Zap,
      title: 'Performance Analytics',
      description: 'Deep performance insights including Core Web Vitals and optimization recommendations.',
      color: 'text-blue-400'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Complete SEO audit covering technical SEO, content analysis, and ranking factors.',
      color: 'text-green-400'
    },
    {
      icon: Eye,
      title: 'Accessibility Testing',
      description: 'WCAG compliance testing ensuring your site is accessible to all users.',
      color: 'text-purple-400'
    }
  ];

  const benefits = [
    'Identify security vulnerabilities before hackers do',
    'Improve website performance and user experience',
    'Boost search engine rankings with SEO insights',
    'Ensure compliance with accessibility standards',
    'Generate detailed PDF reports for stakeholders',
    'No registration required - instant results'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      content: 'AuditX helped us identify critical security issues we never knew existed. The detailed reports are incredibly valuable.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Digital Marketing Manager',
      content: 'The SEO insights from AuditX improved our website rankings significantly. Easy to use and comprehensive.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      content: 'As a non-technical founder, AuditX gives me confidence that our website is secure and optimized.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950" ref={scrollContainerRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="relative z-10 pt-16 sm:pt-20 pb-24 sm:pb-32">
          <div className="container-full">
            <TouchResponsive className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-50 mb-4 sm:mb-6 tracking-tight">
                  Audit<span className="text-gradient">X</span>
                </h1>
                <p className="font-body text-lg sm:text-xl md:text-2xl text-neutral-50/90 mb-6 sm:mb-8 max-w-3xl mx-auto font-medium px-4">
                  Advanced Website Security & Performance Analyzer
                </p>
                <p className="font-body text-base sm:text-lg text-neutral-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
                  Analyze your website&apos;s security, performance, SEO, and accessibility in seconds. 
                  Get detailed reports with actionable recommendations powered by advanced AI.
                </p>
              </motion.div>
            </TouchResponsive>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-full py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <TouchResponsive
              key={feature.title}
              hoverScale={1.05}
              className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-500 hover:border-blue-500/30 group relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <div className="bg-neutral-800/70 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4 group-hover:bg-blue-900/50 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${feature.color} group-hover:text-blue-300 transition-colors duration-300`} />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-50 mb-2 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </TouchResponsive>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-neutral-900/30" />
        <div className="container-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-50 mb-4 sm:mb-6 leading-tight">
                Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">AuditX</span>?
              </h2>
              <p className="font-body text-base sm:text-lg text-neutral-300 mb-6 sm:mb-8 font-regular leading-relaxed">
                Join thousands of developers, marketers, and business owners who trust AuditX 
                to keep their websites secure and optimized.
              </p>
              
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="bg-neutral-800/70 p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-body text-base sm:text-lg text-neutral-300 font-regular leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <TouchResponsive
              hoverScale={1.05}
              className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-500 hover:border-blue-500/30 group relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    <CounterAnimation from={0} to={10000} duration={2.5} suffix="+" />
                  </div>
                  <div className="font-body text-sm sm:text-base text-neutral-300 font-medium group-hover:text-neutral-200 transition-colors duration-300">Websites Scanned</div>
                </div>
                
                <AnimatedStats 
                  stats={[
                    { number: '500+', label: 'Vulnerabilities Found', color: 'bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text' },
                    { number: '50+', label: 'Security Checks', color: 'bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text' },
                    { number: '25+', label: 'SEO Factors', color: 'bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text' },
                    { number: '15+', label: 'Performance Metrics', color: 'bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text' }
                  ]}
                  className="grid grid-cols-2 gap-4 sm:gap-6 text-center"
                />
              </motion.div>
            </TouchResponsive>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:50px_50px]" />
        <div className="container-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-50 mb-4 sm:mb-6">
              Trusted by <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Professionals</span>
            </h2>
            <p className="font-body text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto font-regular">
              See what our users have to say about AuditX.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group hover:border-blue-500/30 relative overflow-hidden"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 fill-current group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <p className="font-body text-sm sm:text-base text-neutral-300 mb-4 font-regular group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-display font-semibold text-sm sm:text-base text-neutral-50 group-hover:text-blue-300 transition-colors duration-300">{testimonial.name}</div>
                  <div className="font-body text-neutral-400 text-xs sm:text-sm font-regular group-hover:text-neutral-300 transition-colors duration-300">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="container-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-50 mb-4 sm:mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Secure Your Website</span>?
            </h2>
            <p className="font-body text-lg sm:text-xl text-neutral-300 mb-6 sm:mb-8 font-regular">
              Get started with a comprehensive security audit in less than 60 seconds.
            </p>
            <Link
              href="/#scanner"
              className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-neutral-50 font-semibold rounded-lg transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-blue-700/20 font-body"
            >
              <TouchResponsive hoverScale={1.02} className="flex items-center">
                Start Your Free Scan Now
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </TouchResponsive>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}