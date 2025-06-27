import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3, Target } from "lucide-react";

interface TradeDetailsDisplayProps {
  trade: {
    symbol: string;
    type: 'long' | 'short';
    volume?: number;
    size?: number;
    entryDate: string | { _seconds: number; _nanoseconds: number };
    entryPrice: number;
    exitDate: string | { _seconds: number; _nanoseconds: number };
    exitPrice: number;
    stopLoss: number;
    takeProfit: number;
  };
  results: {
    pnl: number;
    holdTime: number;
    rMultiple?: number;
  };
  strategy?: {
    setupId: string;
    name: string;
    description?: string;
  } | null;
}

const TradeDetailsDisplay: React.FC<TradeDetailsDisplayProps> = ({ trade, results, strategy }) => {
  // Helper function to get date value from different formats
  const getDateValue = (dateField: string | { _seconds: number; _nanoseconds: number }) => {
    if (!dateField) return new Date();
    if (typeof dateField === 'string') return new Date(dateField);
    if (typeof dateField === 'object' && dateField._seconds) return new Date(dateField._seconds * 1000);
    return new Date();
  };

  // Helper function to format date and time in human readable format
  const formatDateTime = (dateField: string | { _seconds: number; _nanoseconds: number }) => {
    const date = getDateValue(dateField);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatHoldTime = (holdTime: number) => {
    if (holdTime >= 60) {
      return `${Math.floor(holdTime / 60)}h ${holdTime % 60}m`;
    }
    return `${holdTime}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Trade Details
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Trade Info */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground">Symbol</div>
              </div>
              <div className="text-2xl font-bold text-foreground">{trade.symbol}</div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground">Position Type</div>
              </div>
              <div className="flex items-center gap-2">
                {trade.type === 'long' ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <Badge
                  variant={trade.type === "long" ? "default" : "destructive"}
                  className="text-sm font-semibold"
                >
                  {trade.type?.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground">Volume</div>
              </div>
              <div className="text-xl font-bold text-foreground">
                {trade.volume || trade.size} lots
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm font-medium text-muted-foreground">Strategy</div>
              </div>
              {strategy ? (
                <div>
                  <div className="text-lg font-bold text-foreground truncate" title={strategy.name}>
                    {strategy.name}
                  </div>
                  {strategy.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2" title={strategy.description}>
                      {strategy.description}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No strategy linked</div>
              )}
            </div>
          </div>
        </div>

        {/* Entry & Exit Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Entry & Exit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                Entry Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date & Time:</span>
                  <span className="font-medium">
                    {formatDateTime(trade.entryDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-mono font-bold">{trade.entryPrice}</span>
                </div>
              </div>
            </div>

            {/* Exit Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                Exit Details
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date & Time:</span>
                  <span className="font-medium">
                    {formatDateTime(trade.exitDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-mono font-bold">{trade.exitPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
            <Target className="w-5 h-5" />
            Risk Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">Stop Loss</div>
              <div className="text-xl font-mono font-bold">{trade.stopLoss}</div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">Take Profit</div>
              <div className="text-xl font-mono font-bold">{trade.takeProfit}</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Trade Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">P&L</div>
              <div className={`text-2xl font-bold ${
                results.pnl >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {results.pnl >= 0 ? "+" : ""}${Math.abs(results.pnl).toFixed(2)}
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">Hold Time</div>
              <div className="text-xl font-bold text-foreground">
                {formatHoldTime(results.holdTime)}
              </div>
            </div>
            
            {results.rMultiple !== undefined && (
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">R-Multiple</div>
                <div className={`text-xl font-bold ${
                  results.rMultiple >= 1 ? "text-green-500" : 
                  results.rMultiple > 0 ? "text-yellow-500" :
                  results.rMultiple === 0 ? "text-gray-500" :
                  "text-red-500"
                }`}>
                  {results.rMultiple >= 0 ? "+" : ""}{results.rMultiple.toFixed(2)}R
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeDetailsDisplay;