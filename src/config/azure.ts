import type { ChatConfig } from '../types';

// 환경 변수에서 설정값을 가져오거나 기본값 설정
export const azureConfig: ChatConfig = {
  apiKey: import.meta.env.VITE_AZURE_OPENAI_API_KEY || '',
  deploymentName: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_NAME_HIGH || '',
  endpoint: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || '',
  apiVersion: '2024-04-01-preview'
};

export const isSlideRequest = (message: string): boolean => {
  const slideKeywords = [
    '슬라이드',
    'slide',
    '프레젠테이션',
    'presentation',
    '페이지',
    'page',
    '만들어',
    '생성',
    'create',
    'make'
  ];
  
  const lowerMessage = message.toLowerCase();
  return slideKeywords.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}; 