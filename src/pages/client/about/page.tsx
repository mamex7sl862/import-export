"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Truck, Shield } from "lucide-react";
import PageHeader from "./header";
import { Rocket, Zap, Handshake, Check } from "lucide-react";

const values = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Innovation",
    desc: "Cutting-edge technology for seamless trade",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Efficiency",
    desc: "Fast, reliable, and streamlined processes",
  },
  {
    icon: <Handshake className="w-8 h-8 text-primary" />,
    title: "Partnership",
    desc: "Building lasting relationships with clients",
  },
  {
    icon: <Check className="w-8 h-8 text-primary" />,
    title: "Excellence",
    desc: "Uncompromising quality in every service",
  },
];

const journey = [
  {
    year: "2010",
    event: "Company founded in Addis Ababa with focus on imports.",
  },
  {
    year: "2013",
    event: "Expanded to export Ethiopian coffee and spices abroad.",
  },
  {
    year: "2016",
    event: "Implemented modern logistics software for shipment tracking.",
  },
  { year: "2018", event: "Opened regional offices in Dire Dawa and Mekelle." },
  {
    year: "2020",
    event: "Established global partnerships across Africa, Asia, and Europe.",
  },
  {
    year: "2025",
    event: "Introduced eco-friendly packaging and sustainable logistics.",
  },
];

export default function AboutPage() {
  const [inView, setInView] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:px-8 md:py-28 bg-gradient-to-b from-primary/5 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-2 w-2 rounded-full bg-accent"
            />
            <span className="text-sm font-medium text-primary">
              Global Trade Solutions
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants as any}
            initial="hidden"
            animate="visible"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance"
          >
            Connecting Businesses Across Borders
          </motion.h1>

          <motion.p
            variants={itemVariants as any}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground md:text-xl text-balance"
          >
            We simplify international trade with reliable import and export
            services. Your trusted partner in global commerce for over a decade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button size="lg" className="gap-2 group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About the Company */}
      <section className="border-t border-border px-4 py-16 md:px-8 md:py-24">
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.h2
            variants={itemVariants as any}
            className="mb-6 text-3xl font-bold text-center"
          >
            About Abay Global Trade
          </motion.h2>

          <motion.p
            variants={itemVariants as any}
            className="mb-4 text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Abay Global Trade was founded in <strong>2010</strong> in Addis
            Ababa, Ethiopia, with a vision to become a leading bridge between
            local businesses and global markets. Starting with a small team
            focused on importing essential goods, we have grown into a
            full-service import and export company trusted by clients worldwide.
          </motion.p>

          <motion.p
            variants={itemVariants as any}
            className="mb-4 text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Over the years, we expanded our operations to include exporting
            Ethiopian products such as coffee, spices, and textiles, reaching
            markets across Europe, North America, and Asia. Our team combines
            local knowledge with global expertise to ensure smooth trade
            operations from start to finish.
          </motion.p>

          <motion.p
            variants={itemVariants as any}
            className="mb-4 text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Our mission is to simplify international trade through innovative
            logistics solutions, timely deliveries, and transparent operations.
            We aim to empower businesses of all sizes to grow their markets
            internationally while maintaining uncompromising quality and
            reliability.
          </motion.p>

          <motion.p
            variants={itemVariants as any}
            className="mb-4 text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            In <strong>2016</strong>, we implemented modern logistics and
            tracking systems to provide real-time updates for shipments,
            ensuring efficiency and customer satisfaction. By 2018, we had
            opened regional offices in Dire Dawa and Mekelle, expanding our
            reach across Ethiopia.
          </motion.p>

          <motion.p
            variants={itemVariants as any}
            className="text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Our mission is to empower Ethiopian businesses, streamline trade
            processes, and ensure reliable deliveries for all our clients.
          </motion.p>
        </motion.div>
      </section>

      {/* Company Journey */}
      <section className="bg-primary/5 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-3xl font-bold text-center"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent"
            />

            <motion.div
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {journey.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants as any}
                  className="flex flex-col md:flex-row items-center md:items-start md:justify-between"
                >
                  <div
                    className={`md:w-1/2 ${
                      idx % 2 === 0
                        ? "md:pr-8 md:text-right"
                        : "md:pl-8 md:text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <h3 className="text-lg font-semibold text-primary">
                        {item.year}
                      </h3>
                      <p className="text-muted-foreground">{item.event}</p>
                    </motion.div>
                  </div>
                  <motion.div
                    whileInView={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6 }}
                    className="md:w-12 flex justify-center"
                  >
                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-primary/10" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-t border-border px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-12 md:grid-cols-2 md:gap-16"
          >
            <motion.div variants={slideInVariants as any}>
              <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We are dedicated to streamlining international trade and making
                global commerce accessible to businesses of all sizes. Our
                mission is to eliminate barriers and connect suppliers with
                buyers across continents.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through innovative logistics solutions and expert guidance, we
                empower companies to expand their reach and grow their markets
                internationally.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-6"
            >
              <motion.div
                variants={scaleInVariants as any}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Globe className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Serving 150+ countries worldwide
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={scaleInVariants as any}
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ delay: 0.1 }}
                className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Trusted Partners</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified and compliant operations
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary/5 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision and action we take
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={scaleInVariants as any}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/30 transition-all cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3"
                >
                  {value.icon}
                </motion.div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for all your import and export needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "Import Services",
                desc: "Streamlined customs clearance, documentation, and logistics for importing goods into your country.",
              },
              {
                title: "Export Solutions",
                desc: "End-to-end export management including compliance, shipping, and international documentation.",
              },
              {
                title: "Logistics & Storage",
                desc: "Secure warehousing, inventory management, and distribution across multiple locations worldwide.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={scaleInVariants as any}
                whileHover={{
                  y: -8,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                }}
                className="flex flex-col rounded-lg border border-border bg-card p-8 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Truck className="mb-4 h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground flex-1">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-primary/5 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-4"
          >
            {[
              { label: "Active Clients", value: "500+" },
              { label: "Countries Served", value: "150+" },
              { label: "Shipments Handled", value: "50K+" },
              { label: "Years of Experience", value: "10+" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants as any}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="mb-2 text-4xl font-bold text-primary"
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
