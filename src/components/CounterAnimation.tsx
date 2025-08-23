'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import type { AnimateControls } from '../lib/framerMotionTypes';

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CounterAnimation({ 
  from = 0, 
  to, 
  duration = 2, 
  className = '', 
  suffix = '', 
  prefix = '' 
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" }); // More reliable for mobile
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
  let controls: AnimateControls | undefined;
    if (isInView) {
      controls = animate(count, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        }
      });
    } else {
      setDisplayValue(from);
    }
    return () => {
      if (controls) controls.stop();
      // Always set to final value if in view after animation
      if (isInView) setDisplayValue(to);
    };
  }, [count, to, duration, isInView, from]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

interface AnimatedStatsProps {
  stats: Array<{
    number: string;
    label: string;
    color?: string;
  }>;
  className?: string;
}

export function AnimatedStats({ stats, className = "" }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={className}>
      {stats.map((stat, index) => {
        // Extract number and suffix from stat.number string
        const matches = stat.number.match(/^(\d+)(.*)$/);
        const number = matches ? parseInt(matches[1]) : 0;
        const suffix = matches ? matches[2] : '';

        return (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group text-center"
          >
            <div className={`font-display text-xl sm:text-2xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300 ${stat.color || 'bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text'}`}>
              <CounterAnimation
                from={0}
                to={number}
                duration={2 + index * 0.2}
                suffix={suffix}
              />
            </div>
            <div className="font-body text-neutral-300 text-xs sm:text-sm font-medium leading-tight">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
