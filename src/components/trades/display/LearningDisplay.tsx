import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, XCircle, AlertTriangle, Lightbulb } from "lucide-react";
import parse from 'html-react-parser';

interface LearningDisplayProps {
  learning: {
    followedPlan?: boolean;
    mistakes?: string[];
    lessons?: string[];
    imageUrls?: string[];
  };
}

const LearningDisplay: React.FC<LearningDisplayProps> = ({ learning }) => {
  const getPlanAdherenceInfo = (followedPlan?: boolean) => {
    if (followedPlan === true) {
      return {
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        icon: <CheckCircle className="w-5 h-5" />,
        text: "Followed Trading Plan",
        description: "Adhered to predetermined strategy and rules"
      };
    } else if (followedPlan === false) {
      return {
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        icon: <XCircle className="w-5 h-5" />,
        text: "Deviated from Plan",
        description: "Did not follow the predetermined trading strategy"
      };
    }
    return {
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800",
      icon: <AlertTriangle className="w-5 h-5" />,
      text: "Plan Adherence Not Recorded",
      description: "No information about plan adherence"
    };
  };

  const planInfo = getPlanAdherenceInfo(learning.followedPlan);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Learning
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Plan Adherence */}
        {learning.followedPlan !== undefined && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b">Plan Adherence</h3>
            <div className={`border rounded-lg p-4 ${planInfo.bgColor} ${planInfo.borderColor}`}>
              <div className="flex items-start gap-3">
                <div className={planInfo.color}>
                  {planInfo.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${planInfo.color}`}>
                    {planInfo.text}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {planInfo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mistakes Made */}
        {learning.mistakes && learning.mistakes.length > 0 && learning.mistakes[0] && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Mistakes Made
            </h3>
            <div className="bg-muted/50 border p-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(learning.mistakes[0])}
              </div>
            </div>
          </div>
        )}

        {/* Lessons Learned */}
        {learning.lessons && learning.lessons.length > 0 && learning.lessons[0] && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Lessons Learned
            </h3>
            <div className="bg-muted/50 border p-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {parse(learning.lessons[0])}
              </div>
            </div>
          </div>
        )}



        {/* No Learning Data */}
        {learning.followedPlan === undefined && 
         (!learning.mistakes || learning.mistakes.length === 0 || !learning.mistakes[0]) &&
         (!learning.lessons || learning.lessons.length === 0 || !learning.lessons[0]) && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No learning data recorded for this trade</p>
            <p className="text-xs mt-1">Consider documenting plan adherence, mistakes, and lessons for future reference</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningDisplay;