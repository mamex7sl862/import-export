import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Globe, LayoutDashboard, FileText, MessageSquare, ClipboardList, LogOut, Menu, X, Settings, Layers } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/1/dashboard", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/1/blog", icon: FileText },
  { label: "Contacts", href: "/1/contacts", icon: MessageSquare },
  { label: "Quotes", href: "/1/quotes", icon: ClipboardList },
  { label: "Content", href: "/1/content", icon: Layers },
  { label: "Site Settings", href: "/1/settings", icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/1");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    toast.success("Logged out successfully");
    navigate("/1");
  };

  const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

  return (
    <div className="min-h-screen bg-[#101828] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700/50">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#101828]" />
          </div>
          <span className="font-bold text-white">TradeFlow Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-[#D4AF37] text-[#101828]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-sm font-bold">{user.username?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <span className="text-sm text-white font-medium">{user.username || "Admin"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-slate-900/50 border-b border-slate-700/50 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-white font-semibold">
            {navItems.find((n) => n.href === location.pathname)?.label || "Admin Panel"}
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
