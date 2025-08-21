'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-neutral-50 mb-6">
              About Site<span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Sleuth</span>
            </h1>
            <p className="font-body text-xl text-neutral-300 mb-8 max-w-3xl mx-auto font-medium">
              Your comprehensive website auditing companion, designed to keep your digital presence secure, fast, and optimized.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 mb-16 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="text-center mb-8 relative z-10">
            <div className="bg-neutral-800/70 p-4 rounded-full inline-block mb-4">
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="font-display text-3xl font-bold text-neutral-50 mb-4">Our Mission</h2>
            <p className="font-body text-lg text-neutral-300 max-w-3xl mx-auto font-regular">
              To democratize website security and performance auditing by providing enterprise-grade 
              analysis tools that are accessible, comprehensive, and actionable for businesses of all sizes.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 stagger-children"
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
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_70%)]" />
              <div className="relative z-10">
                <div className="bg-neutral-800/50 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-50 mb-3">{feature.title}</h3>
                <p className="font-body text-neutral-300 font-regular">{feature.description}</p>
              </div>
            </motion.div>
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
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">SiteSleuth</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '50+', label: 'Security Checks' },
                { number: '15+', label: 'Performance Metrics' },
                { number: '25+', label: 'SEO Factors' },
                { number: '10+', label: 'Accessibility Tests' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center group"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <div className="font-display text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="font-body text-neutral-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
              SiteSleuth is developed by a team of cybersecurity professionals, web developers, 
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