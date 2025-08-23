'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { TouchResponsive, TouchResponsiveButton, TouchResponsiveLink } from './TouchResponsive';

const navigationItems = [
  { name: 'Home', href: '/home' },
  { name: 'Scanner', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar glass-navbar ${scrolled ? 'navbar-shrink' : ''} relative z-50`}>
      <div className="container-full flex-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 animate-hover-scale">
          <TouchResponsive hoverScale={1.05} disabled={false} className="flex items-center space-x-2">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary transition-colors duration-300 flex-shrink-0" />
            <span className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Audit<span className="text-primary">X</span>
            </span>
          </TouchResponsive>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = mounted && pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`navbar-link text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md px-3 py-2 transition-all duration-200 ${
                    isActive ? 'navbar-link-active' : ''
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link 
              href="/" 
              className="btn btn-primary btn-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <TouchResponsiveButton
            onClick={toggleMenu}
            className="btn btn-outline btn-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </TouchResponsiveButton>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="lg:hidden border-t border-glass-border absolute top-full left-0 right-0 bg-neutral-900 shadow-lg"
          id="mobile-menu"
        >
          <div className="container-full py-4 space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = mounted && pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-foreground hover:text-primary hover:bg-neutral-800/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navigationItems.length * 0.05, duration: 0.2 }}
              className="pt-3"
            >
              <Link 
                href="/" 
                className="btn btn-primary w-full py-3 text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}