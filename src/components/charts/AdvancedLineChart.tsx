'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface AdvancedLineChartProps {
  data: Array<{
    name: string;
    score: number;
    color: string;
  }>;
  isPreview?: boolean;
  title?: string;
}

export const AdvancedLineChart: React.FC<AdvancedLineChartProps> = ({ 
  data, 
  isPreview = false, 
  title = 'Performance Trends' 
}) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      },
      height: isPreview ? 200 : undefined,
      marginTop: isPreview ? 5 : 40,
      marginBottom: isPreview ? 5 : 40
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
      categories: ['Initial', 'Security', 'Performance', 'SEO', 'Accessibility', 'Final'],
      labels: {
        style: {
          color: '#94a3b8',
          fontSize: '12px'
        }
      },
      gridLineWidth: 1,
      gridLineColor: 'rgba(148, 163, 184, 0.1)',
      lineColor: '#475569',
      tickColor: '#475569'
    },
    yAxis: {
      title: {
        text: 'Score',
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
      max: 100
    },
    series: [
      {
        type: 'line',
        name: 'Audit Progress',
        data: [
          0,
          data.find(d => d.name === 'Security')?.score || 0,
          data.find(d => d.name === 'Performance')?.score || 0,
          data.find(d => d.name === 'SEO')?.score || 0,
          data.find(d => d.name === 'Accessibility')?.score || 0,
          data.reduce((sum, item) => sum + item.score, 0) / data.length
        ],
        color: '#3b82f6',
        lineWidth: 3,
        marker: {
          symbol: 'circle',
          radius: 5,
          fillColor: '#3b82f6',
          lineWidth: 2,
          lineColor: '#1e40af'
        }
      }
    ],
    legend: {
      enabled: !isPreview,
      itemStyle: {
        color: '#94a3b8',
        fontSize: '12px'
      },
      itemHoverStyle: {
        color: '#f8fafc'
      }
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
      shared: true,
      formatter: function() {
        return `<b>${this.x}</b><br/>Score: <b>${this.y}</b>`;
      }
    },
    plotOptions: {
      line: {
        animation: {
          duration: 1000
        },
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        enableMouseTracking: true,
        marker: {
          states: {
            hover: {
              enabled: true,
              radius: 8
            }
          }
        }
      },
      series: {
        states: {
          hover: {
            lineWidth: 4
          }
        }
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          },
          yAxis: {
            labels: {
              enabled: false
            }
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
