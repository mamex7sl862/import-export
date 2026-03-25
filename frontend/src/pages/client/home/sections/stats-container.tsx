import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedCounter } from "@/components/animated-counter";
import { useLanguage } from "@/providers/language-provider";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export const StatsContainer = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { t } = useLanguage();

  const stats: Stat[] = [
    { value: 50, label: t("stats.countries"), suffix: "+" },
    { value: 10000, label: t("stats.shipments"), suffix: "+" },
    { value: 500, label: t("stats.partners"), suffix: "+" },
    { value: 25, label: t("stats.years"), suffix: "+" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full py-12 px-4 sm:px-8 md:px-18 bg-primary"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants as any}
            className="flex flex-col items-center justify-center space-y-2 p-4 md:p-6 rounded-lg border border-border  hover:bg-card/80 transition-colors"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1 + 0.2,
              }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isInView={inView}
              />
            </motion.div>
            <p className="text-center text-sm md:text-base text-white font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
