import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, Key, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SuccessElite = () => {
  const [progress, setProgress] = useState(0);
  const [showLock, setShowLock] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    // Progress bar animation with easing
    const timer = setTimeout(() => {
      setProgress(100);
    }, 800);

    // Sequence of animations
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1500));
      setUnlocking(true);
      await new Promise((r) => setTimeout(r, 1800));
      setUnlocking(false);
      setShowLock(false);
      setUnlocked(true);
      await new Promise((r) => setTimeout(r, 1200));
      setShowFeatures(true);
      await new Promise((r) => setTimeout(r, 2000));
      setShowSheet(true);
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
            newSubscription: "Elite",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Your Elite subscription updated successfully");
      } catch (error) {
        toast.error("Failed to update subscription");
      }
    };

    updateSubscription();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
          Elite Access Granted!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome to our premier trading experience
        </p>
      </div>

      <div className="mb-10">
        <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
        </Progress>
      </div>

      <div className="relative flex justify-center items-center h-72 mb-16">
        {showLock && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute"
          >
            <div className="relative">
              <Lock
                size={140}
                className="text-amber-600 drop-shadow-xl"
                strokeWidth={1.5}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl"
              />
            </div>
          </motion.div>
        )}

        {unlocking && (
          <motion.div
            initial={{ x: -120, opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
            className="absolute"
          >
            <div className="relative">
              <Key
                size={100}
                className="text-yellow-500 drop-shadow-xl"
                strokeWidth={1.5}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-yellow-400/40 blur-md"
              />
            </div>
          </motion.div>
        )}

        {unlocked && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.3, 1],
              opacity: 1,
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{ duration: 1.5, times: [0, 0.6, 1] }}
            className="text-center"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-full p-8 inline-block">
                <Medal size={80} strokeWidth={2} className="text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl -z-10"
              />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-3xl font-bold mt-6 text-foreground bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent"
            >
              Elite Access Unlocked
            </motion.h3>
          </motion.div>
        )}
      </div>

      {showFeatures && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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
                  Unlimited entries
                </h3>
                <p className="text-muted-foreground">
                  Never worry about hitting limits—track and store as much as
                  you need.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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
                <h3 className="text-xl font-semibold mb-2">5GB data storage</h3>
                <p className="text-muted-foreground">
                  Ample space for documents, logs, records, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4">
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
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">API Access</h3>
                <p className="text-muted-foreground">
                  Full integration capabilities for developers and enterprise
                  workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden h-full transform transition-all hover:-translate-y-1 hover:shadow-lg border-amber-200 dark:border-amber-800">
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
                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                    <path d="M21 19a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1"></path>
                    <path d="M3 19a2 2 0 002 2h2a2 2 0 002-2v-1"></path>
                    <path d="M12 5v2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
                <p className="text-muted-foreground">
                  Get top-tier support with faster response times and
                  personalized assistance.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-center mt-12"
          >
            <Link to="/dashboard">
              <Button
                size="lg"
                className="px-10 py-7 text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
              >
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      )}

      <Dialog open={showSheet} onOpenChange={setShowSheet}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            <div>
              <h4 className="font-semibold mb-4 text-amber-500 mt-6">
                Your Elite Benefits
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
                  Unlimited entries
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
                  5GB data storage
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
                  API Access
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
                  Priority support
                </li>
              </ul>
            </div>
          </DialogTitle>
          <div className="flex justify-end">
            <Button onClick={() => setShowSheet(false)}>Got it!</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessElite;
