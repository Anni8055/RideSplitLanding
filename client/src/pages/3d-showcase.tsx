import Hero3DSection from '@/components/3D/Hero3DSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import ThreeCanvas from '@/components/3D/ThreeCanvas';
import { ArrowLeft, Car, Leaf, Users } from 'lucide-react';

export default function ThreeDShowcase() {
  return (
    <div className="min-h-screen">
      {/* 3D Hero Section */}
      <Hero3DSection />

      {/* Additional 3D Showcase Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Experience the RideSplit <span className="text-primary-500">3D</span> Difference
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Explore our interactive 3D showcases to see how RideSplit is revolutionizing urban mobility with shared rides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 3D Showcase Card 1 */}
            <Card className="overflow-hidden bg-gradient-to-b from-primary-50 to-white border-0 shadow-lg">
              <div className="h-[250px] relative">
                <ThreeCanvas className="w-full h-full" carColor="#00B8E6" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-primary-500" />
                  Smart Ride Matching
                </h3>
                <p className="text-neutral-600 mb-4">
                  Our intelligent algorithm matches riders going in the same direction for maximum efficiency.
                </p>
                <Button variant="outline" className="w-full border-primary-300 text-primary-600 hover:bg-primary-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* 3D Showcase Card 2 */}
            <Card className="overflow-hidden bg-gradient-to-b from-secondary-50 to-white border-0 shadow-lg">
              <div className="h-[250px] relative">
                <ThreeCanvas className="w-full h-full" carColor="#66CC33" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-secondary-500" />
                  Eco-Friendly Transport
                </h3>
                <p className="text-neutral-600 mb-4">
                  By sharing rides, each RideSplit trip reduces carbon emissions by up to 40% compared to individual rides.
                </p>
                <Button variant="outline" className="w-full border-secondary-300 text-secondary-600 hover:bg-secondary-50">
                  Environmental Impact
                </Button>
              </CardContent>
            </Card>

            {/* 3D Showcase Card 3 */}
            <Card className="overflow-hidden bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg">
              <div className="h-[250px] relative">
                <ThreeCanvas className="w-full h-full" carColor="#8A2BE2" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  Community Building
                </h3>
                <p className="text-neutral-600 mb-4">
                  RideSplit connects people with similar commutes, creating opportunities for networking and friendship.
                </p>
                <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 py-6 px-8 text-lg">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}