import { useSettingsPage, Field, PageShell, LoadingSpinner } from "./shared";

export default function SettingsSocial() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <LoadingSpinner />;
  return (
    <PageShell title="Social Media" subtitle="Links shown in the header and footer" saving={saving} onSave={handleSave}>
      <Field label="Facebook URL" name="facebook_url" value={settings.facebook_url} onChange={handleChange} />
      <Field label="Twitter URL" name="twitter_url" value={settings.twitter_url} onChange={handleChange} />
      <Field label="LinkedIn URL" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} />
      <Field label="Instagram URL" name="instagram_url" value={settings.instagram_url} onChange={handleChange} />
    </PageShell>
  );
}
