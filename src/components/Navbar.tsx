'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const navigationItems = [
  { name: 'Scanner', href: '/' },
  { name: 'Home', href: '/home' },
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
    <nav className={`navbar glass-navbar ${scrolled ? 'navbar-shrink' : ''}`}>
      <div className="container flex-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 animate-hover-scale">
          <Shield className="h-8 w-8 text-primary transition-colors duration-300" />
          <span className="font-display text-2xl font-bold text-foreground">
            Site<span className="text-primary">Sleuth</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = mounted && pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`navbar-link text-sm font-medium ${
                    isActive ? 'navbar-link-active' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link href="#contact" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-outline btn-sm rounded-lg p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden glass-subtle border-t border-glass-border"
        >
          <div className="container py-4 space-y-3">
            {navigationItems.map((item, index) => {
              const isActive = mounted && pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 px-1 ${
                      isActive
                        ? 'text-primary font-medium'
                        : 'text-foreground hover:text-primary'
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
              transition={{ delay: navigationItems.length * 0.1, duration: 0.3 }}
              className="pt-2"
            >
              <Link 
                href="#contact" 
                className="btn btn-primary w-full"
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