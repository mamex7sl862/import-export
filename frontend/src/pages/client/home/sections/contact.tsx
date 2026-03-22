"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useSiteSettings } from "@/hooks/useSiteSettings"

export default function Contact() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ fullName: "", phone: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,24,40,0.3),transparent_60%)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">Contact</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-slate-300">We're here to help with all your import-export needs</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 mb-12">
          {/* Contact Info Cards */}
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 text-center hover:border-[#d4af37]/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d4af37]/10">
              <Phone className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="font-semibold text-white">Phone</h3>
            <p className="mt-2 text-sm text-slate-300">{settings.company_phone}</p>
            <p className="text-xs text-slate-400">Available 24/7</p>
          </div>

          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 text-center hover:border-[#d4af37]/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d4af37]/10">
              <Mail className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="font-semibold text-white">Email</h3>
            <p className="mt-2 text-sm text-slate-300">{settings.company_email}</p>
            <p className="text-xs text-slate-400">Response within 2 hours</p>
          </div>

          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 text-center hover:border-[#d4af37]/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d4af37]/10">
              <MapPin className="h-6 w-6 text-[#d4af37]" />
            </div>
            <h3 className="font-semibold text-white">Office</h3>
            <p className="mt-2 text-sm text-slate-300">{settings.company_address}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#d4af37]/10">
                  <Mail className="h-6 w-6 text-[#d4af37]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
                <p className="mt-2 text-slate-300">Thank you for your inquiry. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your import-export needs..."
                    rows={5}
                    required
                    className="border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#d4af37] hover:bg-[#c19d2f] text-[#101828]">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
