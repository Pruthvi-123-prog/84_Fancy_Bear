import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function GET() {
  try {
    console.log('Testing PDF generation with jsPDF...');
    
    const doc = new jsPDF();
    
    // Simple PDF content
    doc.setFontSize(20);
    doc.text('AuditX Test PDF', 20, 30);
    doc.setFontSize(12);
    doc.text('This is a simple test PDF to verify jsPDF works.', 20, 50);
    doc.text('Generated at: ' + new Date().toLocaleString(), 20, 70);
    
    console.log('PDF generation complete');
    
    // Convert to buffer
    const pdfOutput = doc.output('arraybuffer');
    const pdfBuffer = Buffer.from(pdfOutput);
    const uint8Array = new Uint8Array(pdfBuffer);
    
    console.log('PDF size:', pdfBuffer.length);
    
    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length.toString(),
        'Content-Disposition': 'attachment; filename="test.pdf"',
      },
    });
  } catch (error) {
    console.error('Test PDF error:', error);
    return NextResponse.json({ error: 'Test PDF failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
