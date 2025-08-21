import { NextRequest, NextResponse } from 'next/server';
import { ReportStorage, ReportGenerator } from '@/lib/reporting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, format = 'pdf' } = body;

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    const report = ReportStorage.get(reportId);
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    if (format === 'pdf') {
      const pdfBuffer = await ReportGenerator.generatePDF(report);
      
      return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="sitesleuth-report-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    } else if (format === 'json') {
      const jsonReport = ReportGenerator.generateJSON(report);
      
      return new NextResponse(jsonReport, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="sitesleuth-report-${new Date().toISOString().split('T')[0]}.json"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid format. Supported formats: pdf, json' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export report' },
      { status: 500 }
    );
  }
}
