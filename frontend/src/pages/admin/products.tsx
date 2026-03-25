import { useEffect, useState } from "react";
import { Trash2, Plus, Edit2, X, CheckCircle, XCircle, Eye } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";
import { getAuthUser, canPublishProducts, getAllowedProductCategory, isStaffOnly } from "@/hooks/useAuth";

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

// ── Product View Modal ────────────────────────────────────────────────────────
function ProductViewModal({ product, onClose }: { product: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 overflow-y-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-52 bg-slate-900">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium ${
            product.category === "import" ? "bg-blue-500/80 text-white" : "bg-green-500/80 text-white"
          }`}>{product.category}</span>
          <span className="absolute bottom-3 right-3 bg-[#D4AF37] text-[#101828] text-xs font-bold px-2.5 py-1 rounded-full">
            {product.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
              product.is_published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
            }`}>
              {product.is_published ? "Published" : "Pending"}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{product.description || "No description."}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 mb-1">Price</p>
              <p className="text-white font-medium">{product.price || "—"}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 mb-1">Rating</p>
              <p className="text-[#D4AF37] font-medium">{"★".repeat(Math.round(product.rating))} {product.rating} ({product.reviews} reviews)</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 mb-1">Submitted by</p>
              <p className="text-white font-medium">{product.submitted_by_username || "—"}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 mb-1">Published by</p>
              <p className="text-white font-medium">{product.published_by_username || "—"}</p>
            </div>
          </div>

          <button onClick={onClose}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 rounded-xl text-sm transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const user = getAuthUser();
  const canPublish = canPublishProducts(user);
  const allowedCategory = getAllowedProductCategory(user);
  const staffOnly = isStaffOnly(user);

  const defaultCategory = allowedCategory ?? "import";
  const emptyForm = { name: "", description: "", image: "", category: defaultCategory, type: "", price: "", rating: 4.5, reviews: 0, order: 0, is_active: true };

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [viewing, setViewing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => {
    try {
      const r = await api.get("/api/content/products/");
      setItems(r.data.results || r.data);
    } catch { toast.error("Failed to load products"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try { await api.delete(`/api/content/products/${id}/`); toast.success("Deleted"); fetch_(); }
    catch { toast.error("Failed to delete"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (allowedCategory) payload.category = allowedCategory;
    if (staffOnly) delete payload.is_published;
    try {
      if (editing) { await api.patch(`/api/content/products/${editing.id}/`, payload); toast.success("Updated"); }
      else { await api.post("/api/content/products/", payload); toast.success(staffOnly ? "Submitted for manager review" : "Created"); }
      setShowForm(false); fetch_();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to save");
    }
  };

  const handlePublish = async (item: any) => {
    try {
      await api.patch(`/api/content/products/${item.id}/`, { is_published: !item.is_published });
      toast.success(item.is_published ? "Unpublished" : "Published — now visible on site");
      fetch_();
    } catch { toast.error("Failed to update publish status"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          {staffOnly && (
            <p className="text-sm text-slate-400 mt-1">
              You can add {allowedCategory} products. They go live after your manager publishes them.
            </p>
          )}
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-4 py-2 rounded-xl hover:bg-[#D4AF37]/90 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? <div className="text-slate-400 text-sm">Loading...</div> : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {["Name", "Category", "Type", "Price", "Status", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-slate-400 font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">No products yet. Click "Add Product" to get started.</td></tr>
                )}
                {items.map(item => (
                  <tr key={item.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-white font-medium max-w-[160px] truncate">{item.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${item.category === "import" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{item.type}</td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{item.price}</td>
                    <td className="px-4 py-3">
                      {item.is_published
                        ? <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Published</span>
                        : <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">Pending</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 items-center">
                        {canPublish && (
                          <button onClick={() => handlePublish(item)} title={item.is_published ? "Unpublish" : "Publish"}
                            className={`p-1.5 ${item.is_published ? "text-green-400 hover:text-red-400" : "text-slate-400 hover:text-green-400"}`}>
                            {item.is_published ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                        )}
                        <button onClick={() => setViewing(item)} title="View" className="p-1.5 text-slate-400 hover:text-blue-400"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-[#D4AF37]"><Edit2 className="w-4 h-4" /></button>
                        {(!staffOnly || (!item.is_published && item.submitted_by === user?.id)) && (
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewing && <ProductViewModal product={viewing} onClose={() => setViewing(null)} />}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
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
                  {allowedCategory ? (
                    <div className={inp + " opacity-60 cursor-not-allowed capitalize"}>{allowedCategory}</div>
                  ) : (
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                      <option value="import">Import</option>
                      <option value="export">Export</option>
                    </select>
                  )}
                </div>
                <F label="Type (e.g. Electronics)" name="type" form={form} setForm={setForm} />
                <F label="Price (e.g. Starting from $5,000)" name="price" form={form} setForm={setForm} />
                <F label="Rating (1-5)" name="rating" form={form} setForm={setForm} />
                <F label="Reviews count" name="reviews" form={form} setForm={setForm} />
                <F label="Order" name="order" form={form} setForm={setForm} />
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label className="text-sm text-slate-300">Active</label>
                </div>
              </div>
              {staffOnly && (
                <p className="text-xs text-yellow-400/80 bg-yellow-500/10 rounded-lg px-3 py-2">
                  Your product will be reviewed and published by your manager before it appears on the site.
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 transition-colors text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl hover:bg-[#D4AF37]/90 transition-colors text-sm">
                  {staffOnly ? (editing ? "Update" : "Submit for Review") : (editing ? "Update" : "Create")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
