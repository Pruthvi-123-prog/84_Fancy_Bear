import { NextRequest, NextResponse } from 'next/server';
import { ReportStorage, ReportGenerator } from '@/lib/reporting';
import { ScanResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    console.log('Export API called');
    const body = await request.json();
    console.log('Request body received:', { reportId: body.reportId, format: body.format, hasResult: !!body.scanResult });
    const { reportId, format = 'pdf', scanResult } = body;

    let report: ScanResult | null = null;

    // If reportId is provided, try to get from storage
    if (reportId && !reportId.startsWith('temp-')) {
      report = ReportStorage.get(reportId);
      if (!report) {
        return NextResponse.json(
          { error: 'Report not found' },
          { status: 404 }
        );
      }
    } 
    // If scanResult is provided directly, use it
    else if (scanResult) {
      report = scanResult;
    } 
    // If it's a temporary ID and scanResult is provided, save it and use it
    else if (reportId && reportId.startsWith('temp-') && scanResult) {
      ReportStorage.save(scanResult);
      report = scanResult;
    } else {
      return NextResponse.json(
        { error: 'Either reportId or scanResult is required' },
        { status: 400 }
      );
    }

    // Ensure we have a valid report
    if (!report) {
      return NextResponse.json(
        { error: 'No valid report found' },
        { status: 400 }
      );
    }

    if (format === 'pdf') {
      console.log('Generating PDF for report:', report.url);
      const pdfBuffer = await ReportGenerator.generatePDF(report);
      console.log('PDF generated successfully, buffer length:', pdfBuffer.length);
      const uint8Array = new Uint8Array(pdfBuffer);
      
      return new Response(uint8Array, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Length': pdfBuffer.length.toString(),
          'Content-Disposition': `attachment; filename="auditx-report-${new Date().toISOString().split('T')[0]}.pdf"`,
          'Cache-Control': 'no-cache',
        },
      });
    } else if (format === 'json') {
      const jsonReport = ReportGenerator.generateJSON(report);
      
      return new NextResponse(jsonReport, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="auditx-report-${new Date().toISOString().split('T')[0]}.json"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid format. Supported formats: pdf, json' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Export error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to export report', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
