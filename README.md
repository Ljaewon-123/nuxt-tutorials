# Nuxt Tutorials

Nuxt 4를 활용한 다양한 기능 학습 및 실험 프로젝트 모음입니다.

## 📂 프로젝트 목록

### **better-auth**
Better Auth 라이브러리를 사용한 완전한 인증 시스템 구현 프로젝트입니다.
- Magic Link 인증
- 2FA (Two-Factor Authentication)
- OAuth 소셜 로그인 (Google, GitHub 등)
- Autocannon을 활용한 부하 테스트
- 부하테스트 결과 문서화

### **deploy-env**
Kubernetes 환경에서 Nuxt의 런타임 환경 변수 관리 패턴을 학습합니다.
- K8s ConfigMap/Secret 연동
- 런타임 환경 변수 처리
- 배포 환경 설정 관리

### **finance-tracking-supabase**
Supabase를 백엔드로 활용한 금융 추적 애플리케이션입니다.
- Supabase Auth & Database 통합
- RLS (Row Level Security) 정책 구현
- 실시간 데이터 동기화
- 사용자별 데이터 격리

### **hybrid-rendering**
Nuxt의 다양한 렌더링 모드를 실험하는 프로젝트입니다.
- SSR (Server-Side Rendering)
- SSG (Static Site Generation)
- ISR (Incremental Static Regeneration)
- Hybrid Rendering 패턴 탐구

### **movies-app**
외부 영화 API를 연동한 영화 정보 애플리케이션입니다.
- TMDB API 연동
- 영화 검색 및 필터링
- 데이터 fetching 패턴 학습
- 반응형 UI 구현

### **my-module**
Nuxt 커스텀 모듈 개발 방법을 학습합니다.
- 모듈 구조 및 생명주기
- 플러그인 자동 등록
- 설정 확장 패턴
- 재사용 가능한 기능 패키징

### **nest-auth-guard**
인증 및 권한 관리 미들웨어 패턴 구현 프로젝트입니다.
- 인증 미들웨어 구현
- Role-based Access Control (RBAC)
- Guard 패턴 적용
- Plugin에서 Composable로의 전환

### **nitro-KV**
Nitro의 Key-Value 스토리지를 활용한 데이터 관리 학습입니다.
- Nitro KV Storage API
- 빠른 서버 측 캐싱
- 세션 관리 패턴

### **nuxt-TresJS**
TresJS를 활용한 Vue 3D 그래픽 렌더링 프로젝트입니다.
- Three.js Vue 통합
- 3D 이벤트 핸들링
- 애니메이션 및 인터랙션
- 3D 씬 구성 및 최적화

### **nuxt-auth**
Nuxt 공식 인증 라이브러리인 `nuxt-auth-utils`를 활용한 인증 시스템 구현입니다.
- Magic Link 인증 (이메일 기반 passwordless 로그인)
- OAuth 소셜 로그인 통합
- 세션 관리 및 보안
- Inspira UI & PrimeVue 통합
- Dark Mode 지원

### **nuxt-caching-data**
효율적인 데이터 캐싱 전략과 에러 핸들링 패턴을 학습합니다.
- `useNuxtData`를 활용한 캐시 관리
- Re-fetch 및 Stale-While-Revalidate 패턴
- Circuit Breaker 패턴 구현
- 장애 격리 및 복구 전략

### **nuxt-tutorial**
Nuxt의 핵심 기능들을 체계적으로 학습하는 기본 튜토리얼 프로젝트입니다.
- Nested Routes & 동적 라우팅
- Component 네임스페이스 관리
- SSE (Server-Sent Events) 구현
- WebSocket 실시간 통신
- Tailwind를 활용한 Drawer UI
- 커스텀 헤더를 통한 데이터 전달

### **nuxt-ui**
Nuxt UI 컴포넌트 라이브러리 활용법을 탐구합니다.
- Nuxt UI 컴포넌트 시스템
- 디자인 시스템 구축
- 반응형 컴포넌트 활용

### **randoms**
다양한 실험적 기능과 패턴을 테스트하는 샌드박스 프로젝트입니다.
- Null-safe Event Handler 구현
- 타입 안전한 에러 처리
- Type-safe API 호출 패턴
- Zod를 활용한 스키마 빌더
- parseErrorData 유틸리티

### **shopiverse**
전자상거래 기능을 포함한 쇼핑몰 프로젝트입니다.
- 장바구니 기능
- 결제 시스템 연동
- 상품 관리
- 사용자 인증

### **storybook**
Storybook을 활용한 컴포넌트 문서화 및 테스트 프로젝트입니다.
- 컴포넌트 카탈로그 구축
- 독립된 환경에서의 컴포넌트 개발
- Autocannon 부하 테스트 통합
- 인터랙티브 문서화

### **tutorial-portfolio**
포트폴리오 웹사이트 구축을 통한 실전 프로젝트입니다.
- 반응형 디자인
- 성능 최적화
- 애니메이션 효과
- 모바일 최적화

---

## 기술 스택

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PrimeVue, Inspira UI
- **Auth**: Better Auth, nuxt-auth-utils, Supabase Auth
- **3D Graphics**: TresJS (Three.js for Vue)
- **Testing**: Storybook, Autocannon
- **Database**: Supabase
- **Deployment**: Kubernetes

## 학습 주제

- Authentication & Authorization
- Data Caching & Optimization
- Real-time Communication (SSE, WebSocket)
- 3D Graphics Rendering
- Type-safe Development
- Error Handling Patterns
- Performance Testing
- Component Documentation
- Hybrid Rendering Strategies
