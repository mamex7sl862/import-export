import { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, X, Save, Loader2 } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";
import { useSettingsPage, Field } from "../settings/shared";

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

function FAQsCRUD() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const emptyForm = { question: "", answer: "", order: 0, is_active: true };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    try { const r = await api.get("/api/content/faqs/"); setItems(r.data.results || r.data); }
    catch { toast.error("Failed to load FAQs"); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    try { await api.delete(`/api/content/faqs/${id}/`); toast.success("Deleted"); fetch_(); }
    catch { toast.error("Failed to delete"); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await api.patch(`/api/content/faqs/${editing.id}/`, form); toast.success("Updated"); }
      else { await api.post("/api/content/faqs/", form); toast.success("Created"); }
      setShowForm(false); fetch_();
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">FAQs</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {["Question", "Order", "Status", ""].map(c => <th key={c} className="text-left px-4 py-2.5 text-slate-400 font-medium text-xs">{c}</th>)}
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={4} className="text-center py-6 text-slate-400 text-sm">No FAQs yet</td></tr>}
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                  <td className="px-4 py-2.5 text-white max-w-[300px] truncate">{item.question}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit FAQ" : "New FAQ"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label="Question" name="question" form={form} setForm={setForm} full />
                <F label="Answer" name="answer" form={form} setForm={setForm} textarea full />
                <F label="Order" name="order" form={form} setForm={setForm} />
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active</label>
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

function TestimonialsCRUD() {
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

  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };
  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Testimonials</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {["Name", "Company", "Rating", "Status", ""].map(c => <th key={c} className="text-left px-4 py-2.5 text-slate-400 font-medium text-xs">{c}</th>)}
            </tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={5} className="text-center py-6 text-slate-400 text-sm">No testimonials yet</td></tr>}
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                  <td className="px-4 py-2.5 text-white font-medium">{item.name}</td>
                  <td className="px-4 py-2.5 text-slate-300">{item.company}</td>
                  <td className="px-4 py-2.5 text-[#D4AF37]">{"★".repeat(item.rating)}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Testimonial" : "New Testimonial"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <F label="Name" name="name" form={form} setForm={setForm} />
                <F label="Company" name="company" form={form} setForm={setForm} />
                <F label="Role / Title" name="role" form={form} setForm={setForm} />
                <div>
                  <label className={lbl}>Rating</label>
                  <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className={inp}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <F label="Feedback" name="feedback" form={form} setForm={setForm} textarea full />
                <F label="Order" name="order" form={form} setForm={setForm} />
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active</label>
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

function BlogHeaderSettings() {
  const { settings, loading, saving, handleChange, handleSave } = useSettingsPage();
  if (loading) return <div className="text-slate-400 text-sm">Loading...</div>;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Blog Page Header</h3>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold rounded-lg text-sm disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge Text" name="blog_page_badge" value={settings.blog_page_badge} onChange={handleChange} />
          <Field label="Page Title" name="blog_page_title" value={settings.blog_page_title} onChange={handleChange} />
          <Field label="Page Subtitle" name="blog_page_subtitle" value={settings.blog_page_subtitle} onChange={handleChange} textarea full />
        </div>
      </div>
    </div>
  );
}

function BlogPostsCRUD() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const emptyForm = { title: "", excerpt: "", content: "", author: "", image: "", read_time: "5 min read", is_featured: false, is_published: true, category: "" };
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    try {
      const [postsRes, catsRes] = await Promise.all([api.get("/api/blog/posts/"), api.get("/api/blog/categories/")]);
      setPosts(postsRes.data.results || postsRes.data);
      setCategories(catsRes.data.results || catsRes.data);
    } catch { toast.error("Failed to load blog data"); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const openEdit = (post: any) => { setEditing(post); setForm({ ...post, category: post.category?.id || post.category || "" }); setShowForm(true); };
  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    try { await api.delete(`/api/blog/posts/${slug}/`); toast.success("Deleted"); fetchData(); }
    catch { toast.error("Failed to delete"); }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await api.patch(`/api/blog/posts/${editing.slug}/`, form); toast.success("Updated"); }
      else { await api.post("/api/blog/posts/", form); toast.success("Created"); }
      setShowForm(false); fetchData();
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Blog Posts</h3>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>
      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {["Title", "Author", "Category", "Featured", "Status", ""].map(c => <th key={c} className="text-left px-4 py-2.5 text-slate-400 font-medium text-xs">{c}</th>)}
            </tr></thead>
            <tbody>
              {posts.length === 0 && <tr><td colSpan={6} className="text-center py-6 text-slate-400 text-sm">No posts yet</td></tr>}
              {posts.map(p => (
                <tr key={p.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                  <td className="px-4 py-2.5 text-white font-medium max-w-[180px] truncate">{p.title}</td>
                  <td className="px-4 py-2.5 text-slate-300">{p.author}</td>
                  <td className="px-4 py-2.5 text-slate-300">{p.category?.name || "-"}</td>
                  <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${p.is_featured ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-slate-700 text-slate-400"}`}>{p.is_featured ? "Yes" : "No"}</span></td>
                  <td className="px-4 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${p.is_published ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{p.is_published ? "Published" : "Draft"}</span></td>
                  <td className="px-4 py-2.5"><div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1 text-slate-400 hover:text-[#D4AF37]"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.slug)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Post" : "New Post"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={lbl}>Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className={inp} />
                </div>
                <div>
                  <label className={lbl}>Author</label>
                  <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required className={inp} />
                </div>
                <div>
                  <label className={lbl}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Read Time</label>
                  <input value={form.read_time} onChange={e => setForm({ ...form, read_time: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Image URL</label>
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inp} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl}>Excerpt</label>
                  <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} required className={inp + " resize-none"} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl}>Content</label>
                  <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} required className={inp + " resize-none"} />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="accent-[#D4AF37]" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="accent-[#D4AF37]" /> Published
                  </label>
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

export default function BlogAdminPage() {
  const [tab, setTab] = useState<"posts" | "header" | "faqs" | "testimonials">("posts");
  const tabs = [
    { key: "posts", label: "Blog Posts" },
    { key: "header", label: "Page Header" },
    { key: "faqs", label: "FAQs" },
    { key: "testimonials", label: "Testimonials" },
  ] as const;

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold text-white">Blog & Content</h2>
      <div className="flex gap-2 border-b border-slate-700/50">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${tab === t.key ? "bg-slate-800 text-[#D4AF37] border border-b-0 border-slate-700/50" : "text-slate-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-2">
        {tab === "posts" && <BlogPostsCRUD />}
        {tab === "header" && <BlogHeaderSettings />}
        {tab === "faqs" && <FAQsCRUD />}
        {tab === "testimonials" && <TestimonialsCRUD />}
      </div>
    </div>
  );
}
