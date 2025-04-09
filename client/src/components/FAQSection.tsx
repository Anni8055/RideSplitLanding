import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How does payment work?",
      answer: "RideSplit uses a secure in-app payment system to handle all ride costs. Passengers pay their share automatically after each ride, and drivers receive their payments directly to their linked account."
    },
    {
      question: "Is RideSplit safe?",
      answer: "Safety is our top priority. All users undergo identity verification, and our rating system ensures accountability. We also provide in-app emergency features and real-time ride tracking for peace of mind."
    },
    {
      question: "What if my schedule changes?",
      answer: "We understand that plans change. You can easily update your ride schedule in the app, and we'll notify your carpool group. We recommend making changes at least 2 hours in advance when possible."
    }
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know to get started with RideSplit.
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <i className={`fas fa-chevron-down text-primary-500 transition-transform ${openFAQ === index ? 'transform rotate-180' : ''}`}></i>
              </button>
              <div className={`${openFAQ === index ? 'block' : 'hidden'} px-6 py-4 bg-gray-50 border-t border-gray-100`}>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center">
            View All FAQs
            <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
