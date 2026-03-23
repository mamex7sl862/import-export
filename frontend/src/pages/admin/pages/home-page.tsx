import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useSettingsPage, Field } from "../settings/shared";

function SettingsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function HomeAdminPage() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Home Page</h2>
          <p className="text-slate-400 text-sm mt-1">Hero, stats, and quote form section</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <SettingsBlock title="Hero Section">
        <Field label="Badge Text" name="hero_badge_text" value={settings.hero_badge_text} onChange={handleChange} full />
        <Field label="Main Title" name="hero_title" value={settings.hero_title} onChange={handleChange} />
        <Field label="Title Highlight (gold text)" name="hero_title_highlight" value={settings.hero_title_highlight} onChange={handleChange} />
        <Field label="Subtitle" name="hero_subtitle" value={settings.hero_subtitle} onChange={handleChange} textarea full />
        <Field label="Primary Button" name="hero_cta_primary" value={settings.hero_cta_primary} onChange={handleChange} />
        <Field label="Secondary Button" name="hero_cta_secondary" value={settings.hero_cta_secondary} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Stats & Numbers">
        <Field label="Years Value (e.g. 15+)" name="stat_years" value={settings.stat_years} onChange={handleChange} />
        <Field label="Years Label" name="stat_years_label" value={settings.stat_years_label} onChange={handleChange} />
        <Field label="Countries Value (e.g. 50+)" name="stat_countries" value={settings.stat_countries} onChange={handleChange} />
        <Field label="Countries Label" name="stat_countries_label" value={settings.stat_countries_label} onChange={handleChange} />
        <Field label="Shipments Value (e.g. 10K+)" name="stat_shipments" value={settings.stat_shipments} onChange={handleChange} />
        <Field label="Shipments Label" name="stat_shipments_label" value={settings.stat_shipments_label} onChange={handleChange} />
        <Field label="Success Rate (e.g. 99.8%)" name="stat_success_rate" value={settings.stat_success_rate} onChange={handleChange} />
        <Field label="Success Label" name="stat_success_label" value={settings.stat_success_label} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Quote Form Section">
        <Field label="Badge Text" name="quote_badge" value={settings.quote_badge} onChange={handleChange} />
        <Field label="Title" name="quote_title" value={settings.quote_title} onChange={handleChange} />
        <Field label="Subtitle" name="quote_subtitle" value={settings.quote_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>
    </div>
  );
}
