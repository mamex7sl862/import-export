import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsCompany() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Company Info" subtitle="Your brand name, tagline, and contact details" saving={saving} onSave={handleSave}>
      <Field label="Company Name" name="company_name" value={settings.company_name} onChange={handleChange} />
      <Field label="Tagline" name="company_tagline" value={settings.company_tagline} onChange={handleChange} />
      <Field label="Email" name="company_email" value={settings.company_email} onChange={handleChange} />
      <Field label="Phone" name="company_phone" value={settings.company_phone} onChange={handleChange} />
      <Field label="Address" name="company_address" value={settings.company_address} onChange={handleChange} full />
      <Field label="Description" name="company_description" value={settings.company_description} onChange={handleChange} textarea full />
      <Field label="Footer Tagline" name="footer_tagline" value={settings.footer_tagline} onChange={handleChange} textarea full />
    </PageShell>
  );
}
