'use client';

import React from 'react';

const PieChart = ({ data, title, height = 300, className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-gray-50 rounded-lg p-4 text-center text-gray-500 ${className}`}
      >
        데이터가 없습니다
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16',
  ];

  let currentAngle = 0;
  const chartData = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = currentAngle;
    const endAngle = currentAngle + (percentage * 360) / 100;
    currentAngle = endAngle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
    };
  });

  const radius = Math.min(height - 100, 120) / 2;
  const centerX = (height - 100) / 2;
  const centerY = (height - 100) / 2;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const createArc = (startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'L',
      centerX,
      centerY,
      'Z',
    ].join(' ');
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h3 className='text-lg font-semibold mb-4 text-center'>{title}</h3>
      )}

      <div className='flex items-center justify-center' style={{ height }}>
        <svg width={height - 100} height={height - 100}>
          {chartData.map((item, index) => (
            <path
              key={index}
              d={createArc(item.startAngle, item.endAngle)}
              fill={item.color}
              stroke='white'
              strokeWidth='2'
              className='hover:opacity-80 transition-opacity cursor-pointer'
              title={`${item.label}: ${item.value} (${item.percentage.toFixed(1)}%)`}
            />
          ))}

          {/* 중앙 텍스트 */}
          <text
            x={centerX}
            y={centerY}
            textAnchor='middle'
            dominantBaseline='middle'
            className='text-sm font-medium fill-gray-700'
          >
            총 {total}
          </text>
        </svg>
      </div>

      {/* 범례 */}
      <div className='mt-6 grid grid-cols-2 gap-2'>
        {chartData.map((item, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <div
              className='w-3 h-3 rounded'
              style={{ backgroundColor: item.color }}
            />
            <span className='text-sm text-gray-700 truncate'>{item.label}</span>
            <span className='text-sm font-medium text-gray-900'>
              {item.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
