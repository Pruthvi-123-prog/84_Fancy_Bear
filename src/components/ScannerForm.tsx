'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScanResult } from '@/lib/types';
import { isValidUrl } from '@/lib/utils';

interface ScannerFormProps {
  onScanComplete?: (result: ScanResult) => void;
}

const scanStages = [
  { key: 'security', label: 'Security Analysis', description: 'Checking headers and vulnerabilities' },
  { key: 'performance', label: 'Performance Metrics', description: 'Measuring load times and optimization' },
  { key: 'seo', label: 'SEO Analysis', description: 'Analyzing meta tags and structure' },
  { key: 'accessibility', label: 'Accessibility Check', description: 'Evaluating WCAG compliance' },
];

export function ScannerForm({ onScanComplete }: ScannerFormProps) {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateUrl = (urlString: string) => {
    if (!urlString) {
      setValidationError('Please enter a URL');
      return false;
    }
    
    if (!isValidUrl(urlString)) {
      setValidationError('Please enter a valid domain or URL (e.g., example.com or https://example.com)');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleScan = async () => {
    if (!validateUrl(url)) return;

    setIsScanning(true);
    setError(null);
    setCurrentStage(0);
    setCompletedStages(0);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Start progress simulation
      progressInterval = setInterval(() => {
        setCompletedStages(prev => {
          const next = prev + 1;
          if (next <= 4) {
            setCurrentStage(next - 1);
            return next;
          }
          return prev;
        });
      }, 3000); // Move to next stage every 3 seconds

      // Start the first stage
      setCurrentStage(0);
      
      // Call the API which will perform all scans
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      // Clear the progress interval
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to scan website');
      }

      const data = await response.json();
      
      // Mark all stages as complete when scan finishes
      setCompletedStages(4);
      setCurrentStage(3); // Last stage (0-indexed)
      
      // Wait a moment to show completion, then redirect
      setTimeout(() => {
        if (data.success && onScanComplete) {
          onScanComplete(data.data);
        }
      }, 1000);

      if (!data.success) {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      // Make sure to clear interval on error
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      // Clean up
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setIsScanning(false);
      setCurrentStage(0);
      setCompletedStages(0);
    }
  };

  const progress = isScanning ? (completedStages / scanStages.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-2">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Search className="h-6 w-6 text-blue-500" />
            Website Scanner
          </CardTitle>
          <CardDescription className="text-base">
            Enter a domain name (e.g., example.com) or full URL to perform a comprehensive security, performance, SEO, and accessibility audit. AuditX will automatically detect the best protocol (HTTP/HTTPS).
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url-input" className="text-sm font-medium text-foreground sr-only">
              Website URL to scan
            </label>
            <div className="flex gap-2">
              <Input
                id="url-input"
                type="url"
                placeholder="example.com or https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (validationError) {
                    validateUrl(e.target.value);
                  }
                }}
                onBlur={(e) => validateUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isScanning && !validationError) {
                    e.preventDefault();
                    handleScan();
                  }
                }}
                disabled={isScanning}
                className={validationError ? 'border-red-500 focus:border-red-500' : 'focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20'}
                aria-invalid={!!validationError}
                aria-describedby={validationError ? "url-error" : undefined}
                autoComplete="url"
              />
              <Button 
                onClick={handleScan} 
                disabled={isScanning || !!validationError}
                className="min-w-[100px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={isScanning ? 'Scanning in progress' : 'Start security and performance scan'}
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </div>
            
            {validationError && (
              <div id="url-error" className="flex items-center gap-2 text-red-500 text-sm" role="alert">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <span>{validationError}</span>
              </div>
            )}
            
            {!isScanning && !url && (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-muted-foreground">Try:</span>
                {['example.com', 'google.com', 'https://github.com', 'http://httpforever.com'].map((demoUrl) => (
                  <button
                    key={demoUrl}
                    type="button"
                    onClick={() => setUrl(demoUrl)}
                    className="px-2 py-1 bg-muted hover:bg-muted/80 rounded text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    aria-label={`Use example URL: ${demoUrl}`}
                  >
                    {demoUrl}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Scan Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-3">
                {scanStages.map((stage, index) => (
                  <motion.div
                    key={stage.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      index < currentStage
                        ? 'bg-green-50 dark:bg-green-950/20'
                        : index === currentStage
                        ? 'bg-blue-50 dark:bg-blue-950/20'
                        : 'bg-muted/20'
                    }`}
                  >
                    {index < currentStage ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : index === currentStage ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"
                      />
                    ) : (
                      <div className="h-5 w-5 border-2 border-muted rounded-full" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{stage.label}</div>
                      <div className="text-xs text-muted-foreground">{stage.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 rounded-lg"
            >
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <div className="font-medium text-sm text-red-800 dark:text-red-300">Scan Failed</div>
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
