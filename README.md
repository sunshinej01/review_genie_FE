# Review Genie Frontend

AI 기반 리뷰 분석 플랫폼의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: JavaScript
- **스타일링**: Tailwind CSS
- **패키지 매니저**: npm
- **API 통신**: Axios
- **개발 서버**: TurboPack

## 프로젝트 구조

```
review_genie_FE/
├── src/
│   ├── app/
│   │   ├── layout.js          # 루트 레이아웃
│   │   ├── page.js            # 메인 페이지
│   │   └── globals.css        # 전역 스타일
│   └── lib/
│       └── axios.js           # Axios 설정
├── package.json               # 프로젝트 의존성
├── next.config.js             # Next.js 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── postcss.config.js          # PostCSS 설정
└── README.md                  # 프로젝트 문서
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API 설정
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 환경 설정
NODE_ENV=development
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 4. 빌드

```bash
npm run build
```

### 5. 프로덕션 서버 실행

```bash
npm start
```

## 주요 기능

- **AI 분석**: AI를 활용한 리뷰 분석 및 인사이트 도출
- **실시간 모니터링**: 실시간 리뷰 모니터링 및 알림
- **대시보드**: 직관적인 데이터 시각화 및 대시보드
- **API 통신**: Axios를 활용한 효율적인 API 통신

## 개발 가이드

### 컴포넌트 추가

새로운 컴포넌트는 `src/components/` 디렉토리에 추가하세요.

### 페이지 추가

새로운 페이지는 `src/app/` 디렉토리에 추가하세요. App Router 구조를 따릅니다.

### API 호출

`src/lib/axios.js`에서 설정된 Axios 인스턴스를 사용하여 API를 호출하세요.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
