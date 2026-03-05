"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  navLinks: Array<{ label: string; href: string }>;
  onClose: () => void;
}

export default function MobileMenu({ navLinks, onClose }: MobileMenuProps) {
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
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-base font-semibold text-white hover:text-[#D4AF37] hover:bg-slate-800/50 transition-all py-3 px-4 rounded-lg min-h-[44px] flex items-center"
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </a>
        ))}
        <Button
          className="w-full mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold h-12 min-h-[44px]"
          onClick={() => {
            navigate("/contact");
            onClose();
          }}
          aria-label="Contact us"
        >
          Contact Us
        </Button>
      </div>
    </motion.div>
  );
}
