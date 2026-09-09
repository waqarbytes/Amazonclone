import React, { useEffect } from 'react';

export interface HeroSlide {
  id: string;
  category: string;
  title: string;
  image: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-tech',
    category: 'Electronics & Audio',
    title: 'Modern Workstation & Audio Gear',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-home',
    category: 'Home & Kitchen',
    title: 'Contemporary Culinary & Home Living',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-fashion',
    category: 'Fashion & Apparel',
    title: 'Minimalist Wardrobe & Lifestyle Style',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-books',
    category: 'Books & Reading',
    title: 'Inspiring Literature & Mindful Reading',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-beauty',
    category: 'Beauty & Wellness',
    title: 'Clean Skincare & Personal Care',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80'
  }
];

export interface HeroBackgroundSliderProps {
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  prefersReducedMotion: boolean;
}

export const HeroBackgroundSlider: React.FC<HeroBackgroundSliderProps> = ({
  currentSlide,
  onSelectSlide,
  prefersReducedMotion
}) => {
  // Preload all slides on mount to prevent any blank image flashes during crossfades
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <>
      {/* Background Slides Layers */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`
                absolute inset-0 bg-cover bg-center
                ${prefersReducedMotion 
                  ? (isActive ? 'opacity-80' : 'opacity-0') 
                  : `transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-80' : 'opacity-0'}`}
              `}
              style={{
                backgroundImage: `url("${slide.image}")`
              }}
            />
          );
        })}

        {/* Two-sided gradient: 65% dark navy on left for crisp text contrast, 35% in center, 20% on right for rich image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-amazon-dark/65 via-amazon-slate/35 to-amazon-dark/20" />

        {/* Subtle dark bottom fade into homepage content (no gray fog) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-amazon-dark/50" />
      </div>

      {/* Slide Pagination Indicator Dots */}
      <div 
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Hero background slides"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
              onClick={() => onSelectSlide(idx)}
              className={`
                transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amazon-amber focus:ring-offset-2 focus:ring-offset-amazon-dark
                ${isActive 
                  ? 'w-7 h-2 bg-amazon-amber shadow-sm' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/80'}
              `}
            />
          );
        })}
      </div>
    </>
  );
};
