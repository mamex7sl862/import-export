"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "./header";
import { api } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const { settings } = useSiteSettings();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      company: formData.get('company') as string || '',
      subject: formData.get('service') as string || 'general',
      message: formData.get('message') as string,
    };

    try {
      const response = await api.post('/api/contacts/messages/', data);
      console.log('Success:', response.data);
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error.response?.data || error.message);
      setFormStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <PageHeader />
      {/* Header Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-semibold text-lg text-white">Email</h3>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Send us your inquiry
              </p>
              <a
                href={`mailto:${settings.contact_email}`}
                className="text-slate-200 hover:text-[#D4AF37] hover:underline font-medium transition-colors"
              >
                {settings.contact_email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-semibold text-lg text-white">Phone</h3>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Call us directly
              </p>
              <a
                href={`tel:${settings.contact_phone}`}
                className="text-slate-200 hover:text-[#D4AF37] hover:underline font-medium transition-colors"
              >
                {settings.contact_phone}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                {settings.working_hours}
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-semibold text-lg text-white">Office</h3>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Visit our headquarters
              </p>
              <p className="font-medium text-white">{settings.contact_address}</p>
            </div>

            {/* Hours Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-semibold text-lg text-white">Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">
                    Monday - Friday:
                  </span>
                  <span className="text-white">9 AM - 6 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Saturday:</span>
                  <span className="text-white">10 AM - 4 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Sunday:</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Send us a Message</h2>
              <p className="text-slate-300 mb-8">
                Fill out the form below and we'll respond promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-white"
                  >
                    Subject
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-white"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                  />
                </div>

                {formStatus === "success" && (
                  <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md">
                    <p className="text-[#D4AF37] font-medium">
                      ✓ Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
                    <p className="text-red-400 font-medium">
                      ✗ Failed to send message. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-6 w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#101828] border-t-transparent rounded-full animate-spin" />
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
              <h2 className="mb-4 text-2xl font-bold text-white">
                Our Location
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md border border-slate-700/50">
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
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                <Globe className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1 text-white">50+ Countries</h3>
                <p className="text-sm text-slate-300">
                  Served worldwide
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                <Mail className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1 text-white">24/7 Support</h3>
                <p className="text-sm text-slate-300">
                  Always here to help
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                <Phone className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1 text-white">Expert Team</h3>
                <p className="text-sm text-slate-300">
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
