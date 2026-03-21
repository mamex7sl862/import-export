import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/hooks/api";

const BACKEND = import.meta.env.VITE_API_URL || "https://tradeflow-import-export-2.onrender.com";

interface Settings {
  company_name: string; company_tagline: string; company_description: string;
  company_email: string; company_phone: string; company_address: string;
  hero_badge_text: string; hero_title: string; hero_title_highlight: string; hero_subtitle: string;
  stat_years: string; stat_countries: string; stat_shipments: string;
  about_title: string; about_description: string; about_story: string;
  contact_email: string; contact_phone: string; contact_address: string; working_hours: string;
  facebook_url: string; twitter_url: string; linkedin_url: string; instagram_url: string;
}

const defaultSettings: Settings = {
  company_name: "TradeFlow", company_tagline: "Global Trade, Simplified.",
  company_description: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  company_email: "info@globalexports.com", company_phone: "+2519 11867911",
  company_address: "123 Trade Street, New York, NY 10001",
  hero_badge_text: "TRUSTED BY 2,000+ GLOBAL ENTERPRISES",
  hero_title: "Global Trade,", hero_title_highlight: "Simplified.",
  hero_subtitle: "Expert Import-Export solutions connecting your business to the world's most lucrative markets.",
  stat_years: "15+", stat_countries: "50+", stat_shipments: "10K+",
  about_title: "Your Trusted Partner in Global Commerce",
  about_description: "For over two decades, we've been eliminating the complexity of international trade.",
  about_story: "TradeFlow was founded with a simple mission: make international trade accessible to businesses of all sizes.",
  contact_email: "info@globalexports.com", contact_phone: "+2519 11867911",
  contact_address: "123 Trade Street, New York, NY 10001", working_hours: "Mon-Fri, 9 AM - 6 PM",
  facebook_url: "https://facebook.com", twitter_url: "https://twitter.com",
  linkedin_url: "https://linkedin.com", instagram_url: "https://instagram.com",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6">
    <h3 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Field = ({
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

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND}/api/settings/`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => { setSettings(data); setLoading(false); })
      .catch((err) => {
        console.warn("Settings API not available, using defaults:", err.message);
        setApiAvailable(false);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      await api.patch("/api/settings/update/", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Settings saved successfully");
    } catch {
      toast.error("Failed to save — backend may still be deploying");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
          <p className="text-slate-400 text-sm mt-1">Edit website content without touching code</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl transition-all disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {!apiAvailable && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 text-sm">
          Backend is still deploying. You can preview the form — saving will work once Render finishes deploying.
        </div>
      )}

      <Section title="Company Info">
        <Field label="Company Name" name="company_name" value={settings.company_name} onChange={handleChange} />
        <Field label="Tagline" name="company_tagline" value={settings.company_tagline} onChange={handleChange} />
        <Field label="Email" name="company_email" value={settings.company_email} onChange={handleChange} />
        <Field label="Phone" name="company_phone" value={settings.company_phone} onChange={handleChange} />
        <Field label="Address" name="company_address" value={settings.company_address} onChange={handleChange} full />
        <Field label="Description" name="company_description" value={settings.company_description} onChange={handleChange} textarea full />
      </Section>

      <Section title="Hero Section">
        <Field label="Badge Text" name="hero_badge_text" value={settings.hero_badge_text} onChange={handleChange} full />
        <Field label="Main Title" name="hero_title" value={settings.hero_title} onChange={handleChange} />
        <Field label="Title Highlight (gold text)" name="hero_title_highlight" value={settings.hero_title_highlight} onChange={handleChange} />
        <Field label="Subtitle" name="hero_subtitle" value={settings.hero_subtitle} onChange={handleChange} textarea full />
      </Section>

      <Section title="Stats (Hero Numbers)">
        <Field label="Years Experience" name="stat_years" value={settings.stat_years} onChange={handleChange} />
        <Field label="Countries Served" name="stat_countries" value={settings.stat_countries} onChange={handleChange} />
        <Field label="Shipments Delivered" name="stat_shipments" value={settings.stat_shipments} onChange={handleChange} />
      </Section>

      <Section title="About Page">
        <Field label="About Title" name="about_title" value={settings.about_title} onChange={handleChange} full />
        <Field label="About Description" name="about_description" value={settings.about_description} onChange={handleChange} textarea full />
        <Field label="Our Story" name="about_story" value={settings.about_story} onChange={handleChange} textarea full />
      </Section>

      <Section title="Contact Info">
        <Field label="Contact Email" name="contact_email" value={settings.contact_email} onChange={handleChange} />
        <Field label="Contact Phone" name="contact_phone" value={settings.contact_phone} onChange={handleChange} />
        <Field label="Office Address" name="contact_address" value={settings.contact_address} onChange={handleChange} full />
        <Field label="Working Hours" name="working_hours" value={settings.working_hours} onChange={handleChange} />
      </Section>

      <Section title="Social Media">
        <Field label="Facebook URL" name="facebook_url" value={settings.facebook_url} onChange={handleChange} />
        <Field label="Twitter URL" name="twitter_url" value={settings.twitter_url} onChange={handleChange} />
        <Field label="LinkedIn URL" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} />
        <Field label="Instagram URL" name="instagram_url" value={settings.instagram_url} onChange={handleChange} />
      </Section>
    </div>
  );
}
