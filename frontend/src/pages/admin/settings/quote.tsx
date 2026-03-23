import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsQuote() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Quote Form Section" subtitle="The 'Request a Quote' section on the homepage" saving={saving} onSave={handleSave}>
      <Field label="Badge Text" name="quote_badge" value={settings.quote_badge} onChange={handleChange} />
      <Field label="Title" name="quote_title" value={settings.quote_title} onChange={handleChange} />
      <Field label="Subtitle" name="quote_subtitle" value={settings.quote_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
