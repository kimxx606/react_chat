import React, { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요... (슬라이드 관련 질문을 하면 코드 캔버스가 나타납니다)"
          className="w-full px-4 py-2 min-h-[44px] max-h-32 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={1}
          disabled={isLoading}
        />
      </div>
      
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`flex items-center justify-center w-11 h-11 rounded-lg transition-colors ${
          message.trim() && !isLoading
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput; 