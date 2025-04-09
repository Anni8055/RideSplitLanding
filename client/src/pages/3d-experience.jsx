import React from 'react';
import CarShowcase from '@/components/3D/CarShowcase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Leaf, Users } from 'lucide-react';

export default function ThreeDExperience() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 mb-4">
            <span className="text-primary-500">3D</span> Experience
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Explore our interactive 3D showcase and see how RideSplit is revolutionizing urban mobility.
          </p>
        </div>
        
        {/* Main 3D showcase */}
        <div className="mb-20">
          <motion.div 
            className="h-[400px] md:h-[500px] bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CarShowcase className="w-full h-full" />
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature Card 1 */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Ride Matching</h3>
              <p className="text-neutral-600">
                Our intelligent algorithm matches riders going in the same direction for maximum efficiency.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature Card 2 */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-neutral-600">
                By sharing rides, each RideSplit trip reduces carbon emissions by up to 40% compared to individual rides.
              </p>
            </CardContent>
          </Card>
          
          {/* Feature Card 3 */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Building</h3>
              <p className="text-neutral-600">
                RideSplit connects people with similar commutes, creating opportunities for networking and friendship.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Car Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-primary-100 to-primary-50 flex items-center justify-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"></circle>
                  <line x1="3" y1="12" x2="9" y2="12"></line>
                  <line x1="15" y1="12" x2="21" y2="12"></line>
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">360° Views</h3>
                <p className="text-neutral-600">Explore every angle of available cars with our interactive 360-degree viewer.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Color Options</h3>
                <p className="text-neutral-600">Choose from a variety of colors to match your style and personality.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Performance Data</h3>
                <p className="text-neutral-600">Get real-time information about fuel efficiency and ride comfort for each vehicle.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 py-6 px-8 text-lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}