
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface PricingTier {
  name: string;
  price: number;
  discPro: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  selected: boolean;
  onSelect: () => void;
}

const PricingCard = ({ tier, selected, onSelect }: PricingCardProps) => {
  return (
    <Card className={`pricing-card w-full max-w-sm border-2 ${selected ? 'selected' : ''}`}>
      <CardHeader className="text-center">
        {tier.popular && (
          <Badge className="absolute top-4 right-4 bg-primary text-white">Popular</Badge>
        )}
        <CardTitle className="text-xl">
          {tier.name}
        </CardTitle>
        <div className="flex justify-center items-baseline mt-2">
          <span className="text-4xl font-bold">${tier.price}</span>
          {tier.price > 0 && <span className="ml-1 text-gray-500">/month</span>}
        </div>
        <CardDescription className="mt-2">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={selected ? "default" : "outline"}
          onClick={onSelect}
        >
          {selected ? "Selected" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
