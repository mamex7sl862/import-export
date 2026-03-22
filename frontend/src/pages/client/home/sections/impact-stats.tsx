import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface StatProps {
  end: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix, duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center"
    >
      <div className="text-5xl lg:text-6xl font-black text-[#D4AF37] mb-2">
        {count}{suffix}
      </div>
    </motion.div>
  );
}

export default function ImpactStats() {
  const { settings } = useSiteSettings();

  const stats = [
    {
      value: parseInt(settings.stat_years) || 15,
      suffix: settings.stat_years.replace(/[0-9]/g, "") || "+",
      label: settings.stat_years_label,
      description: "Delivering excellence in international trade"
    },
    {
      value: parseInt(settings.stat_countries) || 50,
      suffix: settings.stat_countries.replace(/[0-9]/g, "") || "+",
      label: settings.stat_countries_label,
      description: "Global network spanning all continents"
    },
    {
      value: parseInt(settings.stat_shipments) || 10,
      suffix: settings.stat_shipments.replace(/[0-9]/g, "") || "K+",
      label: settings.stat_shipments_label,
      description: "Successfully completed trade operations"
    }
  ];

  return (
    <section className="py-24 bg-[#101828] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
            PROVEN IMPACT
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Numbers That Speak
            <span className="block text-[#D4AF37]">Volumes</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Our track record demonstrates consistent excellence in global trade facilitation, 
            trusted by businesses worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              <AnimatedCounter 
                end={stat.value} 
                suffix={stat.suffix}
                duration={2000 + index * 200}
              />
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                {stat.label}
              </h3>
              
              <p className="text-slate-200 leading-relaxed max-w-xs mx-auto text-base">
                {stat.description}
              </p>

              {/* Decorative Line */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-6 group-hover:w-24 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-12 border-t border-white/10"
        >
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
            "Every shipment represents a business dream, a market opportunity, and economic growth. 
            We're proud to be the bridge that makes global commerce possible."
          </p>
          <div className="mt-6">
            <span className="text-[#D4AF37] font-semibold">— TradeFlow Leadership Team</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}