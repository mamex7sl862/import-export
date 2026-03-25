import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./top-bar";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/providers/language-provider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const { t, toggleLanguage, language } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      <header className="fixed flex flex-col top-0 left-0 right-0 z-50 bg-[#101828]/95 backdrop-blur-md shadow-sm">
        <TopBar />
        <nav className="px-4 sm:px-8 md:px-18 py-1.5 flex items-center justify-between h-[50px]">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#101828]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base text-white">{settings.company_name}</span>
              {settings.company_tagline && (
                <span className="text-[9px] text-[#D4AF37]/80 font-medium tracking-wide hidden sm:block">{settings.company_tagline}</span>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[13px] font-semibold text-white hover:text-[#D4AF37] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-transparent text-[#D4AF37] text-[12px] font-semibold transition-all hover:bg-[#D4AF37]/10"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {t("lang.toggle")}
            </button>

            <Button
              className="hidden md:flex bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold px-4 py-1.5 h-8 text-[13px]"
              onClick={() => navigate("/contact")}
              aria-label="Contact us"
            >
              {t("nav.contactBtn")}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 hover:bg-slate-800 rounded-lg transition-colors w-8 h-8 text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          navLinks={navLinks}
          onClose={() => setMobileMenuOpen(false)}
          toggleLanguage={toggleLanguage}
          langLabel={t("lang.toggle")}
        />
      )}
    </>
  );
}
