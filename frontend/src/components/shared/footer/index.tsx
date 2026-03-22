import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead in Global Trade</h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for industry insights, market trends, and exclusive logistics updates.
          </p>
          <form className="flex gap-3 flex-col sm:flex-row max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-12 bg-slate-900/50 text-white placeholder:text-slate-400 border-slate-700 flex-1"
              aria-label="Email address for newsletter"
            />
            <Button 
              className="h-12 px-8 bg-[#d4af37] hover:bg-[#c19d2f] text-[#101828] font-semibold min-w-[44px] min-h-[44px]"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="px-c py-16 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-[#1a2a6c] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  T
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold text-white">{settings.company_name}</span>
                  {settings.company_tagline && (
                    <span className="text-xs text-[#D4AF37]/80 font-medium">{settings.company_tagline}</span>
                  )}
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed max-w-sm">
                {settings.footer_tagline || settings.company_description}
              </p>
              <div className="flex gap-3">
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#d4af37] flex items-center justify-center transition-colors min-w-[44px] min-h-[44px] text-slate-300 hover:text-[#101828]" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#d4af37] flex items-center justify-center transition-colors min-w-[44px] min-h-[44px] text-slate-300 hover:text-[#101828]" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#d4af37] flex items-center justify-center transition-colors min-w-[44px] min-h-[44px] text-slate-300 hover:text-[#101828]" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#d4af37] flex items-center justify-center transition-colors min-w-[44px] min-h-[44px] text-slate-300 hover:text-[#101828]" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Services</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Ocean Freight
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Air Freight
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Customs Brokerage
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Warehousing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Supply Chain
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Blog & News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${settings.company_email}`} className="text-slate-300 hover:text-[#d4af37] transition-colors">{settings.company_email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <a href={`tel:${settings.company_phone}`} className="text-slate-300 hover:text-[#d4af37] transition-colors">{settings.company_phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{settings.company_address}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
              <p>&copy; {year} {settings.company_name}. All rights reserved.</p>
              <p className="text-base font-bold">
                Created by{" "}
                <a
                  href="https://simbatech.et/"
                  className="text-[#d4af37] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Simba Tech
                </a>
              </p>
              <div className="flex gap-6">
                <Link to="#" className="hover:text-[#d4af37] transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-[#d4af37] transition-colors">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-[#d4af37] transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
