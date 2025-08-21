import PDFDocument from 'pdfkit';
import { ScanResult } from './types';

export class ReportGenerator {
  static generateJSON(scanResult: ScanResult): string {
    return JSON.stringify(scanResult, null, 2);
  }

  static async generatePDF(scanResult: ScanResult): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Header
        doc.fontSize(20).text('SiteSleuth - Website Security Report', 50, 50);
        doc.fontSize(12).text(`URL: ${scanResult.url}`, 50, 80);
        doc.text(`Date: ${new Date(scanResult.date).toLocaleString()}`, 50, 95);

        let yPosition = 130;

        // Security Section
        doc.fontSize(16).text('Security Analysis', 50, yPosition);
        yPosition += 25;
        doc.fontSize(12).text(`Score: ${scanResult.security.score}/100`, 50, yPosition);
        yPosition += 15;

        if (scanResult.security.issues.length > 0) {
          doc.text('Issues Found:', 50, yPosition);
          yPosition += 15;
          scanResult.security.issues.forEach(issue => {
            doc.text(`• ${issue}`, 70, yPosition);
            yPosition += 12;
          });
          yPosition += 10;
        } else {
          doc.text('No security issues found!', 50, yPosition);
          yPosition += 25;
        }

        // Performance Section
        doc.fontSize(16).text('Performance Analysis', 50, yPosition);
        yPosition += 25;
        doc.fontSize(12).text(`Score: ${scanResult.performance.score}/100`, 50, yPosition);
        yPosition += 15;

        if (scanResult.performance.details.loadTime) {
          doc.text(`Load Time: ${scanResult.performance.details.loadTime}ms`, 50, yPosition);
          yPosition += 12;
        }
        if (scanResult.performance.details.pageSize) {
          doc.text(`Page Size: ${Math.round(scanResult.performance.details.pageSize / 1024)}KB`, 50, yPosition);
          yPosition += 12;
        }
        yPosition += 10;

        // SEO Section
        doc.fontSize(16).text('SEO Analysis', 50, yPosition);
        yPosition += 25;
        doc.fontSize(12).text(`Score: ${scanResult.seo.score}/100`, 50, yPosition);
        yPosition += 15;

        if (scanResult.seo.issues.length > 0) {
          doc.text('Issues Found:', 50, yPosition);
          yPosition += 15;
          scanResult.seo.issues.forEach(issue => {
            doc.text(`• ${issue}`, 70, yPosition);
            yPosition += 12;
          });
          yPosition += 10;
        } else {
          doc.text('No SEO issues found!', 50, yPosition);
          yPosition += 25;
        }

        // Accessibility Section
        doc.fontSize(16).text('Accessibility Analysis', 50, yPosition);
        yPosition += 25;
        doc.fontSize(12).text(`Score: ${scanResult.accessibility.score}/100`, 50, yPosition);
        yPosition += 15;

        if (scanResult.accessibility.issues.length > 0) {
          doc.text('Issues Found:', 50, yPosition);
          yPosition += 15;
          scanResult.accessibility.issues.forEach(issue => {
            doc.text(`• ${issue}`, 70, yPosition);
            yPosition += 12;
          });
          yPosition += 10;
        } else {
          doc.text('No accessibility issues found!', 50, yPosition);
          yPosition += 25;
        }

        // Recommendations
        if (scanResult.recommendations.length > 0) {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }

          doc.fontSize(16).text('Recommendations', 50, yPosition);
          yPosition += 25;

          scanResult.recommendations.forEach((recommendation, index) => {
            if (yPosition > 750) {
              doc.addPage();
              yPosition = 50;
            }
            doc.fontSize(12).text(`${index + 1}. ${recommendation}`, 50, yPosition);
            yPosition += 15;
          });
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
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

// Simple in-memory storage for demo purposes
// In a real application, you'd use a database
class ReportStorage {
  private static reports: Map<string, ScanResult> = new Map();

  static save(report: ScanResult): string {
    const id = `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.reports.set(id, report);
    return id;
  }

  static get(id: string): ScanResult | null {
    return this.reports.get(id) || null;
  }

  static getAll(): Array<{ id: string; report: ScanResult }> {
    return Array.from(this.reports.entries()).map(([id, report]) => ({ id, report }));
  }

  static delete(id: string): boolean {
    return this.reports.delete(id);
  }

  static clear(): void {
    this.reports.clear();
  }
}

export { ReportStorage };
