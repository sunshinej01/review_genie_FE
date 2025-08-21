'use client';

import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Toggle from '@/components/common/Toggle';

const MyPage = () => {
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    username: '김사장',
    email: 'owner@sweettooth.com',
  });

  // 가게 정보 상태
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Sweet Tooth 판교점',
    registrationDate: '2024-01-15',
  });

  // 알림 설정 상태
  const [notifications, setNotifications] = useState({
    newReview: true,
    weeklyReport: false,
  });

  // 입력 필드 변경 핸들러
  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleStoreInfoChange = (field, value) => {
    setStoreInfo(prev => ({ ...prev, [field]: value }));
  };

  // 알림 토글 핸들러
  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = () => {
    // TODO: 비밀번호 변경 모달 또는 페이지로 이동
    alert('비밀번호 변경 기능은 준비 중입니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
          <p className="text-gray-600 mt-2">내 정보와 가게 정보를 관리하세요</p>
        </div>

        {/* 내 정보 섹션 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">내 정보</h2>
          <div className="space-y-6">
            {/* 사용자 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용자 이름
              </label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => handleUserInfoChange('username', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="사용자 이름을 입력하세요"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleUserInfoChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="이메일을 입력하세요"
              />
            </div>

            {/* 비밀번호 변경 버튼 */}
            <div className="pt-4">
              <Button
                variant="secondary"
                onClick={handlePasswordChange}
                className="w-full sm:w-auto"
              >
                비밀번호 변경
              </Button>
            </div>
          </div>
        </Card>

        {/* 내 가게 정보 섹션 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">내 가게 정보</h2>
          <div className="space-y-6">
            {/* 상호명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상호명
              </label>
              <input
                type="text"
                value={storeInfo.storeName}
                onChange={(e) => handleStoreInfoChange('storeName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="가게 상호명을 입력하세요"
              />
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
          <Button variant="primary" className="px-8 py-3">
            저장
          </Button>
        </div>

        {/* 추가 정보 카드 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">365일</div>
              <div className="text-gray-600">서비스 이용 기간</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,247</div>
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
