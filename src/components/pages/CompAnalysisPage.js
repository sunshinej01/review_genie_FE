'use client';

import React from 'react';
import Card from '@/components/common/Card';
import { useStore } from '@/components/providers/StoreProvider';
import useStoreStore from '@/store/storeStore';

const CompAnalysisPage = () => {
  const { selectedStore } = useStore();
  const { getCurrentStoreData } = useStoreStore();
  
  // 현재 선택된 가게의 데이터
  const currentStoreData = getCurrentStoreData();
  const { competitorAnalysis } = currentStoreData;
  
  // 경쟁사 대비 우위 키워드 (긍정 비율이 높은 키워드)
  const superiorKeywords = Object.entries(competitorAnalysis.keywordSentimentComparison)
    .filter(([_, data]) => data.difference > 0)
    .sort((a, b) => b[1].difference - a[1].difference)
    .slice(0, 5);

  // 경쟁사 대비 약점 키워드 (부정 비율이 높은 키워드)
  const inferiorKeywords = Object.entries(competitorAnalysis.keywordSentimentComparison)
    .filter(([_, data]) => data.difference < 0)
    .sort((a, b) => a[1].difference - b[1].difference)
    .slice(0, 5);

  // 경쟁사에 없는 키워드 (최소 3개, 최대 5개)
  const uniqueKeywords = competitorAnalysis.topGeneralKeywords
    .filter(keyword => !competitorAnalysis.competitorStores.some(store => 
      getCurrentStoreData(store)?.keywords.some(k => k.keyword === keyword)
    ))
    .slice(0, 5);

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
          <p className="text-gray-600 mt-2">경쟁사 대비 우리가게의 강점과 약점을 분석해보세요</p>
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
                {uniqueKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800">{keyword}</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">우리만의 키워드</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 이런 점이 칭찬받았어요 */}
            <Card>
              <h4 className="text-md font-semibold text-gray-800 mb-3 text-green-600">
                이런 점이 칭찬받았어요
              </h4>
              <div className="space-y-2">
                {superiorKeywords.map(([keyword, data], index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-sm text-green-800 mb-1">{keyword}</div>
                    <div className="text-xs text-green-600 font-medium">경쟁사 대비 +{data.difference}% 우위</div>
                    <div className="text-xs text-gray-500 mt-1">우리: {data.myStore}% vs 경쟁사: {data.competitors}%</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 주요 경쟁사 수 */}
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{competitorAnalysis.competitorStores.length}개</div>
                <div className="text-gray-600">주요 경쟁사 수</div>
              </div>
            </Card>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-6">
            {/* 2025년 F&B 트렌드 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                2025년 F&B 트렌드
              </h3>
              <div className="space-y-3">
                {trends.map((trend, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{trend.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">{trend.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{trend.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 이런 점이 아쉬웠어요 */}
            <Card>
              <h4 className="text-md font-semibold text-gray-800 mb-3 text-red-600">
                이런 점이 아쉬웠어요
              </h4>
              <div className="space-y-2">
                {inferiorKeywords.map(([keyword, data], index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-sm text-red-800 mb-1">{keyword}</div>
                    <div className="text-xs text-red-600 font-medium">경쟁사 대비 {data.difference}% 열위</div>
                    <div className="text-xs text-gray-500 mt-1">우리: {data.myStore}% vs 경쟁사: {data.competitors}%</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 차별화 포인트 */}
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{superiorKeywords.length}개</div>
                <div className="text-gray-600">차별화 포인트</div>
              </div>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CompAnalysisPage;

