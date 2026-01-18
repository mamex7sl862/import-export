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
      className="fixed top-[95px] left-0 right-0 bg-background border-b border-border md:hidden z-40"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
          >
            {link.label}
          </a>
        ))}
        <Button
          className="w-full mt-2"
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contact us
        </Button>
      </div>
    </motion.div>
  );
}
