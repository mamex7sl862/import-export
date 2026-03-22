import { Shield, Zap, Globe2, Award, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function About() {
  const { settings } = useSiteSettings();
  const features = [
    {
      icon: Shield,
      title: "Compliance Excellence",
      description: "Navigate regulations across 150+ countries with confidence"
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Scale operations without operational bottlenecks"
    },
    {
      icon: Zap,
      title: "24/7 Support",
      description: "Expert guidance from dedicated trade specialists"
    }
  ];

  const highlights = [
    "ISO 9001 & 14001 Certified Operations",
    "AEO & C-TPAT Trusted Partner Status",
    "Real-time Shipment Tracking & Visibility",
    "Customs Clearance in 150+ Countries"
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm50 0h1v1h-1V0zm0 50h1v1h-1v-1z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
              Your Global Trade Partner
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {settings.about_title}
            <span className="block bg-gradient-to-r from-[#D4AF37] to-amber-300 bg-clip-text text-transparent">
              For Modern Business
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {settings.about_description}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/global-trade-shipping-containers.jpg"
                    alt="Global Trade Operations"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Globe2 className="w-7 h-7 text-slate-900" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white mb-1">150+ Countries</div>
                          <div className="text-sm text-slate-300">Global Network Coverage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl border border-indigo-400/30 z-10">
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">99.8%</div>
                  <div className="text-sm font-semibold text-indigo-100">On-Time</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-2xl p-6 shadow-2xl z-10">
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 mb-1">20+</div>
                  <div className="text-sm font-semibold text-slate-800">Years</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  Turning Trade Complexity Into Your Competitive Edge
                </h3>
                
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  {settings.about_story}
                </p>

                <p className="text-lg text-slate-300 leading-relaxed">
                  {settings.about_commitment}
                </p>
              </div>

              {/* Highlights List */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-bold text-white mb-4">What Sets Us Apart</h4>
                <div className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Cards Full Width */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl p-12 border border-slate-600/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          
          <div className="relative text-center max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Expand Your Global Reach?
            </h3>
            <p className="text-lg text-slate-300 mb-8">
              Join hundreds of companies who trust us to handle their international trade operations.
            </p>
            <button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#D4AF37]/50">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
