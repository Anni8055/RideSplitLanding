import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Car } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Function to scroll to a section when button is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full backdrop-blur-sm z-50 py-3 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center text-2xl font-bold">
              <Car className="w-7 h-7 mr-1 text-primary-500" />
              <span className="text-primary-500">Ride</span><span className="text-secondary-500">Split</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-primary-500 hover:text-primary-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">How It Works</button>
            <button onClick={() => scrollToSection('benefits')} className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">Benefits</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">Testimonials</button>
            <button onClick={() => scrollToSection('faq')} className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">FAQ</button>
            <Button
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => scrollToSection('how-it-works')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white absolute w-full border-b border-gray-200 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('benefits')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600"
          >
            Benefits
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 hover:text-primary-600"
          >
            FAQ
          </button>
          <Button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full mt-3 bg-gradient-to-r from-primary-500 to-primary-600"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
