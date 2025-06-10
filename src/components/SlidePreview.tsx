import React, { useEffect, useRef } from 'react';

interface SlidePreviewProps {
  htmlCode: string;
  height?: string;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ 
  htmlCode, 
  height = '400px' 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && htmlCode) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
      }
    }
  }, [htmlCode]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">슬라이드 미리보기</h3>
      </div>
      <iframe
        ref={iframeRef}
        style={{ height }}
        className="w-full border-0"
        title="Slide Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default SlidePreview; 