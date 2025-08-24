'use client';

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
  const d3Container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!d3Container.current || !data || data.length === 0) return;

    // Clear previous content
    d3.select(d3Container.current).selectAll('*').remove();

    const width = d3Container.current.clientWidth;
    const height = d3Container.current.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(d3Container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create gradient definitions
    const defs = svg.append('defs');
    
    data.forEach((item, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', item.color)
        .attr('stop-opacity', 0.8);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(item.color)?.brighter(0.3)?.toString() || item.color)
        .attr('stop-opacity', 1);
    });

    // Center text group
    const centerText = svg.append('g')
      .attr('class', 'center-text')
      .attr('transform', `translate(0, 0)`);

    centerText.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0em')
      .attr('class', 'main-label')
      .style('fill', 'white')
      .style('font-size', isPreview ? '14px' : '18px')
      .style('font-weight', 'bold')
      .text('Audit Scores');

    centerText.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.4em')
      .attr('class', 'sub-label')
      .style('fill', '#94a3b8')
      .style('font-size', isPreview ? '10px' : '12px')
      .text('Hover for details');

    // Create multiple rings
    const rings = 2;
    const ringPadding = 0.12;
    const innerRadiusRatio = 0.65;
    const outerRadiusRatio = 1.30;
    const ringWidth = (radius * (outerRadiusRatio - innerRadiusRatio - ringPadding)) / rings;

    for (let ring = 0; ring < rings; ring++) {
      const arc = d3.arc<d3.PieArcDatum<{ score: number; name: string; color: string }>>()
        .innerRadius(radius * innerRadiusRatio + (ring * ringWidth))
        .outerRadius(radius * innerRadiusRatio + ((ring + 1) * ringWidth) - (radius * 0.02))
        .padAngle(0.025)
        .cornerRadius(4);

      const pie = d3.pie<{ score: number; name: string; color: string }>()
        .value((d) => d.score)
        .sort(null);

      const ringData = data.slice(ring * 2, (ring + 1) * 2);
      
      const arcs = svg.selectAll(`.arc-${ring}`)
        .data(pie(ringData))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .style('cursor', 'pointer');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d: d3.PieArcDatum<{ score: number; name: string; color: string }>, i: number) => `url(#gradient-${i + (ring * 2)})`)
        .attr('stroke', '#1e293b')
        .attr('stroke-width', 2)
        .style('transition', 'all 0.3s')
        .on('mouseover', function(event: MouseEvent, d: d3.PieArcDatum<{ score: number; name: string; color: string }>) {
          const el = d3.select(this);
          el.transition()
            .duration(200)
            .attr('transform', function() {
              const [x, y] = arc.centroid(d);
              return `translate(${x * 0.05},${y * 0.05})`;
            })
            .style('filter', 'brightness(1.2)');

          // Update center text
          centerText.select('.main-label')
            .text(d.data.name)
            .transition()
            .duration(200)
            .style('font-size', isPreview ? '12px' : '16px');

          centerText.select('.sub-label')
            .text(`Score: ${d.data.score}`)
            .transition()
            .duration(200)
            .style('fill', d.data.color);
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('transform', 'translate(0,0)')
            .style('filter', 'none');

          // Reset center text
          centerText.select('.main-label')
            .text('Audit Scores')
            .transition()
            .duration(200)
            .style('font-size', isPreview ? '14px' : '18px');

          centerText.select('.sub-label')
            .text('Hover for details')
            .transition()
            .duration(200)
            .style('fill', '#94a3b8');
        });
    }
  }, [data, isPreview]);

  return (
    <div 
      ref={d3Container} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }}
    />
  );
};
