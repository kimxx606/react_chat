# 슬라이드 생성 챗봇

실시간 코딩이 가능한 슬라이드 생성 챗봇입니다. Azure OpenAI를 사용하여 HTML 슬라이드를 자동 생성하고, 코드 캔버스에서 확인 및 수정할 수 있습니다.

## 주요 기능

- 🤖 **AI 기반 슬라이드 생성**: Azure OpenAI를 사용한 HTML 슬라이드 자동 생성
- 💻 **실시간 코드 에디터**: Monaco Editor를 사용한 코드 편집
- 👀 **실시간 미리보기**: 코드 변경사항을 실시간으로 확인
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- 🎯 **스마트 감지**: 슬라이드 관련 질문을 자동으로 감지
- 📁 **파일 다운로드**: 생성된 HTML을 파일로 다운로드

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Azure OpenAI 설정을 입력하세요.

```bash
VITE_AZURE_OPENAI_API_KEY=your_api_key_here
VITE_AZURE_OPENAI_DEPLOYMENT_NAME_HIGH=your_deployment_name_here
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
```

3. 개발 서버 실행:
```bash
npm run dev
```

## 사용법

1. 채팅 창에서 슬라이드 생성 요청을 입력하세요:
   - "슬라이드 만들어줘"
   - "프레젠테이션 생성해줘"
   - "React에 대한 슬라이드 만들어줘"

2. AI가 HTML 슬라이드를 생성하면 코드 캔버스가 나타납니다.

3. 코드 에디터에서 HTML 코드를 수정하고 미리보기에서 확인할 수 있습니다.

4. 완성된 슬라이드는 HTML 파일로 다운로드할 수 있습니다.

## 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **AI**: Azure OpenAI

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ChatInput.tsx   # 메시지 입력 컴포넌트
│   ├── ChatMessage.tsx # 메시지 표시 컴포넌트
│   ├── CodeCanvas.tsx  # 코드 캔버스 컴포넌트
│   ├── CodeEditor.tsx  # 코드 에디터 컴포넌트
│   └── SlidePreview.tsx # 슬라이드 미리보기 컴포넌트
├── config/             # 설정 파일
│   └── azure.ts        # Azure OpenAI 설정
├── services/           # API 서비스
│   └── azureOpenAI.ts  # Azure OpenAI API 호출
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 정의
└── App.tsx             # 메인 앱 컴포넌트
```

## 라이센스

MIT License
