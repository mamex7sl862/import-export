import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2, UserCog, Eye, EyeOff } from "lucide-react";
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

export default function AdminEmployees() {
  const currentUser = getAuthUser();

  // Only superadmin can manage employees
  if (!isSuperAdmin(currentUser)) return <Unauthorized />;

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<any>(null);
  const [form, setForm]           = useState(emptyForm);
  const [showPw, setShowPw]       = useState(false);
  const [saving, setSaving]       = useState(false);

  const fetchEmployees = async () => {
    try {
      const r = await api.get("/api/admin-panel/users/");
      setEmployees(r.data);
    } catch {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowPw(false); setShowForm(true); };
  const openEdit   = (emp: any) => {
    setEditing(emp);
    setForm({ username: emp.username, email: emp.email || "", first_name: emp.first_name || "",
      last_name: emp.last_name || "", password: "", role: emp.role || "import_staff", is_active: emp.is_active });
    setShowPw(false); setShowForm(true);
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Delete employee "${username}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/admin-panel/users/${id}/`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch { toast.error("Failed to delete employee"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { ...form };
      if (!payload.password) delete payload.password;
      if (editing) {
        await api.patch(`/api/admin-panel/users/${editing.id}/`, payload);
        toast.success("Employee updated");
      } else {
        await api.post("/api/admin-panel/users/", payload);
        toast.success("Employee created");
      }
      setShowForm(false);
      fetchEmployees();
    } catch (err: any) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(" ") : "Failed to save";
      toast.error(msg as string);
    } finally { setSaving(false); }
  };

  const roleLabel = (role: string) => ROLES.find(r => r.value === role)?.label || role;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Employees</h2>
          <p className="text-slate-400 text-sm mt-1">Manage employee accounts and their roles</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-4 py-2.5 rounded-xl hover:bg-[#D4AF37]/90 text-sm">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-2">
        {ROLES.map(r => (
          <span key={r.value} className={`text-xs px-3 py-1 rounded-full font-medium ${ROLE_COLORS[r.value]}`}>
            {r.label}
          </span>
        ))}
      </div>

      {/* Permissions info */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">Role Permissions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { role: "Import Staff",   color: ROLE_COLORS.import_staff,   perms: ["Dashboard", "Contacts", "Quotes"] },
            { role: "Export Staff",   color: ROLE_COLORS.export_staff,   perms: ["Dashboard", "Contacts", "Quotes"] },
            { role: "Import Manager", color: ROLE_COLORS.import_manager, perms: ["Dashboard", "Contacts", "Quotes", "All Pages"] },
            { role: "Export Manager", color: ROLE_COLORS.export_manager, perms: ["Dashboard", "Contacts", "Quotes", "All Pages"] },
          ].map(item => (
            <div key={item.role} className="bg-slate-900/50 rounded-lg p-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.color} mb-2 inline-block`}>{item.role}</span>
              <ul className="space-y-1 mt-2">
                {item.perms.map(p => (
                  <li key={p} className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
                {["Employee", "Email", "Role", "Status", ""].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">No employees yet. Add one above.</td></tr>
              )}
              {employees.map(emp => (
                <tr key={emp.id} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D4AF37] text-xs font-bold">{emp.username?.[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{emp.username}</p>
                        {(emp.first_name || emp.last_name) && (
                          <p className="text-slate-400 text-xs">{emp.first_name} {emp.last_name}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{emp.email || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_COLORS[emp.role] || "bg-slate-700 text-slate-300"}`}>
                      {roleLabel(emp.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${emp.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {emp.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(emp)} className="p-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(emp.id, emp.username)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
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

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-bold text-white">{editing ? "Edit Employee" : "New Employee"}</h3>
              </div>
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
                  <label className={lbl}>{editing ? "New Password (leave blank to keep current)" : "Password *"}</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} required={!editing}
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      className={inp + " pr-10"} placeholder={editing ? "Leave blank to keep current" : "Min 8 characters"} />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
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
                  {saving ? "Saving..." : editing ? "Update Employee" : "Create Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
