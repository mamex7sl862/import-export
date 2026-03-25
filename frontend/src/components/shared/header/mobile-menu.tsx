"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface MobileMenuProps {
  navLinks: Array<{ label: string; href: string }>;
  onClose: () => void;
  toggleLanguage: () => void;
  langLabel: string;
}

export default function MobileMenu({ navLinks, onClose, toggleLanguage, langLabel }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-[82px] left-0 right-0 bg-[#101828]/98 backdrop-blur-lg border-b border-slate-700/50 md:hidden z-40 shadow-2xl"
    >
      <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={onClose}
            className="text-base font-semibold text-white hover:text-[#D4AF37] hover:bg-slate-800/50 transition-all py-3 px-4 rounded-lg min-h-[44px] flex items-center"
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => { toggleLanguage(); onClose(); }}
          className="flex items-center gap-2 py-3 px-4 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm hover:bg-[#D4AF37]/10 transition-all min-h-[44px]"
          aria-label="Toggle language"
        >
          <Globe className="w-4 h-4" />
          {langLabel}
        </button>
        <Button
          className="w-full mt-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold h-12 min-h-[44px]"
          onClick={() => { navigate("/contact"); onClose(); }}
          aria-label="Contact us"
        >
          Contact Us
        </Button>
      </div>
    </motion.div>
  );
}
