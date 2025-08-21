'use client';

import React from 'react';
import Card from '@/components/common/Card';

const CompAnalysisPage = () => {
  // 임시 데이터 - 이런 리뷰가 많았어요
  const topReviews = [
    { rank: 1, content: '맛있어요!', count: 89 },
    { rank: 2, content: '친절해요', count: 76 },
    { rank: 3, content: '깔끔해요', count: 65 },
    { rank: 4, content: '가성비 좋아요', count: 54 },
    { rank: 5, content: '재방문 의사 있어요', count: 43 },
  ];

  // 칭찬받은 점
  const praisedPoints = [
    { keyword: '맛', review: '정말 맛있어요!', count: 45 },
    { keyword: '서비스', review: '친절하고 빠른 서비스', count: 38 },
    { keyword: '위생', review: '매장이 깔끔하고 위생적', count: 32 },
  ];

  // 아쉬운 점
  const disappointingPoints = [
    { keyword: '가격', review: '조금 비싸요', count: 28 },
    { keyword: '대기시간', review: '주문 후 대기시간이 길어요', count: 25 },
    { keyword: '메뉴', review: '메뉴가 다양하지 않아요', count: 22 },
  ];

  // 2025년 F&B 트렌드
  const trends = [
    {
      title: '진정성',
      description: '고객들은 진정성 있는 브랜드 스토리와 투명한 정보 공개를 원합니다.',
      icon: '🎯'
    },
    {
      title: '테크 접목',
      description: 'AI, IoT 등 최신 기술을 활용한 고객 경험 개선이 필수입니다.',
      icon: '🤖'
    },
    {
      title: '메뉴 혁신',
      description: '건강한 재료와 창의적인 조합으로 차별화된 메뉴가 인기입니다.',
      icon: '🍽️'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block mb-4">
            <span className="text-sm font-medium">1개월 동안의 경쟁사 비교 분석</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">옆집 분석</h1>
          <p className="text-gray-600 mt-2">경쟁사와의 차이점을 분석하여 경쟁 우위를 확보하세요</p>
        </div>

        {/* 두 컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 컬럼 */}
          <div className="space-y-6">
            {/* 이런 리뷰가 많았어요 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                이런 리뷰가 많았어요
              </h3>
              <div className="space-y-3">
                {topReviews.map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.rank}
                      </span>
                      <span className="font-medium text-gray-800">{item.content}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.count}회</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 칭찬받은 점 vs 아쉬운 점 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 칭찬받은 점 */}
              <Card>
                <h4 className="text-md font-semibold text-gray-800 mb-3 text-green-600">
                  이런 점이 칭찬받았어요
                </h4>
                <div className="space-y-2">
                  {praisedPoints.map((item, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded">
                      <div className="font-medium text-sm text-green-800">{item.keyword}</div>
                      <div className="text-xs text-green-600">{item.review}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.count}회 언급</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 아쉬운 점 */}
              <Card>
                <h4 className="text-md font-semibold text-gray-800 mb-3 text-red-600">
                  이런 점이 아쉬웠어요
                </h4>
                <div className="space-y-2">
                  {disappointingPoints.map((item, index) => (
                    <div key={index} className="p-2 bg-red-50 rounded">
                      <div className="font-medium text-sm text-red-800">{item.keyword}</div>
                      <div className="text-xs text-red-600">{item.review}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.count}회 언급</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-6">
            {/* 2025년 F&B 트렌드 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                2025년 F&B 트렌드
              </h3>
              <div className="space-y-4">
                {trends.map((trend, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{trend.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">{trend.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{trend.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 경쟁사 비교 요약 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                경쟁사 비교 요약
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm font-medium text-blue-800">우리 가게</span>
                  <span className="text-sm font-bold text-blue-600">4.6점</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">경쟁사 A</span>
                  <span className="text-sm font-bold text-gray-600">4.3점</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">경쟁사 B</span>
                  <span className="text-sm font-bold text-gray-600">4.1점</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 추가 인사이트 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <div className="text-gray-600">경쟁사 대비 우위</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3개</div>
              <div className="text-gray-600">주요 경쟁사 수</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8개</div>
              <div className="text-gray-600">차별화 포인트</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompAnalysisPage;
