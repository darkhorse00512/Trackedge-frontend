import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";

export interface JournalEntryExecutionQuality {
  // Execution quality
  entryQuality: 1 | 2 | 3 | 4 | 5;        // 1=poor, 5=perfect
  exitQuality: 1 | 2 | 3 | 4 | 5;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
}

interface ExecutionQualitySectionProps {
  formData: JournalEntryExecutionQuality;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ExecutionQualitySection: React.FC<ExecutionQualitySectionProps> = ({ 
  formData, 
  setFormData
}) => {

  // Handle quality rating changes
  const handleQualityChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: parseInt(value) as 1 | 2 | 3 | 4 | 5
    }));
  };

  // Calculate grade automatically based on average of entry and exit quality
  useEffect(() => {
    if (formData.entryQuality && formData.exitQuality) {
      const average = (formData.entryQuality + formData.exitQuality) / 2;
      let calculatedGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

      if (average >= 4.5) {
        calculatedGrade = 'A+';
      } else if (average >= 4.0) {
        calculatedGrade = 'A';
      } else if (average >= 3.0) {
        calculatedGrade = 'B';
      } else if (average >= 2.0) {
        calculatedGrade = 'C';
      } else if (average >= 1.5) {
        calculatedGrade = 'D';
      } else {
        calculatedGrade = 'F';
      }

      setFormData((prev: any) => ({
        ...prev,
        grade: calculatedGrade
      }));
    }
  }, [formData.entryQuality, formData.exitQuality, setFormData]);

  // Render star rating component
  const StarRating = ({ 
    value, 
    onChange, 
    name 
  }: { 
    value: number; 
    onChange: (name: string, value: string) => void; 
    name: string; 
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(name, rating.toString())}
            className={`p-1 rounded transition-colors ${
              rating <= value 
                ? 'text-yellow-500 hover:text-yellow-600' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star 
              className={`w-6 h-6 ${
                rating <= value ? 'fill-current' : ''
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 dark:text-green-400';
      case 'B':
        return 'text-blue-600 dark:text-blue-400';
      case 'C':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'D':
        return 'text-orange-600 dark:text-orange-400';
      case 'F':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Quality</CardTitle>
        <p className="text-sm text-muted-foreground">
          Rate the quality of your trade execution and assign an overall grade
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Entry Quality */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Entry Execution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Entry Quality Rating</Label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Poor</span>
                <StarRating 
                  value={formData.entryQuality || 0}
                  onChange={handleQualityChange}
                  name="entryQuality"
                />
                <span className="text-sm text-muted-foreground">Perfect</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-lg font-semibold">
                {formData.entryQuality ? `${formData.entryQuality}/5` : 'Not rated'}
              </span>
            </div>
          </div>
        </div>

        {/* Exit Quality */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Exit Execution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Exit Quality Rating</Label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Poor</span>
                <StarRating 
                  value={formData.exitQuality || 0}
                  onChange={handleQualityChange}
                  name="exitQuality"
                />
                <span className="text-sm text-muted-foreground">Perfect</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-lg font-semibold">
                {formData.exitQuality ? `${formData.exitQuality}/5` : 'Not rated'}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Grade - Auto-calculated */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Overall Grade</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Auto-calculated Grade</Label>
              <div className="bg-muted/50 p-4 rounded-lg">
                {formData.entryQuality && formData.exitQuality ? (
                  <div className="text-center space-y-2">
                    <div className={`text-6xl font-bold ${getGradeColor(formData.grade || 'F')}`}>
                      {formData.grade}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on average quality: {((formData.entryQuality + formData.exitQuality) / 2).toFixed(1)}/5
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Entry: {formData.entryQuality}/5 • Exit: {formData.exitQuality}/5
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    <div className="text-4xl font-bold text-gray-400">—</div>
                    <div className="text-sm mt-2">Rate both entry and exit quality to see your grade</div>
                  </div>
                )}
              </div>
            </div>
            
            {formData.grade && (
              <div className="bg-background border rounded-lg p-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">Grade Scale:</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>A+ (4.5-5.0) • A (4.0-4.4) • B (3.0-3.9)</div>
                  <div>C (2.0-2.9) • D (1.5-1.9) • F (1.0-1.4)</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {(formData.entryQuality || formData.exitQuality || formData.grade) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Execution Summary</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Entry Quality:</span>
                <span className="font-semibold">
                  {formData.entryQuality ? `${formData.entryQuality}/5` : 'Not rated'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Exit Quality:</span>
                <span className="font-semibold">
                  {formData.exitQuality ? `${formData.exitQuality}/5` : 'Not rated'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Overall Grade:</span>
                <span className={`font-bold text-lg ${formData.grade ? getGradeColor(formData.grade) : ''}`}>
                  {formData.grade || 'Not graded'}
                </span>
              </div>
              {formData.entryQuality && formData.exitQuality && (
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium text-muted-foreground">Average Quality:</span>
                  <span className="font-semibold">
                    {((formData.entryQuality + formData.exitQuality) / 2).toFixed(1)}/5
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutionQualitySection;