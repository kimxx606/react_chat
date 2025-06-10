import React, { useState, useEffect } from 'react';
import { Code, Eye, Copy, Download } from 'lucide-react';
import CodeEditor from './CodeEditor';
import SlidePreview from './SlidePreview';

interface CodeCanvasProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  isVisible: boolean;
}

const CodeCanvas: React.FC<CodeCanvasProps> = ({
  initialCode = '',
  onCodeChange,
  isVisible
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    if (initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('코드가 클립보드에 복사되었습니다!');
  };

  const downloadAsFile = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slide.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'editor'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              코드 에디터
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'preview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              미리보기
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
              title="클립보드에 복사"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={downloadAsFile}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
              title="HTML 파일로 다운로드"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === 'editor' ? (
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language="html"
            height="500px"
          />
        ) : (
          <SlidePreview
            htmlCode={code}
            height="500px"
          />
        )}
      </div>
    </div>
  );
};

export default CodeCanvas; 