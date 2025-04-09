import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your commute?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-lg">
              Join the RideSplit community today and start enjoying the benefits of shared commuting. Save money, make friends, and help the planet—all on your way to work or school.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                className="bg-white px-8 py-6 rounded-full text-primary-600 font-bold hover:bg-primary-50 transition shadow-lg hover:shadow-xl"
              >
                Download App
              </Button>
              <Button
                variant="outline"
                className="bg-primary-700 px-8 py-6 rounded-full text-white font-medium border border-primary-500 hover:bg-primary-800 transition"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1606037150274-84bb75e95c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Happy people carpooling" 
              className="inline-block rounded-xl shadow-2xl max-w-full lg:max-w-md"
              width="500"
              height="375"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
