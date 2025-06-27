import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, FileText, TrendingUp } from "lucide-react";
import parse from 'html-react-parser';

interface StrategyDisplayProps {
  strategy: {
    setupId: string;
    name: string;
    description?: string;
    rules?: string;
    imageUrls?: string[];
  } | null;
}

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ strategy }) => {
  if (!strategy) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Strategy
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No strategy linked to this trade</p>
            <p className="text-xs mt-1">Strategy information not available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Strategy
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Strategy Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">{strategy.name}</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              Setup ID: {strategy.setupId.slice(-8)}
            </Badge>
          </div>
        </div>

        {/* Strategy Description */}
        {strategy.description && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(strategy.description)}
              </div>
            </div>
          </div>
        )}

        {/* Strategy Rules */}
        {strategy.rules && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b flex items-center gap-2">
              <Target className="w-4 h-4" />
              Trading Rules
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(strategy.rules)}
              </div>
            </div>
          </div>
        )}

        {/* Strategy Images */}
        {strategy.imageUrls && strategy.imageUrls.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b">Strategy Charts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategy.imageUrls.map((imageUrl, index) => (
                <div 
                  key={index}
                  className="relative group rounded-lg overflow-hidden bg-muted aspect-video cursor-pointer"
                  onClick={() => window.open(imageUrl, '_blank')}
                >
                  <img
                    src={imageUrl}
                    alt={`${strategy.name} chart ${index + 1}`}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view full size
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategy Summary */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b">Strategy Summary</h4>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Strategy Name:</span>
              <span className="font-semibold">{strategy.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Has Description:</span>
              <div className="flex items-center gap-2">
                {strategy.description ? (
                  <>
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">Yes</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-400">No</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Has Rules:</span>
              <div className="flex items-center gap-2">
                {strategy.rules ? (
                  <>
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">Yes</span>
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-400">No</span>
                  </>
                )}
              </div>
            </div>

            {strategy.imageUrls && strategy.imageUrls.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Charts Available:</span>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">{strategy.imageUrls.length} chart{strategy.imageUrls.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyDisplay;