'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Note: 3D effects will be simulated with gradients and shadows

interface Advanced3DBarChartProps {
  data: Array<{
    name: string;
    score: number;
    color: string;
  }>;
  isPreview?: boolean;
  title?: string;
}

export const Advanced3DBarChart: React.FC<Advanced3DBarChartProps> = ({ 
  data, 
  isPreview = false, 
  title = 'Audit Scores' 
}) => {
  // Ensure we always have valid data
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-400">
        <p>No data available</p>
      </div>
    );
  }

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      },
      height: isPreview ? 180 : undefined,
      margin: isPreview ? [20, 20, 40, 40] : [50, 50, 50, 50],
      spacing: [10, 10, 15, 10]
    },
    title: {
      text: isPreview ? '' : title,
      style: {
        color: '#f8fafc',
        fontSize: '18px',
        fontWeight: '600'
      }
    },
    xAxis: {
      categories: data.map(item => item.name),
      labels: {
        style: {
          color: '#94a3b8',
          fontSize: isPreview ? '10px' : '12px'
        },
        rotation: isPreview ? -45 : 0
      },
      gridLineWidth: 0,
      lineColor: '#475569',
      tickColor: '#475569'
    },
    yAxis: {
      title: {
        text: isPreview ? '' : 'Count',
        style: {
          color: '#94a3b8',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          color: '#94a3b8',
          fontSize: '12px'
        }
      },
      gridLineColor: 'rgba(148, 163, 184, 0.1)',
      min: 0,
      tickInterval: isPreview ? undefined : 1,
      allowDecimals: false
    },
    series: [{
      type: 'column',
      name: 'Count',
      data: data.map(item => ({
        name: item.name,
        y: item.score,
        color: item.color
      })) as any,
      borderRadius: 2,
      borderWidth: 0,
      shadow: isPreview ? false : {
        color: 'rgba(0, 0, 0, 0.3)',
        width: 3,
        offsetX: 2,
        offsetY: 2
      }
    }],
    legend: {
      enabled: false
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      style: {
        color: '#f8fafc',
        fontSize: '12px'
      },
      borderWidth: 1,
      borderColor: '#3b82f6',
      borderRadius: 8,
      formatter: function() {
        return `<b>${(this as any).point.name}</b><br/>Score: <b>${this.y}</b>`;
      }
    },
    plotOptions: {
      column: {
        depth: 25,
        grouping: false,
        groupZPadding: 10,
        animation: {
          duration: 1000
        },
        cursor: 'pointer',
        dataLabels: {
          enabled: !isPreview,
          color: '#f8fafc',
          style: {
            fontSize: '11px',
            fontWeight: '600',
            textOutline: '1px 1px 2px rgba(0,0,0,0.7)'
          },
          format: '{y}'
        },
        states: {
          hover: {
            brightness: 0.2
          }
        },
        // Reduce bar height by adjusting pointPadding and groupPadding
        pointPadding: isPreview ? 0.3 : 0.2,
        groupPadding: isPreview ? 0.2 : 0.1
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            margin: [5, 5, 5, 5]
          }
        }
      }]
    },
    credits: {
      enabled: false
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: isPreview ? '200px' : '100%'
    }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};
