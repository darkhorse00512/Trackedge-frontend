import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrendingUp, Activity, BarChart3, Globe } from "lucide-react";

export interface JournalEntryMarketContext {
  marketType?: 'trending' | 'range' | 'volatile';
  marketSession: 'asian' | 'london' | 'new york';
}

interface MarketContextSectionProps {
  formData: JournalEntryMarketContext;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MarketContextSection: React.FC<MarketContextSectionProps> = ({ 
  formData, 
  setFormData
}) => {
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  // Get market type icon and description
  const getMarketTypeInfo = (type: string) => {
    switch (type) {
      case 'trending':
        return {
          icon: <TrendingUp className="w-5 h-5" />,
          description: 'Clear directional movement',
          color: 'text-green-600 dark:text-green-400'
        };
      case 'range':
        return {
          icon: <BarChart3 className="w-5 h-5" />,
          description: 'Price moving within bounds',
          color: 'text-blue-600 dark:text-blue-400'
        };
      case 'volatile':
        return {
          icon: <Activity className="w-5 h-5" />,
          description: 'High price fluctuation',
          color: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          icon: <BarChart3 className="w-5 h-5" />,
          description: '',
          color: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  // Get session info
  const getSessionInfo = (session: string) => {
    switch (session) {
      case 'asian':
        return {
          time: '21:00 - 06:00 UTC',
          description: 'Asian trading session',
          color: 'text-orange-600 dark:text-orange-400'
        };
      case 'london':
        return {
          time: '07:00 - 16:00 UTC',
          description: 'London trading session',
          color: 'text-blue-600 dark:text-blue-400'
        };
      case 'new york':
        return {
          time: '12:00 - 21:00 UTC',
          description: 'New York trading session',
          color: 'text-green-600 dark:text-green-400'
        };
      default:
        return {
          time: '',
          description: '',
          color: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Market Context
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Capture the market conditions during your trade
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Market Type */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Market Conditions</h3>
          <div className="space-y-4">
            <Label className="text-sm font-medium">Market Type</Label>
            <RadioGroup 
              className="grid grid-cols-1 md:grid-cols-3 gap-4" 
              value={formData.marketType || ""}
              onValueChange={(value) => handleSelectChange("marketType", value)}
            >
              <Label htmlFor="trending" className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="trending" id="trending" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    Trending
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clear directional movement
                  </p>
                </div>
              </Label>
              
              <Label htmlFor="range" className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="range" id="range" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Range-bound
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Price moving within bounds
                  </p>
                </div>
              </Label>
              
              <Label htmlFor="volatile" className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="volatile" id="volatile" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
                    Volatile
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    High price fluctuation
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </div>
        </div>

        {/* Market Session */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Trading Session</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Market Session</Label>
              <Select 
                value={formData.marketSession || ""} 
                onValueChange={(value) => handleSelectChange("marketSession", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select trading session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asian">
                    <div className="flex items-center justify-between w-full">
                      <span>Asian Session</span>
                      <span className="text-sm text-muted-foreground ml-4">21:00 - 06:00 UTC</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="london">
                    <div className="flex items-center justify-between w-full">
                      <span>London Session</span>
                      <span className="text-sm text-muted-foreground ml-4">07:00 - 16:00 UTC</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="new york">
                    <div className="flex items-center justify-between w-full">
                      <span>New York Session</span>
                      <span className="text-sm text-muted-foreground ml-4">12:00 - 21:00 UTC</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.marketSession && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium capitalize">
                    {formData.marketSession} Session
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{getSessionInfo(formData.marketSession).description}</p>
                  <p className="font-mono">{getSessionInfo(formData.marketSession).time}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Context Summary */}
        {(formData.marketType || formData.marketSession) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Context Summary</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              {formData.marketType && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Market Conditions:</span>
                  <div className={`flex items-center gap-2 font-semibold ${getMarketTypeInfo(formData.marketType).color}`}>
                    {getMarketTypeInfo(formData.marketType).icon}
                    <span className="capitalize">{formData.marketType}</span>
                  </div>
                </div>
              )}
              
              {formData.marketSession && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Trading Session:</span>
                  <div className={`flex items-center gap-2 font-semibold ${getSessionInfo(formData.marketSession).color}`}>
                    <Globe className="w-4 h-4" />
                    <span className="capitalize">{formData.marketSession}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketContextSection;