'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3RingChartProps {
  data: Array<{
    name: string;
    score: number;
    color: string;
  }>;
  isPreview?: boolean;
}

export const D3RingChart: React.FC<D3RingChartProps> = ({ data, isPreview = false }) => {
  // Temporary placeholder while fixing TypeScript issues
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        color: 'white',
        fontSize: isPreview ? '12px' : '16px'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: isPreview ? '14px' : '18px', fontWeight: 'bold', marginBottom: '8px' }}>
          Audit Scores
        </div>
        <div style={{ fontSize: isPreview ? '10px' : '12px', color: '#94a3b8' }}>
          Chart temporarily disabled
        </div>
      </div>
    </div>
  );
};
