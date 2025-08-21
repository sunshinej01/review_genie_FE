'use client';

import React from 'react';

const BarChart = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  height = 300,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-gray-50 rounded-lg p-4 text-center text-gray-500 ${className}`}
      >
        데이터가 없습니다
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const chartHeight = height - 80; // 축과 라벨을 위한 공간

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h3 className='text-lg font-semibold mb-4 text-center'>{title}</h3>
      )}

      <div className='relative' style={{ height }}>
        {/* Y축 라벨 */}
        <div className='absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500'>
          {[100, 75, 50, 25, 0].map(percent => (
            <div key={percent} className='flex items-center'>
              <span>{Math.round((maxValue * percent) / 100)}</span>
            </div>
          ))}
        </div>

        {/* 차트 영역 */}
        <div className='ml-12 relative' style={{ height: chartHeight }}>
          {/* Y축 그리드 라인 */}
          {[100, 75, 50, 25, 0].map(percent => (
            <div
              key={percent}
              className='absolute w-full border-t border-gray-200'
              style={{ top: `${percent}%` }}
            />
          ))}

          {/* 막대 차트 */}
          <div className='flex items-end justify-between h-full px-4'>
            {data.map((item, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div
                  className='bg-blue-500 hover:bg-blue-600 transition-colors rounded-t cursor-pointer min-w-[40px]'
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: '4px',
                  }}
                  title={`${item.label}: ${item.value}`}
                />
                <div className='mt-2 text-xs text-gray-600 text-center max-w-[60px]'>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* X축 라벨 */}
        {xAxisLabel && (
          <div className='text-center text-sm text-gray-600 mt-2'>
            {xAxisLabel}
          </div>
        )}
      </div>

      {/* 범례 */}
      <div className='mt-4 flex justify-center'>
        <div className='flex items-center space-x-4 text-sm'>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-blue-500 rounded mr-2'></div>
            <span>데이터 값</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
