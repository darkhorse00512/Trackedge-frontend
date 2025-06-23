
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  title?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0,
  title 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetView();
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetView();
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
      case '0':
        resetView();
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-0">
        {/* Header */}
        <div className="absolute top-10 z-10 left-4 right-4 flex items-center justify-between">
          <div className="bg-black/50 rounded-lg px-3 py-2">
            <h3 className="text-white font-medium">
              {currentIndex + 1} of {images.length}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                disabled={zoom <= 0.5}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-white text-sm min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                disabled={zoom >= 5}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={resetView}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm h-12 w-12 p-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm h-12 w-12 p-0"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Main Image */}
        <div 
          className="flex items-center justify-center h-full overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
            onDoubleClick={() => zoom === 1 ? zoomIn() : resetView()}
            draggable={false}
          />
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetView();
                  }}
                  className={`w-12 h-8 rounded overflow-hidden transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-white opacity-100' 
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
            <div>← → Navigate | Double-click to zoom | +/- Zoom | ESC Close</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarousel;