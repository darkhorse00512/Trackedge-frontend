import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { htmlToText } from 'html-to-text';
import { useNavigate } from "react-router-dom";

export interface Setup {
  setupId: string;
  name: string;
  entryStrategy: string;
  holdingStrategy: string;
  exitStrategy: string;
  imageUrls: string[];
  totalPnL: number; // Added profit & loss field
}


interface StrategiesTableProps {
  setups: Setup[];
  onSetupClick: (setup: Setup) => void;
}

const StrategiesTable: React.FC<StrategiesTableProps> = ({
  setups,
  onSetupClick,
}) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  // Smooth carousel navigation
  const handlePrevImage = (setupId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = currentImageIndex[setupId] || 0;
    const newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [setupId]: newIndex }));
  };

  const handleNextImage = (setupId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = currentImageIndex[setupId] || 0;
    const newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    setCurrentImageIndex(prev => ({ ...prev, [setupId]: newIndex }));
  };

  const getProfitLossDisplay = (profitLoss: number) => {
    if (profitLoss > 0)
      return (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">
            +${profitLoss.toLocaleString()}
          </span>
        </div>
      );

    if (profitLoss < 0)
      return (
        <div className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-600" />
          <span className="font-semibold text-red-600">
            -${Math.abs(profitLoss).toLocaleString()}
          </span>
        </div>
      );

    return (
      <div className="flex items-center gap-2">
        <Minus className="h-4 w-4 text-gray-600" />
        <span className="font-semibold text-gray-600">$0</span>
      </div>
    );
  };

  return (
    <div>
      {setups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {setups.map((setup, index) => (
            <Card
              key={setup.setupId}
              className="group overflow-hidden flex flex-col border border-border/60 hover:shadow-md transition-shadow w-full cursor-pointer"
              onClick={() => onSetupClick(setup)}
            >
              <div className="p-4 flex items-center justify-between border-b">
                <Badge className="font-medium">
                  {setup.name}
                </Badge>
                <div className="text-xs">
                  {getProfitLossDisplay(setup.totalPnL)}
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col">
                {setup.imageUrls && setup.imageUrls.length > 0 && (
                  <div className="mb-3 relative">
                    <div className="rounded overflow-hidden bg-muted aspect-video relative">
                      {/* Image carousel container */}
                      <div className="relative w-full h-full">
                        <div 
                          className="flex transition-transform duration-500 ease-in-out h-full"
                          style={{
                            transform: `translateX(-${(currentImageIndex[setup.setupId] || 0) * 100}%)`
                          }}
                        >
                          {setup.imageUrls.map((imageUrl, index) => (
                            <div
                              key={index}
                              className="min-w-full h-full flex-shrink-0"
                            >
                              <img
                                src={imageUrl}
                                alt={`Setup image ${index + 1} for ${setup.name}`}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                onClick={() => {
                                  window.open(imageUrl, '_blank');
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Carousel navigation - only show if multiple images */}
                      {setup.imageUrls.length > 1 && (
                        <>
                          {/* Previous button */}
                          <button
                            onClick={(e) => handlePrevImage(setup.setupId, setup.imageUrls.length, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          
                          {/* Next button */}
                          <button
                            onClick={(e) => handleNextImage(setup.setupId, setup.imageUrls.length, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                          
                          {/* Dot indicators */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {setup.imageUrls.map((_, index) => (
                              <button
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                  index === (currentImageIndex[setup.setupId] || 0)
                                    ? 'bg-white'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(prev => ({ ...prev, [setup.setupId]: index }));
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Image counter */}
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {(currentImageIndex[setup.setupId] || 0) + 1} / {setup.imageUrls.length}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Entry:</span>
                    <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                      {htmlToText(setup.entryStrategy).length > 80
                        ? `${htmlToText(setup.entryStrategy).substring(0, 80)}...`
                        : htmlToText(setup.entryStrategy)}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-muted-foreground">Holding:</span>
                    <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                      {htmlToText(setup.holdingStrategy).length > 80
                        ? `${htmlToText(setup.holdingStrategy).substring(0, 80)}...`
                        : htmlToText(setup.holdingStrategy)}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-muted-foreground">Exit:</span>
                    <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                      {htmlToText(setup.exitStrategy).length > 80
                        ? `${htmlToText(setup.exitStrategy).substring(0, 80)}...`
                        : htmlToText(setup.exitStrategy)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/setup/${setup.setupId}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-slate-400 dark:text-slate-500 text-lg">
            No setups found
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Try adjusting your search filters
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategiesTable;
