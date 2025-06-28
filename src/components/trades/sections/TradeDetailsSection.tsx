import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TradeFormData } from "../TradeForm";
import { calculatePips, getPipValue } from "@/lib/trade-calculations";
import { Link2, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface TradeDetailsSectionProps {
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

const TradeDetailsSection: React.FC<TradeDetailsSectionProps> = ({ 
  formData, 
  setFormData,
  metrics,
  setMetrics
}) => {
  const [strategies, setStrategies] = useState<Array<{setupId: string, name: string}>>([]);
  const [loadingStrategies, setLoadingStrategies] = useState(false);
  const navigate = useNavigate();

  // Fetch strategies on component mount
  useEffect(() => {
    const fetchStrategies = async () => {
      setLoadingStrategies(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${SERVER_URL}/setups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStrategies(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch strategies:', error);
      } finally {
        setLoadingStrategies(false);
      }
    };

    fetchStrategies();
  }, []);

  // Handle strategy selection or creation
  const handleStrategyChange = (value: string) => {
    if (value === 'create-new') {
      // Navigate to create strategy page
      navigate('/add-setup');
    } else {
      handleSelectChange("setupId", value);
    }
  };
  // Update form data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calculate metrics when relevant inputs change
  useEffect(() => {
    if (!formData.symbol || formData.entryPrice === 0 || formData.exitPrice === 0) return;
    
    const calculatedPips = calculatePips(
      formData.symbol,
      formData.type,
      formData.entryPrice,
      formData.exitPrice
    );

    const pipValue = getPipValue(formData.symbol, formData.volume);
    const profitLoss = calculatedPips * pipValue;
    
    setMetrics(prev => ({
      ...prev,
      pips: calculatedPips,
      takeProfit: profitLoss
    }));
  }, [
    formData.symbol, 
    formData.type, 
    formData.entryPrice, 
    formData.exitPrice,
    formData.volume,
    setMetrics
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journal Entry Details</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Basic Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-sm font-medium">Symbol</Label>
              <Input 
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className="h-11"
                placeholder="e.g., EURUSD, GBPJPY, XAUUSD"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volume" className="text-sm font-medium">Volume (Lots)</Label>
              <Input 
                type="number"
                id="volume"
                name="volume"
                value={formData.volume || ""}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className="h-11"
                placeholder="0.01"
              />
            </div>
            
            <div className="space-y-4">
              <Label className="text-sm font-medium">Position Type</Label>
              <RadioGroup 
                className="flex space-x-6" 
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value as "long" | "short")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long" className="text-green-600 dark:text-green-400 cursor-pointer font-medium">
                    Long
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short" className="text-red-600 dark:text-red-400 cursor-pointer font-medium">
                    Short
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Strategy Linking */}
          <div className="mt-6 pt-4 border-t border-border/40">
            <div className="space-y-3">
              <Label htmlFor="strategy" className="text-sm font-medium flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Strategy *
              </Label>
              
              <Select 
                value={formData.setupId || ""} 
                onValueChange={handleStrategyChange}
                disabled={loadingStrategies}
                required
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={loadingStrategies ? "Loading strategies..." : "Select a strategy"} />
                </SelectTrigger>
                <SelectContent>
                  {strategies.map((strategy) => (
                    <SelectItem key={strategy.setupId} value={strategy.setupId}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                  
                  {/* Always show create new option */}
                  {strategies.length > 0 && (
                    <SelectItem value="divider" disabled className="border-t mt-1 pt-1">
                      ─────────────────
                    </SelectItem>
                  )}
                  
                  <SelectItem value="create-new" className="text-primary font-medium">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create New Strategy
                    </div>
                  </SelectItem>
                  
                  {strategies.length === 0 && !loadingStrategies && (
                    <SelectItem value="no-strategies" disabled>
                      No strategies found - Create one above
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              
              <p className="text-xs text-muted-foreground">
                Each trade must be linked to a strategy for proper analysis and tracking
              </p>
            </div>
          </div>
        </div>
        
        {/* Entry Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Entry Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="entryDate" className="text-sm font-medium">Entry Date & Time</Label>
              <Input 
                type="datetime-local"
                id="entryDate"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="entryPrice" className="text-sm font-medium">Entry Price</Label>
              <Input 
                type="number"
                id="entryPrice"
                name="entryPrice"
                value={formData.entryPrice || ""}
                onChange={handleChange}
                step="0.00001"
                className="h-11"
                placeholder="0.00000"
              />
            </div>
          </div>
        </div>

        {/* Exit Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Exit Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exitDate" className="text-sm font-medium">Exit Date & Time</Label>
              <Input 
                type="datetime-local"
                id="exitDate"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exitPrice" className="text-sm font-medium">Exit Price</Label>
              <Input 
                type="number"
                id="exitPrice"
                name="exitPrice"
                value={formData.exitPrice || ""}
                onChange={handleChange}
                step="0.00001"
                className="h-11"
                placeholder="0.00000"
              />
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Risk Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stopLoss" className="text-sm font-medium">Stop Loss</Label>
              <Input 
                type="number"
                id="stopLoss"
                name="stopLoss"
                value={formData.stopLoss || ""}
                onChange={handleChange}
                step="0.00001"
                className="h-11"
                placeholder="0.00000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="takeProfit" className="text-sm font-medium">Take Profit</Label>
              <Input 
                type="number"
                id="takeProfit"
                name="takeProfit"
                value={formData.takeProfit || ""}
                onChange={handleChange}
                step="0.00001"
                className="h-11"
                placeholder="0.00000"
              />
            </div>
          </div>
        </div>

        {/* Calculated Metrics Display */}
        {formData.symbol && formData.entryPrice > 0 && formData.exitPrice > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Calculated Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-muted-foreground">Pips</Label>
                <p className="text-2xl font-bold text-foreground">{metrics.pips.toFixed(1)}</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <Label className="text-sm font-medium text-muted-foreground">Profit/Loss</Label>
                <p className={`text-2xl font-bold ${metrics.takeProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${metrics.takeProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeDetailsSection;