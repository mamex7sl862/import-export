import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Globe, LayoutDashboard, MessageSquare, ClipboardList,
  LogOut, Menu, X, Building2, Star, Home, Info, Briefcase, Phone,
  BookOpen, ChevronDown, ChevronRight, Settings, LayoutTemplate,
} from "lucide-react";
import { toast } from "sonner";

const mainNav = [
  { label: "Dashboard", href: "/1/dashboard", icon: LayoutDashboard },
  { label: "Contacts", href: "/1/contacts", icon: MessageSquare },
  { label: "Quotes", href: "/1/quotes", icon: ClipboardList },
];

// Each entry = one page in the sidebar, grouping related settings + content
const pageNav = [
  { label: "Home Page", href: "/1/pages/home", icon: Home },
  { label: "About Page", href: "/1/pages/about", icon: Info },
  { label: "Services Page", href: "/1/pages/services", icon: Briefcase },
  { label: "Contact Page", href: "/1/pages/contact", icon: Phone },
  { label: "Blog Page", href: "/1/pages/blog", icon: BookOpen },
  { label: "Footer", href: "/1/pages/footer", icon: LayoutTemplate },
];

const globalNav = [
  { label: "Company Info", href: "/1/settings/company", icon: Building2 },
  { label: "Hero Section", href: "/1/settings/hero", icon: Star },
  { label: "Social Media", href: "/1/settings/social", icon: Globe },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPagesActive = location.pathname.startsWith("/1/pages");
  const isSettingsActive = location.pathname.startsWith("/1/settings");
  const [pagesOpen, setPagesOpen] = useState(isPagesActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/1");
  }, [navigate]);

  useEffect(() => { if (isPagesActive) setPagesOpen(true); }, [isPagesActive]);
  useEffect(() => { if (isSettingsActive) setSettingsOpen(true); }, [isSettingsActive]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    toast.success("Logged out successfully");
    navigate("/1");
  };

  const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

  const NavLink = ({ href, icon: Icon, label, indent = false }: { href: string; icon: any; label: string; indent?: boolean }) => {
    const active = location.pathname === href;
    return (
      <Link to={href} onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${indent ? "ml-3" : ""} ${
          active ? "bg-[#D4AF37] text-[#101828]" : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}>
        <Icon className="w-4 h-4 flex-shrink-0" />
        {label}
      </Link>
    );
  };

  const GroupToggle = ({ label, icon: Icon, open, onToggle, active }: any) => (
    <button onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "text-[#D4AF37]" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  );

  const allNav = [...mainNav, ...pageNav, ...globalNav];
  const currentLabel = allNav.find(n => n.href === location.pathname)?.label || "Admin Panel";

  return (
    <div className="min-h-screen bg-[#101828] flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700/50 flex-shrink-0">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#101828]" />
          </div>
          <span className="font-bold text-white">TradeFlow Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400"><X className="w-5 h-5" /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* Main items */}
          {mainNav.map(item => <NavLink key={item.href} {...item} />)}

          {/* Pages group */}
          <div className="pt-2">
            <GroupToggle label="Pages" icon={Home} open={pagesOpen} onToggle={() => setPagesOpen(o => !o)} active={isPagesActive} />
            {pagesOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                {pageNav.map(item => <NavLink key={item.href} {...item} />)}
              </div>
            )}
          </div>

          {/* Global Settings group */}
          <div className="pt-1">
            <GroupToggle label="Global Settings" icon={Settings} open={settingsOpen} onToggle={() => setSettingsOpen(o => !o)} active={isSettingsActive} />
            {settingsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                {globalNav.map(item => <NavLink key={item.href} {...item} />)}
              </div>
            )}
          </div>
        </nav>

        {/* User & Logout */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-sm font-bold">{user.username?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <span className="text-sm text-white font-medium">{user.username || "Admin"}</span>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-900/50 border-b border-slate-700/50 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white"><Menu className="w-5 h-5" /></button>
          <h1 className="text-white font-semibold">{currentLabel}</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto"><Outlet /></main>
      </div>
    </div>
  );
}
