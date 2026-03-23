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

export default function AboutAdminPage() {
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
          <h2 className="text-2xl font-bold text-white">About Page</h2>
          <p className="text-slate-400 text-sm mt-1">All content for the About page</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <SettingsBlock title="Page Header (banner at top of About page)">
        <Field label="Badge Text" name="about_page_badge" value={settings.about_page_badge} onChange={handleChange} />
        <Field label="Page Title" name="about_page_title" value={settings.about_page_title} onChange={handleChange} />
        <Field label="Page Subtitle" name="about_page_subtitle" value={settings.about_page_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="Hero Section">
        <Field label="Section Title" name="about_title" value={settings.about_title} onChange={handleChange} full />
        <Field label="Description" name="about_description" value={settings.about_description} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="Stats">
        <Field label="Years Value (e.g. 15+)" name="stat_years" value={settings.stat_years} onChange={handleChange} />
        <Field label="Years Label" name="stat_years_label" value={settings.stat_years_label} onChange={handleChange} />
        <Field label="Countries Value (e.g. 50+)" name="stat_countries" value={settings.stat_countries} onChange={handleChange} />
        <Field label="Countries Label" name="stat_countries_label" value={settings.stat_countries_label} onChange={handleChange} />
        <Field label="Shipments Value (e.g. 10K+)" name="stat_shipments" value={settings.stat_shipments} onChange={handleChange} />
        <Field label="Shipments Label" name="stat_shipments_label" value={settings.stat_shipments_label} onChange={handleChange} />
        <Field label="Success Rate (e.g. 99.8%)" name="stat_success_rate" value={settings.stat_success_rate} onChange={handleChange} />
        <Field label="Success Label" name="stat_success_label" value={settings.stat_success_label} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Our Story Section">
        <Field label="Story Image URL" name="about_story_image" value={settings.about_story_image} onChange={handleChange} full />
        <Field label="Our Story Text" name="about_story" value={settings.about_story} onChange={handleChange} textarea full />
        <Field label="Our Commitment" name="about_commitment" value={settings.about_commitment} onChange={handleChange} textarea full />
        <Field label="Founded Text (image overlay)" name="about_founded_text" value={settings.about_founded_text} onChange={handleChange} />
        <Field label="Founded Sub-text" name="about_founded_sub" value={settings.about_founded_sub} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Core Values — Section Heading">
        <Field label="Section Title" name="about_values_title" value={settings.about_values_title} onChange={handleChange} />
        <Field label="Section Subtitle" name="about_values_subtitle" value={settings.about_values_subtitle} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Core Values — Value 1">
        <Field label="Title" name="value1_title" value={settings.value1_title} onChange={handleChange} />
        <Field label="Description" name="value1_desc" value={settings.value1_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Core Values — Value 2">
        <Field label="Title" name="value2_title" value={settings.value2_title} onChange={handleChange} />
        <Field label="Description" name="value2_desc" value={settings.value2_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Core Values — Value 3">
        <Field label="Title" name="value3_title" value={settings.value3_title} onChange={handleChange} />
        <Field label="Description" name="value3_desc" value={settings.value3_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Core Values — Value 4">
        <Field label="Title" name="value4_title" value={settings.value4_title} onChange={handleChange} />
        <Field label="Description" name="value4_desc" value={settings.value4_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Our Journey — Section Heading">
        <Field label="Section Title" name="about_journey_title" value={settings.about_journey_title} onChange={handleChange} />
        <Field label="Section Subtitle" name="about_journey_subtitle" value={settings.about_journey_subtitle} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Milestone 1">
        <Field label="Year" name="milestone1_year" value={settings.milestone1_year} onChange={handleChange} />
        <Field label="Title" name="milestone1_title" value={settings.milestone1_title} onChange={handleChange} />
        <Field label="Description" name="milestone1_desc" value={settings.milestone1_desc} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Milestone 2">
        <Field label="Year" name="milestone2_year" value={settings.milestone2_year} onChange={handleChange} />
        <Field label="Title" name="milestone2_title" value={settings.milestone2_title} onChange={handleChange} />
        <Field label="Description" name="milestone2_desc" value={settings.milestone2_desc} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Milestone 3">
        <Field label="Year" name="milestone3_year" value={settings.milestone3_year} onChange={handleChange} />
        <Field label="Title" name="milestone3_title" value={settings.milestone3_title} onChange={handleChange} />
        <Field label="Description" name="milestone3_desc" value={settings.milestone3_desc} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Milestone 4">
        <Field label="Year" name="milestone4_year" value={settings.milestone4_year} onChange={handleChange} />
        <Field label="Title" name="milestone4_title" value={settings.milestone4_title} onChange={handleChange} />
        <Field label="Description" name="milestone4_desc" value={settings.milestone4_desc} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Milestone 5">
        <Field label="Year" name="milestone5_year" value={settings.milestone5_year} onChange={handleChange} />
        <Field label="Title" name="milestone5_title" value={settings.milestone5_title} onChange={handleChange} />
        <Field label="Description" name="milestone5_desc" value={settings.milestone5_desc} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="Why Choose Us — Feature 1">
        <Field label="Title" name="feature1_title" value={settings.feature1_title} onChange={handleChange} />
        <Field label="Description" name="feature1_desc" value={settings.feature1_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Why Choose Us — Feature 2">
        <Field label="Title" name="feature2_title" value={settings.feature2_title} onChange={handleChange} />
        <Field label="Description" name="feature2_desc" value={settings.feature2_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Why Choose Us — Feature 3">
        <Field label="Title" name="feature3_title" value={settings.feature3_title} onChange={handleChange} />
        <Field label="Description" name="feature3_desc" value={settings.feature3_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Why Choose Us — Feature 4">
        <Field label="Title" name="feature4_title" value={settings.feature4_title} onChange={handleChange} />
        <Field label="Description" name="feature4_desc" value={settings.feature4_desc} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="CTA Section (bottom of About page)">
        <Field label="Title" name="about_cta_title" value={settings.about_cta_title} onChange={handleChange} full />
        <Field label="Subtitle" name="about_cta_subtitle" value={settings.about_cta_subtitle} onChange={handleChange} textarea full />
        <Field label="Primary Button Text" name="about_cta_primary" value={settings.about_cta_primary} onChange={handleChange} />
        <Field label="Secondary Button Text" name="about_cta_secondary" value={settings.about_cta_secondary} onChange={handleChange} />
      </SettingsBlock>
    </div>
  );
}
