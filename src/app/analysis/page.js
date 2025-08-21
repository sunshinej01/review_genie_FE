'use client';

import { useState, useEffect } from 'react';
import { reviewAPI } from '@/services/apiClient';

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await reviewAPI.getAnalysisData();
        setAnalysisData(response.data);
      } catch (error) {
        console.error('분석 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-xl'>데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>리뷰 분석</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* 분석 요약 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>분석 요약</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>총 리뷰 수:</span>
              <span className='font-medium'>
                {analysisData?.totalReviews || 0}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>긍정 리뷰:</span>
              <span className='font-medium text-green-600'>
                {analysisData?.positiveReviews || 0}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>부정 리뷰:</span>
              <span className='font-medium text-red-600'>
                {analysisData?.negativeReviews || 0}
              </span>
            </div>
          </div>
        </div>

        {/* 감정 분석 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>감정 분석</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>만족도:</span>
              <span className='font-medium'>
                {analysisData?.satisfaction || 0}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>신뢰도:</span>
              <span className='font-medium'>
                {analysisData?.trustScore || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 키워드 분석 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>주요 키워드</h3>
          <div className='space-y-2'>
            {analysisData?.keywords?.slice(0, 5).map((keyword, index) => (
              <div key={index} className='flex justify-between'>
                <span>{keyword.word}</span>
                <span className='font-medium'>{keyword.count}</span>
              </div>
            )) || <span className='text-gray-500'>데이터가 없습니다</span>}
          </div>
        </div>
      </div>

      {/* 상세 분석 섹션 */}
      <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-6'>상세 분석</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>긍정적 피드백</h3>
            <ul className='space-y-2 text-sm'>
              {analysisData?.positiveFeedback?.map((feedback, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-green-500 mr-2'>✓</span>
                  <span>{feedback}</span>
                </li>
              )) || <span className='text-gray-500'>데이터가 없습니다</span>}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>개선 필요 사항</h3>
            <ul className='space-y-2 text-sm'>
              {analysisData?.improvementAreas?.map((area, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-red-500 mr-2'>⚠</span>
                  <span>{area}</span>
                </li>
              )) || <span className='text-gray-500'>데이터가 없습니다</span>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
