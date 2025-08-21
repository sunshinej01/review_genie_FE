'use client';

import { useState, useEffect } from 'react';
import { competitorAPI } from '@/services/apiClient';

export default function CompetitorPage() {
  const [competitorData, setCompetitorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitorData = async () => {
      try {
        const response = await competitorAPI.getCompetitorData();
        setCompetitorData(response.data);
      } catch (error) {
        console.error('경쟁사 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitorData();
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
      <h1 className='text-3xl font-bold mb-8'>경쟁사 분석</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {/* 시장 점유율 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>시장 점유율</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>우리 회사:</span>
              <span className='font-medium text-blue-600'>
                {competitorData?.marketShare?.ourCompany || 0}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 A:</span>
              <span className='font-medium'>
                {competitorData?.marketShare?.competitorA || 0}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 B:</span>
              <span className='font-medium'>
                {competitorData?.marketShare?.competitorB || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 고객 만족도 비교 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>고객 만족도</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>우리 회사:</span>
              <span className='font-medium text-blue-600'>
                {competitorData?.satisfaction?.ourCompany || 0}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 A:</span>
              <span className='font-medium'>
                {competitorData?.satisfaction?.competitorA || 0}%
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 B:</span>
              <span className='font-medium'>
                {competitorData?.satisfaction?.competitorB || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 가격 경쟁력 카드 */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4'>가격 경쟁력</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>우리 회사:</span>
              <span className='font-medium text-blue-600'>
                {competitorData?.priceCompetitiveness?.ourCompany || 0}/10
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 A:</span>
              <span className='font-medium'>
                {competitorData?.priceCompetitiveness?.competitorA || 0}/10
              </span>
            </div>
            <div className='flex justify-between'>
              <span>경쟁사 B:</span>
              <span className='font-medium'>
                {competitorData?.priceCompetitiveness?.competitorB || 0}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 경쟁사 상세 분석 */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-6'>경쟁사 상세 분석</h2>

        <div className='space-y-6'>
          {competitorData?.competitors?.map((competitor, index) => (
            <div key={index} className='border rounded-lg p-4'>
              <h3 className='text-xl font-semibold mb-4'>{competitor.name}</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-medium mb-2'>강점</h4>
                  <ul className='space-y-1 text-sm'>
                    {competitor.strengths?.map((strength, idx) => (
                      <li key={idx} className='flex items-start'>
                        <span className='text-green-500 mr-2'>✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className='font-medium mb-2'>약점</h4>
                  <ul className='space-y-1 text-sm'>
                    {competitor.weaknesses?.map((weakness, idx) => (
                      <li key={idx} className='flex items-start'>
                        <span className='text-red-500 mr-2'>⚠</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='mt-4'>
                <h4 className='font-medium mb-2'>주요 제품/서비스</h4>
                <div className='flex flex-wrap gap-2'>
                  {competitor.products?.map((product, idx) => (
                    <span
                      key={idx}
                      className='bg-gray-100 px-3 py-1 rounded-full text-sm'
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT 분석 */}
      <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-6'>SWOT 분석</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-semibold mb-4 text-green-600'>
              강점 (Strengths)
            </h3>
            <ul className='space-y-2'>
              {competitorData?.swot?.strengths?.map((strength, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-green-500 mr-2'>✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4 text-red-600'>
              약점 (Weaknesses)
            </h3>
            <ul className='space-y-2'>
              {competitorData?.swot?.weaknesses?.map((weakness, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-red-500 mr-2'>⚠</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4 text-blue-600'>
              기회 (Opportunities)
            </h3>
            <ul className='space-y-2'>
              {competitorData?.swot?.opportunities?.map(
                (opportunity, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-blue-500 mr-2'>🔍</span>
                    <span>{opportunity}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4 text-orange-600'>
              위협 (Threats)
            </h3>
            <ul className='space-y-2'>
              {competitorData?.swot?.threats?.map((threat, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-orange-500 mr-2'>⚠</span>
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
