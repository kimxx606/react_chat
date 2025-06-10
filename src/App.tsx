import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Settings } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import CodeCanvas from './components/CodeCanvas';
import { generateSlideHTML, generateChatResponse } from './services/azureOpenAI';
import { isSlideRequest } from './config/azure';
import type { Message } from './types';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentSlideCode, setCurrentSlideCode] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'ai', htmlCode?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      htmlCode
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (messageText: string) => {
    addMessage(messageText, 'user');
    setIsLoading(true);

    try {
      const isSlideReq = isSlideRequest(messageText);
      
      if (isSlideReq) {
        // 슬라이드 요청인 경우
        const htmlCode = await generateSlideHTML(messageText);
        setCurrentSlideCode(htmlCode);
        setShowCanvas(true);
        addMessage('슬라이드를 생성했습니다! 코드 캔버스에서 확인하고 수정할 수 있습니다.', 'ai', htmlCode);
      } else {
        // 일반 채팅인 경우
        const response = await generateChatResponse(messageText, messages);
        setShowCanvas(false);
        addMessage(response, 'ai');
      }
    } catch (error) {
      addMessage('죄송합니다. 오류가 발생했습니다. 설정을 확인해주세요.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (code: string) => {
    setCurrentSlideCode(code);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-800">슬라이드 생성 챗봇</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 설정 패널 */}
      {showSettings && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Azure OpenAI 설정</h3>
            <p className="text-sm text-yellow-700">
              .env 파일에 다음 환경 변수를 설정해주세요:
            </p>
            <ul className="text-sm text-yellow-700 mt-1 space-y-1">
              <li>• VITE_AZURE_OPENAI_API_KEY</li>
              <li>• VITE_AZURE_OPENAI_DEPLOYMENT_NAME_HIGH</li>
              <li>• VITE_AZURE_OPENAI_ENDPOINT</li>
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-80px)]">
        {/* 채팅 영역 */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">안녕하세요!</p>
                <p className="text-sm mt-1">슬라이드 생성을 위한 챗봇입니다.</p>
                <p className="text-sm text-gray-400 mt-2">
                  "슬라이드 만들어줘" 또는 "프레젠테이션 생성해줘"와 같이 입력해보세요.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>

        {/* 코드 캔버스 영역 */}
        <div className={`${showCanvas ? 'block' : 'hidden lg:block'}`}>
          {showCanvas ? (
            <CodeCanvas
              initialCode={currentSlideCode}
              onCodeChange={handleCodeChange}
              isVisible={true}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-200 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium">코드 캔버스</p>
                <p className="text-sm mt-1">슬라이드 생성 요청 시 여기에 코드 에디터가 나타납니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
