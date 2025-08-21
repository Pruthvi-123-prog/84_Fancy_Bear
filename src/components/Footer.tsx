'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Scanner', href: '/' },
      { name: 'Features', href: '/services' },
      { name: 'Security Audit', href: '/services#security' },
      { name: 'Performance Test', href: '/services#performance' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Help Center', href: '#' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up" data-aos-duration="800">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 animate-hover-scale">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl font-bold text-foreground">
                Site<span className="text-primary">Sleuth</span>
              </span>
            </Link>
            <p className="text-muted mb-6 max-w-sm">
              Comprehensive website security, performance, and SEO auditing tool 
              designed to keep your digital presence secure and optimized.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span className="hover:text-primary transition-colors">support@sitesleuth.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span className="hover:text-primary transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-primary" />
                <span className="hover:text-primary transition-colors">Remote Team, Worldwide</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="mt-2">
            <h3 className="footer-heading text-lg font-medium mb-5">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="footer-link link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="mt-2">
            <h3 className="footer-heading text-lg font-medium mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="footer-link link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="mt-2">
            <h3 className="footer-heading text-lg font-medium mb-5">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="footer-link link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-card-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted text-sm">
              © {currentYear} SiteSleuth. All rights reserved. Built with Next.js 14, TypeScript, and modern web technologies.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted hover:text-primary transition-colors footer-link">
                <span className="sr-only">Privacy Policy</span>
                Privacy
              </Link>
              <Link href="#" className="text-muted hover:text-primary transition-colors footer-link">
                <span className="sr-only">Terms of Service</span>
                Terms
              </Link>
              <Link href="#" className="text-muted hover:text-primary transition-colors footer-link">
                <span className="sr-only">Cookies</span>
                Cookies
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-muted opacity-70">
            <p>Made with care for a better web experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
