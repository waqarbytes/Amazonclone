import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';

  const currentImage = imageErrors[selectedIndex] 
    ? fallbackImage 
    : (images[selectedIndex] || images[0] || fallbackImage);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    setIsLoading(true);
  }, [selectedIndex]);

  return (
    <div 
      className="flex flex-col-reverse md:flex-row gap-4 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Product image gallery for ${title}`}
    >
      {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
      <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:max-h-[500px] hide-scrollbar pb-2 md:pb-0 md:pr-1">
        {images.map((img, idx) => {
          const isSelected = selectedIndex === idx;
          const isErr = imageErrors[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1} of ${images.length}`}
              aria-current={isSelected ? 'true' : 'false'}
              className={`
                relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden p-1 bg-white border-2 transition-all
                focus:outline-none focus:ring-2 focus:ring-amazon-amber
                ${isSelected 
                  ? 'border-amazon-amber ring-2 ring-amazon-amber/30 shadow-sm scale-102' 
                  : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'}
              `}
            >
              <img
                src={isErr ? fallbackImage : img}
                alt={`${title} thumbnail ${idx + 1}`}
                onError={() => setImageErrors(prev => ({ ...prev, [idx]: true }))}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              {isSelected && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-amazon-amber" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative">
        <div
          ref={imageContainerRef}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          className="relative aspect-square w-full bg-white rounded-xl border border-gray-200/90 overflow-hidden flex items-center justify-center cursor-crosshair group shadow-xs"
        >
          {/* Zoom hint badge */}
          <div className="absolute top-3 right-3 z-10 bg-white/85 backdrop-blur-xs text-[11px] text-gray-700 px-2.5 py-1 rounded-full shadow-xs border border-gray-200 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
            <ZoomIn className="w-3.5 h-3.5 text-amazon-muted" />
            <span className="hidden sm:inline">Hover to zoom</span>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100/60 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amazon-amber border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Base Image & Zoom Layer */}
          <img
            src={currentImage}
            alt={title}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageErrors(prev => ({ ...prev, [selectedIndex]: true }));
              setIsLoading(false);
            }}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: 'scale(2.2)',
                    transition: 'transform 0.1s ease-out'
                  }
                : {
                    transform: 'scale(1)',
                    transition: 'transform 0.25s ease-out'
                  }
            }
            className="w-full h-full object-contain p-4 transition-transform will-change-transform"
          />

          {/* Previous / Next Arrow Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image index counter indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};
