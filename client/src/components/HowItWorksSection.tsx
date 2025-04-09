import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Users, Car, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  // Function to scroll to a section when button is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const steps = [
    {
      icon: <MapPin className="h-7 w-7" />,
      title: "Set Your Route",
      number: "01",
      description: "Enter your daily commute details and schedule to help us find your perfect matches."
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Match with Riders",
      number: "02",
      description: "We'll connect you with compatible commuters who share your route and schedule."
    },
    {
      icon: <Car className="h-7 w-7" />,
      title: "Ride & Save",
      number: "03",
      description: "Share your journey, split the costs, and enjoy a more affordable commute."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-3 px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-6">How RideSplit Works</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Our simple process connects you with nearby commuters to save money and reduce your carbon footprint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-md border border-neutral-100 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 text-primary-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-800">{step.title}</h3>
              <p className="text-neutral-600 mb-4">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-primary-100 rounded-full p-2">
                    <ArrowRight className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="relative mt-20 bg-white p-8 rounded-xl shadow-md overflow-hidden border border-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-32 -mt-32 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-50 rounded-full -ml-32 -mb-32 z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Ready to Start Sharing Rides?</h3>
              <p className="text-neutral-600 max-w-xl">
                Join thousands of commuters who are already saving money and reducing their carbon footprint with RideSplit.
              </p>
            </div>
            <Button
              className="group px-8 py-6 rounded-full font-bold text-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
              onClick={() => scrollToSection('benefits')}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
