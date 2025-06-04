"use client"

import React, { useEffect, useRef } from 'react';

export default function TallyEmbed() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Load Tally embed script
    const loadTallyScript = () => {
      // Check if Tally is already loaded
      if (window['Tally']) {
        window['Tally'].loadEmbeds();
        return;
      }

      // Check if script is already added
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (existingScript) return;

      // Create and load the script
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.onload = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
        }
      };
      script.onerror = () => {
        // Fallback: manually set iframe src if script fails
        const iframes = document.querySelectorAll('iframe[data-tally-src]:not([src])');
        iframes.forEach((element) => {
          const iframe = element as HTMLIFrameElement;
          if (iframe.dataset.tallySrc) {
            iframe.src = iframe.dataset.tallySrc;
          }
        });
      };
      document.body.appendChild(script);
    };

    loadTallyScript();

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const script = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Week 13 Questions</h2>
          <p className="text-gray-600 text-sm mt-1">Please fill out the form below</p>
        </div>
        
        <div className="p-2">
          <iframe
            ref={iframeRef}
            data-tally-src="https://tally.so/embed/nG4NYk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="214"
            frameBorder="0"
            // marginHeight="0"
            // marginWidth="0"
            title="Week 13 Questions"
            className="w-full min-h-[214px] border-0"
            style={{ 
              border: 'none',
              background: 'transparent'
            }}
          />
        </div>
      </div>
      
      {/* Loading fallback */}
      {/* <div className="mt-4 text-center text-gray-500 text-sm">
        <p>If the form doesn't load, you can access it directly at: 
          <a 
            href="https://tally.so/r/nG4NYk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 ml-1 underline"
          >
            tally.so/r/nG4NYk
          </a>
        </p>
      </div> */}
    </div>
  );
}