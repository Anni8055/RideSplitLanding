import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, Users, LogIn, UserPlus, Mail, Lock, 
  User, AtSign, MapPin, PhoneCall, ArrowLeft, 
  ArrowRight, ShieldCheck, Percent, DollarSign, UserCheck 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");
  const [registrationType, setRegistrationType] = useState<"rider" | "carowner" | null>(null);

  // Redirect if user is already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {registrationType ? (
        // Registration flow - Step 2: Specific form
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <Link href="/" className="flex items-center text-2xl font-bold">
                <Car className="w-7 h-7 mr-1 text-primary-500" />
                <span className="text-primary-500">Ride</span><span className="text-secondary-500">Split</span>
              </Link>
              <button 
                onClick={() => setRegistrationType(null)} 
                className="ml-6 text-gray-500 flex items-center hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
            </div>
          </header>
          
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Left column - Registration form */}
            <div className="w-full md:w-3/5 p-6 md:p-12">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-1">
                  {registrationType === "rider" ? "Join as a Rider" : "Join as a Car Owner"}
                </h1>
                <p className="text-gray-500 mb-6">
                  {registrationType === "rider" 
                    ? "Create your account to find affordable rides" 
                    : "Create your account to offer rides and earn money"}
                </p>
                {registrationType === "rider" ? (
                  <RiderRegisterForm 
                    isLoading={registerMutation.isPending} 
                    onSubmit={(data) => registerMutation.mutate({ ...data, role: "rider" })} 
                  />
                ) : (
                  <CarOwnerRegisterForm 
                    isLoading={registerMutation.isPending} 
                    onSubmit={(data) => registerMutation.mutate({ ...data, role: "carowner" })} 
                  />
                )}
                
                <div className="mt-8 text-center text-gray-500 text-sm">
                  Already have an account? <button 
                    onClick={() => {
                      setRegistrationType(null);
                      setSelectedTab("login");
                    }} 
                    className="text-primary-600 hover:underline"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right column - Benefits */}
            <div className="hidden md:block md:w-2/5 bg-primary-50 p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  {registrationType === "rider" 
                    ? "Benefits of riding with us" 
                    : "Benefits of being a car owner with us"}
                </h2>
                
                <div className="space-y-6">
                  {registrationType === "rider" ? (
                    <>
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Save on commute costs</h3>
                          <p className="text-gray-600 text-sm">Split gas and toll expenses with other commuters heading your way</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                          <Users className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Make connections</h3>
                          <p className="text-gray-600 text-sm">Meet people who live and work near you. Make friends with similar routines</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Safe and vetted car owners</h3>
                          <p className="text-gray-600 text-sm">All car owners are verified and reviewed by other riders for your safety</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Earn on your commute</h3>
                          <p className="text-gray-600 text-sm">Turn your daily trips into money-making opportunities by sharing your ride</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                          <Percent className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Lower your expenses</h3>
                          <p className="text-gray-600 text-sm">Cut down on gas, maintenance, and parking costs by sharing rides</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">You're in control</h3>
                          <p className="text-gray-600 text-sm">Choose when to drive, where to go, and who to accept as passengers</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">S</div>
                    <div className="ml-4">
                      <div className="font-medium">Sarah J.</div>
                      <div className="text-xs text-gray-500">University Student</div>
                    </div>
                    <div className="ml-auto text-yellow-400 flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-600">
                    "RideSplit has completely changed my commute to campus. I'm saving over $200 a month and have made friends with other students in my area!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Initial choice screen - Step 1: Choose account type or login
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center text-2xl font-bold">
                <Car className="w-7 h-7 mr-1 text-primary-500" />
                <span className="text-primary-500">Ride</span><span className="text-secondary-500">Split</span>
              </Link>
            </div>
          </header>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full">
              <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "login" | "register")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="py-3">
                    <LogIn className="w-4 h-4 mr-2" /> Log In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="py-3">
                    <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
                      <LoginForm isLoading={loginMutation.isPending} onSubmit={loginMutation.mutate} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="register" className="space-y-4">
                  <h1 className="text-2xl font-bold text-center mb-2">Join RideSplit</h1>
                  <p className="text-center text-gray-500 mb-6">How would you like to use RideSplit?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card 
                      className={`border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        selectedTab === "register" ? "hover:border-primary-300" : ""
                      }`}
                      onClick={() => setRegistrationType("rider")}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                          <Users className="h-8 w-8 text-primary-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Rider</h2>
                        <p className="text-gray-500 text-sm mb-4">
                          Find affordable rides for your daily commute
                        </p>
                        <Button className="mt-auto" variant="outline">
                          Sign up to ride <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        selectedTab === "register" ? "hover:border-primary-300" : ""
                      }`}
                      onClick={() => setRegistrationType("carowner")}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                          <Car className="h-8 w-8 text-primary-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Car Owner</h2>
                        <p className="text-gray-500 text-sm mb-4">
                          Offer rides and earn money while commuting
                        </p>
                        <Button className="mt-auto" variant="outline">
                          Sign up as car owner <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account? <button 
                      onClick={() => setSelectedTab("login")} 
                      className="text-primary-600 hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input placeholder="username" className="pl-10 py-6" {...field} />
                </div>
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
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input type="password" placeholder="••••••••" className="pl-10 py-6" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <Button type="submit" className="w-full py-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
}

function RiderRegisterForm({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (data: any) => void }) {
  const registerSchema = insertUserSchema
    .extend({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
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
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input placeholder="John Doe" className="pl-10 py-6" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input type="email" placeholder="john@example.com" className="pl-10 py-6" {...field} />
                  </div>
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
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <AtSign className="h-5 w-5" />
                    </div>
                    <Input placeholder="johndoe" className="pl-10 py-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input type="password" placeholder="••••••••" className="pl-10 py-6" {...field} />
                  </div>
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
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input type="password" placeholder="••••••••" className="pl-10 py-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Rider Account
          </Button>
        </div>
      </form>
    </Form>
  );
}

function CarOwnerRegisterForm({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (data: any) => void }) {
  const registerSchema = insertUserSchema
    .extend({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
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
      role: "carowner",
      phone: "",
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
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input placeholder="John Doe" className="pl-10 py-6" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input type="email" placeholder="john@example.com" className="pl-10 py-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <Input placeholder="(555) 123-4567" className="pl-10 py-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <AtSign className="h-5 w-5" />
                  </div>
                  <Input placeholder="johndoe" className="pl-10 py-6" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input type="password" placeholder="••••••••" className="pl-10 py-6" {...field} />
                  </div>
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
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input type="password" placeholder="••••••••" className="pl-10 py-6" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Car Owner Account
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            By signing up, you agree to our Terms of Service and Privacy Policy. We'll ask for more vehicle information after registration.
          </p>
        </div>
      </form>
    </Form>
  );
}