'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Search, Eye, ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function HomePage() {
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
      content: 'SiteSleuth helped us identify critical security issues we never knew existed. The detailed reports are incredibly valuable.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Digital Marketing Manager',
      content: 'The SEO insights from SiteSleuth improved our website rankings significantly. Easy to use and comprehensive.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      content: 'As a non-technical founder, SiteSleuth gives me confidence that our website is secure and optimized.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="relative z-10 pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold text-neutral-50 mb-6">
                Website Security <br />
                Made <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Simple</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-neutral-300 mb-8 max-w-4xl mx-auto font-medium">
                Comprehensive website auditing that identifies vulnerabilities, optimizes performance, 
                and ensures your site meets modern web standards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-neutral-50 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/20 font-body"
                >
                  Start Free Scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800/80 backdrop-blur-md text-neutral-50 font-semibold rounded-lg transition-all duration-300 border border-neutral-700/50 hover:border-neutral-600/50 font-body"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-400 text-sm stagger-children">
                {[
                  { icon: CheckCircle, text: 'No Registration Required' },
                  { icon: CheckCircle, text: 'OWASP Compliant' },
                  { icon: CheckCircle, text: 'Instant Results' }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center animate-slide-up"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <item.icon className="h-4 w-4 text-green-400 mr-2" />
                    <span className="font-body font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Everything You Need to <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Secure Your Website</span>
            </h2>
            <p className="font-body text-xl text-neutral-300 max-w-3xl mx-auto font-regular">
              Our comprehensive platform covers all aspects of website security, performance, and optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-lg hover:shadow-blue-900/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="bg-neutral-800/50 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <feature.icon className={`h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-50 mb-3">{feature.title}</h3>
                <p className="font-body text-neutral-300 font-regular">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-neutral-900/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
                Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">SiteSleuth</span>?
              </h2>
              <p className="font-body text-lg text-neutral-300 mb-8 font-regular">
                Join thousands of developers, marketers, and business owners who trust SiteSleuth 
                to keep their websites secure and optimized.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="bg-neutral-800/70 p-1 rounded-full mr-3 flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-body text-neutral-300 font-regular">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center mb-8">
                <div className="font-display text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text mb-2">10,000+</div>
                <div className="font-body text-neutral-300 font-medium">Websites Scanned</div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { number: '500+', label: 'Vulnerabilities Found', color: 'bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text' },
                  { number: '50+', label: 'Security Checks', color: 'bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text' },
                  { number: '25+', label: 'SEO Factors', color: 'bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text' },
                  { number: '15+', label: 'Performance Metrics', color: 'bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className={`font-display text-2xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform duration-300`}>{stat.number}</div>
                    <div className="font-body text-neutral-300 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:50px_50px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Trusted by <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Professionals</span>
            </h2>
            <p className="font-body text-xl text-neutral-300 max-w-3xl mx-auto font-regular">
              See what our users have to say about SiteSleuth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <p className="font-body text-neutral-300 mb-4 font-regular">"{testimonial.content}"</p>
                <div>
                  <div className="font-display font-semibold text-neutral-50">{testimonial.name}</div>
                  <div className="font-body text-neutral-400 text-sm font-regular">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Secure Your Website</span>?
            </h2>
            <p className="font-body text-xl text-neutral-300 mb-8 font-regular">
              Get started with a comprehensive security audit in less than 60 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-neutral-50 font-semibold rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-blue-700/20 font-body"
            >
              Start Your Free Scan Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}