
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AllTrades from "./pages/AllTrades";
import AddJournalEntry from "./pages/AddJournalEntry";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import EditTrade from "./pages/EditTrade";
import Success from "./pages/Success";
import ProPayment from "./pages/ProPayment";
import ElitePayment from "./pages/ElitePayment";
import StripeProvider from "./components/StripeProvider";
import Checkout from "./pages/CheckOut";
import CheckoutForm from "./pages/CheckOutForm";
import SuccessPro from "./components/success/SuccessPro";
import SuccessElite from "./components/success/SuccessElite";
import AddStrategy from "./pages/AddStrategy";
import Strategies from "./pages/Strategies";
import EditStrategy from "./pages/EditStrategy";
import MT5Integration from "./pages/MT5Integration";
import JournalEntryDetail from "./pages/JournalEntryDetail";
import SetupDetail from "./pages/SetupDetail";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RQccf03b6kEuAEwimvsAcoj15yiZL4gfcOP7wIrKYaeOtRO8tyFcgkDMhhmNbxI1xlwabfo7JR3XMg5w2aN0qvr00qFvMgLV8');

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/all-entries" element={<AllTrades />} />
            <Route path="/journal-entry/:journalEntryId" element={<JournalEntryDetail />} />
            <Route path="/add-journal-entry" element={<AddJournalEntry />} />
            <Route path="/setups" element={<Strategies />} />
            <Route path="/setup/:setupId" element={<SetupDetail />} />
            <Route path="/add-setup" element={<AddStrategy />} />
            <Route path="/edit-setup" element={<EditStrategy />} />
            <Route path="/mt5-integration" element={<MT5Integration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit-trade" element={<EditTrade />} />
            <Route path="/success" element={<Success />} />
            <Route path="/successPro" element={<SuccessPro />} />
            <Route path="/successElite" element={<SuccessElite />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route 
              path="/pro-payment" 
              element={
                <StripeProvider>
                  <ProPayment />
                </StripeProvider>
              } 
            />
            <Route 
              path="/elite-payment" 
              element={
                <StripeProvider>
                  <ElitePayment />
                </StripeProvider>
              } 
            />
            <Route
              path="/test"
              element={
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </div>
              }
            />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
