import { NextRequest, NextResponse } from 'next/server';
import { runScan } from '@/lib/scanner';
import { ScanResultSchema } from '@/lib/types';
import { ReportStorage } from '@/lib/reporting';
import { isValidUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string' },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Perform the scan
    const scanResult = await runScan(url);
    
    // Validate the result
    const validatedResult = ScanResultSchema.parse(scanResult);
    
    // Save the report
    const reportId = ReportStorage.save(validatedResult);

    return NextResponse.json({
      success: true,
      data: validatedResult,
      reportId,
    });
  } catch (error) {
    console.error('Scan error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to scan website',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const reportId = url.searchParams.get('id');

    if (reportId) {
      // Get specific report
      const report = ReportStorage.get(reportId);
      if (!report) {
        return NextResponse.json(
          { error: 'Report not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: report });
    } else {
      // Get all reports
      const reports = ReportStorage.getAll();
      return NextResponse.json({ success: true, data: reports });
    }
  } catch (error) {
    console.error('Get report error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve reports' },
      { status: 500 }
    );
  }
}
