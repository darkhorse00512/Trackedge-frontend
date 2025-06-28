
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TradeFormData } from "../TradeForm";
import { calculateRiskRewardRatio } from "@/lib/trade-calculations";

interface RiskManagementSectionProps {
  formData: TradeFormData;
  setFormData: React.Dispatch<React.SetStateAction<TradeFormData>>;
  metrics: {
    pips: number;
    takeProfit: number;
    riskReward: string;
  };
  setMetrics: React.Dispatch<React.SetStateAction<{
    pips: number;
    takeProfit: number;
    riskReward: string;
  }>>;
}

const RiskManagementSection: React.FC<RiskManagementSectionProps> = ({ 
  formData, 
  setFormData,
  metrics,
  setMetrics
}) => {
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? null : Number(value)
    });
  };

  // Calculate risk-reward ratio when relevant inputs change
  useEffect(() => {
    if (
      formData.symbol && 
      formData.direction && 
      formData.entryPrice !== null && 
      formData.stopLoss !== null && 
      formData.takeProfit !== null
    ) {
      const ratio = calculateRiskRewardRatio(
        formData.symbol,
        formData.direction,
        formData.entryPrice,
        formData.stopLoss,
        formData.takeProfit
      );
      
      setMetrics(prev => ({
        ...prev,
        riskReward: ratio
      }));
    }
  }, [
    formData.symbol,
    formData.direction,
    formData.entryPrice,
    formData.stopLoss,
    formData.takeProfit,
    setMetrics
  ]);

  // Determine styling based on profit positive/negative
  const getProfitClass = () => {
    if (metrics.takeProfit > 0) return "text-green-600 dark:text-green-500";
    if (metrics.takeProfit < 0) return "text-red-600 dark:text-red-500";
    return "";
  };

  const getPipsClass = () => {
    if (metrics.pips > 0) return "text-green-600 dark:text-green-500";
    if (metrics.pips < 0) return "text-red-600 dark:text-red-500";
    return "";
  };

  // Format profit display
  const formatProfit = (takeProfit: number) => {
    if (takeProfit === 0) return "$0.00";
    return takeProfit > 0 
      ? `+$${takeProfit.toFixed(2)}` 
      : `-$${Math.abs(takeProfit).toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Management</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Risk Parameters */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Risk Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input 
                type="number"
                id="stopLoss"
                name="stopLoss"
                value={formData.stopLoss === null ? "" : formData.stopLoss}
                onChange={handleChange}
                step="0.00001"
                placeholder="1.08654"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="takeProfit">Take Profit</Label>
              <Input 
                type="number"
                id="takeProfit"
                name="takeProfit"
                value={formData.takeProfit === null ? "" : formData.takeProfit}
                onChange={handleChange}
                step="0.00001"
                placeholder="1.09054"
              />
            </div>
          </div>
        </div>
        
        {/* Trade Metrics */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Trade Metrics</h3>
          <div className="bg-muted p-4 rounded-md grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Pips</p>
              <p className={`text-lg font-medium ${getPipsClass()}`}>
                {metrics.pips.toFixed(1)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <p className={`text-lg font-medium ${getProfitClass()}`}>
                {formatProfit(metrics.takeProfit)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Risk:Reward</p>
              <p className="text-lg font-medium">
                {metrics.riskReward}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskManagementSection;
