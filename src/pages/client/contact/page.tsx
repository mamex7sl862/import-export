"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "./header";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormStatus("success");
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus("idle");
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader />
      {/* Header Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Email</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send us your inquiry
              </p>
              <a
                href="mailto:info@globalexports.com"
                className="text-muted-foreground hover:underline font-medium"
              >
                info@globalexports.com
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                sales@globalexports.com
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Phone</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Call us directly
              </p>
              <a
                href="tel:+1234567890"
                className="text-muted-foreground hover:underline font-medium"
              >
                +2519 11867911
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Mon-Fri, 9 AM - 6 PM EST
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Office</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Visit our headquarters
              </p>
              <p className="font-medium text-foreground">123 Trade Street</p>
              <p className="text-sm text-muted-foreground">
                New York, NY 10001
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Monday - Friday:
                  </span>
                  <span>9 AM - 6 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday:</span>
                  <span>10 AM - 4 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll respond promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2"
                    >
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a service</option>
                    <option value="import">Import Services</option>
                    <option value="export">Export Services</option>
                    <option value="logistics">Logistics & Warehousing</option>
                    <option value="customs">Customs Clearance</option>
                    <option value="consulting">Trade Consulting</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {formStatus === "success" && (
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-md">
                    <p className="text-muted-foreground font-medium">
                      ✓ Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-6 w-full"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            <section className="my-8 mx-auto max-w-4xl px-4">
              <h2 className="mb-4 text-2xl font-bold ">
                Our Location
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Ethiopian Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.304185416782!2d38.7469643!3d9.0301872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8530b1f5c7b1%3A0x4b7b63e0718f6a6f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1701532145678!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Globe className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1">50+ Countries</h3>
                <p className="text-sm text-muted-foreground">
                  Served worldwide
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Always here to help
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Phone className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1">Expert Team</h3>
                <p className="text-sm text-muted-foreground">
                  10+ years experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
