import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, CheckCircle, AlertCircle, BadgePercent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
  tierName: string;
  price: number;
  basePrice: number;
  discount: number;
  discPro: number;
  nextBillingDate: string;
  onBack: () => void;
}

interface FormState {
  cardName: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

interface FormErrors {
  cardName?: string;
  cardNumber?: string;
  expiration?: string;
  cvc?: string;
}

const PaymentForm = ({ 
  tierName, 
  price, 
  basePrice, 
  discount,
  discPro,
  nextBillingDate,
  onBack 
}: PaymentFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<FormState>({
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvc: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    cardName: false,
    cardNumber: false,
    expiration: false,
    cvc: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiration date
    if (name === 'expiration') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
      }
    }
    
    // Limit CVC to 3-4 digits
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setFormState(prev => ({ ...prev, [name]: formattedValue }));
    validateField(name as keyof FormState, formattedValue);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof FormState, formState[name as keyof FormState]);
  };
  
  const validateField = (field: keyof FormState, value: string) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'cardName':
        if (!value.trim()) {
          newErrors.cardName = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.cardName = 'Name should contain only letters';
        } else {
          delete newErrors.cardName;
        }
        break;
        
      case 'cardNumber':
        const digitsOnly = value.replace(/\s/g, '');
        if (!digitsOnly) {
          newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(digitsOnly)) {
          newErrors.cardNumber = 'Card number must be 16 digits';
        } else {
          delete newErrors.cardNumber;
        }
        break;
        
      case 'expiration':
        if (!value) {
          newErrors.expiration = 'Expiration date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          newErrors.expiration = 'Use format MM/YY';
        } else {
          const [month, year] = value.split('/').map(Number);
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear() % 100;
          const currentMonth = currentDate.getMonth() + 1;
          
          if (month < 1 || month > 12) {
            newErrors.expiration = 'Invalid month';
          } else if (
            (year < currentYear) || 
            (year === currentYear && month < currentMonth)
          ) {
            newErrors.expiration = 'Card expired';
          } else {
            delete newErrors.expiration;
          }
        }
        break;
        
      case 'cvc':
        if (!value) {
          newErrors.cvc = 'CVC is required';
        } else if (!/^\d{3,4}$/.test(value)) {
          newErrors.cvc = 'CVC must be 3 or 4 digits';
        } else {
          delete newErrors.cvc;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Set all fields as touched
    const allTouched = Object.keys(formState).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {}) as Record<keyof FormState, boolean>;
    
    setTouched(allTouched);
    
    // Validate each field
    Object.entries(formState).forEach(([field, value]) => {
      const fieldKey = field as keyof FormState;
      if (!validateField(fieldKey, value)) {
        isValid = false;
      }
    });
    
    return isValid;
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Processing payment",
        description: "Your payment is being processed.",
      });
      // console.log(formState);
      
      // Simulate payment processing
      setTimeout(() => {
        // Navigate to the success page based on the tier
        if (tierName === "Pro") {
          navigate('/success?plan=pro');
        } else if (tierName === "Elite") {
          navigate('/success?plan=elite');
        } else {
          navigate("/"); // Default fallback
        }
      }, 1500);
    } else {
      toast({
        title: "Invalid payment details",
        description: "Please check your payment information and try again.",
        variant: "destructive",
      });
    }
  };
  
  const getInputStatus = (field: keyof FormState) => {
    if (!touched[field]) return "default";
    return errors[field] ? "error" : "valid";
  };
  
  const getInputClassName = (field: keyof FormState) => {
    const status = getInputStatus(field);
    return cn(
      "transition-all duration-200",
      status === "error" && "border-red-500 focus-visible:ring-red-500",
      status === "valid" && "border-green-500 focus-visible:ring-green-500"
    );
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4"
      >
        ← Back to pricing
      </Button>
      
      <Card className="border-2 shadow-lg backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Complete your purchase</span>
            <Wallet className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription className="mt-1">
            You are purchasing the <span className="font-medium text-primary">{tierName}</span> plan.
          </CardDescription>
          
          {/* Price Breakdown Section */}
          <div className="mt-4 space-y-2 pt-4 border-t text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Base price:</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span className="flex items-center gap-1">
                  <BadgePercent className="h-3.5 w-3.5" />
                  <span>Discount ({discPro}%):</span>
                </span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Discounted price:</span>
              <span>${(basePrice - discount).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center font-bold pt-1 border-t">
              <span>Total:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            
            {basePrice > 0 && (
              <div className="pt-2 text-sm text-muted-foreground">
                <span>Next billing date: </span>
                <span className="font-medium">{nextBillingDate}</span>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handlePayment} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="cardName" className="flex justify-between">
                <span>Name on card</span>
                {touched.cardName && (
                  errors.cardName ? 
                  <span className="text-xs text-red-500">{errors.cardName}</span> :
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Valid
                  </span>
                )}
              </Label>
              <Input 
                id="cardName" 
                name="cardName"
                placeholder="John Doe" 
                value={formState.cardName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('cardName')}
                autoComplete="cc-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="flex justify-between">
                <span>Card number</span>
                {touched.cardNumber && (
                  errors.cardNumber ? 
                  <span className="text-xs text-red-500">{errors.cardNumber}</span> :
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Valid
                  </span>
                )}
              </Label>
              <div className="relative">
                <Input 
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242" 
                  className={cn("pl-10", getInputClassName('cardNumber'))}
                  value={formState.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="cc-number"
                />
                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiration" className="flex justify-between">
                  <span>Expiration</span>
                  {touched.expiration && (
                    errors.expiration ? 
                    <span className="text-xs text-red-500">{errors.expiration}</span> :
                    <span className="text-xs text-green-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Valid
                    </span>
                  )}
                </Label>
                <Input 
                  id="expiration"
                  name="expiration"
                  placeholder="MM/YY"
                  value={formState.expiration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('expiration')}
                  autoComplete="cc-exp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc" className="flex justify-between">
                  <span>CVC</span>
                  {touched.cvc && (
                    errors.cvc ? 
                    <span className="text-xs text-red-500">{errors.cvc}</span> :
                    <span className="text-xs text-green-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Valid
                    </span>
                  )}
                </Label>
                <Input 
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  value={formState.cvc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('cvc')}
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-t mt-4 p-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 py-6 text-base" 
            onClick={handlePayment}
            disabled={Object.keys(errors).length > 0}
          >
            <Wallet className="mr-2 h-5 w-5" /> 
            Pay ${price.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;