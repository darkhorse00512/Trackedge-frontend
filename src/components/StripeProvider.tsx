import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RQccf03b6kEuAEwimvsAcoj15yiZL4gfcOP7wIrKYaeOtRO8tyFcgkDMhhmNbxI1xlwabfo7JR3XMg5w2aN0qvr00qFvMgLV8");

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
