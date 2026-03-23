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

export default function ContactAdminPage() {
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
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p className="text-slate-400 text-sm mt-1">Contact page header and contact details</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <SettingsBlock title="1 · Page Header (banner at top)">
        <Field label="Badge Text" name="contact_page_badge" value={settings.contact_page_badge} onChange={handleChange} />
        <Field label="Page Title" name="contact_page_title" value={settings.contact_page_title} onChange={handleChange} />
        <Field label="Page Subtitle" name="contact_page_subtitle" value={settings.contact_page_subtitle} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="2 · Contact Details">
        <Field label="Contact Email" name="contact_email" value={settings.contact_email} onChange={handleChange} />
        <Field label="Contact Phone" name="contact_phone" value={settings.contact_phone} onChange={handleChange} />
        <Field label="Office Address" name="contact_address" value={settings.contact_address} onChange={handleChange} full />
        <Field label="Working Hours (weekdays)" name="working_hours" value={settings.working_hours} onChange={handleChange} />
        <Field label="Working Hours (Saturday)" name="working_hours_sat" value={settings.working_hours_sat} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="3 · Office Hours Display">
        <Field label="Weekday Hours (e.g. 9 AM - 6 PM)" name="contact_hours_weekday" value={settings.contact_hours_weekday} onChange={handleChange} />
        <Field label="Saturday Hours" name="contact_hours_sat" value={settings.contact_hours_sat} onChange={handleChange} />
        <Field label="Sunday Hours (e.g. Closed)" name="contact_hours_sun" value={settings.contact_hours_sun} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="4 · Google Map Location">
        <Field label="Google Maps Embed URL (paste the src= URL from Google Maps embed code)" name="google_map_url" value={settings.google_map_url} onChange={handleChange} full />
      </SettingsBlock>

      <SettingsBlock title="5 · Quick Stats (bottom of contact page)">
        <Field label="Stat 1 Title" name="contact_stat1_title" value={settings.contact_stat1_title} onChange={handleChange} />
        <Field label="Stat 1 Description" name="contact_stat1_desc" value={settings.contact_stat1_desc} onChange={handleChange} />
        <Field label="Stat 2 Title" name="contact_stat2_title" value={settings.contact_stat2_title} onChange={handleChange} />
        <Field label="Stat 2 Description" name="contact_stat2_desc" value={settings.contact_stat2_desc} onChange={handleChange} />
        <Field label="Stat 3 Title" name="contact_stat3_title" value={settings.contact_stat3_title} onChange={handleChange} />
        <Field label="Stat 3 Description" name="contact_stat3_desc" value={settings.contact_stat3_desc} onChange={handleChange} />
      </SettingsBlock>

    </div>
  );
}
