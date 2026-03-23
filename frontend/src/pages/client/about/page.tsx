"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, TrendingUp, Users, Award, CheckCircle2, Target, Heart, Lightbulb } from "lucide-react";
import PageHeader from "./header";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const valueIcons = [Target, Shield, Lightbulb, Heart];
const featureIcons = [Globe, Shield, TrendingUp, Users];

export default function AboutPage() {
  const { settings } = useSiteSettings();

  const stats = [
    { value: settings.stat_years, label: settings.stat_years_label },
    { value: settings.stat_countries, label: settings.stat_countries_label },
    { value: settings.stat_shipments, label: settings.stat_shipments_label },
    { value: settings.stat_success_rate, label: settings.stat_success_label },
  ];

  const values = [
    { icon: valueIcons[0], title: settings.value1_title, description: settings.value1_desc },
    { icon: valueIcons[1], title: settings.value2_title, description: settings.value2_desc },
    { icon: valueIcons[2], title: settings.value3_title, description: settings.value3_desc },
    { icon: valueIcons[3], title: settings.value4_title, description: settings.value4_desc },
  ];

  const milestones = [
    { year: settings.milestone1_year, title: settings.milestone1_title, description: settings.milestone1_desc },
    { year: settings.milestone2_year, title: settings.milestone2_title, description: settings.milestone2_desc },
    { year: settings.milestone3_year, title: settings.milestone3_title, description: settings.milestone3_desc },
    { year: settings.milestone4_year, title: settings.milestone4_title, description: settings.milestone4_desc },
    { year: settings.milestone5_year, title: settings.milestone5_title, description: settings.milestone5_desc },
  ];

  const features = [
    { icon: featureIcons[0], title: settings.feature1_title, description: settings.feature1_desc },
    { icon: featureIcons[1], title: settings.feature2_title, description: settings.feature2_desc },
    { icon: featureIcons[2], title: settings.feature3_title, description: settings.feature3_desc },
    { icon: featureIcons[3], title: settings.feature4_title, description: settings.feature4_desc },
  ];

  return (
    <main className="min-h-screen bg-slate-900">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-24 md:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-8">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">About {settings.company_name}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">{settings.about_title}</h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">{settings.about_description}</p>
            <Button size="lg" className="gap-2 group bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50 border-y border-slate-700/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={settings.about_story_image || "/global-trade-shipping-containers.jpg"} alt="TradeFlow Operations" className="w-full h-full object-cover aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50">
                    <div className="text-2xl font-bold text-white mb-2">{settings.about_founded_text}</div>
                    <div className="text-slate-300">{settings.about_founded_sub}</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">Our Story</h2>
              <p className="text-lg text-slate-300 leading-relaxed">{settings.about_story}</p>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Our Commitment</h3>
                    <p className="text-slate-300">{settings.about_commitment}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{settings.about_values_title}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">{settings.about_values_subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{settings.about_journey_title}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">{settings.about_journey_subtitle}</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent transform -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1 md:text-right">
                    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} max-w-md`}>
                      <div className="text-2xl font-bold text-[#D4AF37] mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-slate-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-slate-900 ring-4 ring-[#D4AF37]/20 flex-shrink-0" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose {settings.company_name}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">The advantages that set us apart in global logistics</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{settings.about_cta_title}</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">{settings.about_cta_subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold">{settings.about_cta_primary}</Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">{settings.about_cta_secondary}</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
