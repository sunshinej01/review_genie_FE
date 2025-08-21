import axios from 'axios';

// 기본 Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  config => {
    // 토큰이 있다면 헤더에 추가
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 에러 처리 로직
    if (error.response?.status === 401) {
      // 인증 에러 처리
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API 함수들
export const reviewAPI = {
  // 리뷰 분석 데이터 조회
  getAnalysisData: params => apiClient.get('/reviews/analysis', { params }),

  // 리뷰 목록 조회
  getReviews: params => apiClient.get('/reviews', { params }),

  // 리뷰 상세 조회
  getReviewDetail: id => apiClient.get(`/reviews/${id}`),

  // 리뷰 분석 요청
  analyzeReview: data => apiClient.post('/reviews/analyze', data),
};

export const competitorAPI = {
  // 경쟁사 분석 데이터 조회
  getCompetitorData: params =>
    apiClient.get('/competitor/analysis', { params }),

  // 경쟁사 목록 조회
  getCompetitors: params => apiClient.get('/competitor', { params }),

  // 경쟁사 비교 분석
  compareCompetitors: data => apiClient.post('/competitor/compare', data),
};

export const userAPI = {
  // 로그인
  login: credentials => apiClient.post('/auth/login', credentials),

  // 로그아웃
  logout: () => apiClient.post('/auth/logout'),

  // 사용자 정보 조회
  getUserInfo: () => apiClient.get('/auth/me'),
};

export default apiClient;
