
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
      <div className="w-16 h-16 border-4 border-brand-pink border-t-brand-aqua rounded-full animate-spin mb-4"></div>
      <h2 className="text-2xl font-serif font-bold text-brand-black animate-pulse">
        Your pet is becoming art...
      </h2>
      <p className="text-gray-600 mt-2">This magical process can take up to 60 seconds. Please wait!</p>
    </div>
  );
};

export default LoadingSpinner;
