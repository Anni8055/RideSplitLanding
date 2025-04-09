import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Users, TreePine, Car } from 'lucide-react';

const ThreeDStory = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stats, setStats] = useState({
    co2Saved: 15763,
    ridesShared: 4328,
    friendsMade: 8654
  });

  const steps = [
    { id: 0, name: 'home', title: 'Home', description: 'Car waiting at the starting point', duration: 2000 },
    { id: 1, name: 'pickup1', title: 'Pickup 1', description: 'First rider enters the car', duration: 2000 },
    { id: 2, name: 'pickup2', title: 'Pickup 2', description: 'Second rider enters the car', duration: 2000 },
    { id: 3, name: 'pickup3', title: 'Pickup 3', description: 'Third rider enters the car', duration: 2000 },
    { id: 4, name: 'journey', title: 'Journey', description: 'Car journeying to destination', duration: 2500 },
    { id: 5, name: 'destination', title: 'Destination', description: 'Car arrives at destination', duration: 2000 },
    { id: 6, name: 'friendship', title: 'Friendship', description: 'Group enjoying time together', duration: 3000 }, // Extended duration for emphasis
    { id: 7, name: 'impact', title: 'Impact', description: 'Environmental impact statistics', duration: 2500 }
  ];

  // Auto advance through steps with variable durations
  useEffect(() => {
    if (currentStep >= steps.length - 1) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, steps[currentStep].duration); // Use duration from current step
    
    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 3),
        ridesShared: prev.ridesShared + Math.floor(Math.random() * 2),
        friendsMade: prev.friendsMade + Math.floor(Math.random() * 3)
      }));
    }, 5000); // Every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const resetJourney = () => {
    setCurrentStep(0);
  };

  // Render the appropriate scene based on the current step
  const renderScene = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="relative h-full">
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            <div className="absolute bottom-24 right-20 w-48 h-24">
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-2 left-10 w-28 h-6 bg-blue-200 rounded-sm"></div>
                
                <div className="absolute top-3 left-14 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Starting Point</h3>
              <p className="text-neutral-600">The car owner is ready to pick up riders</p>
            </div>
          </div>
        );
        
      case 1:
      case 2:
      case 3:
        return (
          <div className="relative h-full">
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            <div className="absolute bottom-24 left-80 w-48 h-24">
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-2 left-10 w-28 h-6 bg-blue-200 rounded-sm"></div>
                
                {/* Car Owner */}
                <div className="absolute top-3 left-14 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                
                {/* Show riders based on current step */}
                {currentStep >= 1 && (
                  <div className="absolute top-3 left-22 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                )}
                
                {currentStep >= 2 && (
                  <div className="absolute top-3 left-30 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                )}
                
                {currentStep >= 3 && (
                  <div className="absolute top-10 left-22 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                )}
              </div>
            </div>
            
            <motion.div 
              className="absolute bottom-22 left-50 w-8 h-20"
              initial={{ x: 0 }}
              animate={{ x: 30, y: -2 }}
              transition={{ duration: 1 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">👋</span>
              </div>
              <div className="w-8 h-12 bg-blue-700 mt-1"></div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Pickup {currentStep}</h3>
              <p className="text-neutral-600">Rider {currentStep} enters the car</p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100"></div>
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            <motion.div 
              className="absolute bottom-24 w-48 h-24"
              initial={{ x: -50 }}
              animate={{ x: 300 }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-2 left-10 w-28 h-6 bg-blue-200 rounded-sm"></div>
                
                {/* People in car */}
                <div className="absolute top-3 left-14 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="absolute top-3 left-22 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="absolute top-3 left-30 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="absolute top-10 left-22 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Journey</h3>
              <p className="text-neutral-600">Everyone travels together, saving emissions</p>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100"></div>
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            {/* Building */}
            <div className="absolute bottom-20 right-40 w-60 h-50 bg-red-100">
              <div className="w-full h-10 bg-red-500 flex items-center justify-center">
                <span className="text-white font-bold">CAMPUS CAFE</span>
              </div>
            </div>
            
            {/* Car */}
            <div className="absolute bottom-24 left-20 w-48 h-24">
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
              </div>
            </div>
            
            {/* People getting out */}
            <motion.div 
              className="absolute bottom-22 left-100 flex space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-12 bg-yellow-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-12 bg-green-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-12 bg-purple-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-12 bg-blue-700 mt-1"></div>
              </div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Arrival</h3>
              <p className="text-neutral-600">Everyone arrives at the destination</p>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="relative h-full">
            <div className="absolute inset-0 bg-orange-50"></div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-60 h-40 bg-brown-300 rounded-full relative overflow-hidden">
                <div className="absolute top-5 left-5 right-5 bottom-5 bg-brown-400 rounded-full"></div>
              </div>
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
              </div>
              
              <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
              </div>
              
              <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute top-10 left-0 right-0 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-bold text-primary-700 mb-4">New Friendships Created 🎉</h2>
              
              <div className="flex justify-center gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-green-700">CO₂ Saved</h3>
                  <p className="text-xl">3.5kg 🌱</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-primary-700">One Less Car</h3>
                  <p className="text-xl">on the Road 🚗❌</p>
                </div>
              </div>
            </motion.div>
          </div>
        );
        
      case 7:
        return (
          <div className="h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">RideSplit Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <TreePine className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">CO₂ Saved</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.co2Saved.toLocaleString()} kg</p>
                <p className="text-neutral-600 mt-2">Equivalent to planting {Math.floor(stats.co2Saved / 25)} trees</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Car className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold">Rides Shared</h3>
                </div>
                <p className="text-3xl font-bold text-primary-600">{stats.ridesShared.toLocaleString()}</p>
                <p className="text-neutral-600 mt-2">Reducing traffic by {Math.floor(stats.ridesShared / 2)} cars</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Friends Made</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{stats.friendsMade.toLocaleString()}</p>
                <p className="text-neutral-600 mt-2">Creating a community of riders</p>
              </motion.div>
            </div>
          </div>
        );
        
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 mb-4">
            <span className="text-primary-500">RideSplit</span> Journey Experience
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Experience how RideSplit connects people, saves the environment, and makes commuting fun.
          </p>
        </div>
        
        {/* Split View Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left Side - 3D Scene */}
          <div className="w-full lg:w-1/2">
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary-500" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Clickable Dots */}
                <div className="flex justify-between relative z-10">
                  {steps.map((step) => (
                    <motion.button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex flex-col items-center focus:outline-none group transition-all duration-300 ${currentStep >= step.id ? 'cursor-pointer' : 'cursor-pointer opacity-80'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep === step.id 
                            ? 'bg-primary-500 text-white shadow-lg ring-4 ring-primary-100' 
                            : currentStep > step.id 
                              ? 'bg-primary-400 text-white' 
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-xs font-medium">{step.id + 1}</span>
                        )}
                      </div>
                      <span 
                        className={`text-xs mt-2 hidden md:block font-medium ${
                          currentStep >= step.id ? 'text-primary-700' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Current step description */}
              <div className="text-center mt-4">
                <motion.span
                  key={currentStep} // Re-animate when current step changes
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-neutral-600"
                >
                  {steps[currentStep].title}: {steps[currentStep].description}
                </motion.span>
              </div>
            </div>
            
            {/* 3D Scene Display */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden h-[400px] md:h-[500px] relative">
              {renderScene()}
            </div>
            
            <div className="mt-4 flex gap-4">
              <Button
                className="flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 shadow"
                onClick={resetJourney}
              >
                <RefreshCw className="h-4 w-4" /> Restart
              </Button>
            </div>
            
            {/* Control buttons */}
          </div>
          
          {/* Right Side - Info */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl h-[400px] md:h-[500px] p-6 overflow-auto">
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold text-primary-700 mb-4">How RideSplit Works</h2>
                
                <div className="space-y-4 mb-6 flex-1">
                  <div className={`p-4 rounded-lg border ${currentStep === 0 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <h3 className="font-bold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">1</span>
                      Start journey
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">Car owners offer rides on their usual routes</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${currentStep >= 1 && currentStep <= 3 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <h3 className="font-bold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">2</span>
                      Pick up riders
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">Multiple riders join along the route</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${currentStep === 4 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <h3 className="font-bold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">3</span>
                      Share the ride
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">Everyone travels together, saving costs and reducing emissions</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${currentStep === 5 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <h3 className="font-bold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">4</span>
                      Reach destination
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">Arrive at the common destination together</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${currentStep === 6 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <h3 className="font-bold flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">5</span>
                      Make friends
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">Build community with like-minded people</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-primary-700">Benefits:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Reduce your carbon footprint</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Save money on transportation</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Make new friends on your commute</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-3 text-lg">
              Get Started with RideSplit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThreeDStory;