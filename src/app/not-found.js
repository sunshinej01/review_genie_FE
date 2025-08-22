'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 아이콘 */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          URL을 다시 확인해주세요.
        </p>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            홈으로 돌아가기
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            이전 페이지로
          </button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 text-sm text-gray-500">
          <p>도움이 필요하시다면</p>
          <Link href="/mypage" className="text-blue-600 hover:underline">
            마이페이지
          </Link>
          <span className="mx-2">또는</span>
          <Link href="/analysis" className="text-blue-600 hover:underline">
            리뷰분석
          </Link>
          <span className="mx-2">페이지를 확인해보세요.</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
