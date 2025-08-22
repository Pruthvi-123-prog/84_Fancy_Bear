import { jsPDF } from 'jspdf';
import { ScanResult } from './types';

export class ReportGenerator {
  static generateJSON(scanResult: ScanResult): string {
    return JSON.stringify(scanResult, null, 2);
  }

  static async generatePDF(scanResult: ScanResult): Promise<Buffer> {
    console.log('Starting PDF generation with jsPDF for:', scanResult.url);
    
    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text('AuditX Security Report', 20, 30);
      
      doc.setFontSize(12);
      doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 20, 45);
      doc.text(`Website: ${scanResult.url}`, 20, 55);
      
      // Overall Score
      const overallScore = this.calculateOverallScore(scanResult);
      doc.setFontSize(16);
      doc.text('Overall Score', 20, 75);
      doc.setFontSize(14);
      doc.text(`${overallScore}/100`, 20, 90);
      
      let yPosition = 110;
      
      // Security Section
      doc.setFontSize(16);
      doc.text('Security Analysis', 20, yPosition);
      yPosition += 15;
      doc.setFontSize(12);
      doc.text(`Score: ${scanResult.security.score}/100`, 20, yPosition);
      yPosition += 10;
      
      if (scanResult.security.issues.length > 0) {
        doc.text('Issues Found:', 20, yPosition);
        yPosition += 10;
        scanResult.security.issues.forEach(issue => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${issue}`, 30, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      } else {
        doc.text('No security issues found!', 20, yPosition);
        yPosition += 20;
      }
      
      // Performance Section
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(16);
      doc.text('Performance Analysis', 20, yPosition);
      yPosition += 15;
      doc.setFontSize(12);
      doc.text(`Score: ${scanResult.performance.score}/100`, 20, yPosition);
      yPosition += 10;
      
      // Show performance metrics instead of issues
      const performanceMetrics = Object.entries(scanResult.performance.metrics);
      if (performanceMetrics.length > 0) {
        doc.text('Metrics:', 20, yPosition);
        yPosition += 10;
        performanceMetrics.forEach(([metric, value]) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${metric}: ${value}`, 30, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      } else {
        doc.text('No performance metrics available.', 20, yPosition);
        yPosition += 20;
      }
      
      // SEO Section
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(16);
      doc.text('SEO Analysis', 20, yPosition);
      yPosition += 15;
      doc.setFontSize(12);
      doc.text(`Score: ${scanResult.seo.score}/100`, 20, yPosition);
      yPosition += 10;
      
      if (scanResult.seo.issues.length > 0) {
        doc.text('Issues Found:', 20, yPosition);
        yPosition += 10;
        scanResult.seo.issues.forEach(issue => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${issue}`, 30, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      } else {
        doc.text('No SEO issues found!', 20, yPosition);
        yPosition += 20;
      }
      
      // Accessibility Section
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(16);
      doc.text('Accessibility Analysis', 20, yPosition);
      yPosition += 15;
      doc.setFontSize(12);
      doc.text(`Score: ${scanResult.accessibility.score}/100`, 20, yPosition);
      yPosition += 10;
      
      if (scanResult.accessibility.issues.length > 0) {
        doc.text('Issues Found:', 20, yPosition);
        yPosition += 10;
        scanResult.accessibility.issues.forEach(issue => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${issue}`, 30, yPosition);
          yPosition += 8;
        });
        yPosition += 10;
      } else {
        doc.text('No accessibility issues found!', 20, yPosition);
        yPosition += 20;
      }
      
      // Recommendations
      if (scanResult.recommendations.length > 0) {
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(16);
        doc.text('Recommendations', 20, yPosition);
        yPosition += 15;
        
        scanResult.recommendations.forEach((recommendation, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${recommendation}`, 20, yPosition);
          yPosition += 10;
        });
      }
      
      console.log('PDF generation completed with jsPDF');
      
      // Convert jsPDF output to Buffer
      const pdfOutput = doc.output('arraybuffer');
      const pdfBuffer = Buffer.from(pdfOutput);
      
      console.log('PDF buffer created, size:', pdfBuffer.length);
      return pdfBuffer;
      
    } catch (error) {
      console.error('Error during jsPDF generation:', error);
      throw error;
    }
  }

  static calculateOverallScore(scanResult: ScanResult): number {
    const scores = [
      scanResult.security.score,
      scanResult.performance.score,
      scanResult.seo.score,
      scanResult.accessibility.score,
    ];
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  static getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  }

  static getScoreLabel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  }
}

// Storage for reports
export class ReportStorage {
  private static reports = new Map<string, ScanResult>();

  static save(scanResult: ScanResult): string {
    const id = `report-${Date.now()}`;
    this.reports.set(id, scanResult);
    return id;
  }

  static get(id: string): ScanResult | null {
    return this.reports.get(id) || null;
  }

  static list(): Array<{ id: string; url: string; timestamp: string }> {
    return Array.from(this.reports.entries()).map(([id, result]) => ({
      id,
      url: result.url,
      timestamp: result.date,
    }));
  }
}
