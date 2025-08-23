'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Target, Zap } from 'lucide-react';
import { CounterAnimation, AnimatedStats } from '@/components/CounterAnimation';
import { TouchResponsive } from '@/components/TouchResponsive';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container-full py-16 sm:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 sm:mb-20 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
          <div className="relative z-10">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-50 mb-4 sm:mb-6">
              About Audit<span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">X</span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-medium leading-relaxed">
              Your advanced website security and performance analyzer, powered by cutting-edge technology to keep your digital presence secure, fast, and optimized.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <div className="bg-neutral-800/70 p-3 sm:p-4 rounded-full inline-block mb-4">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-50 mb-4">
              Our Mission
            </h2>
            <p className="font-body text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto font-regular leading-relaxed">
              To democratize website security and performance auditing by providing enterprise-grade analysis tools that are accessible, comprehensive, and actionable for businesses of all sizes.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 stagger-children"
        >
          {[
            {
              icon: Shield,
              title: 'Security First',
              description: 'We prioritize your website\'s security with comprehensive OWASP compliance checks and vulnerability assessments.'
            },
            {
              icon: Zap,
              title: 'Performance Focused',
              description: 'Our tools analyze Core Web Vitals, load times, and performance metrics to ensure optimal user experience.'
            },
            {
              icon: Globe,
              title: 'SEO Optimized',
              description: 'Complete SEO audits covering meta tags, structured data, and search engine optimization best practices.'
            }
          ].map((feature, index) => (
            <TouchResponsive
              key={feature.title}
              hoverScale={1.03}
              className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 group relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="bg-neutral-800/70 p-4 rounded-full inline-block mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-300">
                  {feature.description}
                </p>
              </motion.div>
            </TouchResponsive>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 mb-16 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:30px_30px]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-neutral-50 text-center mb-8">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">AuditX</span>?
            </h2>
            <AnimatedStats 
              stats={[
                { number: '50+', label: 'Security Checks' },
                { number: '15+', label: 'Performance Metrics' },
                { number: '25+', label: 'SEO Factors' },
                { number: '10+', label: 'Accessibility Tests' }
              ]}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            />
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.04),transparent_70%)]" />
          <div className="relative z-10">
            <div className="bg-neutral-800/70 p-4 rounded-full inline-block mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="font-display text-3xl font-bold text-neutral-50 mb-6">
              Built by <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Security Experts</span>
            </h2>
            <p className="font-body text-lg text-neutral-300 mb-8 max-w-3xl mx-auto font-regular">
              AuditX is developed by a team of cybersecurity professionals, web developers, 
              and digital marketing experts who understand the challenges of maintaining a secure 
              and high-performing web presence.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: Award, label: 'OWASP Certified' },
              { icon: Shield, label: 'Security Focused' },
              { icon: Zap, label: 'Performance Driven' }
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-lg p-4 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="bg-neutral-800/50 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <badge.icon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="font-body text-sm text-neutral-300 font-medium">{badge.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}