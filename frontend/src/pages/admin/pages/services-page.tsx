import { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, X, Save, Loader2 } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";
import { useSettingsPage, Field } from "../settings/shared";
import { SETTINGS_API } from "@/hooks/useSiteSettings";

const BACKEND = import.meta.env.VITE_API_URL || "https://tradeflow-import-export-2.onrender.com";
const inp = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
const lbl = "text-xs text-slate-400 mb-1 block";
const F = ({ label, name, form, setForm, textarea = false, full = false }: any) => (
  <div className={full ? "col-span-2" : ""}>
    <label className={lbl}>{label}</label>
    {textarea
      ? <textarea name={name} value={form[name] ?? ""} onChange={e => setForm({ ...form, [name]: e.target.value })} rows={3} className={inp + " resize-none"} />
      : <input name={name} value={form[name] ?? ""} onChange={e => setForm({ ...form, [name]: e.target.value })} className={inp} />}
  </div>
);

function ServicesCRUD() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const emptyForm = { title: "", description: "", icon: "Globe", features: [], color: "from-blue-500 to-cyan-500", order: 0, is_active: true };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    try { const r = await api.get("/api/content/services/"); setItems(r.data.results || r.data); }
    catch { toast.error("Failed to load services"); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    try { await api.delete(`/api/content/services/${id}/`); toast.success("Deleted"); fetch_(); }
    catch { toast.error("Failed to delete"); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await api.patch(`/api/content/services/${editing.id}/`, form); toast.success("Updated"); }
      else { await api.post("/api/content/services/", form); toast.success("Created"); }
      setShowForm(false); fetch_();
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Service Cards</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {["Title", "Icon", "Order", "Status", ""].map(c => <th key={c} className="text-left px-4 py-2.5 text-slate-400 font-medium text-xs">{c}</th>)}
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="text-center py-6 text-slate-400 text-sm">No services yet</td></tr>}
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                  <td className="px-4 py-2.5 text-white font-medium">{item.title}</td>
                  <td className="px-4 py-2.5 text-slate-300">{item.icon}</td>
                  <td className="px-4 py-2.5 text-slate-300">{item.order}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{item.is_active ? "Active" : "Hidden"}</span></td>
                  <td className="px-4 py-2.5"><div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1 text-slate-400 hover:text-[#D4AF37]"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Service" : "New Service"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label="Title" name="title" form={form} setForm={setForm} full />
                <F label="Description" name="description" form={form} setForm={setForm} textarea full />
                <F label="Icon (Lucide name e.g. Ship)" name="icon" form={form} setForm={setForm} />
                <F label="Color (e.g. from-blue-500 to-cyan-500)" name="color" form={form} setForm={setForm} />
                <div className="col-span-2">
                  <label className={lbl}>Features (one per line)</label>
                  <textarea rows={4} value={(form.features || []).join("\n")} onChange={e => setForm({ ...form, features: e.target.value.split("\n").filter(Boolean) })} className={inp + " resize-none"} />
                </div>
                <F label="Order" name="order" form={form} setForm={setForm} />
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active (visible on site)</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl hover:bg-[#D4AF37]/90 text-sm">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductsCRUD() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const emptyForm = { name: "", description: "", image: "", category: "import", type: "", price: "", rating: 4.5, reviews: 0, order: 0, is_active: true };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    try { const r = await api.get("/api/content/products/"); setItems(r.data.results || r.data); }
    catch { toast.error("Failed to load products"); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try { await api.delete(`/api/content/products/${id}/`); toast.success("Deleted"); fetch_(); }
    catch { toast.error("Failed to delete"); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await api.patch(`/api/content/products/${editing.id}/`, form); toast.success("Updated"); }
      else { await api.post("/api/content/products/", form); toast.success("Created"); }
      setShowForm(false); fetch_();
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Products</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {["Name", "Category", "Type", "Price", "Status", ""].map(c => <th key={c} className="text-left px-4 py-2.5 text-slate-400 font-medium text-xs">{c}</th>)}
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={6} className="text-center py-6 text-slate-400 text-sm">No products yet</td></tr>}
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                  <td className="px-4 py-2.5 text-white font-medium max-w-[140px] truncate">{item.name}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${item.category === "import" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>{item.category}</span></td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{item.type}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{item.price}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{item.is_active ? "Active" : "Hidden"}</span></td>
                  <td className="px-4 py-2.5"><div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1 text-slate-400 hover:text-[#D4AF37]"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Product" : "New Product"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label="Name" name="name" form={form} setForm={setForm} full />
                <F label="Description" name="description" form={form} setForm={setForm} textarea full />
                <F label="Image URL or /path" name="image" form={form} setForm={setForm} full />
                <div>
                  <label className={lbl}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                    <option value="import">Import</option>
                    <option value="export">Export</option>
                  </select>
                </div>
                <F label="Type (e.g. Electronics)" name="type" form={form} setForm={setForm} />
                <F label="Price (e.g. Starting from $5,000)" name="price" form={form} setForm={setForm} />
                <F label="Rating (1-5)" name="rating" form={form} setForm={setForm} />
                <F label="Reviews count" name="reviews" form={form} setForm={setForm} />
                <F label="Order" name="order" form={form} setForm={setForm} />
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl hover:bg-[#D4AF37]/90 text-sm">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionSettings() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <div className="text-slate-400 text-sm">Loading settings...</div>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Section Text & Page Header</h3>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-lg text-sm disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Homepage Services Section</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Services Title" name="services_title" value={settings.services_title} onChange={handleChange} />
          <Field label="Services Subtitle" name="services_subtitle" value={settings.services_subtitle} onChange={handleChange} textarea full />
          <Field label="Products Badge" name="products_badge" value={settings.products_badge} onChange={handleChange} />
          <Field label="Products Title" name="products_title" value={settings.products_title} onChange={handleChange} />
          <Field label="Products Subtitle" name="products_subtitle" value={settings.products_subtitle} onChange={handleChange} textarea full />
        </div>
      </div>
      <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Services Page Header (banner)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge Text" name="services_page_badge" value={settings.services_page_badge} onChange={handleChange} />
          <Field label="Page Title" name="services_page_title" value={settings.services_page_title} onChange={handleChange} />
          <Field label="Page Subtitle" name="services_page_subtitle" value={settings.services_page_subtitle} onChange={handleChange} textarea full />
        </div>
      </div>
    </div>
  );
}

export default function ServicesAdminPage() {
  const [tab, setTab] = useState<"settings" | "services" | "products">("settings");
  const tabs = [
    { key: "settings", label: "Section Settings" },
    { key: "services", label: "Service Cards" },
    { key: "products", label: "Products" },
  ] as const;

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold text-white">Services & Products</h2>
      <div className="flex gap-2 border-b border-slate-700/50">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${tab === t.key ? "bg-slate-800 text-[#D4AF37] border border-b-0 border-slate-700/50" : "text-slate-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-2">
        {tab === "settings" && <SectionSettings />}
        {tab === "services" && <ServicesCRUD />}
        {tab === "products" && <ProductsCRUD />}
      </div>
    </div>
  );
}
