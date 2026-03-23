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

export default function FooterAdminPage() {
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
          <h2 className="text-2xl font-bold text-white">Footer</h2>
          <p className="text-slate-400 text-sm mt-1">Newsletter section, brand info, and social links</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-xl disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <SettingsBlock title="Brand Info">
        <Field label="Company Name" name="company_name" value={settings.company_name} onChange={handleChange} />
        <Field label="Company Tagline (below name)" name="company_tagline" value={settings.company_tagline} onChange={handleChange} />
        <Field label="Footer Tagline (paragraph text)" name="footer_tagline" value={settings.footer_tagline} onChange={handleChange} textarea full />
      </SettingsBlock>

      <SettingsBlock title="Social Media Links">
        <Field label="Facebook URL" name="facebook_url" value={settings.facebook_url} onChange={handleChange} />
        <Field label="Twitter / X URL" name="twitter_url" value={settings.twitter_url} onChange={handleChange} />
        <Field label="LinkedIn URL" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} />
        <Field label="Instagram URL" name="instagram_url" value={settings.instagram_url} onChange={handleChange} />
      </SettingsBlock>

      <SettingsBlock title="Contact Info (shown in footer)">
        <Field label="Email" name="company_email" value={settings.company_email} onChange={handleChange} />
        <Field label="Phone" name="company_phone" value={settings.company_phone} onChange={handleChange} />
        <Field label="Address" name="company_address" value={settings.company_address} onChange={handleChange} full />
      </SettingsBlock>
    </div>
  );
}
