
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface DashboardPreviewProps {
  className?: string;
}

const DashboardPreview = ({ className }: DashboardPreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const lightImages = [
    '/uploads/e918e133-d1a0-41c4-9c5a-fe142b64d43d.png',
    '/uploads/9ec947b6-042c-44bc-8424-461f29a2151f.png',
    '/uploads/855d9895-480a-413e-a6e3-f466a7e5f883.png',
  ];
  
  const darkImages = [
    '/uploads/d553d654-e3b0-4978-8e17-2afffe00f01a.png',
    '/uploads/0ea0aedb-16e4-42cb-80a2-9c63aad99f72.png',
    '/uploads/5ef18c62-9fc6-434a-bd92-bb1450d66e7a.png',
  ];
  
  const images = isDark ? darkImages : lightImages;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 600);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length, isDark]);

  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden shadow-lg h-[350px] md:h-[400px] rotate-[-3deg]",
      className
    )}>
      {images.map((image, index) => (
        <div 
          key={image}
          className={cn(
            "absolute inset-0 transition-all duration-700",
            currentIndex === index 
              ? "opacity-100 z-10 scale-100" 
              : "opacity-0 z-0 scale-90",
            isTransitioning && currentIndex === index && "animate-pulse-gradient"
          )}
        >
          <img 
            src={image} 
            alt={`Dashboard preview ${index + 1}`}
            className={cn(
              "w-full h-full object-cover object-top transition-transform duration-700",
              isTransitioning && currentIndex === index && "scale-110"
            )}
          />
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, index) => (
          <button 
            key={`dot-${index}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 600);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index 
                ? "bg-primary w-4" 
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 z-10"></div>
    </div>
  );
};

export default DashboardPreview;
