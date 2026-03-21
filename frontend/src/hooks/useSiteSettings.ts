import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_API_URL || "https://tradeflow-import-export-2.onrender.com";

export interface SiteSettings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  hero_badge_text: string;
  hero_title: string;
  hero_title_highlight: string;
  hero_subtitle: string;
  stat_years: string;
  stat_countries: string;
  stat_shipments: string;
  about_title: string;
  about_description: string;
  about_story: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  working_hours: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
}

const defaultSettings: SiteSettings = {
  company_name: "TradeFlow",
  company_tagline: "Global Trade, Simplified.",
  company_description: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  company_email: "info@globalexports.com",
  company_phone: "+2519 11867911",
  company_address: "123 Trade Street, New York, NY 10001",
  hero_badge_text: "TRUSTED BY 2,000+ GLOBAL ENTERPRISES",
  hero_title: "Global Trade,",
  hero_title_highlight: "Simplified.",
  hero_subtitle: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  stat_years: "15+",
  stat_countries: "50+",
  stat_shipments: "10K+",
  about_title: "Your Trusted Partner in Global Commerce",
  about_description: "For over two decades, we've been eliminating the complexity of international trade.",
  about_story: "TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.",
  contact_email: "info@globalexports.com",
  contact_phone: "+2519 11867911",
  contact_address: "123 Trade Street, New York, NY 10001",
  working_hours: "Mon-Fri, 9 AM - 6 PM",
  facebook_url: "https://facebook.com",
  twitter_url: "https://twitter.com",
  linkedin_url: "https://linkedin.com",
  instagram_url: "https://instagram.com",
};

let cachedSettings: SiteSettings | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return;
    fetch(`${BACKEND}/api/settings/`)
      .then((r) => r.json())
      .then((data) => {
        cachedSettings = data;
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { settings, loading };
}
