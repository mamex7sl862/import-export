import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";

const inp = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
const lbl = "text-xs text-slate-400 mb-1 block";

export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const emptyForm = { name: "", company: "", role: "", feedback: "", rating: 5, order: 0, is_active: true };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    try { const r = await api.get("/api/content/testimonials/"); setItems(r.data.results || r.data); }
    catch { toast.error("Failed to load testimonials"); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    try { await api.delete(`/api/content/testimonials/${id}/`); toast.success("Deleted"); fetch_(); }
    catch { toast.error("Failed to delete"); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await api.patch(`/api/content/testimonials/${editing.id}/`, form); toast.success("Updated"); }
      else { await api.post("/api/content/testimonials/", form); toast.success("Created"); }
      setShowForm(false); fetch_();
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Testimonials</h2>
          <p className="text-slate-400 text-sm mt-1">Manage client testimonials shown on the site</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-4 py-2 rounded-xl hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {["Name", "Company", "Rating", "Status", "Actions"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-slate-400 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-slate-400">No testimonials yet.</td></tr>}
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-slate-300">{item.company}</td>
                  <td className="px-4 py-3 text-[#D4AF37]">{"★".repeat(item.rating)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.is_active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-[#D4AF37]"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Testimonial" : "New Testimonial"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Company</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Role / Title</label>
                  <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Rating</label>
                  <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className={inp}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Feedback</label>
                  <textarea required rows={4} value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} className={inp + " resize-none"} />
                </div>
                <div>
                  <label className={lbl}>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} className={inp} />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active (visible on site)</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl text-sm">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
