import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Eye, EyeOff, Lock, ShieldCheck, UsersRound } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";
import { getAuthUser, isSuperAdmin } from "@/hooks/useAuth";
import { Unauthorized } from "./layout";

const ROLES = [
  { value: "import_staff",   label: "Import Staff" },
  { value: "export_staff",   label: "Export Staff" },
  { value: "import_manager", label: "Import Manager" },
  { value: "export_manager", label: "Export Manager" },
];

const ROLE_COLORS: Record<string, string> = {
  import_staff:   "bg-blue-500/20 text-blue-400",
  export_staff:   "bg-green-500/20 text-green-400",
  import_manager: "bg-purple-500/20 text-purple-400",
  export_manager: "bg-[#D4AF37]/20 text-[#D4AF37]",
};

const inp = "w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
const lbl = "text-xs text-slate-400 mb-1 block";

const emptyForm = {
  username: "", email: "", first_name: "", last_name: "",
  password: "", role: "import_staff", is_active: true,
};

// ── Re-auth modal ─────────────────────────────────────────────────────────────
function ReAuthModal({ onConfirmed, onCancel }: { onConfirmed: () => void; onCancel: () => void }) {
  const currentUser = getAuthUser();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/admin-panel/login/", {
        username: currentUser?.username,
        password,
      });
      onConfirmed();
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h3 className="text-lg font-bold text-white">Confirm Your Identity</h3>
          <p className="text-slate-400 text-sm mt-1">
            Re-enter your password to add a new user.
          </p>
        </div>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className={lbl}>Password for <span className="text-white">{currentUser?.username}</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPw ? "text" : "password"}
                required
                autoFocus
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                className={inp + " pl-10 pr-10"}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onCancel}
              className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl text-sm disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function UserManagement() {
  const currentUser = getAuthUser();
  if (!isSuperAdmin(currentUser)) return <Unauthorized />;

  const [users, setUsers]         = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showReAuth, setShowReAuth] = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<any>(null);
  const [form, setForm]           = useState(emptyForm);
  const [showPw, setShowPw]       = useState(false);
  const [saving, setSaving]       = useState(false);

  const fetchUsers = async () => {
    try {
      const r = await api.get("/api/admin-panel/users/");
      setUsers(r.data);
    } catch { toast.error("Failed to load users"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  // "Add User" clicked — show re-auth first
  const handleAddClick = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowReAuth(true);
  };

  // Re-auth passed — open the form
  const handleReAuthConfirmed = () => {
    setShowReAuth(false);
    setShowPw(false);
    setShowForm(true);
  };

  const openEdit = (u: any) => {
    setEditing(u);
    setForm({ username: u.username, email: u.email || "", first_name: u.first_name || "",
      last_name: u.last_name || "", password: "", role: u.role || "import_staff", is_active: u.is_active });
    setShowPw(false);
    setShowForm(true);
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/admin-panel/users/${id}/`);
      toast.success("User deleted");
      fetchUsers();
    } catch { toast.error("Failed to delete user"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { ...form };
      if (!payload.password) delete payload.password;
      if (editing) {
        await api.patch(`/api/admin-panel/users/${editing.id}/`, payload);
        toast.success("User updated");
      } else {
        await api.post("/api/admin-panel/users/", payload);
        toast.success("User created");
      }
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      const data = err.response?.data;
      toast.error(data ? Object.values(data).flat().join(" ") as string : "Failed to save");
    } finally { setSaving(false); }
  };

  const roleLabel = (role: string) => ROLES.find(r => r.value === role)?.label || role;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
            <UsersRound className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <p className="text-slate-400 text-sm">Manage staff accounts and roles</p>
          </div>
        </div>
        <button onClick={handleAddClick}
          className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-4 py-2.5 rounded-xl hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ROLES.map(r => {
          const count = users.filter(u => u.role === r.value).length;
          return (
            <div key={r.value} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{count}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${ROLE_COLORS[r.value]}`}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {["User", "Email", "Role", "Status", ""].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">No users yet.</td></tr>
              )}
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D4AF37] text-xs font-bold">{u.username?.[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.username}</p>
                        {(u.first_name || u.last_name) && (
                          <p className="text-slate-400 text-xs">{u.first_name} {u.last_name}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-xs">{u.email || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_COLORS[u.role] || "bg-slate-700 text-slate-300"}`}>
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(u)} className="p-1.5 text-slate-400 hover:text-[#D4AF37]">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id, u.username)} className="p-1.5 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Re-auth modal */}
      {showReAuth && (
        <ReAuthModal
          onConfirmed={handleReAuthConfirmed}
          onCancel={() => setShowReAuth(false)}
        />
      )}

      {/* Add / Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit User" : "New User"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Username *</label>
                  <input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className={inp} placeholder="e.g. john_doe" />
                </div>
                <div>
                  <label className={lbl}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inp} placeholder="john@company.com" />
                </div>
                <div>
                  <label className={lbl}>First Name</label>
                  <input value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Last Name</label>
                  <input value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} className={inp} />
                </div>
                <div className="col-span-2">
                  <label className={lbl}>{editing ? "New Password (leave blank to keep)" : "Password *"}</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} required={!editing}
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      className={inp + " pr-10"} placeholder={editing ? "Leave blank to keep current" : "Min 8 characters"} />
                    <button type="button" onClick={() => setShowPw(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className={lbl}>Role *</label>
                  <select required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inp}>
                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="is_active" checked={form.is_active}
                    onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[#D4AF37]" />
                  <label htmlFor="is_active" className="text-sm text-slate-300 cursor-pointer">Active (can log in)</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 text-sm">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? "Saving..." : editing ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
