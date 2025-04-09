import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 pt-28 md:pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 mb-4">
              Split Your Ride, <br className="hidden sm:block"/> Not Your Wallet <span className="inline-block animate-pulse">🚗💸</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg">
              Connecting students and employees with nearby car owners for affordable, sustainable daily commuting.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="px-8 py-7 rounded-full text-white font-bold text-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Now
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-7 rounded-full text-primary-600 font-medium border border-primary-200 hover:border-primary-300 transition shadow-sm hover:shadow bg-white"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1532321216990-d421dcdc0c6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="People carpooling in a car" 
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
              width="600"
              height="450"
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <i className="fas fa-leaf text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">CO2 Reduced This Week</p>
                  <p className="text-xl font-bold text-primary-600">2,450 kg</p>
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
