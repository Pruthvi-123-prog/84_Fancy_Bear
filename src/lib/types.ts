import { z } from 'zod';

export const ScanResultSchema = z.object({
  url: z.string().url(),
  date: z.string(),
  security: z.object({
    issues: z.array(z.string()),
    score: z.number().min(0).max(100),
    checks: z.array(z.object({
      name: z.string(),
      status: z.enum(['pass', 'fail', 'warning']),
      description: z.string(),
      recommendation: z.string().optional(),
    })),
  }),
  performance: z.object({
    metrics: z.record(z.string(), z.number()),
    score: z.number().min(0).max(100),
    details: z.object({
      ttfb: z.number().optional(),
      lcp: z.number().optional(),
      cls: z.number().optional(),
      fid: z.number().optional(),
      pageSize: z.number().optional(),
      loadTime: z.number().optional(),
    }),
  }),
  seo: z.object({
    issues: z.array(z.string()),
    score: z.number().min(0).max(100),
    checks: z.array(z.object({
      name: z.string(),
      status: z.enum(['pass', 'fail', 'warning']),
      description: z.string(),
      recommendation: z.string().optional(),
    })),
  }),
  accessibility: z.object({
    issues: z.array(z.string()),
    score: z.number().min(0).max(100),
    checks: z.array(z.object({
      name: z.string(),
      status: z.enum(['pass', 'fail', 'warning']),
      description: z.string(),
      recommendation: z.string().optional(),
    })),
  }),
  recommendations: z.array(z.string()),
});

export type ScanResult = z.infer<typeof ScanResultSchema>;

export interface ScanProgress {
  stage: 'security' | 'performance' | 'seo' | 'accessibility' | 'complete';
  progress: number;
  message: string;
}

export interface SecurityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  recommendation?: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
}

export interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  recommendation?: string;
}

export interface AccessibilityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  recommendation?: string;
}
