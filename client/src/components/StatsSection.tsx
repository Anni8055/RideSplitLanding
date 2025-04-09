import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      number: "12K+",
      label: "Active Riders",
      bgColor: "bg-primary-50",
      textColor: "text-primary-600"
    },
    {
      number: "8.5K",
      label: "Daily Rides",
      bgColor: "bg-secondary-500/10",
      textColor: "text-secondary-500"
    },
    {
      number: "$245K",
      label: "Commute Costs Saved",
      bgColor: "bg-accent-500/10", 
      textColor: "text-amber-500"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className={`p-6 ${stat.bgColor} rounded-xl`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
