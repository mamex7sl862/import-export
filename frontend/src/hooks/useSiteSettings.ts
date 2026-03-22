import { useEffect, useState, useCallback } from "react";

export const SETTINGS_API = (import.meta.env.VITE_API_URL || "https://tradeflow-import-export-2.onrender.com") + "/api/settings/";

export interface SiteSettings {
  company_name: string; company_tagline: string; company_description: string;
  company_email: string; company_phone: string; company_address: string;
  hero_badge_text: string; hero_title: string; hero_title_highlight: string; hero_subtitle: string;
  hero_cta_primary: string; hero_cta_secondary: string;
  stat_years: string; stat_years_label: string;
  stat_countries: string; stat_countries_label: string;
  stat_shipments: string; stat_shipments_label: string;
  stat_success_rate: string; stat_success_label: string;
  about_title: string; about_description: string; about_story: string;
  about_commitment: string; about_founded_text: string; about_founded_sub: string;
  services_title: string; services_subtitle: string;
  products_title: string; products_subtitle: string; products_badge: string;
  quote_title: string; quote_subtitle: string; quote_badge: string;
  contact_email: string; contact_phone: string; contact_address: string;
  working_hours: string; working_hours_sat: string;
  footer_tagline: string;
  facebook_url: string; twitter_url: string; linkedin_url: string; instagram_url: string;
}

export const defaultSettings: SiteSettings = {
  company_name: "TradeFlow", company_tagline: "Global Trade, Simplified.",
  company_description: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  company_email: "hello@tradehub.com", company_phone: "+251 991 001 124",
  company_address: "Addis Ababa, Ethiopia",
  hero_badge_text: "TRUSTED BY 2,000+ GLOBAL ENTERPRISES",
  hero_title: "Global Trade,", hero_title_highlight: "Simplified.",
  hero_subtitle: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  hero_cta_primary: "Request a Quote", hero_cta_secondary: "Our Products",
  stat_years: "15+", stat_years_label: "Years Experience",
  stat_countries: "50+", stat_countries_label: "Countries Served",
  stat_shipments: "10K+", stat_shipments_label: "Shipments Delivered",
  stat_success_rate: "99.8%", stat_success_label: "Success Rate",
  about_title: "Your Trusted Partner in Global Commerce",
  about_description: "For over two decades, we've been eliminating the complexity of international trade.",
  about_story: "TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.",
  about_commitment: "We're committed to transparency, reliability, and building long-term partnerships.",
  about_founded_text: "Trusted by Fortune 500 Companies",
  about_founded_sub: "Delivering excellence in global trade since 2004",
  services_title: "Our Services", services_subtitle: "Comprehensive import-export solutions designed to streamline your global trade operations",
  products_title: "Premium Import Solutions", products_subtitle: "Discover our curated selection of high-quality products from trusted global suppliers",
  products_badge: "PRODUCT CATALOG",
  quote_title: "Request a Custom Quote", quote_subtitle: "Get a personalized shipping quote tailored to your specific needs.",
  quote_badge: "Get Started",
  contact_email: "hello@tradehub.com", contact_phone: "+251 991 001 124",
  contact_address: "Addis Ababa, Ethiopia", working_hours: "Mon-Fri, 9 AM - 6 PM",
  working_hours_sat: "10 AM - 4 PM",
  footer_tagline: "Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.",
  facebook_url: "https://facebook.com", twitter_url: "https://twitter.com",
  linkedin_url: "https://linkedin.com", instagram_url: "https://instagram.com",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(() => {
    setLoading(true);
    fetch(SETTINGS_API)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setSettings({ ...defaultSettings, ...data }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  return { settings, loading, refetch: fetchSettings };
}
