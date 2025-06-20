import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Registration form schema
const registerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

type RegisterFormProps = {
  plan?: string | null;
  onSuccess: () => void;
  onError: () => void;
};

export default function RegisterForm({ plan, onSuccess, onError }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { registerWithEmail, signInWithGoogle, isLoading: isAuthLoading } = useFirebaseAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      terms: true,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const subscription = plan === 'Pro' ? 'Pro' : plan === 'Elite' ? 'Elite' : 'Free';
      const result = await axios.post(`${SERVER_URL}/users`, {
        name: data.fullName,
        email: data.email,
        password: data.password,
        subscription: subscription,
      });

      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user) {
        const idToken = await user.getIdToken(); // Get the ID token
        localStorage.setItem('token', idToken);
        
        // Set token expiration time (1 hour from now)
        const expireTime = Date.now() + 3600 * 1000;
        localStorage.setItem('expireTime', expireTime.toString());
        
        onSuccess();
      }
    }
    catch {
      onError();
    }
    finally {
      setIsLoading(false);
    }
  }

  // const handleGoogleSignUp = async () => {
  //   const result = await signInWithGoogle();
  //   if (result.success) {
  //     onSuccess();
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Google Sign-up Button */}
      {/* <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 h-11 bg-white hover:bg-gray-50 dark:bg-background dark:hover:bg-muted"
        onClick={handleGoogleSignUp}
        disabled={isAuthLoading || isLoading}
      >
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        Sign up with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or register with email
          </span>
        </div>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      autoComplete="name"
                      className="pl-10 transition-all duration-200 border-border/50 focus:border-primary"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      {...field}
                      autoComplete="email"
                      className="pl-10 transition-all duration-200 border-border/50 focus:border-primary"
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
                      placeholder="Create a password"
                      {...field}
                      autoComplete="new-password"
                      className="pl-10 transition-all duration-200 border-border/50 focus:border-primary"
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
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary data-[state=checked]:animate-pulse"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the Terms of Service and Privacy Policy
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-tradeedge-blue-dark hover:shadow-md transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
