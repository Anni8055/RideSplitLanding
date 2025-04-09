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
            {/* Spline 3D Scene */}
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-xl overflow-hidden mb-8">
              {/* Replace the src with your actual Spline scene URL */}
              <iframe
                title="RideSplit 3D Experience"
                className="w-full h-full border-none"
                src="https://prod.spline.design/cUycSXM-V1DNNTsR/scene.splinecode"
                allowFullScreen
              />
            </div>

            <Button
              className="mb-12 flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 shadow"
              onClick={() => {
                // Here you would reload the iframe or reset the scene
                const iframe = document.querySelector('iframe');
                if (iframe) {
                  iframe.src = iframe.src;
                }
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