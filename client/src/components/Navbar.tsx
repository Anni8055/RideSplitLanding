import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full backdrop-blur-sm z-50 py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold">
              <span className="text-primary-500">Ride</span><span className="text-secondary-500">Split</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-primary-500 hover:text-primary-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-neutral-900 hover:text-primary-600 transition-colors font-medium">How It Works</a>
            <a href="#benefits" className="text-neutral-900 hover:text-primary-600 transition-colors font-medium">Benefits</a>
            <a href="#contact" className="text-neutral-900 hover:text-primary-600 transition-colors font-medium">Contact</a>
            <Button
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white absolute w-full border-b border-gray-200 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600">How It Works</a>
          <a href="#benefits" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600">Benefits</a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600">Contact</a>
          <Button
            className="w-full mt-2 bg-gradient-to-r from-primary-500 to-secondary-500"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
