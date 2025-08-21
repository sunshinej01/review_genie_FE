'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/common/Card';
import { useStore } from '@/components/providers/StoreProvider';
import apiService from '@/services/api';

const AnalysisPage = () => {
  const { selectedStore } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keywordAnalysis, setKeywordAnalysis] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [positiveRatio, setPositiveRatio] = useState(0);
  const [totalReviewCount, setTotalReviewCount] = useState(0);

  // 데이터 로딩 함수
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. 가게의 주요 키워드별 감성분석 결과 조회
      const analysisData = await apiService.getStoreKeywordAnalysis(selectedStore);
      if (analysisData.keywords && analysisData.keywords.length > 0) {
        // 백엔드 데이터를 차트용으로 변환
        const chartData = analysisData.keywords.map(keyword => ({
          name: keyword.keyword_name || keyword.keyword,
          positive: keyword.positive_count || 0,
          negative: keyword.negative_count || 0
        }));
        setKeywordAnalysis(chartData);
      } else {
        // 백엔드 데이터가 없을 때 기본값 설정
        const defaultData = [
          { name: '맛', positive: 85, negative: 15 },
          { name: '서비스', positive: 78, negative: 22 },
          { name: '가격', positive: 65, negative: 35 },
          { name: '위생', positive: 92, negative: 8 },
          { name: '분위기', positive: 88, negative: 12 },
          { name: '위치', positive: 72, negative: 28 }
        ];
        setKeywordAnalysis(defaultData);
      }

      // 2. Top General Keyword 데이터 조회
      const topKeywordsData = await apiService.getStoreTopKeywords(selectedStore);
      if (topKeywordsData.keywords && topKeywordsData.keywords.length > 0) {
        // 백엔드 데이터를 순위별로 변환
        const rankedKeywords = topKeywordsData.keywords
          .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
          .slice(0, 10)
          .map((keyword, index) => ({
            rank: index + 1,
            keyword: keyword.keyword || keyword.keyword_name,
            count: keyword.frequency || 0
          }));
        setTopKeywords(rankedKeywords);
      } else {
        // 백엔드 데이터가 없을 때 기본값 설정
        const defaultTopKeywords = [
          { rank: 1, keyword: '맛있어요', count: 45 },
          { rank: 2, keyword: '친절해요', count: 38 },
          { rank: 3, keyword: '깔끔해요', count: 32 },
          { rank: 4, keyword: '편해요', count: 28 },
          { rank: 5, keyword: '추천해요', count: 25 }
        ];
        setTopKeywords(defaultTopKeywords);
      }

      // 3. 키워드별 감성분석 데이터로 긍정리뷰비율 계산
      const sentimentData = await apiService.getKeywordSentimentData(selectedStore);
      if (sentimentData.keywords && sentimentData.keywords.length > 0) {
        const totalPositive = sentimentData.keywords.reduce((sum, keyword) => 
          sum + (keyword.positive_count || 0), 0);
        const totalNegative = sentimentData.keywords.reduce((sum, keyword) => 
          sum + (keyword.negative_count || 0), 0);
        const total = totalPositive + totalNegative;
        const ratio = total > 0 ? Math.round((totalPositive / total) * 100) : 0;
        setPositiveRatio(ratio);
      } else {
        // 백엔드 데이터가 없을 때 기본값 설정
        const defaultRatios = {
          '카페페퍼': 80,
          '런던베이글뮤지엄': 75,
          '파이홀': 85
        };
        setPositiveRatio(defaultRatios[selectedStore] || 80);
      }

      // 4. 가게의 총 리뷰 수 조회
      const totalData = await apiService.getStoreTotalReviewCount(selectedStore);
      setTotalReviewCount(totalData.count || 0);

    } catch (err) {
      console.error('데이터 로딩 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
      
      // 에러 발생 시 기본값 설정
      setKeywordAnalysis([
        { name: '맛', positive: 85, negative: 15 },
        { name: '서비스', positive: 78, negative: 22 },
        { name: '가격', positive: 65, negative: 35 }
      ]);
      setTopKeywords([
        { rank: 1, keyword: '맛있어요', count: 45 },
        { rank: 2, keyword: '친절해요', count: 38 }
      ]);
      setPositiveRatio(80);
      setTotalReviewCount(0);
    } finally {
      setLoading(false);
    }
  };

  // selectedStore가 변경될 때마다 데이터 다시 로딩
  useEffect(() => {
    loadData();
  }, [selectedStore]);

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">데이터를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block mb-4">
            <span className="text-sm font-medium">{selectedStore} 리뷰 내용 분석 결과입니다.</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">리뷰 분석</h1>
          <p className="text-gray-600 mt-2">고객들의 리뷰를 분석하여 인사이트를 도출합니다</p>
        </div>

        {/* 두 컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 컬럼: 수평 막대 그래프 - 키워드별 감성분석 */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              주요 키워드별 감성분석 결과
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={keywordAnalysis}
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
              주요 keyword (Top General Keyword)
            </h3>
            <div className="space-y-3">
              {topKeywords.map((item) => (
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
          {/* 긍정리뷰비율 카드 */}
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {positiveRatio}%
              </div>
              <div className="text-gray-600">긍정 리뷰 비율</div>
            </div>
          </Card>
          
          {/* 총 리뷰 수 카드 */}
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalReviewCount.toLocaleString()}</div>
              <div className="text-gray-600">총 리뷰 수</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
