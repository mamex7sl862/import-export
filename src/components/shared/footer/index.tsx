import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h3>
          <p className="text-primary-foreground/90 mb-8">
            Get the latest trade insights delivered to your inbox weekly.
          </p>
          <form className="flex gap-2 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11 bg-primary-foreground text-foreground placeholder:text-muted-foreground border-0"
            />
            <Button className="h-11 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
      <footer className="border-t border-border bg-card">
        <div className="px-c py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  T
                </div>
                <span className="text-lg font-bold">TradeHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted source for global trade insights and market
                intelligence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Logistics
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Regulations
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Market Trends
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    hello@tradehub.com
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">+251991001124</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Addis ababa, Ethiopia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>&copy; 2025 TradeHub. All rights reserved.</p>
              <h2 className="text-xl font-black">
                Created by{" "}
                <a
                  href="https://simbatech.et/"
                  className="underline"
                  target="_blank"
                >
                  Simba tech
                </a>
              </h2>
              <div className="flex gap-6">
                <Link to="#" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
                <Link to="#" className="hover:text-primary transition">
                  Terms of Service
                </Link>
                <Link to="#" className="hover:text-primary transition">
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
