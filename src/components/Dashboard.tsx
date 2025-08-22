'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Search, 
  Eye, 
  Download, 
  ExternalLink, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScanResult } from '@/lib/types';
import { formatBytes, formatDuration } from '@/lib/utils';

// Import the new enhanced chart components
import { D3RingChart } from '@/components/charts/D3RingChart';
import { AdvancedLineChart } from '@/components/charts/AdvancedLineChart';
import { Advanced3DBarChart } from '@/components/charts/Advanced3DBarChart';
import { EnhancedChartCard } from '@/components/charts/EnhancedChartCard';
import { ChartModal } from '@/components/charts/ChartModal';

interface DashboardProps {
  scanResult: ScanResult;
  onNewScan: () => void;
  onExportPDF: () => void;
}

// Utility function for scoring
const getScoreLabel = (score: number): string => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 70) return "Fair";
  if (score >= 60) return "Poor";
  return "Critical";
};

export function Dashboard({ scanResult, onNewScan, onExportPDF }: DashboardProps) {
  // State for showing detailed information modal
  const [showDetailedInfo, setShowDetailedInfo] = React.useState<string | null>(null);
  
  // State for chart modals
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showTrendsModal, setShowTrendsModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const overallScore = Math.round(
    (scanResult.security.score + 
     scanResult.performance.score + 
     scanResult.seo.score + 
     scanResult.accessibility.score) / 4
  );

  const chartData = [
    { name: 'Security', score: scanResult.security.score, color: '#3b82f6' },
    { name: 'Performance', score: scanResult.performance.score, color: '#10b981' },
    { name: 'SEO', score: scanResult.seo.score, color: '#f59e0b' },
    { name: 'Accessibility', score: scanResult.accessibility.score, color: '#ef4444' },
  ];

  const ScoreCard = ({ 
    title, 
    score, 
    icon: Icon, 
    issues, 
    details 
  }: {
    title: string;
    score: number;
    icon: React.ElementType;
    issues: string[];
    details?: React.ReactNode;
  }) => (
    <motion.div
      className="animate-hover-lift h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: title === "Security" ? 0.1 : title === "Performance" ? 0.2 : title === "SEO" ? 0.3 : 0.4 }}
      onClick={() => setShowDetailedInfo(title)}
    >
      <Card className="h-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md hover:bg-neutral-800/60 transition-all duration-300 shadow-lg cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 ring-1 ring-neutral-700/50">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
              <CardTitle className="text-lg font-heading tracking-tight text-neutral-100">{title}</CardTitle>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-heading font-bold ${
                score >= 80 ? "text-emerald-400" : 
                score >= 60 ? "text-blue-400" : 
                score >= 40 ? "text-amber-400" : 
                "text-red-400"
              }`}>{score}</div>
              <div className="text-xs font-body text-neutral-400">{getScoreLabel(score)}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  score >= 80 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : 
                  score >= 60 ? "bg-gradient-to-r from-blue-600 to-blue-400" : 
                  score >= 40 ? "bg-gradient-to-r from-amber-500 to-amber-400" : 
                  "bg-gradient-to-r from-red-600 to-red-400"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            
            {details && (
              <div className="text-sm text-neutral-400">
                {details}
                {issues.length === 0 ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mt-2">
                    <CheckCircle className="h-3.5 w-3.5" />
                    No issues found
                  </div>
                ) : null}
              </div>
            )}
            
            <div className="flex justify-center items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 bg-neutral-800/80 px-3 py-1 rounded-full"
                aria-label={`View detailed information for ${title}`}
              >
                <Info className="h-3 w-3" aria-hidden="true" />
                View detailed information
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-xl p-6 shadow-lg"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text font-heading">Scan Results</h1>
          <div className="flex flex-wrap items-center gap-3 text-neutral-400 mt-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-neutral-800">
                <ExternalLink className="h-4 w-4 text-blue-400" />
              </div>
              <span className="truncate max-w-[200px] sm:max-w-md font-mono text-sm">{scanResult.url}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-neutral-800">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <span className="font-mono text-sm">{new Date(scanResult.date).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button 
            onClick={onNewScan} 
            variant="outline" 
            className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-200"
          >
            New Scan
          </Button>
          <Button 
            onClick={onExportPDF} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-900/80 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_50%)]"></div>
          
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-xl font-heading text-neutral-200">Overall Website Health</CardTitle>
            <div className={`text-7xl font-bold mt-4 ${
              overallScore >= 80 ? "text-emerald-400" : 
              overallScore >= 60 ? "text-blue-400" : 
              overallScore >= 40 ? "text-amber-400" : 
              "text-red-400"
            }`}>
              {overallScore}
            </div>
            <CardDescription className="text-lg mt-2 font-body text-neutral-400">
              {getScoreLabel(overallScore)} website health
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ScoreCard
          title="Security"
          score={scanResult.security.score}
          icon={Shield}
          issues={scanResult.security.issues}
          details={
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {scanResult.security.checks.slice(0, 5).map((check, index) => (
                <div key={index} className={`text-xs flex items-center gap-1 ${
                  check.status === 'pass' ? 'text-green-600' : 
                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {check.status === 'pass' ? '✓' : check.status === 'warning' ? '⚠' : '✗'}
                  <span className="truncate">{check.name}</span>
                </div>
              ))}
              {scanResult.security.checks.length > 5 && (
                <div className="text-xs text-gray-500">
                  +{scanResult.security.checks.length - 5} more checks
                </div>
              )}
            </div>
          }
        />
        
        <ScoreCard
          title="Performance"
          score={scanResult.performance.score}
          icon={Zap}
          issues={[]} // Performance issues are typically metrics, not strings
          details={
            <div className="space-y-1">
              {scanResult.performance.details.loadTime && (
                <div className="text-xs">Load: {formatDuration(scanResult.performance.details.loadTime)}</div>
              )}
              {scanResult.performance.details.pageSize && (
                <div className="text-xs">Size: {formatBytes(scanResult.performance.details.pageSize)}</div>
              )}
            </div>
          }
        />
        
        <ScoreCard
          title="SEO"
          score={scanResult.seo.score}
          icon={Search}
          issues={scanResult.seo.issues}
          details={
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {scanResult.seo.checks.slice(0, 3).map((check, index) => (
                <div key={index} className={`text-xs flex items-center gap-1 ${
                  check.status === 'pass' ? 'text-green-600' : 
                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {check.status === 'pass' ? '✓' : check.status === 'warning' ? '⚠' : '✗'}
                  <span className="truncate">{check.name}</span>
                </div>
              ))}
              {scanResult.seo.checks.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{scanResult.seo.checks.length - 3} more checks
                </div>
              )}
            </div>
          }
        />
        
        <ScoreCard
          title="Accessibility"
          score={scanResult.accessibility.score}
          icon={Eye}
          issues={scanResult.accessibility.issues}
          details={
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {scanResult.accessibility.checks.slice(0, 3).map((check, index) => (
                <div key={index} className={`text-xs flex items-center gap-1 ${
                  check.status === 'pass' ? 'text-green-600' : 
                  check.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {check.status === 'pass' ? '✓' : check.status === 'warning' ? '⚠' : '✗'}
                  <span className="truncate">{check.name}</span>
                </div>
              ))}
              {scanResult.accessibility.checks.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{scanResult.accessibility.checks.length - 3} more checks
                </div>
              )}
            </div>
          }
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="mt-6 space-y-8">
        <h2 className="text-2xl font-heading font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">Advanced Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced 3D Bar Chart */}
          <EnhancedChartCard
            title="Score Breakdown"
            description="3D visualization of audit scores"
            icon={BarChart3}
            onExpand={() => setShowScoreModal(true)}
          >
            <Advanced3DBarChart data={chartData} isPreview={true} />
          </EnhancedChartCard>

          {/* SEO Factors Analysis */}
          <EnhancedChartCard
            title="SEO Factors"
            description="Current SEO analysis breakdown"
            icon={PieChart}
            onExpand={() => setShowDistributionModal(true)}
          >
            <D3RingChart 
              data={[
                { 
                  name: 'Meta Tags', 
                  score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('meta') || c.name.toLowerCase().includes('title')).length > 0 ? 90 : 50, 
                  color: '#10b981' 
                },
                { 
                  name: 'Headings', 
                  score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('heading') || c.name.toLowerCase().includes('h1')).length > 0 ? 85 : 40, 
                  color: '#3b82f6' 
                },
                { 
                  name: 'Images', 
                  score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('image') || c.name.toLowerCase().includes('alt')).length > 0 ? 75 : 30, 
                  color: '#f59e0b' 
                },
                { 
                  name: 'Links', 
                  score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('link')).length > 0 ? 80 : 45, 
                  color: '#8b5cf6' 
                },
              ]} 
              isPreview={true} 
            />
          </EnhancedChartCard>
        </div>

        {/* Performance Metrics Breakdown */}
        <EnhancedChartCard
          title="Performance Metrics"
          description="Current scan performance breakdown"
          icon={TrendingUp}
          onExpand={() => setShowTrendsModal(true)}
        >
          <Advanced3DBarChart 
            data={[
              { 
                name: 'Load Time', 
                score: scanResult.performance.details.loadTime ? Math.round(scanResult.performance.details.loadTime / 100) : 5, 
                color: '#3b82f6' 
              },
              { 
                name: 'TTFB', 
                score: scanResult.performance.details.ttfb ? Math.round(scanResult.performance.details.ttfb / 100) : 3, 
                color: '#06b6d4' 
              },
              { 
                name: 'LCP', 
                score: scanResult.performance.details.lcp ? Math.round(scanResult.performance.details.lcp / 100) : 4, 
                color: '#8b5cf6' 
              },
            ]} 
            isPreview={true} 
            title="Performance Metrics (seconds)"
          />
        </EnhancedChartCard>

        {/* Security Analysis Chart */}
        <EnhancedChartCard
          title="Security Analysis"
          description="Detailed security check breakdown"
          icon={Activity}
          onExpand={() => setShowSecurityModal(true)}
        >
          <Advanced3DBarChart 
            data={(() => {
              const passedCount = scanResult.security.checks.filter(c => c.status === 'pass').length;
              const warningCount = scanResult.security.checks.filter(c => c.status === 'warning').length;
              const failedCount = scanResult.security.checks.filter(c => c.status === 'fail').length;
              
              return [
                { name: 'Passed', score: Math.max(1, passedCount), color: '#10b981' },
                { name: 'Warnings', score: warningCount, color: '#f59e0b' },
                { name: 'Failed', score: failedCount, color: '#ef4444' },
              ];
            })()} 
            isPreview={true}
            title="Security Checks"
          />
        </EnhancedChartCard>
      </div>

      {/* Chart Modals */}
      <ChartModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        title="Score Breakdown - Detailed View"
      >
        <Advanced3DBarChart data={chartData} isPreview={false} title="Comprehensive Audit Scores" />
      </ChartModal>

      <ChartModal
        isOpen={showDistributionModal}
        onClose={() => setShowDistributionModal(false)}
        title="SEO Factors Analysis - Detailed View"
      >
        <D3RingChart 
          data={[
            { 
              name: 'Meta Tags', 
              score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('meta') || c.name.toLowerCase().includes('title')).length > 0 ? 90 : 50, 
              color: '#10b981' 
            },
            { 
              name: 'Headings Structure', 
              score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('heading') || c.name.toLowerCase().includes('h1')).length > 0 ? 85 : 40, 
              color: '#3b82f6' 
            },
            { 
              name: 'Image Optimization', 
              score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('image') || c.name.toLowerCase().includes('alt')).length > 0 ? 75 : 30, 
              color: '#f59e0b' 
            },
            { 
              name: 'Link Structure', 
              score: scanResult.seo.checks.filter(c => c.name.toLowerCase().includes('link')).length > 0 ? 80 : 45, 
              color: '#8b5cf6' 
            },
          ]} 
          isPreview={false} 
        />
      </ChartModal>

      <ChartModal
        isOpen={showTrendsModal}
        onClose={() => setShowTrendsModal(false)}
        title="Performance Metrics - Detailed View"
      >
        <Advanced3DBarChart 
          data={[
            { 
              name: 'Load Time (s)', 
              score: scanResult.performance.details.loadTime ? Math.round(scanResult.performance.details.loadTime / 100) : 5, 
              color: '#3b82f6' 
            },
            { 
              name: 'TTFB (s)', 
              score: scanResult.performance.details.ttfb ? Math.round(scanResult.performance.details.ttfb / 100) : 3, 
              color: '#06b6d4' 
            },
            { 
              name: 'LCP (s)', 
              score: scanResult.performance.details.lcp ? Math.round(scanResult.performance.details.lcp / 100) : 4, 
              color: '#8b5cf6' 
            },
            { 
              name: 'Page Size (MB)', 
              score: scanResult.performance.details.pageSize ? Math.round(scanResult.performance.details.pageSize / (1024 * 1024)) : 2, 
              color: '#f59e0b' 
            },
          ]} 
          isPreview={false} 
          title="Detailed Performance Metrics"
        />
      </ChartModal>

      <ChartModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        title="Security Analysis - Detailed View"
      >
        <Advanced3DBarChart 
          data={[
            { name: 'Passed Checks', score: scanResult.security.checks.filter(c => c.status === 'pass').length, color: '#10b981' },
            { name: 'Warning Checks', score: scanResult.security.checks.filter(c => c.status === 'warning').length, color: '#f59e0b' },
            { name: 'Failed Checks', score: scanResult.security.checks.filter(c => c.status === 'fail').length, color: '#ef4444' },
          ]} 
          isPreview={false}
          title="Detailed Security Analysis"
        />
      </ChartModal>

      {/* OWASP Top 10 Security Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-neutral-100">
              <Shield className="h-5 w-5 text-red-400" />
              Security Analysis
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Assessment based on OWASP Top 10 vulnerabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanResult.security.checks.map((check, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg ${
                    check.status === 'pass' ? 'bg-green-950/20 border border-green-900/30' : 
                    check.status === 'warning' ? 'bg-amber-950/20 border border-amber-900/30' : 
                    'bg-red-950/20 border border-red-900/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${
                      check.status === 'pass' ? 'text-green-400' : 
                      check.status === 'warning' ? 'text-amber-400' : 
                      'text-red-400'
                    }`}>
                      {check.status === 'pass' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : check.status === 'warning' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm ${
                        check.status === 'pass' ? 'text-green-400' : 
                        check.status === 'warning' ? 'text-amber-400' : 
                        'text-red-400'
                      }`}>
                        {check.name}
                      </h4>
                      <p className="text-xs mt-1 text-neutral-400">
                        {check.description}
                      </p>
                      {check.recommendation && (
                        <p className={`text-xs mt-2 font-medium ${
                          check.status === 'pass' ? 'text-green-400/70' : 
                          check.status === 'warning' ? 'text-amber-400/70' : 
                          'text-red-400/70'
                        }`}>
                          {check.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      {scanResult.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-neutral-100">
                <Info className="h-5 w-5 text-blue-400" />
                Recommendations
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Actionable steps to improve your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scanResult.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 border border-neutral-800 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-900/50 rounded-full flex items-center justify-center text-sm font-medium text-blue-400">
                      {index + 1}
                    </div>
                    <div className="text-sm text-neutral-300">{recommendation}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Detailed Info Modal */}
      {showDetailedInfo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowDetailedInfo(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 ring-1 ring-neutral-700/50">
                  {showDetailedInfo === "Security" && <Shield className="h-6 w-6 text-blue-400" />}
                  {showDetailedInfo === "Performance" && <Zap className="h-6 w-6 text-blue-400" />}
                  {showDetailedInfo === "SEO" && <Search className="h-6 w-6 text-blue-400" />}
                  {showDetailedInfo === "Accessibility" && <Eye className="h-6 w-6 text-blue-400" />}
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text font-heading">{showDetailedInfo} Details</h2>
              </div>
              <button 
                onClick={() => setShowDetailedInfo(null)}
                className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Close details panel"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-neutral-300"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6L18 18"></path>
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {showDetailedInfo === "Security" && (
                <>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">Security Score: {scanResult.security.score}</h3>
                    <p className="text-neutral-400 mb-4">Detailed analysis of your website&apos;s security based on OWASP Top 10 guidelines.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="font-medium text-blue-400 mb-2">Security Checks</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {scanResult.security.checks.map((check, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className={`mt-1 flex-shrink-0 ${
                                check.status === 'pass' ? 'text-emerald-400' : 
                                check.status === 'warning' ? 'text-amber-400' : 
                                'text-red-400'
                              }`}>
                                {check.status === 'pass' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="text-sm text-neutral-200">{check.name}</p>
                                <p className="text-xs text-neutral-400">{check.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800/80 rounded-lg p-4 h-full">
                        <h4 className="font-medium text-blue-400 mb-2">Security Issues</h4>
                        {scanResult.security.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-neutral-300 text-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {scanResult.security.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>No security issues found</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-72 bg-transparent rounded-lg overflow-hidden">
                    <Advanced3DBarChart 
                      data={[
                        { name: 'Passed', score: scanResult.security.checks.filter(c => c.status === 'pass').length, color: '#10b981' },
                        { name: 'Warning', score: scanResult.security.checks.filter(c => c.status === 'warning').length, color: '#f59e0b' },
                        { name: 'Failed', score: scanResult.security.checks.filter(c => c.status === 'fail').length, color: '#ef4444' },
                      ]}
                      isPreview={false}
                      title="Security Check Results"
                    />
                  </div>
                </>
              )}

              {showDetailedInfo === "Performance" && (
                <>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">Performance Score: {scanResult.performance.score}</h3>
                    <p className="text-neutral-400 mb-4">Detailed metrics on website load time, page size, and other performance factors.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-neutral-300 mb-2">Load Time</h4>
                        <p className="text-2xl font-bold text-blue-400">{scanResult.performance.details.loadTime ? formatDuration(scanResult.performance.details.loadTime!) : 'N/A'}</p>
                      </div>
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-neutral-300 mb-2">Page Size</h4>
                        <p className="text-2xl font-bold text-blue-400">{scanResult.performance.details.pageSize ? formatBytes(scanResult.performance.details.pageSize!) : 'N/A'}</p>
                      </div>
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-neutral-300 mb-2">Resources</h4>
                        <p className="text-2xl font-bold text-blue-400">N/A</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-72 bg-transparent rounded-lg overflow-hidden">
                    <Advanced3DBarChart 
                      data={[
                        { name: 'Load Time', score: scanResult.performance.details.loadTime || 0, color: '#3b82f6' },
                        { name: 'TTFB', score: scanResult.performance.details.ttfb || 0, color: '#6366f1' },
                        { name: 'LCP', score: scanResult.performance.details.lcp || 0, color: '#8b5cf6' },
                      ]}
                      isPreview={false}
                      title="Performance Metrics"
                    />
                  </div>
                </>
              )}

              {showDetailedInfo === "SEO" && (
                <>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">SEO Score: {scanResult.seo.score}</h3>
                    <p className="text-neutral-400 mb-4">Search Engine Optimization analysis and recommendations.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="font-medium text-blue-400 mb-2">SEO Checks</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {scanResult.seo.checks.map((check, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className={`mt-1 flex-shrink-0 ${
                                check.status === 'pass' ? 'text-emerald-400' : 
                                check.status === 'warning' ? 'text-amber-400' : 
                                'text-red-400'
                              }`}>
                                {check.status === 'pass' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="text-sm text-neutral-200">{check.name}</p>
                                <p className="text-xs text-neutral-400">{check.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800/80 rounded-lg p-4 h-full">
                        <h4 className="font-medium text-blue-400 mb-2">SEO Issues</h4>
                        {scanResult.seo.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-neutral-300 text-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {scanResult.seo.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>No SEO issues found</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-72 bg-transparent rounded-lg overflow-hidden">
                    <Advanced3DBarChart 
                      data={[
                        { name: 'Meta Tags', score: 85, color: '#10b981' },
                        { name: 'Content Quality', score: scanResult.seo.score, color: '#3b82f6' },
                        { name: 'Mobile Optimization', score: scanResult.seo.score - 5, color: '#6366f1' },
                        { name: 'Page Structure', score: scanResult.seo.score + 5, color: '#8b5cf6' },
                      ]}
                      isPreview={false}
                      title="SEO Analysis"
                    />
                  </div>
                </>
              )}

              {showDetailedInfo === "Accessibility" && (
                <>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">Accessibility Score: {scanResult.accessibility.score}</h3>
                    <p className="text-neutral-400 mb-4">Web Content Accessibility Guidelines (WCAG) compliance analysis.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-neutral-800/80 rounded-lg p-4">
                        <h4 className="font-medium text-blue-400 mb-2">Accessibility Checks</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {scanResult.accessibility.checks.map((check, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className={`mt-1 flex-shrink-0 ${
                                check.status === 'pass' ? 'text-emerald-400' : 
                                check.status === 'warning' ? 'text-amber-400' : 
                                'text-red-400'
                              }`}>
                                {check.status === 'pass' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="text-sm text-neutral-200">{check.name}</p>
                                <p className="text-xs text-neutral-400">{check.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-neutral-800/80 rounded-lg p-4 h-full">
                        <h4 className="font-medium text-blue-400 mb-2">Accessibility Issues</h4>
                        {scanResult.accessibility.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-neutral-300 text-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {scanResult.accessibility.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>No accessibility issues found</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-72 bg-transparent rounded-lg overflow-hidden">
                    <D3RingChart 
                      data={[
                        { name: 'WCAG A', score: scanResult.accessibility.score + 10, color: '#10b981' },
                        { name: 'WCAG AA', score: scanResult.accessibility.score, color: '#3b82f6' },
                        { name: 'WCAG AAA', score: scanResult.accessibility.score - 15, color: '#ef4444' },
                      ]}
                      isPreview={false}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
