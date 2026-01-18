"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
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
    <section id="contact" className="w-full bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-foreground/70">We're here to help with all your import-export needs</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 mb-12">
          {/* Contact Info Cards */}
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground">Phone</h3>
            <p className="mt-2 text-sm text-foreground/70">+1 (555) 123-4567</p>
            <p className="text-xs text-foreground/50">Available 24/7</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground">Email</h3>
            <p className="mt-2 text-sm text-foreground/70">support@tradeglobal.com</p>
            <p className="text-xs text-foreground/50">Response within 2 hours</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground">Office</h3>
            <p className="mt-2 text-sm text-foreground/70">123 Global Trade Ave</p>
            <p className="text-xs text-foreground/50">New York, NY 10001</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-border bg-card p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-foreground/70">Thank you for your inquiry. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="border border-border bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
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
                      className="border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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
                    className="border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
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
                    className="border border-border bg-background text-foreground resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
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
