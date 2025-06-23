import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Target,
  BarChart3,
  DollarSign,
  BadgeDollarSign,
} from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { PenLine, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import parse from 'html-react-parser';

export interface Strategy {
  setupId: string;
  name: string;
  entryStrategy: string;
  holdingStrategy: string;
  exitStrategy: string;
  imageUrls: string[];
  totalPnL: number; // Added profit & loss field
}

interface StrategyModalProps {
  strategy: Strategy;
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (boolean) => void;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const StrategyModal: React.FC<StrategyModalProps> = ({
  strategy,
  isOpen,
  onClose,
  setIsOpen,
}) => {
  const [showImageCarousel, setShowImageCarousel] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEditStrategy = () => {
    // Navigate to the edit strategy page with the strategy data
    navigate("/edit-strategy", {
      state: {
        editMode: true,
        strategy: strategy,
      },
    });
  };

  const handleDeleteStrategy = async () => {
    if (!strategy || !strategy.setupId) {
      toast.error("Invalid trade data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.delete(
        `${SERVER_URL}/setups/${strategy.setupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Trade item removed successfully!");
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (error: any) {
      console.error("Delete trade error:", error);
      toast.error("Server error, please try again.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const getProfitLossDisplay = (profitLoss: number) => {
    if (profitLoss > 0)
      return (
        <div className="flex items-center gap-1">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-600">
            +${profitLoss.toLocaleString()}
          </span>
        </div>
      );

    if (profitLoss < 0)
      return (
        <div className="flex items-center gap-1">
          <TrendingDown className="h-5 w-5 text-red-600" />
          <span className="font-semibold text-red-600">
            -${Math.abs(profitLoss).toLocaleString()}
          </span>
        </div>
      );

    return (
      <div className="flex items-center gap-1">
        <Minus className="h-5 w-5 text-gray-600" />
        <span className="font-semibold text-gray-600">$0</span>
      </div>
    );
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageCarousel(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark:text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
              {strategy.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Images Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Strategy Charts & Analysis
              </h3>
              <div className="flex items-center mb-4">
                Profit & Loss : &nbsp;
                {getProfitLossDisplay(strategy.totalPnL)}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {strategy.imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`${strategy.name} chart ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategy Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                  Entry Strategy
                </h4>
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-sm whitespace-pre-line break-words ">
                {parse(strategy.entryStrategy)}
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">
                  Holding Strategy
                </h4>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm whitespace-pre-line break-words ">
                {parse(strategy.holdingStrategy)}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BadgeDollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-green-800 dark:text-green-300">
                  Exit Strategy
                </h4>
              </div>
              <p className="text-sm max-w-[500px] whitespace-pre-line break-words text-green-700 dark:text-green-300 ">
                {parse(strategy.exitStrategy)}
              </p>
            </div>
          </div>
          <div>
            <DialogFooter className="gap-2 flex justify-end">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Close
              </Button>
              <Button
                onClick={handleEditStrategy}
                className="flex items-center gap-2"
              >
                <PenLine className="h-4 w-4" />
                Edit Strategy
              </Button>
              <Button
                onClick={handleDeleteStrategy}
                variant="destructive"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Trash className="h-4 w-4" />
                Delete Strategy
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Carousel Modal */}
      <ImageCarousel
        images={strategy.imageUrls}
        isOpen={showImageCarousel}
        onClose={() => setShowImageCarousel(false)}
        initialIndex={selectedImageIndex}
        title={strategy.name}
      />
    </>
  );
};

export default StrategyModal;
