import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Car showcase with rotating images and interactive elements
const CarShowcase = ({ className = '', style = {} }) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [carColor, setCarColor] = useState("#00B8E6"); // Default blue color
  
  // Car angle images would normally be loaded from actual image files
  // For this demo, we'll use colored rectangles with indicators
  const getCarImageUrl = (color, angle) => {
    // This would normally return an image URL based on the color and angle
    // For now, we'll just return a placeholder
    return `https://fakeimg.pl/600x350/${color.replace('#', '')}/?text=Car+${angle}°`;
  };
  
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const colors = [
    { name: 'Ocean Blue', value: '#00B8E6' },
    { name: 'Eco Green', value: '#66CC33' },
    { name: 'Sunset Orange', value: '#FF5733' }
  ];
  
  // Interactive rotation
  const rotateLeft = () => {
    setCurrentAngle((prev) => (prev - 1 + angles.length) % angles.length);
  };
  
  const rotateRight = () => {
    setCurrentAngle((prev) => (prev + 1) % angles.length);
  };
  
  return (
    <div className={`${className} relative`} style={style}>
      <Tabs defaultValue="view" className="absolute top-4 left-4 z-10">
        <TabsList className="bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="mt-2">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            <p className="text-sm font-medium mb-1">Use arrows to rotate</p>
            <div className="flex gap-2">
              <button 
                onClick={rotateLeft}
                className="bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600 transition-colors"
              >
                ←
              </button>
              <button 
                onClick={rotateRight}
                className="bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customize" className="mt-2">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            <p className="text-sm font-medium mb-1">Choose a color</p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setCarColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 ${carColor === color.value ? 'border-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-white">
        <motion.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={getCarImageUrl(carColor, angles[currentAngle])}
            alt={`Car at ${angles[currentAngle]} degrees angle`}
            className="w-full h-auto rounded-lg shadow-lg"
            key={`${carColor}-${angles[currentAngle]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* 360° indicator */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  {angles[currentAngle]}°
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={carColor}
                    strokeWidth="5"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * angles[currentAngle]) / 360}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarShowcase;