
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "sonner";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Form schema for validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
  onError: () => void;
  onForgotPasswordClick: () => void;
}

const LoginForm = ({ onSuccess, onError, onForgotPasswordClick }: LoginFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithEmail, signInWithGoogle, isLoading: isAuthLoading } = useFirebaseAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const setExpireTime = (): void => {
    const expireTime: number = Date.now() + 3600*1000;
    localStorage.setItem('expireTime', expireTime.toString());
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      if (user) {
        const idToken = await user.getIdToken(); // Get the ID token
        localStorage.setItem('token', idToken);
        setExpireTime();
        // console.log(localStorage.getItem('token'));
        onSuccess();
      } else {
        onError();
      }
    } catch (error) {
      console.error(error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   const result = await signInWithGoogle();
  //   if (result.success) {
  //     onSuccess();
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Google Sign-in Button */}
      {/* <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 h-11 bg-white hover:bg-gray-50 dark:bg-background dark:hover:bg-muted"
        onClick={handleGoogleSignIn}
        disabled={isAuthLoading || isSubmitting}
      >
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      className="pl-10 transition-all duration-200 border-border/50 focus:border-primary"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      className="pl-10 transition-all duration-200 border-border/50 focus:border-primary"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />
            <Button
              type="button"
              variant="link"
              className="text-sm font-medium px-0"
              onClick={onForgotPasswordClick}
            >
              Forgot Password?
            </Button>
          </div>

          {form.formState.errors.root && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border-l-4 border-destructive pl-4 animate-pulse">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-primary to-tradeedge-blue-dark hover:shadow-md transition-all duration-300"
            disabled={isSubmitting || isAuthLoading}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;