'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TouchResponsiveProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  tapScale?: number;
  hoverClassName?: string;
  disabled?: boolean;
}

export function TouchResponsive({ 
  children, 
  className = '', 
  hoverScale = 1.02,
  tapScale = 0.98,
  hoverClassName = '',
  disabled = false
}: TouchResponsiveProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isHovered || isTouched ? hoverClassName : ''}`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </motion.div>
  );
}

interface TouchResponsiveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function TouchResponsiveButton({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}: TouchResponsiveButtonProps) {
  return (
    <motion.button
      type={type}
      className={`${className} touch-manipulation`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.button>
  );
}

interface TouchResponsiveLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}

export function TouchResponsiveLink({ 
  children, 
  href, 
  className = '',
  external = false
}: TouchResponsiveLinkProps) {
  const linkProps = external 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.a
      {...linkProps}
      className={`${className} touch-manipulation block`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.a>
  );
}
