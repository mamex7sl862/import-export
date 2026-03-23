import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsHero() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Hero Section" subtitle="The main banner at the top of the homepage" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="hero_badge_text" value={settings.hero_badge_text} onChange={handleChange} full />
      <Field label="Main Title" name="hero_title" value={settings.hero_title} onChange={handleChange} />
      <Field label="Title Highlight (gold text)" name="hero_title_highlight" value={settings.hero_title_highlight} onChange={handleChange} />
      <Field label="Subtitle" name="hero_subtitle" value={settings.hero_subtitle} onChange={handleChange} textarea full />
      <Field label="Primary Button Text" name="hero_cta_primary" value={settings.hero_cta_primary} onChange={handleChange} />
      <Field label="Secondary Button Text" name="hero_cta_secondary" value={settings.hero_cta_secondary} onChange={handleChange} />
    </PageShell>
  );
}
