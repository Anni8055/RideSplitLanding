import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Hero3DSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white pt-28 md:pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text content */}
          <motion.div 
            className="w-full lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-800 mb-6">
              Experience <span className="text-primary-500">RideSplit</span> <br/> in 3D
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl">
              The next generation of ride-sharing is here. Explore our interactive 3D experience and see how RideSplit is changing urban mobility.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/auth">
                <Button
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg px-8 py-6"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 text-lg px-8 py-6"
                onClick={() => {
                  const howItWorks = document.getElementById('how-it-works');
                  if (howItWorks) {
                    howItWorks.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-primary-500">50+</div>
                <div className="text-sm text-neutral-600">Cities</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-primary-500">10K+</div>
                <div className="text-sm text-neutral-600">Riders</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-secondary-500">12K+</div>
                <div className="text-sm text-neutral-600">CO₂ Reduced</div>
              </div>
            </div>
          </motion.div>
          
          {/* 3D Car model */}
          <motion.div 
            className="w-full lg:w-1/2 h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl shadow-xl overflow-hidden">
              <ThreeCanvas className="w-full h-full" carColor="#00B8E6" />
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                Interactive 3D
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-primary-600">
                Rotate • Zoom • Pan
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}