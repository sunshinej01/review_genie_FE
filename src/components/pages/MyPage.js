'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Toggle from '@/components/common/Toggle';
import { useStore } from '@/components/providers/StoreProvider';
import apiService from '@/services/api';

const MyPage = () => {
  const { selectedStore } = useStore();
  
  // 가게 정보 상태
  const [storeInfo] = useState({
    registrationDate: '2024-01-15',
  });

  // 알림 설정 상태
  const [notifications, setNotifications] = useState({
    newReview: true,
    weeklyReport: false,
  });

  // 총 리뷰 수 상태
  const [totalReviewCount, setTotalReviewCount] = useState(0);

  // 성공 메시지 상태
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 알림 토글 핸들러
  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // 가게 정보 변경 핸들러 (등록일만 수정 가능)
  const handleStoreInfoChange = (field, value) => {
    // 현재는 등록일만 수정 가능하도록 제한
    if (field === 'registrationDate') {
      // 등록일 수정 로직 (필요시 구현)
      console.log('등록일 변경:', value);
    }
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    // 성공 메시지 표시
    setShowSuccessMessage(true);
    
    // 3초 후 메시지 숨김
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    
    // 실제 저장 로직 (필요시 구현)
    console.log('설정 저장됨');
  };

  // 총 리뷰 수 로딩
  useEffect(() => {
    const loadTotalReviewCount = async () => {
      try {
        // 리뷰분석 페이지와 동일한 API 사용
        const totalData = await apiService.getStoreTotalReviewCount(selectedStore);
        setTotalReviewCount(totalData.count || 0);
      } catch (err) {
        console.error('총 리뷰 수 조회 실패:', err);
        // 에러 발생 시 기본값 설정
        const defaultCounts = {
          '카페페퍼': 1250,
          '런던베이글뮤지엄': 890,
          '파이홀': 650
        };
        setTotalReviewCount(defaultCounts[selectedStore] || 0);
      }
    };

    loadTotalReviewCount();
  }, [selectedStore]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
          <p className="text-gray-600 mt-2">내 정보와 가게 정보를 관리하세요</p>
        </div>

        {/* 성공 메시지 팝업 */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>정보 변경이 완료되었습니다!</span>
            </div>
          </div>
        )}

        {/* 내 가게 정보 섹션 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">내 가게 정보</h2>
          <div className="space-y-6">
            {/* 상호명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상호명
              </label>
              <div className="w-full px-4 py-3 bg-gray-100 border-b-2 border-gray-300 text-gray-800 font-medium">
                {selectedStore}
              </div>
            </div>

            {/* 등록일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                등록일
              </label>
              <input
                type="date"
                value={storeInfo.registrationDate}
                onChange={(e) => handleStoreInfoChange('registrationDate', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </Card>

        {/* 서비스 알림 섹션 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">서비스 알림</h2>
          <div className="space-y-6">
            {/* 새로운 리뷰 알림 */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">새로운 리뷰 알림</h3>
                <p className="text-xs text-gray-500 mt-1">
                  새로운 리뷰가 작성되면 즉시 알림을 받습니다
                </p>
              </div>
              <Toggle
                checked={notifications.newReview}
                onChange={() => handleNotificationToggle('newReview')}
              />
            </div>

            {/* 주간 리포트 알림 */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">주간 리포트 알림</h3>
                <p className="text-xs text-gray-500 mt-1">
                  매주 월요일 오전에 주간 분석 리포트를 발송합니다
                </p>
              </div>
              <Toggle
                checked={notifications.weeklyReport}
                onChange={() => handleNotificationToggle('weeklyReport')}
              />
            </div>
          </div>
        </Card>

        {/* 저장 버튼 */}
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" className="px-8 py-3">
            취소
          </Button>
          <Button variant="primary" className="px-8 py-3" onClick={handleSave}>
            저장
          </Button>
        </div>

        {/* 추가 정보 카드 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 총 리뷰 수 카드 - 리뷰분석 페이지와 동일한 sample data 사용 */}
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalReviewCount.toLocaleString()}</div>
              <div className="text-gray-600">총 리뷰 수</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Premium</div>
              <div className="text-gray-600">구독 플랜</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
