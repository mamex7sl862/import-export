import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsContact() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Contact Info" subtitle="Details shown on the contact page and footer" saving={saving} onSave={handleSave}>
      <Field label="Contact Email" name="contact_email" value={settings.contact_email} onChange={handleChange} />
      <Field label="Contact Phone" name="contact_phone" value={settings.contact_phone} onChange={handleChange} />
      <Field label="Office Address" name="contact_address" value={settings.contact_address} onChange={handleChange} full />
      <Field label="Working Hours (weekdays)" name="working_hours" value={settings.working_hours} onChange={handleChange} />
      <Field label="Working Hours (Saturday)" name="working_hours_sat" value={settings.working_hours_sat} onChange={handleChange} />
    </PageShell>
  );
}
