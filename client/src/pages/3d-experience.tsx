import BasicCarCanvas from 'components/3D/BasicCar';
import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Leaf, Users } from 'lucide-react';

export default function ThreeDExperience() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-0">
      <div className="mx-auto p-0 w-full">
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
        
        {/* Full screen 3D showcase */}
        <div className="h-screen w-full fixed top-0 left-0 z-0">
          <motion.div 
            className="h-full w-full"

            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <BasicCarCanvas className="w-full h-full" carColor="#00B8E6" />
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-600">
              Interactive 3D Car
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-primary-600">
              Drag to Rotate • Scroll to Zoom
            </div>
          </motion.div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 pt-20 bg-transparent">
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
          
          {/* Color variants */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Choose Your Color</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-[300px]">
                  <BasicCarCanvas className="w-full h-full" carColor="#00B8E6" />
                </div>
                <div className="p-4 text-center font-semibold text-primary-600">Ocean Blue</div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-[300px]">
                  <BasicCarCanvas className="w-full h-full" carColor="#66CC33" />
                </div>
                <div className="p-4 text-center font-semibold text-green-600">Eco Green</div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-[300px]">
                  <BasicCarCanvas className="w-full h-full" carColor="#FF5733" />
                </div>
                <div className="p-4 text-center font-semibold text-orange-600">Sunset Orange</div>
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
    </div>
  );
}
