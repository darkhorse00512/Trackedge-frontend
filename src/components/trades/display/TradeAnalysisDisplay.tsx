import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, FileText } from "lucide-react";
import parse from 'html-react-parser';

interface TradeAnalysisDisplayProps {
  tradeAnalysis?: {
    setup?: string;
    reasonForEntry?: string;
    reasonForExit?: string;
    notes?: string;
  };
}

const TradeAnalysisDisplay: React.FC<TradeAnalysisDisplayProps> = ({ tradeAnalysis }) => {
  if (!tradeAnalysis || (!tradeAnalysis.setup && !tradeAnalysis.reasonForEntry && !tradeAnalysis.reasonForExit && !tradeAnalysis.notes)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Trade Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No trade analysis recorded</p>
            <p className="text-xs mt-1">Setup details and analysis notes not available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Trade Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trade Setup */}
        {tradeAnalysis.setup && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Setup Analysis
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(tradeAnalysis.setup)}
              </div>
            </div>
          </div>
        )}

        {/* Entry and Exit Analysis */}
        {(tradeAnalysis.reasonForEntry || tradeAnalysis.reasonForExit) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Entry & Exit Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reason for Entry */}
              {tradeAnalysis.reasonForEntry && (
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Entry Decision
                  </h4>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {parse(tradeAnalysis.reasonForEntry)}
                    </div>
                  </div>
                </div>
              )}

              {/* Reason for Exit */}
              {tradeAnalysis.reasonForExit && (
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    Exit Decision
                  </h4>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {parse(tradeAnalysis.reasonForExit)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Analysis Notes */}
        {tradeAnalysis.notes && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Additional Analysis
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(tradeAnalysis.notes)}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Summary */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Analysis Summary</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            {tradeAnalysis.setup && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Setup Documented:</span>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-semibold">Yes</span>
                </div>
              </div>
            )}
            
            {tradeAnalysis.reasonForEntry && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Entry Analysis:</span>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">Documented</span>
                </div>
              </div>
            )}
            
            {tradeAnalysis.reasonForExit && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Exit Analysis:</span>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <TrendingDown className="w-4 h-4" />
                  <span className="font-semibold">Documented</span>
                </div>
              </div>
            )}

            {tradeAnalysis.notes && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Additional Notes:</span>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">Available</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm font-medium text-muted-foreground">Analysis Completeness:</span>
              <span className="font-semibold">
                {[tradeAnalysis.setup, tradeAnalysis.reasonForEntry, tradeAnalysis.reasonForExit, tradeAnalysis.notes]
                  .filter(Boolean).length}/4 sections
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Quality Indicators */}
        <div className="bg-background border rounded-lg p-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">Analysis Quality Indicators:</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${tradeAnalysis.setup ? 'bg-green-500' : 'bg-gray-300'}`} />
              Setup Analysis
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${tradeAnalysis.reasonForEntry ? 'bg-green-500' : 'bg-gray-300'}`} />
              Entry Reasoning
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${tradeAnalysis.reasonForExit ? 'bg-green-500' : 'bg-gray-300'}`} />
              Exit Reasoning
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${tradeAnalysis.notes ? 'bg-green-500' : 'bg-gray-300'}`} />
              Additional Notes
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeAnalysisDisplay;