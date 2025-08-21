import axios from 'axios';

// 백엔드 API 기본 URL
const API_BASE_URL = 'http://localhost:8080';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터 (로깅용)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리용)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API 서비스 클래스
class ApiService {
  // ===== 홈페이지 관련 API =====
  
  // 특정 가게의 오늘 리뷰 수 조회
  async getTodayReviewCount(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/reviews/count/today`);
      return response.data;
    } catch (error) {
      console.error('오늘 리뷰 수 조회 실패:', error);
      // 백엔드 연동 전까지는 기본값 반환
      return { count: 0 };
    }
  }

  // 특정 가게의 일주일 리뷰 수 데이터 조회
  async getWeeklyReviewData(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/reviews/weekly`);
      return response.data;
    } catch (error) {
      console.error('일주일 리뷰 데이터 조회 실패:', error);
      // 백엔드 연동 전까지는 sample data 반환
      return this.getSampleWeeklyData(storeName);
    }
  }

  // 특정 가게의 키워드별 감성분석 데이터 조회 (긍정리뷰비율 계산용)
  async getKeywordSentimentData(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/keywords/sentiment`);
      return response.data;
    } catch (error) {
      console.error('키워드 감성분석 데이터 조회 실패:', error);
      // 백엔드 연동 전까지는 기본값 반환
      return { keywords: [] };
    }
  }

  // ===== 리뷰분석 페이지 관련 API =====
  
  // 특정 가게의 주요 키워드별 감성분석 결과 조회
  async getStoreKeywordAnalysis(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/keywords/analysis`);
      return response.data;
    } catch (error) {
      console.error('가게 키워드 분석 데이터 조회 실패:', error);
      // 백엔드 연동 전까지는 기본값 반환
      return { keywords: [] };
    }
  }

  // 특정 가게의 Top General Keyword 데이터 조회
  async getStoreTopKeywords(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/keywords/top`);
      return response.data;
    } catch (error) {
      console.error('가게 상위 키워드 데이터 조회 실패:', error);
      // 백엔드 연동 전까지는 기본값 반환
      return { keywords: [] };
    }
  }

  // 특정 가게의 총 리뷰 수 조회
  async getStoreTotalReviewCount(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/reviews/count/total`);
      return response.data;
    } catch (error) {
      console.error('가게 총 리뷰 수 조회 실패:', error);
      // 백엔드 연동 전까지는 sample data 반환
      return this.getSampleTotalReviewCount(storeName);
    }
  }

  // ===== 옆집분석 페이지 관련 API =====
  
  // 경쟁사 분석 데이터 조회
  async getCompetitorAnalysis(storeName) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${encodeURIComponent(storeName)}/competitors/analysis`);
      return response.data;
    } catch (error) {
      console.error('경쟁사 분석 데이터 조회 실패:', error);
      // 백엔드 연동 전까지는 기본값 반환
      return { competitors: [] };
    }
  }

  // ===== 기존 API 메서드들 (호환성 유지) =====
  
  // 대시보드 데이터 조회
  async getDashboardData() {
    try {
      const response = await apiClient.get('/api/frontend/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(`대시보드 데이터 조회 실패: ${error.message}`);
    }
  }

  // 모든 리뷰 조회 (페이지네이션 지원)
  async getAllReviews(page = 0, size = 20) {
    try {
      const response = await apiClient.get('/api/frontend/reviews', {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      throw new Error(`리뷰 조회 실패: ${error.message}`);
    }
  }

  // 특정 매장의 리뷰 조회
  async getStoreReviews(storeId) {
    try {
      const response = await apiClient.get(`/api/frontend/stores/${storeId}/reviews`);
      return response.data;
    } catch (error) {
      throw new Error(`매장 리뷰 조회 실패: ${error.message}`);
    }
  }

  // 키워드 분석 데이터 조회
  async getKeywordAnalysis() {
    try {
      const response = await apiClient.get('/api/frontend/keywords/analysis');
      return response.data;
    } catch (error) {
      throw new Error(`키워드 분석 데이터 조회 실패: ${error.message}`);
    }
  }

  // 텍스트 감성 분석
  async analyzeSentiment(text) {
    try {
      const response = await apiClient.get('/api/reviews/analyze/sentiment', {
        params: { text }
      });
      return response.data;
    } catch (error) {
      throw new Error(`감성 분석 실패: ${error.message}`);
    }
  }

  // 텍스트 키워드 추출
  async extractKeywords(text) {
    try {
      const response = await apiClient.get('/api/reviews/analyze/keywords', {
        params: { text }
      });
      return response.data;
    } catch (error) {
      throw new Error(`키워드 추출 실패: ${error.message}`);
    }
  }

  // 종합 텍스트 분석
  async analyzeComprehensive(text) {
    try {
      const response = await apiClient.get('/api/reviews/analyze/comprehensive', {
        params: { text }
      });
      return response.data;
    } catch (error) {
      throw new Error(`종합 분석 실패: ${error.message}`);
    }
  }

  // 백엔드 상태 확인
  async checkBackendStatus() {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      throw new Error(`백엔드 상태 확인 실패: ${error.message}`);
    }
  }

  // ===== Sample Data 메서드들 (백엔드 연동 전까지 사용) =====
  
  // 일주일 리뷰 수 sample data
  getSampleWeeklyData(storeName) {
    const sampleData = {
      '카페페퍼': [12, 19, 15, 22, 18, 25, 20],
      '런던베이글뮤지엄': [8, 12, 10, 15, 11, 18, 14],
      '파이홀': [5, 8, 6, 10, 7, 12, 9]
    };
    
    return {
      dailyCounts: sampleData[storeName] || [0, 0, 0, 0, 0, 0, 0],
      total: (sampleData[storeName] || [0, 0, 0, 0, 0, 0, 0]).reduce((a, b) => a + b, 0)
    };
  }

  // 총 리뷰 수 sample data
  getSampleTotalReviewCount(storeName) {
    const sampleData = {
      '카페페퍼': 1250,
      '런던베이글뮤지엄': 890,
      '파이홀': 650
    };
    
    return { count: sampleData[storeName] || 0 };
  }
}

// 싱글톤 인스턴스 생성
const apiService = new ApiService();

export default apiService;
