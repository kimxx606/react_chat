export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  htmlCode?: string;
}

export interface SlideData {
  id: string;
  title: string;
  htmlCode: string;
  createdAt: Date;
}

export interface ChatConfig {
  apiKey: string;
  deploymentName: string;
  endpoint: string;
  apiVersion: string;
} 