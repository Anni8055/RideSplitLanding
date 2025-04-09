import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Users, TreePine, Car, Volume2, VolumeX } from 'lucide-react';

const ThreeDStoryExperience = () => {
  const [showScene, setShowScene] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [muted, setMuted] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('neutral');
  const audioRef = useRef(null);
  const [stats, setStats] = useState({
    co2Saved: 15763,
    ridesShared: 4328,
    friendsMade: 8654
  });

  // Story scenes
  const scenes = [
    { id: 0, name: 'start', description: 'Car waiting at the starting point' },
    { id: 1, name: 'pickup1', description: 'First rider enters the car' },
    { id: 2, name: 'pickup2', description: 'Second rider enters the car' },
    { id: 3, name: 'pickup3', description: 'Third rider enters the car' },
    { id: 4, name: 'journey', description: 'Car journeying to destination' },
    { id: 5, name: 'destination', description: 'Car arrives at destination' },
    { id: 6, name: 'restaurant', description: 'Group enjoying time together' },
    { id: 7, name: 'stats', description: 'Environmental impact statistics' }
  ];

  // Progress through scenes automatically
  useEffect(() => {
    if (!showScene || currentScene >= scenes.length - 1) return;
    
    const timer = setTimeout(() => {
      setCurrentScene(prev => prev + 1);
    }, 3000); // 3 seconds per scene
    
    return () => clearTimeout(timer);
  }, [showScene, currentScene, scenes.length]);

  // Animate stats counters
  useEffect(() => {
    if (currentScene < 7) return;
    
    const interval = setInterval(() => {
      setStats(prev => ({
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 3),
        ridesShared: prev.ridesShared + Math.floor(Math.random() * 2),
        friendsMade: prev.friendsMade + Math.floor(Math.random() * 3)
      }));
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentScene]);

  // Handle audio
  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
      }
    }
  }, [muted, showScene]);

  const startExperience = () => {
    setShowScene(true);
    setCurrentScene(0);
  };

  const resetExperience = () => {
    setCurrentScene(0);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const renderSceneContent = () => {
    switch (currentScene) {
      case 0: // Starting point
        return (
          <div className="relative h-full">
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            {/* House */}
            <div className="absolute bottom-20 left-20 w-32 h-40 bg-yellow-100 flex flex-col">
              <div className="w-full h-2/3 bg-yellow-200 relative">
                <div className="absolute top-5 left-5 w-8 h-10 bg-blue-300"></div>
                <div className="absolute top-5 right-5 w-8 h-10 bg-blue-300"></div>
              </div>
              <div className="w-full h-1/3 bg-brown-600 flex items-center justify-center">
                <div className="w-6 h-10 bg-brown-800"></div>
              </div>
              <div className="absolute -top-10 left-0 right-0 h-10 bg-red-600" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
            </div>
            
            {/* Car */}
            <motion.div 
              className="absolute bottom-24 right-20 w-48 h-24"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 2 }}
            >
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-2 left-10 w-28 h-6 bg-blue-200 rounded-sm"></div>
              </div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Starting point</h3>
              <p className="text-neutral-600">Car waiting to start the journey</p>
            </div>
          </div>
        );

      case 1: // First rider pickup
        return (
          <div className="relative h-full">
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            {/* Bus Stop */}
            <div className="absolute bottom-20 left-40 w-20 h-30">
              <div className="w-4 h-20 bg-gray-700"></div>
              <div className="w-20 h-10 bg-blue-500 absolute top-0 left-0 flex items-center justify-center">
                <span className="text-white text-xs">BUS STOP</span>
              </div>
            </div>
            
            {/* Car */}
            <div className="absolute bottom-24 left-80 w-48 h-24">
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-2/3 bg-primary-500 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-5 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-2 left-10 w-28 h-6 bg-blue-200 rounded-sm"></div>
                
                {/* Driver */}
                <div className="absolute top-3 left-14 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              </div>
            </div>
            
            {/* Rider 1 */}
            <motion.div 
              className="absolute bottom-22 left-50 w-8 h-20"
              initial={{ x: 0 }}
              animate={{ x: 30, y: -2 }}
              transition={{ duration: 2 }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
              </div>
              <div className="w-8 h-12 bg-green-700 mt-1"></div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">First pickup</h3>
              <p className="text-neutral-600">Rider 1 entering the car at the bus stop</p>
            </div>
          </div>
        );
        
      case 2: // Second rider pickup
        return (
          <div className="relative h-full">
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            {/* Coffee Shop */}
            <div className="absolute bottom-20 left-40 w-30 h-40">
              <div className="w-30 h-25 bg-brown-300 relative">
                <div className="absolute top-5 left-3 right-3 h-10 bg-brown-100 flex items-center justify-center">
                  <span className="text-xs font-bold">COFFEE</span>
                </div>
                <div className="absolute bottom-0 left-10 w-10 h-15 bg-brown-800"></div>
              </div>
            </div>
            
            {/* Car */}
            <div className="absolute bottom-24 left-80 w-48 h-24">
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
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
              </div>
            </div>
            
            {/* Rider 2 */}
            <motion.div 
              className="absolute bottom-22 left-50 w-8 h-20"
              initial={{ x: 0 }}
              animate={{ x: 30, y: -2 }}
              transition={{ duration: 2 }}
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
              </div>
              <div className="w-8 h-12 bg-purple-700 mt-1"></div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Second pickup</h3>
              <p className="text-neutral-600">Rider 2 entering the car at the coffee shop</p>
            </div>
          </div>
        );

      case 3: // Third rider pickup
        return (
          <div className="relative h-full">
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            {/* Library */}
            <div className="absolute bottom-20 left-40 w-40 h-45 bg-gray-200">
              <div className="w-full h-5 bg-gray-400"></div>
              <div className="flex justify-around mt-2">
                <div className="w-8 h-15 bg-gray-300"></div>
                <div className="w-8 h-15 bg-gray-300"></div>
                <div className="w-8 h-15 bg-gray-300"></div>
              </div>
              <div className="w-full flex items-center justify-center mt-2">
                <span className="text-xs font-bold">LIBRARY</span>
              </div>
            </div>
            
            {/* Car */}
            <div className="absolute bottom-24 left-80 w-48 h-24">
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
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="absolute top-3 left-30 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
              </div>
            </div>
            
            {/* Rider 3 */}
            <motion.div 
              className="absolute bottom-22 left-50 w-8 h-20"
              initial={{ x: 0 }}
              animate={{ x: 30, y: -2 }}
              transition={{ duration: 2 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
              </div>
              <div className="w-8 h-12 bg-blue-700 mt-1"></div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Third pickup</h3>
              <p className="text-neutral-600">Rider 3 entering the car at the library</p>
            </div>
          </div>
        );

      case 4: // Journey
        return (
          <div className="relative h-full">
            {/* Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100"></div>
            
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white dashed-line"></div>
            </div>
            
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            {/* Trees and buildings far away */}
            <div className="absolute bottom-30 left-20 w-8 h-16 bg-green-800" style={{ clipPath: 'polygon(20% 100%, 50% 0%, 80% 100%)' }}></div>
            <div className="absolute bottom-30 left-40 w-8 h-16 bg-green-800" style={{ clipPath: 'polygon(20% 100%, 50% 0%, 80% 100%)' }}></div>
            <div className="absolute bottom-30 left-70 w-20 h-40 bg-gray-200"></div>
            <div className="absolute bottom-30 left-100 w-30 h-30 bg-brown-300"></div>
            
            {/* Car */}
            <motion.div 
              className="absolute bottom-24 w-48 h-24"
              initial={{ x: -50 }}
              animate={{ x: 300 }}
              transition={{ duration: 6, ease: "linear" }}
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
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="absolute top-3 left-30 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="absolute top-10 left-22 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Journey to destination</h3>
              <p className="text-neutral-600">All riders heading to the destination together</p>
            </div>
          </div>
        );

      case 5: // Arrival at destination
        return (
          <div className="relative h-full">
            {/* Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100"></div>
            
            {/* Road */}
            <div className="absolute bottom-20 left-0 right-0 h-10 bg-gray-400"></div>
            
            {/* Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500"></div>
            
            {/* College/Restaurant Building */}
            <div className="absolute bottom-20 right-40 w-60 h-50 bg-red-100">
              <div className="w-full h-10 bg-red-500 flex items-center justify-center">
                <span className="text-white font-bold">CAMPUS CAFE</span>
              </div>
              <div className="flex justify-around mt-5">
                <div className="w-12 h-20 bg-red-200"></div>
                <div className="w-20 h-30 bg-red-300"></div>
                <div className="w-12 h-20 bg-red-200"></div>
              </div>
            </div>
            
            {/* Car */}
            <motion.div 
              className="absolute bottom-24 left-20 w-48 h-24"
              initial={{ x: 0 }}
              animate={{ x: 100 }}
              transition={{ duration: 2 }}
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
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="absolute top-3 left-30 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="absolute top-10 left-22 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
              </div>
            </motion.div>
            
            {/* People getting out */}
            <motion.div 
              className="absolute bottom-22 left-130 flex space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="w-8 h-12 bg-yellow-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="w-8 h-12 bg-green-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="w-8 h-12 bg-purple-700 mt-1"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">{selectedAvatar === 'neutral' ? '👤' : (selectedAvatar === 'female' ? '👩' : '👨')}</span>
                </div>
                <div className="w-8 h-12 bg-blue-700 mt-1"></div>
              </div>
            </motion.div>
            
            <div className="absolute top-5 left-0 right-0 text-center">
              <h3 className="text-xl font-bold text-primary-700">Arrival at destination</h3>
              <p className="text-neutral-600">Everyone arrives at the campus cafe</p>
            </div>
          </div>
        );

      case 6: // Restaurant scene
        return (
          <div className="relative h-full">
            {/* Restaurant interior */}
            <div className="absolute inset-0 bg-orange-50">
              <div className="absolute top-10 left-10 right-10 h-10 bg-orange-200 flex items-center justify-center">
                <span className="font-bold text-orange-800">CAMPUS CAFE INTERIOR</span>
              </div>
            </div>
            
            {/* Table */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-60 h-40 bg-brown-300 rounded-full relative overflow-hidden">
                <div className="absolute top-5 left-5 right-5 bottom-5 bg-brown-400 rounded-full"></div>
                
                {/* Food items */}
                <div className="absolute top-15 left-20 w-5 h-5 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-15 left-30 w-8 h-3 bg-red-500"></div>
                <div className="absolute top-20 left-40 w-6 h-6 bg-white rounded-full"></div>
                <div className="absolute top-25 left-25 w-4 h-8 bg-green-700"></div>
              </div>
              
              {/* People around table */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
                <div className="w-16 h-14 bg-yellow-700 mt-1"></div>
              </div>
              
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
                <div className="w-16 h-14 bg-blue-700 mt-1"></div>
              </div>
              
              <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
                <div className="w-16 h-14 bg-green-700 mt-1"></div>
              </div>
              
              <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">😄</span>
                </div>
                <div className="w-16 h-14 bg-purple-700 mt-1"></div>
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

      case 7: // Stats display
        return (
          <div className="relative h-full bg-gradient-to-br from-primary-50 to-white p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-700 mb-2">RideSplit Impact</h2>
              <p className="text-neutral-600">Your contribution to a better planet</p>
            </div>
            
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
            
            <div className="mt-10 text-center">
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-3 text-lg">
                  Join RideSplit Today
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return <div>Loading scene...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMute} 
              className="flex items-center gap-2"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} 
              {muted ? "Unmute" : "Mute"} Audio
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 mb-4">
              <span className="text-primary-500">RideSplit</span> Journey Experience
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Experience how RideSplit connects people, saves the environment, and makes commuting fun.
            </p>
          </div>

          {/* Background audio */}
          <audio 
            ref={audioRef} 
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
            loop 
          />

        </div>
        
        {!showScene ? (
          <motion.div
            className="flex flex-col items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-center">Choose your avatar style:</h2>
              <div className="flex gap-6 justify-center">
                <button 
                  className={`p-4 rounded-lg border-2 ${selectedAvatar === 'neutral' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedAvatar('neutral')}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">Neutral</p>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border-2 ${selectedAvatar === 'male' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedAvatar('male')}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">Male</p>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border-2 ${selectedAvatar === 'female' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedAvatar('female')}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">Female</p>
                </button>
              </div>
            </div>
          
            <Button 
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-6 text-xl rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={startExperience}
            >
              Experience How RideSplit Works
            </Button>
            <p className="mt-6 text-neutral-500">Click to start the interactive journey</p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Scene Progress */}
            <div className="w-full max-w-4xl mx-auto mb-6">
              <div className="flex justify-between mb-2">
                {scenes.map((scene) => (
                  <div 
                    key={scene.id}
                    className={`w-2 h-2 rounded-full ${currentScene >= scene.id ? 'bg-primary-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentScene / (scenes.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {/* Split View Layout */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Left Side - 3D Scene */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden h-[400px] md:h-[500px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScene}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {renderSceneContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="mt-4 flex gap-4">
                  <Button
                    className="flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 shadow"
                    onClick={resetExperience}
                  >
                    <RefreshCw className="h-4 w-4" /> Restart
                  </Button>
                  
                  {currentScene < scenes.length - 1 && (
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => setCurrentScene(currentScene + 1)}
                    >
                      Skip
                    </Button>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-neutral-500">
                    Scene {currentScene + 1} of {scenes.length}: {scenes[currentScene].description}
                  </p>
                </div>
              </div>
              
              {/* Right Side - Stats/Info */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-xl shadow-xl h-[400px] md:h-[500px] p-6 overflow-auto">
                  {currentScene === 7 ? (
                    <div className="h-full flex flex-col">
                      <h2 className="text-2xl font-bold text-primary-700 mb-4">RideSplit Impact</h2>
                      
                      <div className="space-y-6 flex-1">
                        <motion.div 
                          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                              <TreePine className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold">CO₂ Saved</h3>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{stats.co2Saved.toLocaleString()} kg</p>
                          <p className="text-neutral-600 mt-1 text-sm">Equivalent to planting {Math.floor(stats.co2Saved / 25)} trees</p>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                              <Car className="h-5 w-5 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-bold">Rides Shared</h3>
                          </div>
                          <p className="text-2xl font-bold text-primary-600">{stats.ridesShared.toLocaleString()}</p>
                          <p className="text-neutral-600 mt-1 text-sm">Reducing traffic by {Math.floor(stats.ridesShared / 2)} cars</p>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold">Friends Made</h3>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{stats.friendsMade.toLocaleString()}</p>
                          <p className="text-neutral-600 mt-1 text-sm">Creating a community of riders</p>
                        </motion.div>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Link href="/auth" className="w-full block">
                          <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                            Join RideSplit Today
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <h2 className="text-2xl font-bold text-primary-700 mb-4">How RideSplit Works</h2>
                      
                      <div className="space-y-4 mb-6 flex-1">
                        <div className={`p-4 rounded-lg border ${currentScene === 0 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                          <h3 className="font-bold flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">1</span>
                            Start journey
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">Car owners offer rides on their usual routes</p>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${currentScene >= 1 && currentScene <= 3 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                          <h3 className="font-bold flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">2</span>
                            Pick up riders
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">Multiple riders join along the route</p>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${currentScene === 4 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                          <h3 className="font-bold flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">3</span>
                            Share the ride
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">Everyone travels together, saving costs and reducing emissions</p>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${currentScene === 5 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                          <h3 className="font-bold flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2 text-sm">4</span>
                            Reach destination
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">Arrive at the common destination together</p>
                        </div>
                        
                        <div className={`p-4 rounded-lg border ${currentScene === 6 ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
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
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center max-w-xl mx-auto">
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-3 text-lg">
                  Get Started with RideSplit
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
      
      <style jsx global>{`
        .dashed-line {
          background-image: linear-gradient(to right, white 50%, transparent 50%);
          background-size: 20px 1px;
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  );
};

export default ThreeDStoryExperience;