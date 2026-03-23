import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsStats() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Stats & Numbers" subtitle="The impact numbers shown on the homepage and about page" saving={saving} onSave={handleSave}>
      <Field label="Years Value (e.g. 15+)" name="stat_years" value={settings.stat_years} onChange={handleChange} />
      <Field label="Years Label" name="stat_years_label" value={settings.stat_years_label} onChange={handleChange} />
      <Field label="Countries Value (e.g. 50+)" name="stat_countries" value={settings.stat_countries} onChange={handleChange} />
      <Field label="Countries Label" name="stat_countries_label" value={settings.stat_countries_label} onChange={handleChange} />
      <Field label="Shipments Value (e.g. 10K+)" name="stat_shipments" value={settings.stat_shipments} onChange={handleChange} />
      <Field label="Shipments Label" name="stat_shipments_label" value={settings.stat_shipments_label} onChange={handleChange} />
      <Field label="Success Rate (e.g. 99.8%)" name="stat_success_rate" value={settings.stat_success_rate} onChange={handleChange} />
      <Field label="Success Label" name="stat_success_label" value={settings.stat_success_label} onChange={handleChange} />
    </PageShell>
  );
}
