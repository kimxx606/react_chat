import axios from 'axios';
import { azureConfig } from '../config/azure';
import type { Message } from '../types';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateSlideHTML = async (userMessage: string): Promise<string> => {
  const { apiKey, deploymentName, endpoint, apiVersion } = azureConfig;
  
  const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey
  };

  const prompt = `
    사용자 요청: "${userMessage}"
    
    위 요청에 따라 완전한 HTML 슬라이드를 생성해주세요. 
    다음 조건을 만족해야 합니다:
    1. 완전한 HTML 문서 구조 (<!DOCTYPE html>, <html>, <head>, <body>)
    2. 반응형 디자인
    3. 아름다운 CSS 스타일링
    4. 슬라이드 형태의 레이아웃
    5. 사용자의 요청 내용을 반영한 콘텐츠
    
    HTML 코드만 반환해주세요. 설명은 필요 없습니다.
  `;

  const data = {
    messages: [
      {
        role: 'system',
        content: '당신은 전문 웹 개발자입니다. 사용자의 요청에 따라 HTML 슬라이드를 생성합니다.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 4000,
    temperature: 0.7
  };

  try {
    const response = await axios.post<OpenAIResponse>(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Azure OpenAI API 호출 오류:', error);
    throw new Error('슬라이드 생성 중 오류가 발생했습니다.');
  }
};

export const generateChatResponse = async (userMessage: string, messages: Message[]): Promise<string> => {
  const { apiKey, deploymentName, endpoint, apiVersion } = azureConfig;
  
  const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey
  };

  const conversationHistory = messages.slice(-5).map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  const data = {
    messages: [
      {
        role: 'system',
        content: '당신은 도움이 되는 AI 어시스턴트입니다. 친근하고 유용한 답변을 제공합니다.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ],
    max_tokens: 1000,
    temperature: 0.7
  };

  try {
    const response = await axios.post<OpenAIResponse>(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Azure OpenAI API 호출 오류:', error);
    throw new Error('응답 생성 중 오류가 발생했습니다.');
  }
}; 