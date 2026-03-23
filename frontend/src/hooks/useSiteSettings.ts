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
  about_story_image: string;
  value1_title: string; value1_desc: string;
  value2_title: string; value2_desc: string;
  value3_title: string; value3_desc: string;
  value4_title: string; value4_desc: string;
  milestone1_year: string; milestone1_title: string; milestone1_desc: string;
  milestone2_year: string; milestone2_title: string; milestone2_desc: string;
  milestone3_year: string; milestone3_title: string; milestone3_desc: string;
  milestone4_year: string; milestone4_title: string; milestone4_desc: string;
  milestone5_year: string; milestone5_title: string; milestone5_desc: string;
  feature1_title: string; feature1_desc: string;
  feature2_title: string; feature2_desc: string;
  feature3_title: string; feature3_desc: string;
  feature4_title: string; feature4_desc: string;
  about_cta_title: string; about_cta_subtitle: string;
  about_cta_primary: string; about_cta_secondary: string;
  about_values_title: string; about_values_subtitle: string;
  about_journey_title: string; about_journey_subtitle: string;
  services_title: string; services_subtitle: string;
  products_title: string; products_subtitle: string; products_badge: string;
  quote_title: string; quote_subtitle: string; quote_badge: string;
  contact_email: string; contact_phone: string; contact_address: string;
  working_hours: string; working_hours_sat: string;
  about_page_badge: string; about_page_title: string; about_page_subtitle: string;
  services_page_badge: string; services_page_title: string; services_page_subtitle: string;
  contact_page_badge: string; contact_page_title: string; contact_page_subtitle: string;
  blog_page_badge: string; blog_page_title: string; blog_page_subtitle: string;
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
  about_story_image: "/global-trade-shipping-containers.jpg",
  value1_title: "Customer First", value1_desc: "Your success is our priority. We tailor solutions to meet your unique needs.",
  value2_title: "Integrity", value2_desc: "Transparent operations and ethical practices in every transaction.",
  value3_title: "Innovation", value3_desc: "Leveraging technology to streamline global trade operations.",
  value4_title: "Excellence", value4_desc: "Committed to delivering exceptional service quality every time.",
  milestone1_year: "2004", milestone1_title: "Company Founded", milestone1_desc: "Started with a vision to simplify global trade",
  milestone2_year: "2010", milestone2_title: "Global Expansion", milestone2_desc: "Extended services to 50+ countries",
  milestone3_year: "2015", milestone3_title: "Technology Integration", milestone3_desc: "Launched real-time tracking platform",
  milestone4_year: "2020", milestone4_title: "Industry Leader", milestone4_desc: "Recognized as top logistics provider",
  milestone5_year: "2024", milestone5_title: "Sustainable Future", milestone5_desc: "Committed to eco-friendly operations",
  feature1_title: "Global Network", feature1_desc: "Strategic partnerships across 150+ countries for seamless operations",
  feature2_title: "Compliance Expertise", feature2_desc: "ISO certified with full regulatory compliance in all markets",
  feature3_title: "Growth Partner", feature3_desc: "Scalable solutions that grow with your business needs",
  feature4_title: "Dedicated Support", feature4_desc: "24/7 expert assistance from your personal trade specialists",
  about_cta_title: "Ready to Go Global?",
  about_cta_subtitle: "Let's discuss how we can help your business expand into new markets with confidence and ease.",
  about_cta_primary: "Schedule Consultation", about_cta_secondary: "View Services",
  about_values_title: "Our Core Values", about_values_subtitle: "The principles that guide everything we do",
  about_journey_title: "Our Journey", about_journey_subtitle: "Key milestones in our growth story",
  services_title: "Our Services", services_subtitle: "Comprehensive import-export solutions designed to streamline your global trade operations",
  products_title: "Premium Import Solutions", products_subtitle: "Discover our curated selection of high-quality products from trusted global suppliers",
  products_badge: "PRODUCT CATALOG",
  quote_title: "Request a Custom Quote", quote_subtitle: "Get a personalized shipping quote tailored to your specific needs.",
  quote_badge: "Get Started",
  contact_email: "hello@tradehub.com", contact_phone: "+251 991 001 124",
  contact_address: "Addis Ababa, Ethiopia", working_hours: "Mon-Fri, 9 AM - 6 PM",
  working_hours_sat: "10 AM - 4 PM",
  footer_tagline: "Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.",
  about_page_badge: "Our Story", about_page_title: "About Us",
  about_page_subtitle: "At TradeFlow, we specialize in connecting businesses across the globe. With years of experience in import and export, we pride ourselves on delivering reliable, efficient, and transparent services.",
  services_page_badge: "Our Offerings", services_page_title: "Services & Products",
  services_page_subtitle: "We provide comprehensive import and export solutions tailored to your business needs. From seamless international shipping to customs clearance, we ensure your goods reach their destination safely.",
  contact_page_badge: "Contact Us", contact_page_title: "Get in Touch",
  contact_page_subtitle: "We're here to help with your import and export needs. Reach out to our team and we'll get back to you within 24 hours.",
  blog_page_badge: "Insights & Updates", blog_page_title: "Our Blog",
  blog_page_subtitle: "Stay updated with the latest insights, trends, and tips in global trade and logistics.",
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
