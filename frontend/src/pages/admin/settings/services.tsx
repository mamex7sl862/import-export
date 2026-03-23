import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsServices() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Services & Products" subtitle="Section headings for services and products on the homepage" saving={saving} onSave={handleSave}>
      <Field label="Services Title" name="services_title" value={settings.services_title} onChange={handleChange} />
      <Field label="Services Subtitle" name="services_subtitle" value={settings.services_subtitle} onChange={handleChange} textarea full />
      <Field label="Products Badge" name="products_badge" value={settings.products_badge} onChange={handleChange} />
      <Field label="Products Title" name="products_title" value={settings.products_title} onChange={handleChange} />
      <Field label="Products Subtitle" name="products_subtitle" value={settings.products_subtitle} onChange={handleChange} textarea full />
    </PageShell>
  );
}
