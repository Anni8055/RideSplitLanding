import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Users, TreePine, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreeDInteractive = () => {
  const [showScene, setShowScene] = useState(false);
  const [stats, setStats] = useState({
    co2Saved: 15763,
    ridesShared: 4328,
    friendsMade: 8654
  });

  // Animate stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 3),
        ridesShared: prev.ridesShared + Math.floor(Math.random() * 2),
        friendsMade: prev.friendsMade + Math.floor(Math.random() * 3)
      }));
    }, 5000); // Update every 5 seconds for a subtle effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-800 mb-4">
            <span className="text-primary-500">Interactive</span> 3D Experience
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Experience how RideSplit connects people, saves the environment, and makes commuting fun.
          </p>
        </div>

        {!showScene ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-6 text-xl rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={() => setShowScene(true)}
            >
              Experience RideSplit in 3D
            </Button>
            <p className="mt-6 text-neutral-500">Click to load the interactive experience</p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Simulated 3D Scene */}
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-xl overflow-hidden mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative mb-12 w-full max-w-3xl">
                    {/* Animated Car */}
                    <motion.div 
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 flex flex-col items-center"
                      initial={{ x: -100 }}
                      animate={{ x: 350 }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <div className="relative">
                        <div className="w-32 h-16 bg-primary-500 rounded-lg shadow-md relative">
                          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-sm"></div>
                          <div className="absolute -bottom-2 left-2 w-5 h-5 bg-gray-800 rounded-full"></div>
                          <div className="absolute -bottom-2 right-2 w-5 h-5 bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="absolute -bottom-4 left-8 text-xs text-purple-700 font-bold">RideSplit Car</div>
                      </div>
                    </motion.div>

                    {/* Road */}
                    <div className="w-full h-2 bg-gray-600 relative">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white" style={{ backgroundImage: 'linear-gradient(to right, white 50%, transparent 50%)', backgroundSize: '20px 1px' }}></div>
                    </div>

                    {/* People */}
                    <motion.div 
                      className="absolute top-0 left-20 transform -translate-y-full"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                        <div className="mt-1 text-xs font-bold">Rider 1</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="absolute top-0 left-60 transform -translate-y-full"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                        <div className="mt-1 text-xs font-bold">Rider 2</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="absolute top-0 left-40 transform -translate-y-full"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                        <div className="mt-1 text-xs font-bold">Rider 3</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Environmental Impact Visualization */}
                  <div className="flex justify-center space-x-16 mt-6">
                    <motion.div 
                      className="flex flex-col items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-3xl mb-2">🌳</div>
                      <div className="text-xs font-medium text-green-700">+1 Tree</div>
                    </motion.div>

                    <motion.div 
                      className="flex flex-col items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      <div className="text-3xl mb-2">💨</div>
                      <div className="text-xs font-medium text-blue-700">-5kg CO₂</div>
                    </motion.div>

                    <motion.div 
                      className="flex flex-col items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                      <div className="text-3xl mb-2">👫</div>
                      <div className="text-xs font-medium text-purple-700">+2 Friends</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            <Button
              className="mb-12 flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 shadow"
              onClick={() => {
                // Reset animation by re-rendering the component
                setShowScene(false);
                setTimeout(() => setShowScene(true), 100);
              }}
            >
              <RefreshCw className="h-4 w-4" /> Replay Journey
            </Button>

            {/* Stats Section */}
            <div className="w-full">
              <h2 className="text-2xl font-bold text-center mb-6">RideSplit Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Join the Movement?</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
                Start sharing rides, making friends, and saving the planet with RideSplit today.
              </p>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThreeDInteractive;