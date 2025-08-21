import React, { useEffect } from 'react';
import useApiStore from '../stores/apiStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { 
    dashboardData, 
    loading, 
    error, 
    loadDashboardData 
  } = useApiStore();

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">오류: {error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">데이터가 없습니다.</div>
      </div>
    );
  }

  // 감성 분석 차트 데이터
  const sentimentChartData = [
    { name: '긍정', value: dashboardData.sentimentStats?.positive || 0, color: '#10B981' },
    { name: '부정', value: dashboardData.sentimentStats?.negative || 0, color: '#EF4444' },
    { name: '중립', value: dashboardData.sentimentStats?.neutral || 0, color: '#6B7280' }
  ];

  // 최근 리뷰 데이터
  const recentReviews = dashboardData.recentReviews || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Review Genie 대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">총 리뷰</h3>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.totalReviews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">총 매장</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardData.totalStores}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">총 사용자</h3>
          <p className="text-3xl font-bold text-purple-600">{dashboardData.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">총 키워드</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData.totalKeywords}</p>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 감성 분석 파이 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">감성 분석 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 감성 분석 막대 차트 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">감성별 리뷰 수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 최근 리뷰 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">최근 리뷰</h3>
        <div className="space-y-4">
          {recentReviews.length > 0 ? (
            recentReviews.map((review) => (
              <div key={review.reviewId} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    review.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                    review.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {review.sentiment === 'POSITIVE' ? '긍정' :
                     review.sentiment === 'NEGATIVE' ? '부정' : '중립'}
                  </span>
                </div>
                <p className="text-gray-800">{review.content}</p>
                {review.store && (
                  <p className="text-sm text-blue-600 mt-1">
                    매장: {review.store.storeName}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">최근 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
