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

    // Chart configuration with improved styling
    const config: c3.ChartConfiguration = {
      bindto: chartRef.current,
      size: {
        height: height,
      },
      data: {
        columns: columns,
        type: type === 'bar' ? 'bar' : type,
        colors: colors,
        onclick: function(d: unknown, element: unknown) {
          // Interactive click handler with enhanced animation
          d3.select(element as d3.BaseType)
            .transition()
            .duration(150)
            .style('transform', 'scale(1.1)')
            .style('filter', 'brightness(1.3) drop-shadow(0 8px 16px rgba(59, 130, 246, 0.4))')
            .transition()
            .duration(150)
            .style('transform', 'scale(1)')
            .style('filter', 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.2))');
        },
        onmouseover: function(d: unknown, element: unknown) {
          // Enhanced hover effect
          d3.select(element as d3.BaseType)
            .transition()
            .duration(200)
            .style('filter', 'brightness(1.2) drop-shadow(0 8px 20px rgba(59, 130, 246, 0.3)) saturate(1.2)')
            .style('transform', 'translateY(-2px)');
        },
        onmouseout: function(d: unknown, element: unknown) {
          // Reset hover effect
          d3.select(element as d3.BaseType)
            .transition()
            .duration(200)
            .style('filter', 'brightness(1) drop-shadow(0 4px 8px rgba(0,0,0,0.1))')
            .style('transform', 'translateY(0px)');
        }
      },
      bar: type === 'bar' ? {
        width: {
          ratio: 0.7
        }
      } : undefined,
      donut: type === 'donut' ? {
        title: title || '',
        width: 60,
        label: {
          format: function(value: number, ratio: number) {
            return `${value} (${Math.round(ratio * 100)}%)`;
          }
        }
      } : undefined,
      pie: type === 'pie' ? {
        label: {
          format: function(value: number, ratio: number) {
            return `${Math.round(ratio * 100)}%`;
          }
        }
      } : undefined,
      axis: type === 'bar' ? {
        x: {
          type: 'category',
          categories: data.map(item => item.name),
          tick: {
            rotate: -45,
            multiline: false
          }
        },
        y: {
          max: 100,
          min: 0,
          padding: {
            top: 10,
            bottom: 0
          },
          tick: {
            count: 5
          }
        }
      } : undefined,
      grid: type === 'bar' ? {
        y: {
          show: true,
          lines: [
            { value: 25, text: 'Poor', class: 'grid-line-poor' },
            { value: 50, text: 'Fair', class: 'grid-line-fair' },
            { value: 75, text: 'Good', class: 'grid-line-good' },
            { value: 90, text: 'Excellent', class: 'grid-line-excellent' }
          ]
        }
      } : undefined,
      tooltip: {
        format: {
          title: function(x: string) {
            return `${x}`;
          },
          value: function(value: number, ratio: number) {
            return `Score: ${value}${ratio ? ` (${Math.round(ratio * 100)}%)` : ''}`;
          }
        },
        contents: function(d: c3.DataPoint[]) {
          const item = d[0];
          const itemId = String(item.id || '');
          return `
            <div class="bg-neutral-900/95 backdrop-blur-md border border-blue-500/30 p-4 rounded-xl shadow-2xl">
              <div class="font-semibold text-white text-base mb-2">${itemId}</div>
              <div class="text-blue-300 text-sm mb-2">Score: ${item.value}</div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background: ${colors[itemId] || '#3b82f6'}"></div>
                <span class="text-xs text-neutral-300">Click for details</span>
              </div>
            </div>
          `;
        }
      },
      legend: {
        position: type === 'bar' ? 'inset' : 'bottom',
        inset: type === 'bar' ? {
          anchor: 'top-right',
          x: 10,
          y: 10,
          step: 1
        } : undefined
      },
      transition: {
        duration: 800
      },
      padding: {
        top: type === 'bar' ? 40 : 20,
        right: 30,
        bottom: type === 'bar' ? 60 : 20,
        left: 60
      }
    };

    // Create chart
    chartInstanceRef.current = c3.generate(config);

    // Enhanced 3D-like styling after render
    setTimeout(() => {
      const svg = d3.select(chartRef.current).select('svg');
      
      // Create enhanced gradients
      const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
      
      data.forEach((item, index) => {
        // Main gradient
        const gradient = defs.append('linearGradient')
          .attr('id', `gradient-${index}`)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', type === 'bar' ? '0%' : '100%')
          .attr('y2', type === 'bar' ? '100%' : '0%');
        
        const baseColor = d3.color(item.color);
        const lighterColor = baseColor?.brighter(0.3);
        const darkerColor = baseColor?.darker(0.3);
        
        gradient.append('stop')
          .attr('offset', '0%')
          .style('stop-color', lighterColor?.toString() || item.color)
          .style('stop-opacity', 0.9);
          
        gradient.append('stop')
          .attr('offset', '50%')
          .style('stop-color', item.color)
          .style('stop-opacity', 1);
        
        gradient.append('stop')
          .attr('offset', '100%')
          .style('stop-color', darkerColor?.toString() || item.color)
          .style('stop-opacity', 0.8);

        // Glow effect gradient
        const glowGradient = defs.append('radialGradient')
          .attr('id', `glow-${index}`)
          .attr('cx', '50%')
          .attr('cy', '50%')
          .attr('r', '60%');
          
        glowGradient.append('stop')
          .attr('offset', '0%')
          .style('stop-color', item.color)
          .style('stop-opacity', 0.3);
          
        glowGradient.append('stop')
          .attr('offset', '100%')
          .style('stop-color', item.color)
          .style('stop-opacity', 0);
      });

      if (type === 'bar') {
        // Enhanced bar styling
        d3.selectAll('.c3-bar')
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))')
          .style('stroke-width', '1px')
          .style('stroke', 'rgba(255,255,255,0.1)')
          .each(function(d: unknown, i: number) {
            const bar = d3.select(this);
            bar.style('fill', `url(#gradient-${i % data.length})`);
            
            // Add subtle animation on load
            bar.style('transform', 'scaleY(0)')
              .style('transform-origin', 'bottom')
              .transition()
              .duration(800)
              .delay(i * 100)
              .style('transform', 'scaleY(1)');
          });
          
        // Style grid lines
        d3.selectAll('.c3-ygrid-line')
          .style('stroke', 'rgba(255,255,255,0.1)')
          .style('stroke-dasharray', '3,3');
          
      } else {
        // Enhanced pie/donut styling
        d3.selectAll('.c3-arc')
          .style('filter', 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))')
          .style('stroke-width', '2px')
          .style('stroke', 'rgba(255,255,255,0.1)')
          .each(function(d: unknown, i: number) {
            d3.select(this).style('fill', `url(#gradient-${i % data.length})`);
          });
      }

      // Style axis text
      d3.selectAll('.c3-axis text')
        .style('fill', 'rgba(255,255,255,0.7)')
        .style('font-size', '12px')
        .style('font-family', 'system-ui, sans-serif');
        
      // Style legend
      d3.selectAll('.c3-legend-item text')
        .style('fill', 'rgba(255,255,255,0.8)')
        .style('font-size', '11px');
        
    }, 150);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, type, title, height]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={chartRef}
        className="w-full h-full transition-all duration-300 hover:scale-[1.01]"
        style={{
          backgroundColor: 'transparent',
          filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.1))'
        }}
      />
      <style jsx global>{`
        .c3-tooltip-container {
          z-index: 1000;
        }
        
        .c3-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        
        .c3-legend-item:hover {
          opacity: 0.8;
        }
        
        .c3-bar:hover {
          filter: brightness(1.15) drop-shadow(0 6px 20px rgba(59, 130, 246, 0.4)) !important;
          transform: translateY(-2px) !important;
        }
        
        .c3-arc:hover {
          filter: brightness(1.15) drop-shadow(0 6px 20px rgba(59, 130, 246, 0.4)) !important;
          transform: scale(1.05) !important;
        }
        
        .c3-ygrid-line.grid-line-poor { stroke: rgba(239, 68, 68, 0.3) !important; }
        .c3-ygrid-line.grid-line-fair { stroke: rgba(251, 191, 36, 0.3) !important; }
        .c3-ygrid-line.grid-line-good { stroke: rgba(34, 197, 94, 0.3) !important; }
        .c3-ygrid-line.grid-line-excellent { stroke: rgba(59, 130, 246, 0.3) !important; }
        
        .c3 svg {
          background: transparent !important;
        }
        
        .c3-chart-arc .c3-gauge-value {
          fill: rgba(255,255,255,0.9) !important;
          font-size: 16px !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
};
