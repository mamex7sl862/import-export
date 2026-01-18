import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-primary text-white h-[35px] px-4 sm:px-8 md:px-18 flex items-center justify-between">
      {/* Left: Phone Number */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium">Contact us: </h2>
        <p className="text-sm text-primary-foreground/80">+25911867911</p>
        <p className="text-sm text-primary-foreground/80">info@gmail.com</p>
      </div>

      {/* Right: Social Links */}
      <div className="flex items-center gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/80 transition-colors"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/80 transition-colors"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/80 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/80 transition-colors"
        >
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
