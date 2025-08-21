'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/common/Card';
import { useStore } from '@/components/providers/StoreProvider';
import useStoreStore from '@/store/storeStore';

const AnalysisPage = () => {
  const { selectedStore } = useStore();
  const { getCurrentStoreData } = useStoreStore();
  
  // 실제 날짜로 설정 (2025년 8월 11일 ~ 8월 17일)
  const startDate = '2025-08-11';
  const endDate = '2025-08-17';
  
  // 현재 선택된 가게의 데이터
  const currentStoreData = getCurrentStoreData();
  const { analysisData, keywords } = currentStoreData;



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block mb-4">
            <span className="text-sm font-medium">2025년 8월 11일 ~ 8월 17일 리뷰 내용 분석 결과입니다.</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">리뷰 분석</h1>
          <p className="text-gray-600 mt-2">고객들의 리뷰를 분석하여 인사이트를 도출합니다</p>
        </div>



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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(analysisData.reduce((sum, item) => sum + item.positive, 0) / analysisData.length)}%
              </div>
              <div className="text-gray-600">긍정 리뷰 비율</div>
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
