import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Clock, Target, DollarSign } from "lucide-react";
import { calculatePips, getPipValue } from "@/lib/trade-calculations";

export interface JournalEntryResults {
  pnl: number;
  holdTime: number;
  rMultiple?: number;
}

interface ResultsSectionProps {
  formData: any; // Using any to access all trade form data
  results: JournalEntryResults;
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  formData, 
  results,
  setResults
}) => {
  // Calculate results automatically when relevant data changes
  useEffect(() => {
    const calculateResults = () => {
      let calculatedPnL = 0;
      let calculatedHoldTime = 0;
      let calculatedRMultiple: number | undefined = undefined;

      // Calculate P&L if we have required data
      if (
        formData.symbol && 
        formData.type && 
        formData.entryPrice > 0 && 
        formData.exitPrice > 0 && 
        formData.volume > 0
      ) {
        const pips = calculatePips(
          formData.symbol,
          formData.type,
          formData.entryPrice,
          formData.exitPrice
        );
        
        const pipValue = getPipValue(formData.symbol, formData.volume);
        calculatedPnL = pips * pipValue;
      }

      // Calculate hold time if we have both dates
      if (formData.entryDate && formData.exitDate) {
        const entryTime = new Date(formData.entryDate).getTime();
        const exitTime = new Date(formData.exitDate).getTime();
        
        if (exitTime > entryTime) {
          calculatedHoldTime = Math.round((exitTime - entryTime) / (1000 * 60)); // in minutes
        }
      }

      // Calculate R-multiple if we have stop loss and P&L
      if (
        formData.entryPrice > 0 && 
        formData.stopLoss > 0 && 
        calculatedPnL !== 0 &&
        formData.volume > 0
      ) {
        // Calculate risk (distance from entry to stop loss in currency)
        const stopLossDistance = Math.abs(formData.entryPrice - formData.stopLoss);
        const stopLossPips = stopLossDistance * (formData.symbol?.includes('JPY') ? 100 : 10000);
        const pipValue = getPipValue(formData.symbol, formData.volume);
        const riskAmount = stopLossPips * pipValue;
        
        if (riskAmount > 0) {
          calculatedRMultiple = calculatedPnL / riskAmount;
        }
      }

      // Update results if they've changed
      setResults((prev: any) => ({
        ...prev,
        pnl: calculatedPnL,
        holdTime: calculatedHoldTime,
        rMultiple: calculatedRMultiple
      }));
    };

    calculateResults();
  }, [
    formData.symbol,
    formData.type,
    formData.entryPrice,
    formData.exitPrice,
    formData.volume,
    formData.entryDate,
    formData.exitDate,
    formData.stopLoss,
    setResults
  ]);

  // Format hold time display
  const formatHoldTime = (minutes: number) => {
    if (minutes === 0) return "0 minutes";
    
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    
    return parts.join(' ') || "0 minutes";
  };

  // Get P&L color and icon
  const getPnLDisplay = (pnl: number) => {
    if (pnl > 0) {
      return {
        color: "text-green-600 dark:text-green-400",
        icon: <TrendingUp className="w-5 h-5" />,
        prefix: "+"
      };
    } else if (pnl < 0) {
      return {
        color: "text-red-600 dark:text-red-400",
        icon: <TrendingDown className="w-5 h-5" />,
        prefix: ""
      };
    } else {
      return {
        color: "text-gray-600 dark:text-gray-400",
        icon: <DollarSign className="w-5 h-5" />,
        prefix: ""
      };
    }
  };

  // Get R-multiple color and description
  const getRMultipleDisplay = (rMultiple?: number) => {
    if (!rMultiple) return { color: "text-gray-600 dark:text-gray-400", description: "Not calculated" };
    
    if (rMultiple >= 2) {
      return { 
        color: "text-green-600 dark:text-green-400", 
        description: "Excellent" 
      };
    } else if (rMultiple >= 1) {
      return { 
        color: "text-blue-600 dark:text-blue-400", 
        description: "Good" 
      };
    } else if (rMultiple > 0) {
      return { 
        color: "text-yellow-600 dark:text-yellow-400", 
        description: "Profitable but low reward" 
      };
    } else {
      return { 
        color: "text-red-600 dark:text-red-400", 
        description: "Loss" 
      };
    }
  };

  const pnlDisplay = getPnLDisplay(results.pnl);
  const rMultipleDisplay = getRMultipleDisplay(results.rMultiple);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Results
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Automatically calculated trade performance metrics
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* P&L */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {pnlDisplay.icon}
              <Label className="text-sm font-medium text-muted-foreground">Profit & Loss</Label>
            </div>
            <div className={`text-2xl font-bold ${pnlDisplay.color}`}>
              {pnlDisplay.prefix}${Math.abs(results.pnl).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on entry/exit prices and volume
            </p>
          </div>

          {/* Hold Time */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <Label className="text-sm font-medium text-muted-foreground">Hold Time</Label>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatHoldTime(results.holdTime)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Time between entry and exit
            </p>
          </div>

          {/* R-Multiple */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <Label className="text-sm font-medium text-muted-foreground">R-Multiple</Label>
            </div>
            <div className={`text-2xl font-bold ${rMultipleDisplay.color}`}>
              {results.rMultiple ? `${results.rMultiple > 0 ? '+' : ''}${results.rMultiple.toFixed(2)}R` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {rMultipleDisplay.description}
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        {(results.pnl !== 0 || results.holdTime > 0 || results.rMultiple) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded border">
                <span className="text-sm font-medium">Net Result:</span>
                <span className={`font-bold ${pnlDisplay.color} flex items-center gap-1`}>
                  {pnlDisplay.icon}
                  {pnlDisplay.prefix}${Math.abs(results.pnl).toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded border">
                <span className="text-sm font-medium">Duration:</span>
                <span className="font-bold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatHoldTime(results.holdTime)}
                </span>
              </div>
              
              {results.rMultiple && (
                <div className="flex items-center justify-between p-3 bg-background rounded border">
                  <span className="text-sm font-medium">Risk-Reward Ratio:</span>
                  <span className={`font-bold flex items-center gap-1 ${rMultipleDisplay.color}`}>
                    <Target className="w-4 h-4" />
                    {results.rMultiple.toFixed(2)}R ({rMultipleDisplay.description})
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calculation Notes */}
        {(results.pnl === 0 && results.holdTime === 0 && !results.rMultiple) && (
          <div className="text-center p-6 bg-muted/30 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Results will be calculated automatically as you fill in the trade details above
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsSection;