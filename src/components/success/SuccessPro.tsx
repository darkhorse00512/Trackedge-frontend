import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, Key, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SuccessPro = () => {
  const [progress, setProgress] = useState(0);
  const [showLock, setShowLock] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    // Sequence of animations
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setUnlocking(true);
      await new Promise((r) => setTimeout(r, 1500));
      setUnlocking(false);
      setShowLock(false);
      setUnlocked(true);
      await new Promise((r) => setTimeout(r, 1000));
      setShowFeatures(true);
      await new Promise((r) => setTimeout(r, 1000));
      setShowDialog(true);
    };

    sequence();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const updateSubscription = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.patch(
          `${SERVER_URL}/users/me/subscription`,
          {
            newSubscription: "Pro",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Your Pro subscription updated successfully");
      } catch (error) {
        toast.error("Failed to update subscription");
      }
    };

    updateSubscription();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Pro Plan Activated!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome to your enhanced trading experience
        </p>
      </div>

      <div className="mb-10">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="relative flex justify-center items-center h-60 mb-12">
        {showLock && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <Lock
              size={120}
              className="text-primary drop-shadow-lg"
              strokeWidth={1.5}
            />
          </motion.div>
        )}

        {unlocking && (
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -45 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="absolute"
          >
            <Key
              size={80}
              className="text-yellow-500 drop-shadow-lg"
              strokeWidth={1.5}
            />
          </motion.div>
        )}

        {unlocked && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: 1,
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{ duration: 1, times: [0, 0.4, 1] }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-6 inline-block">
              <Crown size={80} strokeWidth={2} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mt-4 text-foreground">
              Pro Plan Unlocked
            </h3>
          </motion.div>
        )}
      </div>

      {showFeatures && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Up to 100 entries/month
                </h3>
                <p className="text-muted-foreground">
                  Keep track of more data with an increased monthly limit.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-primary-200 dark:border-primary-800">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">1GB data storage</h3>
                <p className="text-muted-foreground">
                  Store more files, records, or logs—perfect for consistent
                  usage.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-primary-200 dark:border-primary-800">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Lifetime data retention
                </h3>
                <p className="text-muted-foreground">
                  Your data stays safe—no auto-deletion or time limits.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-muted-foreground">
                  Dive deep into your trading performance with professional
                  analytics tools.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect
                      x="7"
                      y="2"
                      width="10"
                      height="20"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
                <p className="text-muted-foreground">
                  Access and manage your data on the go via mobile devices.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Search Filters
                </h3>
                <p className="text-muted-foreground">
                  Quickly find exactly what you need with powerful filter
                  options.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/dashboard">
              <Button size="lg" className="px-8 py-6 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            <div>
              <h4 className="font-semibold mb-4 text-blue-500 mt-6">
                Your Pro Benefits
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Up to 100 entries/month
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  1GB data storage
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Lifetime data retention
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Mobile access
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Advanced Search Filters
                </li>
              </ul>
            </div>
          </DialogTitle>
          <div className="flex justify-end">
            <Button onClick={() => setShowDialog(false)}>Got it!</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessPro;
