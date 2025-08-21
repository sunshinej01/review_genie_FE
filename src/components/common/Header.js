import React from 'react';
import Button from './Button';

const Header = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 왼쪽: 로고와 메뉴 */}
          <div className="flex items-center space-x-8">
            {/* 로고 */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Review Genie</span>
            </div>
            
            {/* 네비게이션 메뉴 */}
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="/analysis" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                리뷰분석
              </a>
              <a href="/competitor" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                옆집분석
              </a>
              <a href="/mypage" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                마이
              </a>
            </nav>
          </div>
          
          {/* 오른쪽: 날짜와 로그인 */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{today}</span>
            <Button variant="primary" className="text-sm">
              로그인
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
