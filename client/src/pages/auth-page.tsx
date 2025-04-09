import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");

  // Redirect if user is already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left column - Authentication forms */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to RideSplit</h1>
            <p className="mt-2 text-muted-foreground">
              Join our community of carpoolers and start saving money and making connections
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "login" | "register")} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <LoginForm isLoading={loginMutation.isPending} onSubmit={loginMutation.mutate} />
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <RegisterForm isLoading={registerMutation.isPending} onSubmit={registerMutation.mutate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right column - Hero/info section */}
      <div className="hidden md:flex md:w-1/2 bg-primary-50 p-12 flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-lg z-10 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-900">Split Your Ride, Not Your Wallet 🚗</h2>
          <p className="text-lg mb-8 text-gray-700">
            RideSplit connects you with nearby riders and drivers for your daily commute. Save money on gas, reduce traffic, and make new connections.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">40%</div>
              <p className="text-sm text-gray-600">Average savings on commute costs</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
              <p className="text-sm text-gray-600">Active carpoolers in your area</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
            <h3 className="font-medium mb-3 text-gray-800">What our users say:</h3>
            <p className="italic text-gray-600">
              "I've been using RideSplit for 6 months now, and I've saved over $800 on my commuting costs while making great connections!"
            </p>
            <div className="mt-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold">M</div>
              <div className="ml-2">
                <div className="text-sm font-medium">Michael T.</div>
                <div className="text-xs text-gray-500">Software Engineer</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-200 rounded-full opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}

function LoginForm({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (data: any) => void }) {
  const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
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
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Log in
        </Button>
      </form>
    </Form>
  );
}

function RegisterForm({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (data: any) => void }) {
  const registerSchema = insertUserSchema
    .extend({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      role: z.enum(["rider", "driver", "both"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
      role: "rider",
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
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
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I'm signing up as a:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value as "rider" | "driver" | "both"}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rider" id="rider" />
                    <FormLabel htmlFor="rider" className="font-normal">Rider</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <FormLabel htmlFor="driver" className="font-normal">Driver</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <FormLabel htmlFor="both" className="font-normal">Both</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}