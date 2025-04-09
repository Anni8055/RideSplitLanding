import { motion } from "framer-motion";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: "fas fa-wallet",
      title: "Save Money",
      description: "Cut your commuting costs by up to 75% by sharing rides with others heading your way.",
      bgGradient: "bg-gradient-to-br from-primary-50 to-white",
      iconBg: "bg-primary-100",
      iconColor: "text-primary-600",
      benefits: [
        "Reduce gas expenses",
        "Lower parking fees",
        "Decrease vehicle maintenance"
      ]
    },
    {
      icon: "fas fa-user-friends",
      title: "Make Friends",
      description: "Turn commute time into social time by connecting with like-minded people in your area.",
      bgGradient: "bg-gradient-to-br from-secondary-500/10 to-white",
      iconBg: "bg-secondary-500/20",
      iconColor: "text-secondary-500",
      benefits: [
        "Build new connections",
        "Networking opportunities",
        "More enjoyable commutes"
      ]
    },
    {
      icon: "fas fa-leaf",
      title: "Help the Environment",
      description: "Reduce your carbon footprint and contribute to cleaner air in your community.",
      bgGradient: "bg-gradient-to-br from-accent-500/10 to-white",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      benefits: [
        "Lower CO2 emissions",
        "Reduce traffic congestion",
        "Decrease fuel consumption"
      ]
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Why Choose RideSplit?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carpooling isn't just about saving money—it's about building a better community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className={`${benefit.bgGradient} p-8 rounded-2xl shadow-sm flex flex-col h-full`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-16 h-16 rounded-full ${benefit.iconBg} flex items-center justify-center mb-6`}>
                <i className={`${benefit.icon} text-2xl ${benefit.iconColor}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-600 mb-6">
                {benefit.description}
              </p>
              <ul className="space-y-2 mt-auto">
                {benefit.benefits.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <i className="fas fa-check text-sm text-secondary-500 mr-2"></i>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
