
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import axios from "axios";
import SetupDetailsSection from "./StrategyDetailsSection";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export type SetupFormData = {
  name: string;
  entryStrategy: string;
  holdingStrategy: string;
  exitStrategy: string;
  imageUrls?: string[];
};

interface SetupFormProps {
  initialData?: any; // The trade data to edit
  isEditMode?: boolean; // Whether we're in edit mode
}

const SetupForm = ({ initialData, isEditMode = false }: SetupFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SetupFormData>({
    name: "",
    entryStrategy: "",
    holdingStrategy: "",
    exitStrategy: "",
    imageUrls: []
  });

  useEffect(() => {
    if (initialData && isEditMode) {
      const { name, entryStrategy, holdingStrategy, exitStrategy, imageUrls } = initialData;
      
      // Map the trade data to form data structure
      setFormData(prevData => ({
        ...prevData,
        name: name || "",
        entryStrategy: entryStrategy || "",
        holdingStrategy: holdingStrategy || "",
        exitStrategy: exitStrategy || "",
        imageUrls: imageUrls || []
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    if(!isEditMode){
      try {
        const finalData = {
          ...formData,
        };
        // console.log(finalData);
        const result = await axios.post(`${SERVER_URL}/setups/`,
          {
            ...finalData
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        if (result.status === 201) {
          toast.success("Setup added successfully!");
          navigate("/setups");
          } else {
            toast.error("Failed to add setup. Please try again.");
          }
        }
        catch {
          toast.error("Failed to add setup. Please try again.");
        }
        finally {
          setIsSubmitting(false);
        }
    }
    else{
      try {
        const finalData = {
          ...formData,
        };
        // console.log(finalData);
        // const tradeId = localStorage.getItem('tradeId');
        // localStorage.removeItem('tradeId');
        // console.log(finalData);
        const setupId = initialData.setupId;
        // console.log(finalData);
        // console.log(tradeId);
        const result = await axios.put(`${SERVER_URL}/setups/${setupId}`,
          {
            newStrategy: finalData
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        if (result.status === 200) {
          toast.success("Setup edited successfully!");
          navigate("/setups");
          } else {
            toast.error("Failed to edit setup. Please try again.");
          }
        }
        catch {
          toast.error("Failed to edit setup. Please try again.");
        }
        finally {
          setIsSubmitting(false);
        }
    }
    // console.log(formData);

      // console.log(result);

      
  };

  // Clear form
  const handleClearForm = () => {
    setFormData({
      name: "",
      entryStrategy: "",
      holdingStrategy: "",
      exitStrategy: "",
      imageUrls: []
    });
    toast.info("Form cleared");
  };

  // Validate form
  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.name) {
      toast.error("Please input a setup name!");
      return false;
    }

    if (!formData.entryStrategy || !formData.holdingStrategy || !formData.exitStrategy) {
      toast.error("All kind of setups are required!");
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SetupDetailsSection 
        formData={formData} 
        setFormData={setFormData}
      />

      <div className="flex items-center justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleClearForm}
          disabled={isSubmitting}
        >
          Clear Form
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Setup"}
        </Button>
      </div>
    </form>
  );
};

export default SetupForm;
