import { create } from 'zustand';

const useStoreStore = create((set, get) => ({
  // 현재 선택된 가게
  selectedStore: '카페페퍼',
  
  // 가게별 리뷰 분석 데이터 (백엔드에서 받아올 예정)
  storeAnalysisData: {
    '카페페퍼': {
      name: '카페페퍼',
      reviews: 185,
      increase: 12,
      positiveRatio: 80,
      analysisData: [
        { name: '맛', positive: 85, negative: 15 },
        { name: '서비스', positive: 78, negative: 22 },
        { name: '가격', positive: 65, negative: 35 },
        { name: '위생', positive: 92, negative: 8 },
        { name: '분위기', positive: 88, negative: 12 },
        { name: '위치', positive: 72, negative: 28 },
      ],
      keywords: [
        { rank: 1, keyword: '타르트', count: 156 },
        { rank: 2, keyword: '생과일', count: 134 },
        { rank: 3, keyword: '크림', count: 98 },
        { rank: 4, keyword: '달콤한', count: 87 },
        { rank: 5, keyword: '신선한', count: 76 },
        { rank: 6, keyword: '부드러운', count: 65 },
        { rank: 7, keyword: '향기로운', count: 54 },
        { rank: 8, keyword: '예쁜', count: 43 },
      ],
      // 경쟁사 분석 데이터 추가
      competitorAnalysis: {
        topGeneralKeywords: ['타르트', '생과일', '크림', '달콤한', '신선한'],
        competitorStores: ['런던베이글뮤지엄', '파이홀'],
        keywordSentimentComparison: {
          '맛': { myStore: 85, competitors: 78, difference: 7 },
          '서비스': { myStore: 78, competitors: 72, difference: 6 },
          '가격': { myStore: 65, competitors: 68, difference: -3 },
          '위생': { myStore: 92, competitors: 85, difference: 7 },
          '분위기': { myStore: 88, competitors: 82, difference: 6 },
          '위치': { myStore: 72, competitors: 75, difference: -3 }
        }
      }
    },
    '런던베이글뮤지엄': {
      name: '런던베이글뮤지엄',
      reviews: 142,
      increase: 8,
      positiveRatio: 75,
      analysisData: [
        { name: '맛', positive: 78, negative: 22 },
        { name: '서비스', positive: 82, negative: 18 },
        { name: '가격', positive: 58, negative: 42 },
        { name: '위생', positive: 88, negative: 12 },
        { name: '분위기', positive: 75, negative: 25 },
        { name: '위치', positive: 68, negative: 32 },
      ],
      keywords: [
        { rank: 1, keyword: '베이글', count: 189 },
        { rank: 2, keyword: '크림치즈', count: 145 },
        { rank: 3, keyword: '따뜻한', count: 112 },
        { rank: 4, keyword: '바삭한', count: 98 },
        { rank: 5, keyword: '부드러운', count: 87 },
        { rank: 6, keyword: '신선한', count: 76 },
        { rank: 7, keyword: '고급스러운', count: 65 },
        { rank: 8, keyword: '전통적인', count: 54 },
      ],
      // 경쟁사 분석 데이터 추가
      competitorAnalysis: {
        topGeneralKeywords: ['베이글', '크림치즈', '따뜻한', '바삭한', '부드러운'],
        competitorStores: ['카페페퍼', '파이홀'],
        keywordSentimentComparison: {
          '맛': { myStore: 78, competitors: 82, difference: -4 },
          '서비스': { myStore: 82, competitors: 78, difference: 4 },
          '가격': { myStore: 58, competitors: 65, difference: -7 },
          '위생': { myStore: 88, competitors: 90, difference: -2 },
          '분위기': { myStore: 75, competitors: 80, difference: -5 },
          '위치': { myStore: 68, competitors: 72, difference: -4 }
        }
      }
    },
    '파이홀': {
      name: '파이홀',
      reviews: 203,
      increase: 15,
      positiveRatio: 85,
      analysisData: [
        { name: '맛', positive: 92, negative: 8 },
        { name: '서비스', positive: 85, negative: 15 },
        { name: '가격', positive: 72, negative: 28 },
        { name: '위생', positive: 95, negative: 5 },
        { name: '분위기', positive: 88, negative: 12 },
        { name: '위치', positive: 78, negative: 22 },
      ],
      keywords: [
        { rank: 1, keyword: '파이', count: 234 },
        { rank: 2, keyword: '달콤한', count: 187 },
        { rank: 3, keyword: '바삭한', count: 156 },
        { rank: 4, keyword: '과일', count: 134 },
        { rank: 5, keyword: '크림', count: 123 },
        { rank: 6, keyword: '신선한', count: 98 },
        { rank: 7, keyword: '향기로운', count: 87 },
        { rank: 8, keyword: '예쁜', count: 76 },
      ],
      // 경쟁사 분석 데이터 추가
      competitorAnalysis: {
        topGeneralKeywords: ['파이', '달콤한', '바삭한', '과일', '크림'],
        competitorStores: ['카페페퍼', '런던베이글뮤지엄'],
        keywordSentimentComparison: {
          '맛': { myStore: 92, competitors: 85, difference: 7 },
          '서비스': { myStore: 85, competitors: 80, difference: 5 },
          '가격': { myStore: 72, competitors: 68, difference: 4 },
          '위생': { myStore: 95, competitors: 90, difference: 5 },
          '분위기': { myStore: 88, competitors: 84, difference: 4 },
          '위치': { myStore: 78, competitors: 72, difference: 6 }
        }
      }
    }
  },

  // 가게 변경 액션
  setSelectedStore: (storeName) => {
    set({ selectedStore: storeName });
    
    // 백엔드 API 호출 (실제 구현 시)
    // get().fetchStoreData(storeName);
  },

  // 백엔드에서 가게 데이터 가져오기 (실제 구현 시)
  fetchStoreData: async (storeName) => {
    try {
      // TODO: 실제 백엔드 API 호출
      // const response = await fetch(`/api/stores/${storeName}/analysis`);
      // const data = await response.json();
      // set((state) => ({
      //   storeAnalysisData: {
      //     ...state.storeAnalysisData,
      //     [storeName]: data
      //   }
      // }));
      
      console.log(`백엔드에서 ${storeName} 데이터를 가져옵니다.`);
    } catch (error) {
      console.error('가게 데이터 가져오기 실패:', error);
    }
  },

  // 현재 선택된 가게의 데이터 가져오기
  getCurrentStoreData: (storeName = null) => {
    const { selectedStore, storeAnalysisData } = get();
    const targetStore = storeName || selectedStore;
    return storeAnalysisData[targetStore] || storeAnalysisData['카페페퍼'];
  }
}));

export default useStoreStore;
