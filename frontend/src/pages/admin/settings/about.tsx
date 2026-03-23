import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsAbout() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="About Section" subtitle="Content shown on the About page and home about section" saving={saving} onSave={handleSave}>
      <Field label="About Title" name="about_title" value={settings.about_title} onChange={handleChange} full />
      <Field label="About Description" name="about_description" value={settings.about_description} onChange={handleChange} textarea full />
      <Field label="Our Story" name="about_story" value={settings.about_story} onChange={handleChange} textarea full />
      <Field label="Our Commitment" name="about_commitment" value={settings.about_commitment} onChange={handleChange} textarea full />
      <Field label="Founded Text (image overlay)" name="about_founded_text" value={settings.about_founded_text} onChange={handleChange} />
      <Field label="Founded Sub-text" name="about_founded_sub" value={settings.about_founded_sub} onChange={handleChange} />
    </PageShell>
  );
}
