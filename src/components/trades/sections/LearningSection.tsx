import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ImageUploader } from "../ImageUploader";
import { BookOpen, CheckCircle, XCircle, AlertTriangle, Camera } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface JournalEntryLearning {
  followedPlan?: boolean;
  mistakes?: string[];
  lessons?: string[];
  imageUrls?: string[];
}

interface LearningSectionProps {
  formData: JournalEntryLearning;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const LearningSection: React.FC<LearningSectionProps> = ({ 
  formData, 
  setFormData
}) => {
  // Handle plan adherence change
  const handlePlanAdherenceChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      followedPlan: value === "true"
    }));
  };

  // Handle mistakes change
  const handleMistakesChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      mistakes: value ? [value] : []
    }));
  };

  // Handle lessons change
  const handleLessonsChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      lessons: value ? [value] : []
    }));
  };

  // Handle image uploads
  const handleImageUploaded = (urls: string[]) => {
    setFormData((prev: any) => ({
      ...prev,
      imageUrls: urls
    }));
  };

  // Get plan adherence display
  const getPlanAdherenceDisplay = (followedPlan?: boolean) => {
    if (followedPlan === true) {
      return {
        color: "text-green-600 dark:text-green-400",
        icon: <CheckCircle className="w-5 h-5" />,
        text: "Yes - Followed plan"
      };
    } else if (followedPlan === false) {
      return {
        color: "text-red-600 dark:text-red-400",
        icon: <XCircle className="w-5 h-5" />,
        text: "No - Deviated from plan"
      };
    }
    return {
      color: "text-gray-600 dark:text-gray-400",
      icon: <AlertTriangle className="w-5 h-5" />,
      text: "Not specified"
    };
  };

  const planDisplay = getPlanAdherenceDisplay(formData.followedPlan);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Learning
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Document your adherence to plan, mistakes made, and lessons learned
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Plan Adherence */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Plan Adherence</h3>
          <div className="space-y-4">
            <Label className="text-sm font-medium">Did you follow your trading plan?</Label>
            <RadioGroup 
              className="flex space-x-6" 
              value={formData.followedPlan?.toString() || ""}
              onValueChange={handlePlanAdherenceChange}
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="true" id="followed-yes" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <Label htmlFor="followed-yes" className="cursor-pointer font-medium">
                    Yes, I followed my plan
                  </Label>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="false" id="followed-no" />
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <Label htmlFor="followed-no" className="cursor-pointer font-medium">
                    No, I deviated from my plan
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {formData.followedPlan !== undefined && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className={`flex items-center gap-2 font-medium ${planDisplay.color}`}>
                  {planDisplay.icon}
                  {planDisplay.text}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mistakes */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Mistakes Made</h3>
          <div className="space-y-2">
            <Label htmlFor="mistakes">What mistakes did you make during this trade?</Label>
            <div className="bg-white rounded-md border border-input">
              <ReactQuill
                value={formData.mistakes?.[0] || ""}
                onChange={handleMistakesChange}
                theme="snow"
                placeholder="Document any mistakes, errors in judgment, or deviations from your strategy..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[120px]"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Examples: Entered too early, ignored stop loss, traded against trend, emotional decision
            </p>
          </div>
        </div>

        {/* Lessons */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Lessons Learned</h3>
          <div className="space-y-2">
            <Label htmlFor="lessons">What lessons did you learn from this trade?</Label>
            <div className="bg-white rounded-md border border-input">
              <ReactQuill
                value={formData.lessons?.[0] || ""}
                onChange={handleLessonsChange}
                theme="snow"
                placeholder="Document key insights, improvements for next time, or confirmations of good practices..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[120px]"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Examples: Wait for better confirmation, trust your analysis, manage position size better
            </p>
          </div>
        </div>

        {/* Learning Screenshots */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Learning Documentation
          </h3>
          <div className="space-y-2">
            <Label>Screenshots and Visual Documentation</Label>
            <ImageUploader 
              onImagesUploaded={handleImageUploaded}
              initialImages={formData.imageUrls || []}
            />
            <p className="text-xs text-muted-foreground">
              Upload screenshots of key learning moments, annotated charts, or visual reminders for future reference
            </p>
          </div>
        </div>

        {/* Learning Summary */}
        {(formData.followedPlan !== undefined || formData.mistakes?.length || formData.lessons?.length) && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Learning Summary</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              {formData.followedPlan !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Plan Adherence:</span>
                  <div className={`flex items-center gap-2 font-semibold ${planDisplay.color}`}>
                    {planDisplay.icon}
                    <span>{formData.followedPlan ? "Followed Plan" : "Deviated from Plan"}</span>
                  </div>
                </div>
              )}
              
              {formData.mistakes?.length && formData.mistakes[0] && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Mistakes Documented:</span>
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold">Yes</span>
                  </div>
                </div>
              )}
              
              {formData.lessons?.length && formData.lessons[0] && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Lessons Captured:</span>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-semibold">Yes</span>
                  </div>
                </div>
              )}

              {formData.imageUrls?.length && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Visual Documentation:</span>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Camera className="w-4 h-4" />
                    <span className="font-semibold">{formData.imageUrls.length} image{formData.imageUrls.length > 1 ? 's' : ''}</span>
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

export default LearningSection;