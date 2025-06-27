import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Percent, FileText } from "lucide-react";
import parse from 'html-react-parser';

interface RiskManagementDisplayProps {
  riskManagement?: {
    riskRewardRatio?: number;
    riskPercentage?: number;
    notes?: string;
  };
}

const RiskManagementDisplay: React.FC<RiskManagementDisplayProps> = ({ riskManagement }) => {
  if (!riskManagement || (!riskManagement.riskRewardRatio && !riskManagement.riskPercentage && !riskManagement.notes)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Risk Management
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No risk management data recorded</p>
            <p className="text-xs mt-1">Risk metrics and notes not available for this trade</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRiskLevelColor = (percentage?: number) => {
    if (!percentage) return 'text-gray-600 dark:text-gray-400';
    if (percentage <= 1) return 'text-green-600 dark:text-green-400';
    if (percentage <= 2) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage <= 5) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRiskLevelText = (percentage?: number) => {
    if (!percentage) return 'Not specified';
    if (percentage <= 1) return 'Conservative';
    if (percentage <= 2) return 'Moderate';
    if (percentage <= 5) return 'Aggressive';
    return 'Very High Risk';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Risk Management
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Risk Metrics */}
        {(riskManagement.riskRewardRatio || riskManagement.riskPercentage) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Risk Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Risk/Reward Ratio */}
              {riskManagement.riskRewardRatio && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Risk/Reward Ratio</div>
                  <div className="text-2xl font-bold text-foreground">
                    1:{riskManagement.riskRewardRatio}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {riskManagement.riskRewardRatio >= 2 ? 'Good ratio' : 
                     riskManagement.riskRewardRatio >= 1.5 ? 'Acceptable ratio' : 
                     'Poor ratio'}
                  </div>
                </div>
              )}

              {/* Risk Percentage */}
              {riskManagement.riskPercentage && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Risk Percentage</div>
                  <div className={`text-2xl font-bold ${getRiskLevelColor(riskManagement.riskPercentage)}`}>
                    {riskManagement.riskPercentage}%
                  </div>
                  <div className={`text-xs mt-1 ${getRiskLevelColor(riskManagement.riskPercentage)}`}>
                    {getRiskLevelText(riskManagement.riskPercentage)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Risk Analysis */}
        {(riskManagement.riskRewardRatio || riskManagement.riskPercentage) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Risk Analysis</h3>
            <div className="space-y-4">
              {riskManagement.riskRewardRatio && (
                <div className={`border rounded-lg p-4 ${
                  riskManagement.riskRewardRatio >= 2 ? 
                    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                  riskManagement.riskRewardRatio >= 1.5 ?
                    'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <Shield className={`w-5 h-5 mt-0.5 ${
                      riskManagement.riskRewardRatio >= 2 ? 'text-green-600' :
                      riskManagement.riskRewardRatio >= 1.5 ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        riskManagement.riskRewardRatio >= 2 ? 'text-green-600 dark:text-green-400' :
                        riskManagement.riskRewardRatio >= 1.5 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        Risk/Reward Assessment
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {riskManagement.riskRewardRatio >= 2 ? 
                          'Excellent risk/reward ratio. This trade offered favorable profit potential relative to risk.' :
                        riskManagement.riskRewardRatio >= 1.5 ?
                          'Acceptable risk/reward ratio. The potential reward justified the risk taken.' :
                          'Poor risk/reward ratio. Consider improving entry/exit strategy for better ratios.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {riskManagement.riskPercentage && (
                <div className={`border rounded-lg p-4 ${
                  riskManagement.riskPercentage <= 2 ? 
                    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                  riskManagement.riskPercentage <= 5 ?
                    'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <Percent className={`w-5 h-5 mt-0.5 ${
                      riskManagement.riskPercentage <= 2 ? 'text-green-600' :
                      riskManagement.riskPercentage <= 5 ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        riskManagement.riskPercentage <= 2 ? 'text-green-600 dark:text-green-400' :
                        riskManagement.riskPercentage <= 5 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        Position Size Assessment
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {riskManagement.riskPercentage <= 1 ? 
                          'Very conservative position sizing. Low risk to account balance.' :
                        riskManagement.riskPercentage <= 2 ?
                          'Conservative position sizing. Appropriate risk management.' :
                        riskManagement.riskPercentage <= 5 ?
                          'Moderate to aggressive position sizing. Monitor risk carefully.' :
                          'High risk position. Consider reducing position size in future trades.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Risk Management Notes */}
        {riskManagement.notes && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Risk Management Notes
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(riskManagement.notes)}
              </div>
            </div>
          </div>
        )}

        {/* Risk Summary */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Risk Summary</h3>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            {riskManagement.riskRewardRatio && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Risk/Reward Ratio:</span>
                <span className={`font-semibold ${
                  riskManagement.riskRewardRatio >= 2 ? 'text-green-600' :
                  riskManagement.riskRewardRatio >= 1.5 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  1:{riskManagement.riskRewardRatio}
                </span>
              </div>
            )}
            
            {riskManagement.riskPercentage && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Risk Percentage:</span>
                <span className={`font-semibold ${getRiskLevelColor(riskManagement.riskPercentage)}`}>
                  {riskManagement.riskPercentage}% ({getRiskLevelText(riskManagement.riskPercentage)})
                </span>
              </div>
            )}
            
            {riskManagement.notes && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Notes Documented:</span>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">Yes</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskManagementDisplay;