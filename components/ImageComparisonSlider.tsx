import React, { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);
  
  const handleTouchMove = useCallback((e: globalThis.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);


  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto aspect-square overflow-hidden rounded-xl shadow-lg cursor-ew-resize select-none"
      onMouseLeave={handleMouseUp}
    >
      <img
        src={afterImage}
        alt={altAfter}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={altBefore}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="absolute top-0 h-full w-1.5 bg-white bg-opacity-80 backdrop-blur-sm cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 3px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
