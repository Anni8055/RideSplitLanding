import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, MapPin, Users, ArrowRight, Car, Search, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import carpoolingImage from "../assets/carpooling.svg";
import UberTimeSelect from "./UberTimeSelect";
import UberDateSelect from "./UberDateSelect";

export default function HeroSection() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState("ride");
  const [, navigate] = useLocation();
  
  // Set default date to today
  useEffect(() => {
    if (!time) {
      setTime("now");
    }
  }, []);

  // Function to handle the get started action
  const handleGetStarted = () => {
    navigate("/auth");
  };

  // Function to scroll to a section when button is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white pt-28 md:pt-32 pb-20 overflow-hidden">
      {/* Full-width image behind hero content */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <img src={carpoolingImage} alt="Happy people carpooling" className="w-full h-full object-cover" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <motion.div 
            className="w-full lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-800 mb-6">
              Split Your Ride, <br className="hidden sm:block"/> Not Your Wallet <span className="inline-block">🚗</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl">
              Join affordable carpools for your daily commute. Save money and reduce your carbon footprint with RideSplit.
            </p>
            
            <div className="mb-6">
              <Link href="/3d-story">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg text-base px-6 py-6 font-semibold flex items-center gap-2 transform transition-all hover:scale-105">
                  <span className="text-lg mr-1">🚗</span> Experience RideSplit Journey
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-neutral-700">50+ Cities Covered</p>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-neutral-700">10,000+ Active Riders</p>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-full mr-3">
                  <Leaf className="h-5 w-5 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-neutral-700">Eco-Friendly Travel</p>
              </div>
            </div>
            
            {/* Happy people carpooling image */}
            <motion.div 
              className="mt-8 lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src={carpoolingImage} 
                alt="Happy people carpooling" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </motion.div>
          </motion.div>
          
          {/* Booking card - Uber-style */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="ride" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white py-3">
                      <Car className="mr-2 h-4 w-4" />
                      Find a Ride
                    </TabsTrigger>
                    <TabsTrigger value="drive" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white py-3">
                      <Users className="mr-2 h-4 w-4" />
                      Offer a Ride
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ride" className="mt-0">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <Input 
                          className="pl-10 py-6 bg-gray-50 border-gray-200" 
                          placeholder="Enter pickup location"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Navigation className="h-5 w-5" />
                        </div>
                        <Input 
                          className="pl-10 py-6 bg-gray-50 border-gray-200" 
                          placeholder="Enter destination"
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <UberDateSelect value={date} onChange={setDate} />
                        <UberTimeSelect value={time} onChange={setTime} />
                      </div>
                      
                      <Link href="/auth">
                        <Button className="w-full py-6 text-lg font-medium bg-primary-500 hover:bg-primary-600">
                          <Search className="mr-2 h-5 w-5" /> Find Rides
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="drive" className="mt-0">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <Input 
                          className="pl-10 py-6 bg-gray-50 border-gray-200" 
                          placeholder="Your starting point"
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Navigation className="h-5 w-5" />
                        </div>
                        <Input 
                          className="pl-10 py-6 bg-gray-50 border-gray-200" 
                          placeholder="Your destination"
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <UberDateSelect value={date} onChange={setDate} />
                        <UberTimeSelect value={time} onChange={setTime} />
                      </div>
                      
                      <Link href="/auth">
                        <Button className="w-full py-6 text-lg font-medium bg-primary-500 hover:bg-primary-600">
                          <Car className="mr-2 h-5 w-5" /> Offer a Ride
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Stats cards floating around */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-neutral-100 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-50 rounded-full flex items-center justify-center text-secondary-500">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-600">CO2 Reduced This Month</p>
                  <p className="text-sm font-bold text-secondary-600">12,450 kg</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-neutral-100 hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex flex-shrink-0 -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 border-2 border-white">
                    <span className="text-xs font-bold">JD</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary-200 flex items-center justify-center text-primary-600 border-2 border-white">
                    <span className="text-xs font-bold">KS</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-600">Average Savings</p>
                  <p className="text-sm font-bold text-primary-600">₹4,500/month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}