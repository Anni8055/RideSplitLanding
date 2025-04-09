import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf, MapPin, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  // Function to scroll to a section when button is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative min-h-screen bg-hero-pattern pt-28 md:pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-800 mb-6">
              Split Your Ride, <br className="hidden sm:block"/> Not Your Wallet <span className="inline-block">🚗</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl">
              Connect with nearby drivers and passengers for affordable, sustainable daily commutes. Save money and reduce your carbon footprint.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="group px-8 py-6 rounded-full font-bold text-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => scrollToSection('how-it-works')}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-6 rounded-full text-primary-600 font-medium border-2 border-primary-200 hover:border-primary-400 transition shadow-sm hover:shadow bg-white/95"
                onClick={() => scrollToSection('how-it-works')}
              >
                How It Works
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
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
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1577210897949-1f56f943a493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="People sharing a ride through the city" 
                className="w-full h-auto object-cover"
                width="600"
                height="450"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-5 max-w-xs border border-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-50 rounded-full flex items-center justify-center text-secondary-500">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">CO2 Reduced This Month</p>
                  <p className="text-xl font-bold text-secondary-600">12,450 kg</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-5 max-w-xs border border-neutral-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 border-2 border-white">
                    <span className="text-xs font-bold">JD</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-600 border-2 border-white">
                    <span className="text-xs font-bold">KS</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center text-white border-2 border-white">
                    <span className="text-xs font-bold">MP</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">Average Savings</p>
                  <p className="text-xl font-bold text-primary-600">$175/month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave decoration at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#FFFFFF" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
}
