import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp } from "lucide-react";

interface ExecutionQualityDisplayProps {
  executionQuality: {
    entryQuality: 1 | 2 | 3 | 4 | 5;
    exitQuality: 1 | 2 | 3 | 4 | 5;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  };
}

const ExecutionQualityDisplay: React.FC<ExecutionQualityDisplayProps> = ({ 
  executionQuality 
}) => {
  // Render star rating component (read-only)
  const StarRating = ({ value }: { value: number }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Star 
            key={rating}
            className={`w-5 h-5 ${
              rating <= value 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'B':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'C':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'D':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'F':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getQualityText = (quality: number) => {
    switch (quality) {
      case 5: return "Perfect";
      case 4: return "Very Good";
      case 3: return "Good";
      case 2: return "Fair";
      case 1: return "Poor";
      default: return "Not Rated";
    }
  };

  const averageQuality = (executionQuality.entryQuality + executionQuality.exitQuality) / 2;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Execution Quality
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Grade - Prominently displayed */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Overall Grade</h3>
          <div className={`border rounded-lg p-6 ${getGradeColor(executionQuality.grade)}`}>
            <div className="text-center space-y-3">
              <div className="text-6xl font-bold">
                {executionQuality.grade}
              </div>
              <div className="text-sm font-medium">
                Execution Grade
              </div>
              <div className="text-xs opacity-80">
                Based on average quality: {averageQuality.toFixed(1)}/5
              </div>
            </div>
          </div>
        </div>

        {/* Quality Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Quality Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Quality */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Entry Execution
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-2">
                    <StarRating value={executionQuality.entryQuality} />
                    <Badge variant="outline" className="text-xs">
                      {executionQuality.entryQuality}/5
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quality:</span>
                  <span className="font-medium">{getQualityText(executionQuality.entryQuality)}</span>
                </div>
              </div>
            </div>

            {/* Exit Quality */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                Exit Execution
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-2">
                    <StarRating value={executionQuality.exitQuality} />
                    <Badge variant="outline" className="text-xs">
                      {executionQuality.exitQuality}/5
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quality:</span>
                  <span className="font-medium">{getQualityText(executionQuality.exitQuality)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </CardContent>
    </Card>
  );
};

export default ExecutionQualityDisplay;