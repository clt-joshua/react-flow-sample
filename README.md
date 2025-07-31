# 🚢 선박 예약 챗봇 플로우 에디터

React Flow를 활용한 시각적 챗봇 플로우 편집 도구입니다. 선박 예약 시스템의 대화형 플로우를 시각적으로 구성하고 편집할 수 있습니다.

## ✨ 주요 기능

- **시각적 플로우 편집**: 드래그 앤 드롭으로 노드 위치 조정
- **다양한 노드 타입**: 슬롯 채우기, 텍스트 출력, 확인 노드 지원
- **빠른 답변 관리**: 동적으로 빠른 답변 옵션 추가/삭제
- **실시간 연결**: 노드 간 연결 생성 및 관리
- **미니맵 지원**: 전체 플로우 구조 한 눈에 파악
- **줌/팬 컨트롤**: 세밀한 편집을 위한 확대/축소 기능

## 🛠️ 기술 스택

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **빌드 툴**: Vite 7.0.4
- **플로우 라이브러리**: @xyflow/react 12.8.2
- **패키지 관리자**: pnpm
- **린터**: ESLint 9.30.1

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Edge.tsx        # 커스텀 엣지 컴포넌트
│   ├── Handle.tsx      # 연결 핸들 컴포넌트
│   └── Node.tsx        # 노드 컴포넌트 (SlotNode, TextNode)
├── utils/              # 유틸리티 함수들
│   ├── flowUtils.ts    # React Flow 관련 유틸리티
│   ├── styleUtils.ts   # 스타일 관련 유틸리티
│   ├── validationUtils.ts # 검증 관련 유틸리티
│   └── index.ts        # 유틸리티 진입점
├── constants.ts        # 상수 및 설정값
├── types.ts           # TypeScript 타입 정의
├── data.ts            # 초기 노드/엣지 데이터
├── App.tsx            # 메인 애플리케이션
├── App.css            # 스타일시트
└── main.tsx           # 애플리케이션 진입점
```

## 🚀 설치 및 실행

### 필수 요구사항

- Node.js 18.0 이상
- pnpm (권장) 또는 npm

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd react-flow-sample

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
pnpm dev

# 또는 npm 사용시
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

## 📋 노드 타입 설명

### 1. 슬롯 채우기 노드 (SlotFilling)
- 사용자 입력을 받아 특정 슬롯을 채우는 노드
- 빠른 답변 옵션 제공 가능
- 예: 출발 항구, 목적 항구, 출발일 등

### 2. 텍스트 노드 (Text)
- 단순한 메시지 출력용 노드
- 사용자 입력 없이 정보만 전달
- 예: 시작 메시지, 완료 메시지

### 3. 확인 노드 (Confirmation)
- 사용자의 확인/취소 선택을 받는 노드
- 예약 정보 확인 및 최종 결정

## 🎯 주요 컴포넌트

### App.tsx
- 메인 애플리케이션 컴포넌트
- React Flow 설정 및 이벤트 처리
- 노드/엣지 상태 관리

### Node.tsx
- `SlotNode`: 슬롯 채우기 기능을 가진 노드
- `TextNode`: 단순 텍스트 출력 노드
- 빠른 답변 동적 관리 기능

### Edge.tsx
- 커스텀 엣지 컴포넌트
- 베지어 곡선을 사용한 부드러운 연결선
- 엣지 중앙에 라벨 표시

### Handle.tsx
- 노드 간 연결을 위한 핸들 컴포넌트
- 연결 상태에 따른 시각적 피드백
- 소스/타겟 구분 표시

## ⚙️ 설정 및 상수

### constants.ts
- UI 관련 상수 (노드 크기, 간격 등)
- 스타일 설정 (색상, 핸들 스타일)
- 예약 시스템 상수 (컨테이너 타입, 검증 규칙)

### types.ts
- TypeScript 인터페이스 및 타입 정의
- 노드 데이터 구조
- 컴포넌트 Props 인터페이스

## 🔧 유틸리티 함수

### flowUtils.ts
- React Flow 관련 유틸리티
- 베지어 곡선 경로 생성
- 핸들 ID 생성 등

### validationUtils.ts
- 입력 검증 함수들
- 날짜, 항구명, 화물 무게 검증
- 예약 데이터 전체 검증

### styleUtils.ts
- 스타일 관련 유틸리티
- 클래스명 조합
- 핸들 상태별 스타일 반환

## 🎨 커스터마이징

### 노드 타입 추가
1. `src/types.ts`에 새로운 노드 타입 정의
2. `src/components/Node.tsx`에 새 컴포넌트 구현
3. `src/App.tsx`의 `nodeTypes`에 등록

### 스타일 수정
- `src/App.css`: 기본 노드 스타일
- `src/constants.ts`: 색상 및 크기 상수
- React Flow CSS 변수 활용 가능

## 📊 데이터 구조

### 초기 노드 데이터 (src/data.ts)
```typescript
{
  id: "node-id",
  type: "slotFilling" | "text" | "confirmation",
  position: { x: number, y: number },
  data: {
    text: string,
    hasQuickReplies?: boolean,
    slot?: string,
    quickReplies?: QuickReply[]
  }
}
```

### 초기 엣지 데이터
```typescript
{
  id: "edge-id",
  source: "source-node-id",
  target: "target-node-id",
  sourceHandle: "handle-id",
  targetHandle: "handle-id",
  animated: boolean
}
```

## 🐛 디버깅

### 개발자 도구
- 노드/엣지 변경사항이 콘솔에 로그됩니다
- React DevTools로 컴포넌트 상태 확인 가능

### 일반적인 문제
1. **노드가 연결되지 않는 경우**: 핸들 ID 확인
2. **스타일이 적용되지 않는 경우**: CSS 클래스명 및 상수 확인
3. **타입 에러**: `src/types.ts`의 인터페이스 정의 확인

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

이슈가 있거나 질문이 있으시면 GitHub Issues를 통해 문의해 주세요.
