'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const AnalysisPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1주일');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 기간 옵션
  const periodOptions = ['1주일', '1개월', '3개월', '직접입력'];

  // 임시 데이터 - 수평 막대 그래프용 (긍정/부정 리뷰 비교)
  const analysisData = [
    { name: '맛', positive: 85, negative: 15 },
    { name: '서비스', positive: 78, negative: 22 },
    { name: '가격', positive: 65, negative: 35 },
    { name: '위생', positive: 92, negative: 8 },
    { name: '분위기', positive: 88, negative: 12 },
    { name: '위치', positive: 72, negative: 28 },
  ];

  // 주요 keyword 순위 데이터
  const keywords = [
    { rank: 1, keyword: '타르트', count: 156 },
    { rank: 2, keyword: '생과일', count: 134 },
    { rank: 3, keyword: '크림', count: 98 },
    { rank: 4, keyword: '달콤한', count: 87 },
    { rank: 5, keyword: '신선한', count: 76 },
    { rank: 6, keyword: '부드러운', count: 65 },
    { rank: 7, keyword: '향기로운', count: 54 },
    { rank: 8, keyword: '예쁜', count: 43 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block mb-4">
            <span className="text-sm font-medium">1주일 동안의 리뷰 내용 분석 결과입니다.</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">리뷰 분석</h1>
          <p className="text-gray-600 mt-2">고객들의 리뷰를 분석하여 인사이트를 도출합니다</p>
        </div>

        {/* 기간 설정 필터 */}
        <Card className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">기간:</span>
            
            {/* 기간 선택 버튼들 */}
            <div className="flex space-x-2">
              {periodOptions.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'primary' : 'secondary'}
                  onClick={() => setSelectedPeriod(period)}
                  className="text-sm"
                >
                  {period}
                </Button>
              ))}
            </div>

            {/* 직접입력 날짜 선택 */}
            {selectedPeriod === '직접입력' && (
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            )}
          </div>
        </Card>

        {/* 두 컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 컬럼: 수평 막대 그래프 */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              리뷰 감정 분석 결과
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analysisData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="positive" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="negative" fill="#EF4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* 범례 */}
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span>긍정 리뷰 (%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span>부정 리뷰 (%)</span>
              </div>
            </div>
          </Card>

          {/* 오른쪽 컬럼: 주요 keyword 순위 */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              주요 keyword
            </h3>
            <div className="space-y-3">
              {keywords.map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {item.rank}
                    </span>
                    <span className="font-medium text-gray-800">{item.keyword}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count}회</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 추가 분석 정보 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">78%</div>
              <div className="text-gray-600">긍정 리뷰 비율</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.6</div>
              <div className="text-gray-600">평균 평점</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-gray-600">총 리뷰 수</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
