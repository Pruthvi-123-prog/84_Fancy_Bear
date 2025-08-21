'use client';

import React, { useEffect, useRef } from 'react';
import * as c3 from 'c3';
import * as d3 from 'd3';

interface ChartData {
  name: string;
  score: number;
  color: string;
}

interface Interactive3DChartProps {
  data: ChartData[];
  type: 'bar' | 'donut' | 'pie';
  title?: string;
  height?: number;
}

export const Interactive3DChart: React.FC<Interactive3DChartProps> = ({ 
  data, 
  type, 
  title,
  height = 300 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<c3.ChartAPI | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Prepare data for C3.js
    const columns: [string, ...number[]][] = data.map(item => [item.name, item.score] as [string, ...number[]]);
    const colors: { [key: string]: string } = {};
    data.forEach(item => {
      colors[item.name] = item.color;
    });

    // Create 3D-like effect with CSS transforms and shadows
    const chartElement = chartRef.current;
    chartElement.style.transform = 'perspective(1000px) rotateX(5deg)';
    chartElement.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    chartElement.style.borderRadius = '12px';
    chartElement.style.overflow = 'hidden';

    // Chart configuration
    const config: c3.ChartConfiguration = {
      bindto: chartRef.current,
      size: {
        height: height,
      },
      data: {
        columns: columns,
        type: type === 'bar' ? 'bar' : type,
        colors: colors,
        onclick: function(d: any, element: any) {
          // Interactive click handler
          console.log(`Clicked ${d.name}: ${d.value}`);
          // Add pulse animation
          d3.select(element)
            .transition()
            .duration(200)
            .attr('transform', 'scale(1.1)')
            .transition()
            .duration(200)
            .attr('transform', 'scale(1)');
        },
        onmouseover: function(d: any, element: any) {
          // Hover effect
          d3.select(element)
            .transition()
            .duration(100)
            .style('filter', 'brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))');
        },
        onmouseout: function(d: any, element: any) {
          // Reset hover effect
          d3.select(element)
            .transition()
            .duration(100)
            .style('filter', 'brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
        }
      },
      bar: type === 'bar' ? {
        width: {
          ratio: 0.6
        }
      } : undefined,
      donut: type === 'donut' ? {
        title: title || '',
        label: {
          format: function(value: number, ratio: number) {
            return `${value} (${Math.round(ratio * 100)}%)`;
          }
        }
      } : undefined,
      pie: type === 'pie' ? {
        label: {
          format: function(value: number, ratio: number) {
            return `${value} (${Math.round(ratio * 100)}%)`;
          }
        }
      } : undefined,
      axis: type === 'bar' ? {
        x: {
          type: 'category',
          categories: data.map(item => item.name)
        },
        y: {
          max: 100,
          min: 0,
          padding: {
            top: 10,
            bottom: 10
          }
        }
      } : undefined,
      grid: type === 'bar' ? {
        y: {
          show: true,
          lines: [
            { value: 25, text: 'Poor' },
            { value: 50, text: 'Average' },
            { value: 75, text: 'Good' },
            { value: 90, text: 'Excellent' }
          ]
        }
      } : undefined,
      tooltip: {
        format: {
          title: function(x: any) {
            return `${x}`;
          },
          value: function(value: number, ratio: number) {
            return `Score: ${value} ${ratio ? `(${Math.round(ratio * 100)}%)` : ''}`;
          }
        },
        contents: function(d: any) {
          const item = d[0];
          return `
            <div class="custom-tooltip glass p-3 rounded-lg border border-primary-200/30">
              <div class="font-display font-semibold text-neutral-900">${item.name}</div>
              <div class="font-body text-sm text-neutral-700">Score: ${item.value}</div>
              <div class="w-3 h-3 rounded-full mt-2" style="background: ${colors[item.name]}"></div>
            </div>
          `;
        }
      },
      legend: {
        position: 'bottom'
      },
      transition: {
        duration: 500
      }
    };

    // Create chart
    chartInstanceRef.current = c3.generate(config);

    // Add 3D-like styling to chart elements after render
    setTimeout(() => {
      if (type === 'bar') {
        d3.selectAll('.c3-bar')
          .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))')
          .style('stroke-width', '1px')
          .style('stroke', 'rgba(255,255,255,0.3)');

        // Add gradient effect
        const svg = d3.select(chartRef.current).select('svg');
        const defs = svg.append('defs');
        
        data.forEach((item, index) => {
          const gradient = defs.append('linearGradient')
            .attr('id', `gradient-${index}`)
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');
          
          gradient.append('stop')
            .attr('offset', '0%')
            .style('stop-color', item.color)
            .style('stop-opacity', 1);
          
          gradient.append('stop')
            .attr('offset', '100%')
            .style('stop-color', d3.color(item.color)?.darker(0.5)?.toString() || item.color)
            .style('stop-opacity', 1);
        });

        // Apply gradients to bars
        d3.selectAll('.c3-bar')
          .each(function(d: any, i: number) {
            d3.select(this).style('fill', `url(#gradient-${i})`);
          });
      }
    }, 100);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, type, title, height]);

  // Update chart when data changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      const columns: [string, ...number[]][] = data.map(item => [item.name, item.score] as [string, ...number[]]);
      chartInstanceRef.current.load({
        columns: columns,
        unload: true
      });
    }
  }, [data]);

  return (
    <div className="relative">
      <div 
        ref={chartRef}
        className="transition-all duration-500 hover:scale-[1.02] animate-hover-lift"
        style={{
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
        }}
      />
      <style jsx>{`
        :global(.c3-tooltip) {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(var(--primary-200), 0.3);
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        :global(.c3-legend-item) {
          font-family: var(--font-body);
          font-size: 12px;
        }
        
        :global(.c3-axis) {
          font-family: var(--font-body);
          font-size: 11px;
        }
        
        :global(.c3-bar:hover) {
          filter: brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.3)) !important;
        }
        
        :global(.c3-arc:hover) {
          filter: brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.3));
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
