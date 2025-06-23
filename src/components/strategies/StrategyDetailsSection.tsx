import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CURRENCY_PAIRS } from "@/lib/constants";
import {
  calculatePips,
  getPipMultiplier,
  getPipValue,
} from "@/lib/trade-calculations";
import { SetupFormData } from "./StrategyForm";
import { ImageUploader } from "./ImageUploader";
import { Textarea } from "../ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface SetupDetailsSectionProps {
  formData: SetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SetupFormData>>;
}

const SetupDetailsSection: React.FC<SetupDetailsSectionProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? null : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUploaded = (urls: string[]) => {
    setFormData({
      ...formData,
      imageUrls: urls,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Trade Parameters */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Setup Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lotSize">Name</Label>
              <Input
                type="string"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Input setup name"
              />
            </div>
          </div>
        </div>

        {/* Time & Session */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Strategies
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entryStrategy">Entry Strategy</Label>
              <ReactQuill
                value={formData.entryStrategy}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    entryStrategy: value,
                  })
                }
                theme="snow"
                placeholder="Describe your entry strategy - what signals, patterns, or conditions trigger your entry..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="holdingStrategy">Holding Strategy</Label>
              <ReactQuill
                value={formData.holdingStrategy}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    holdingStrategy: value,
                  })
                }
                theme="snow"
                placeholder="Describe your holding strategy - how do you manage the trade while it's open..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryStrategy">Exit Strategy</Label>
              <ReactQuill
                value={formData.exitStrategy}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    exitStrategy: value,
                  })
                }
                theme="snow"
                placeholder="Describe your exit strategy - what triggers you to close the trade and how do you execute the exit..."
                className="dark:bg-slate-900 dark:text-white dark:border-slate-700 [&_.ql-editor]:min-h-[200px]"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Setup photos
          </h3>
          <ImageUploader
            onImagesUploaded={handleImageUploaded}
            initialImages={formData.imageUrls || []}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Upload up to 10 photos to document your setup
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupDetailsSection;
