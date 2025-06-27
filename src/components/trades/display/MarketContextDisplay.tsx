import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, TrendingUp, BarChart3 } from "lucide-react";

interface MarketContextDisplayProps {
  marketContext: {
    marketType?: 'trending' | 'range' | 'volatile';
    marketSession: 'asian' | 'london' | 'new york';
  };
}

const MarketContextDisplay: React.FC<MarketContextDisplayProps> = ({ 
  marketContext 
}) => {
  const getMarketTypeInfo = (type?: string) => {
    switch (type) {
      case 'trending':
        return {
          icon: <TrendingUp className="w-5 h-5" />,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          label: 'Trending',
          description: 'Market showing clear directional movement'
        };
      case 'range':
        return {
          icon: <BarChart3 className="w-5 h-5" />,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'Range-bound',
          description: 'Market trading within defined support/resistance levels'
        };
      case 'volatile':
        return {
          icon: <BarChart3 className="w-5 h-5" />,
          color: 'text-orange-600 dark:text-orange-400',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          label: 'Volatile',
          description: 'Market showing high volatility and unpredictable movement'
        };
      default:
        return {
          icon: <BarChart3 className="w-5 h-5" />,
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          label: 'Not Specified',
          description: 'Market type not recorded'
        };
    }
  };

  const getSessionInfo = (session: string) => {
    switch (session) {
      case 'asian':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          label: 'Asian Session',
          time: '00:00 - 09:00 GMT',
          characteristics: 'Lower volatility, steady trends, JPY pairs active'
        };
      case 'london':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'London Session',
          time: '08:00 - 17:00 GMT',
          characteristics: 'High volatility, major trends, EUR/GBP pairs active'
        };
      case 'new york':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          label: 'New York Session',
          time: '13:00 - 22:00 GMT',
          characteristics: 'High volume, USD pairs active, strong trends'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          label: 'Unknown Session',
          time: 'Not specified',
          characteristics: 'Session details not available'
        };
    }
  };

  const marketTypeInfo = getMarketTypeInfo(marketContext.marketType);
  const sessionInfo = getSessionInfo(marketContext.marketSession);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Market Context
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Market Session */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Trading Session</h3>
          <div className={`border rounded-lg p-4 ${sessionInfo.bgColor} ${sessionInfo.borderColor}`}>
            <div className="flex items-start gap-3">
              <div className={sessionInfo.color}>
                {sessionInfo.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-semibold ${sessionInfo.color}`}>
                    {sessionInfo.label}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {sessionInfo.time}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {sessionInfo.characteristics}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Type */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Market Condition</h3>
          <div className={`border rounded-lg p-4 ${marketTypeInfo.bgColor} ${marketTypeInfo.borderColor}`}>
            <div className="flex items-start gap-3">
              <div className={marketTypeInfo.color}>
                {marketTypeInfo.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${marketTypeInfo.color}`}>
                  {marketTypeInfo.label}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {marketTypeInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default MarketContextDisplay;