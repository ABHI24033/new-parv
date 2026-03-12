'use client';

import React from 'react';

const FloatingWhatsAppButton = () => {
  return (
    <div
      className="fixed bottom-4 bg-green-200 right-4 z-50 rounded-full p-4 shadow-lg"
      style={{
        animation: 'pulseBlink 4s ease-in-out infinite',
      }}
    >
      <a
        href="https://wa.me/917292800809"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
      </a>

      {/* Inline animation keyframes */}
      <style jsx>{`
        @keyframes pulseBlink {
          0%, 100% {
            opacity: 1;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.10);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingWhatsAppButton;
