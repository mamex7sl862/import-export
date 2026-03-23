import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SETTINGS_API } from "@/hooks/useSiteSettings";

const BACKEND = import.meta.env.VITE_API_URL || "https://tradeflow-import-export-2.onrender.com";

export interface Settings {
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
  products_badge: string; products_title: string; products_subtitle: string;
  quote_badge: string; quote_title: string; quote_subtitle: string;
  contact_email: string; contact_phone: string; contact_address: string;
  working_hours: string; working_hours_sat: string;
  footer_tagline: string;
  facebook_url: string; twitter_url: string; linkedin_url: string; instagram_url: string;
}

export const defaultSettings: Settings = {
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
  products_badge: "PRODUCT CATALOG", products_title: "Premium Import Solutions",
  products_subtitle: "Discover our curated selection of high-quality products from trusted global suppliers",
  quote_badge: "Get Started", quote_title: "Request a Custom Quote",
  quote_subtitle: "Get a personalized shipping quote tailored to your specific needs.",
  contact_email: "hello@tradehub.com", contact_phone: "+251 991 001 124",
  contact_address: "Addis Ababa, Ethiopia", working_hours: "Mon-Fri, 9 AM - 6 PM",
  working_hours_sat: "10 AM - 4 PM",
  footer_tagline: "Your trusted partner in global logistics. Connecting businesses worldwide with seamless import-export solutions.",
  facebook_url: "https://facebook.com", twitter_url: "https://twitter.com",
  linkedin_url: "https://linkedin.com", instagram_url: "https://instagram.com",
};

export function useSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(SETTINGS_API)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setSettings({ ...defaultSettings, ...data }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND}/api/settings/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json();
      setSettings({ ...defaultSettings, ...updated });
      toast.success("Settings saved — changes are now live");
    } catch (err: any) {
      toast.error(`Failed to save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return { settings, loading, saving, handleChange, handleSave };
}

export const Field = ({
  label, name, value, onChange, textarea = false, full = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean; full?: boolean;
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
    {textarea ? (
      <textarea name={name} value={value} onChange={onChange} rows={3}
        className="w-full px-3 py-2 bg-slate-900/60 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] resize-none"
      />
    ) : (
      <input type="text" name={name} value={value} onChange={onChange}
        className="w-full px-3 py-2 bg-slate-900/60 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
      />
    )}
  </div>
);

export const PageShell = ({
  title, subtitle, saving, onSave, children,
}: {
  title: string; subtitle: string; saving: boolean; onSave: () => void; children: React.ReactNode;
}) => (
  <div className="max-w-3xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
      </div>
      <button onClick={onSave} disabled={saving}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl transition-all disabled:opacity-60"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  </div>
);

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
  </div>
);
