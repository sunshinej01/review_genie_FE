'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/common/Card';
import { useStore } from '@/components/providers/StoreProvider';

const HomePage = () => {
  const { selectedStore } = useStore();
  // 임시 데이터 - 리뷰 트렌드
  const reviewData = [
    { name: '월', reviews: 45 },
    { name: '화', reviews: 52 },
    { name: '수', reviews: 38 },
    { name: '목', reviews: 61 },
    { name: '금', reviews: 78 },
    { name: '토', reviews: 95 },
    { name: '일', reviews: 67 },
  ];

  // 리뷰분석 페이지와 동일한 데이터 - 긍정/부정 리뷰 비교
  const analysisData = [
    { name: '맛', positive: 85, negative: 15 },
    { name: '서비스', positive: 78, negative: 22 },
    { name: '가격', positive: 65, negative: 35 },
    { name: '위생', positive: 92, negative: 8 },
    { name: '분위기', positive: 88, negative: 12 },
    { name: '위치', positive: 72, negative: 28 },
  ];

  // 가게별 데이터 (백엔드에서 받아올 예정)
  const storeData = {
    '카페페퍼': { name: '카페페퍼', reviews: 185, increase: 12, positiveRatio: 80 },
    '런던베이글뮤지엄': { name: '런던베이글뮤지엄', reviews: 142, increase: 8, positiveRatio: 75 },
    '파이홀': { name: '파이홀', reviews: 203, increase: 15, positiveRatio: 85 }
  };

  const currentStore = storeData[selectedStore] || storeData['카페페퍼'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">오늘 하루의 가게 현황을 한눈에 확인하세요</p>
        </div>

        {/* 두 컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 컬럼: 가게 정보 + 리뷰 수 */}
          <div className="space-y-6">
            {/* 가게 정보 태그 */}
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block">
              <span className="text-sm font-medium">{currentStore.name}</span>
            </div>
            
            {/* 오늘 하루 제목 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                오늘 하루 내 가게에서는
              </h2>
            </div>
            
            {/* 리뷰 수 카드 */}
            <Card className="text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{currentStore.reviews}</div>
                <div className="text-gray-600">리뷰가 작성되었습니다</div>
                <div className="text-sm text-gray-500 mt-4">
                  어제 대비 <span className="text-green-600 font-medium">+{currentStore.increase}%</span> 증가
                </div>
              </div>
            </Card>
          </div>

          {/* 오른쪽 컬럼: 환영 메시지 + 막대 그래프 */}
          <div className="space-y-6">
            {/* 환영 메시지 */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                안녕하세요 사장님!
              </h2>
              <p className="text-lg text-gray-600">
                리뷰 지니와 오늘도 힘찬 하루 되세요!
              </p>
            </div>
            
            {/* 막대 그래프 카드 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                이번 주 리뷰 작성 현황
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reviews" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        {/* 추가 통계 카드들 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div className="text-2xl font-bold text-blue-600">{currentStore.reviews}</div>
              <div className="text-gray-600">오늘 리뷰 수</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+{currentStore.increase}%</div>
              <div className="text-gray-600">어제 대비 증가율</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
