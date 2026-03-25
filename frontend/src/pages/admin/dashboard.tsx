import { useEffect, useState } from "react";
import {
  FileText, MessageSquare, ClipboardList, TrendingUp,
  Package, CheckCircle, Clock, Users,
} from "lucide-react";
import { api } from "@/hooks/api";
import { getAuthUser, isStaffOnly, isManager, isSuperAdmin, getAllowedProductCategory } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const user = getAuthUser();
  const staffOnly = isStaffOnly(user);
  const managerOrAbove = isManager(user);
  const superAdmin = isSuperAdmin(user);
  const allowedCategory = getAllowedProductCategory(user);

  const [products, setProducts]         = useState<any[]>([]);
  const [contacts, setContacts]         = useState<any[]>([]);
  const [quotes, setQuotes]             = useState<any[]>([]);
  const [blogs, setBlogs]               = useState(0);
  const [users, setUsers]               = useState(0);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetches: Promise<any>[] = [
      api.get("/api/content/products/").then(r => setProducts(r.data.results || r.data)).catch(() => {}),
    ];
    if (managerOrAbove) {
      fetches.push(
        api.get("/api/contacts/messages/").then(r => setContacts(r.data.results || r.data)).catch(() => {}),
        api.get("/api/quotes/").then(r => setQuotes(r.data.results || r.data)).catch(() => {}),
      );
    }
    if (superAdmin) {
      fetches.push(
        api.get("/api/blog/posts/").then(r => setBlogs(r.data.count || (r.data.results || r.data).length || 0)).catch(() => {}),
        api.get("/api/admin-panel/users/").then(r => setUsers(r.data.length || 0)).catch(() => {}),
      );
    }
    Promise.all(fetches).finally(() => setLoading(false));
  }, []);

  const myProducts   = staffOnly ? products.filter(p => p.submitted_by === user?.id) : products;
  const published    = myProducts.filter(p => p.is_published).length;
  const pending      = myProducts.filter(p => !p.is_published).length;
  const recentProducts = myProducts.slice(0, 5);

  // Build stat cards based on role
  const cards = [
    ...(staffOnly ? [
      { label: `My ${allowedCategory} Products`, value: myProducts.length, icon: Package,       color: "from-[#D4AF37] to-yellow-600" },
      { label: "Published",                       value: published,          icon: CheckCircle,   color: "from-green-500 to-emerald-500" },
      { label: "Pending Review",                  value: pending,            icon: Clock,         color: "from-orange-500 to-amber-500"  },
    ] : []),
    ...(managerOrAbove && !superAdmin ? [
      { label: `${allowedCategory ? (allowedCategory.charAt(0).toUpperCase() + allowedCategory.slice(1) + ' ') : ''}Products`, value: products.length, icon: Package,       color: "from-[#D4AF37] to-yellow-600" },
      { label: "Published",                       value: products.filter(p => p.is_published).length,  icon: CheckCircle,   color: "from-green-500 to-emerald-500" },
      { label: "Pending Review",                  value: products.filter(p => !p.is_published).length, icon: Clock,         color: "from-orange-500 to-amber-500"  },
      { label: "Contact Messages",                value: contacts.length,    icon: MessageSquare, color: "from-blue-500 to-cyan-500"     },
      { label: "Quote Requests",                  value: quotes.length,      icon: ClipboardList, color: "from-purple-500 to-pink-500"   },
    ] : []),
    ...(superAdmin ? [
      { label: "Total Products",    value: products.length,                                icon: Package,       color: "from-[#D4AF37] to-yellow-600" },
      { label: "Published",         value: products.filter(p => p.is_published).length,   icon: CheckCircle,   color: "from-green-500 to-emerald-500" },
      { label: "Contact Messages",  value: contacts.length,                                icon: MessageSquare, color: "from-blue-500 to-cyan-500"     },
      { label: "Quote Requests",    value: quotes.length,                                  icon: ClipboardList, color: "from-purple-500 to-pink-500"   },
      { label: "Blog Posts",        value: blogs,                                          icon: FileText,      color: "from-indigo-500 to-violet-500"  },
      { label: "Staff Users",       value: users,                                          icon: Users,         color: "from-rose-500 to-pink-500"      },
      { label: "Pending Review",    value: products.filter(p => !p.is_published).length,  icon: Clock,         color: "from-orange-500 to-amber-500"   },
      { label: "Total Interactions",value: contacts.length + quotes.length,               icon: TrendingUp,    color: "from-teal-500 to-cyan-500"      },
    ] : []),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back, <span className="text-white font-medium">{user?.username}</span>
        </p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(staffOnly ? 3 : superAdmin ? 8 : 5)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-slate-400">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom panels — role-aware */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* My / All Products */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-4">
            {staffOnly ? "My Recent Submissions" : "Recent Products"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left pb-2 text-xs text-slate-400 font-medium">Product</th>
                  <th className="text-left pb-2 text-xs text-slate-400 font-medium">Category</th>
                  {!staffOnly && <th className="text-left pb-2 text-xs text-slate-400 font-medium">Created by</th>}
                  {managerOrAbove && <th className="text-left pb-2 text-xs text-slate-400 font-medium">Published by</th>}
                  <th className="text-left pb-2 text-xs text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400 text-sm">No products yet.</td></tr>
                )}
                {recentProducts.map((p: any) => (
                  <tr key={p.id} className="border-b border-slate-700/20 last:border-0">
                    <td className="py-2.5 pr-4">
                      <p className="text-white font-medium truncate max-w-[160px]">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.type}</p>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.category === "import" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                        {p.category}
                      </span>
                    </td>
                    {!staffOnly && (
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#D4AF37] text-[10px] font-bold">
                              {p.submitted_by_username?.[0]?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                          <span className="text-xs text-slate-300">{p.submitted_by_username ?? "—"}</span>
                        </div>
                      </td>
                    )}
                    {managerOrAbove && (
                      <td className="py-2.5 pr-4">
                        <span className="text-xs text-slate-300">{p.published_by_username ?? "—"}</span>
                      </td>
                    )}
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.is_published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {p.is_published ? "Published" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contacts — managers/superadmin only */}
        {managerOrAbove && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-base font-semibold text-white mb-4">Recent Contacts</h3>
            <div className="space-y-2">
              {contacts.length === 0 && <p className="text-slate-400 text-sm">No contacts yet.</p>}
              {contacts.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    c.status === "new"  ? "bg-green-500/20 text-green-400" :
                    c.status === "read" ? "bg-blue-500/20 text-blue-400"  :
                    "bg-slate-600/50 text-slate-300"
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes — managers/superadmin only */}
        {managerOrAbove && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-base font-semibold text-white mb-4">Recent Quote Requests</h3>
            <div className="space-y-2">
              {quotes.length === 0 && <p className="text-slate-400 text-sm">No quotes yet.</p>}
              {quotes.slice(0, 5).map((q: any) => (
                <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{q.email}</p>
                    <p className="text-xs text-slate-400">{q.origin_country} → {q.destination_country}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    q.status === "pending"  ? "bg-yellow-500/20 text-yellow-400" :
                    q.status === "reviewed" ? "bg-blue-500/20 text-blue-400"    :
                    q.status === "accepted" ? "bg-green-500/20 text-green-400"  :
                    "bg-slate-600/50 text-slate-300"
                  }`}>{q.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Staff: pending products needing manager attention */}
        {staffOnly && pending > 0 && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-base font-semibold text-white mb-4">Awaiting Manager Review</h3>
            <div className="space-y-2">
              {myProducts.filter(p => !p.is_published).slice(0, 5).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{p.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <span className="text-[#D4AF37] text-[10px] font-bold">
                        {p.submitted_by_username?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{p.submitted_by_username ?? "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
