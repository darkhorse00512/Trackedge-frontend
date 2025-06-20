
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PricingTier } from "@/components/PricingCard";
import { useToast } from "@/hooks/use-toast";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StripePaymentProps {
  tier: PricingTier;
  price: number;
}

const StripePayment: React.FC<StripePaymentProps> = ({ tier, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Arial, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    // In a real application, you would create a payment intent on your server
    // Here we're simulating a successful payment for demonstration
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment successful",
        description: `You have successfully subscribed to the ${tier.name} plan.`,
      });
      
      // Redirect to success page based on tier
      if (tier.name === "Pro") {
        navigate("/success-pro");
      } else if (tier.name === "Elite") {
        navigate("/success-elite");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error instanceof Error ? error.message : "An unknown error occurred");
      
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "Please check your card details and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-md bg-white dark:bg-slate-900">
        <div className="relative">
          <CardElement 
            options={cardElementOptions} 
            onChange={handleCardChange}
            className={cn(
              "p-4 min-h-[40px] flex items-center border border-input rounded-md",
              cardError ? "border-red-500" : "border-gray-300"
            )}
          />
        </div>
        {cardError && (
          <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>{cardError}</span>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isLoading} 
        className="w-full py-6 text-lg flex items-center justify-center gap-2"
      >
        <Wallet className="h-5 w-5" />
        {isLoading ? "Processing..." : `Pay $${price.toFixed(2)}`}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center">
          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </form>
  );
};

export default StripePayment;
