
import { useState } from "react";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";

export const useFirebaseAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Store token in localStorage
      localStorage.setItem("auth_token", await user.getIdToken());
      return { success: true, user };
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed", {
        description: error.message || "Please try again later"
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign in with email/password
  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Store token in localStorage
      localStorage.setItem("auth_token", await userCredential.user.getIdToken());
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error("Email sign-in error:", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register with email/password
  const registerWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store token in localStorage
      localStorage.setItem("auth_token", await userCredential.user.getIdToken());
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail
  };
};
