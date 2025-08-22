'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onExpand?: () => void;
  icon?: React.ElementType;
  className?: string;
}

export const EnhancedChartCard: React.FC<EnhancedChartCardProps> = ({
  title,
  description,
  children,
  onExpand,
  icon: Icon = BarChart3,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`h-full ${className}`}
    >
      <Card className="border border-neutral-800 bg-gradient-to-br from-neutral-900/90 to-neutral-800/50 backdrop-blur-md h-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-900/20 hover:border-blue-500/30 group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 group-hover:border-blue-400/50 transition-colors">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-heading tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                  {title}
                </CardTitle>
                {description && (
                  <p className="text-sm text-neutral-400 mt-1">{description}</p>
                )}
              </div>
            </div>
            {onExpand && (
              <button
                onClick={onExpand}
                className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neutral-700/50 hover:border-blue-500/30"
                aria-label={`Expand ${title} chart`}
              >
                <ZoomIn className="h-4 w-4 text-blue-400" />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <div className="w-full h-full">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
