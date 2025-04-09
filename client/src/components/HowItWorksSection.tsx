import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: "fas fa-map-marker-alt",
      title: "1. Set Your Route",
      description: "Enter your daily commute details and schedule to help us find your perfect matches."
    },
    {
      icon: "fas fa-users",
      title: "2. Match with Riders",
      description: "We'll connect you with compatible commuters who share your route and schedule."
    },
    {
      icon: "fas fa-car",
      title: "3. Ride & Save",
      description: "Share your journey, split the costs, and enjoy a more affordable commute."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">How RideSplit Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple process connects you with nearby commuters in just three easy steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <i className={`${step.icon} text-2xl text-primary-600`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            className="px-8 py-6 rounded-full text-white font-bold text-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
