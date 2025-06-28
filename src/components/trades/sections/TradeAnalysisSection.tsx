
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TradeFormData } from "../TradeForm";
import { ImageUploader } from "../ImageUploader";
import TagsInput from "../TagsInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TradeAnalysisSectionProps {
  formData: TradeFormData;
  setFormData: React.Dispatch<React.SetStateAction<TradeFormData>>;
}

const TradeAnalysisSection: React.FC<TradeAnalysisSectionProps> = ({ 
  formData, 
  setFormData
}) => {
  // Handle notes change

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      notes: e.target.value
    });
  };

  // Handle image uploads
  const handleImageUploaded = (urls: string[]) => {
    setFormData({
      ...formData,
      imageUrls: urls
    });
  };

  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    setFormData({
      ...formData,
      tags
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Analysis</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trade Notes */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Trade Notes</h3>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <div className="bg-white rounded-md border border-input">
              <ReactQuill
                value={formData.notes}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    notes: value,
                  })
                }
                theme="snow"
                placeholder="Enter your trade analysis, thoughts, or lessons learned..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[200px]"
              />
            </div>
          </div>
        </div>
        
        {/* Chart Screenshots */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Chart Screenshots</h3>
          <ImageUploader 
            onImagesUploaded={handleImageUploaded}
            initialImages={formData.imageUrls || []}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Upload up to 10 chart screenshots to document your trade setup and analysis
          </p>
        </div>
        
        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Tags</h3>
          <TagsInput 
            value={formData.tags}
            onChange={handleTagsChange}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Examples: breakout, trend-following, support-resistance, news
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeAnalysisSection;
