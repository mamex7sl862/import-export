import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Globe, LayoutDashboard, MessageSquare, ClipboardList,
  LogOut, Menu, X, Building2, Star, Home, Info, Briefcase, Phone,
  BookOpen, ChevronDown, ChevronRight, Settings, LayoutTemplate,
  ShieldAlert, Package, HelpCircle, MessageCircle, UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { getAuthUser, canAccess, type AuthUser } from "@/hooks/useAuth";

// ── Role badge ────────────────────────────────────────────────────────────────
const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  superadmin:     { label: "Super Admin",     color: "bg-[#D4AF37]/20 text-[#D4AF37]" },
  import_manager: { label: "Import Manager",  color: "bg-purple-500/20 text-purple-400" },
  export_manager: { label: "Export Manager",  color: "bg-[#D4AF37]/20 text-[#D4AF37]" },
  import_staff:   { label: "Import Staff",    color: "bg-blue-500/20 text-blue-400" },
  export_staff:   { label: "Export Staff",    color: "bg-green-500/20 text-green-400" },
};

// ── Nav definitions ───────────────────────────────────────────────────────────
const mainNav = [
  { label: "Dashboard",        href: "/1/dashboard",        icon: LayoutDashboard, section: "dashboard"        },
  { label: "Contacts",         href: "/1/contacts",         icon: MessageSquare,   section: "contacts"         },
  { label: "Quotes",           href: "/1/quotes",           icon: ClipboardList,   section: "quotes"           },
  { label: "Products",         href: "/1/products",         icon: Package,         section: "products"         },
  { label: "User Management",  href: "/1/user-management",  icon: UsersRound,      section: "employees"        },
];

const pageNav = [
  { label: "Home Page",     href: "/1/pages/home",    icon: Home,          section: "pages" },
  { label: "About Page",    href: "/1/pages/about",   icon: Info,          section: "pages" },
  { label: "Services Page", href: "/1/pages/services",icon: Briefcase,     section: "pages" },
  { label: "Contact Page",  href: "/1/pages/contact", icon: Phone,         section: "pages" },
  { label: "Blog Page",     href: "/1/pages/blog",    icon: BookOpen,      section: "pages" },
  { label: "Footer",        href: "/1/pages/footer",  icon: LayoutTemplate,section: "pages" },
];

const globalNav = [
  { label: "Company Info",  href: "/1/settings/company",      icon: Building2,     section: "settings" },
  { label: "Hero Section",  href: "/1/settings/hero",         icon: Star,          section: "settings" },
  { label: "Social Media",  href: "/1/settings/social",       icon: Globe,         section: "settings" },
  { label: "FAQs",          href: "/1/settings/faqs",         icon: HelpCircle,    section: "settings" },
  { label: "Testimonials",  href: "/1/settings/testimonials", icon: MessageCircle, section: "settings" },
];

// ── Unauthorized page ─────────────────────────────────────────────────────────
export function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center">
      <ShieldAlert className="w-16 h-16 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
      <p className="text-slate-400 mb-6">You don't have permission to view this page.</p>
      <button onClick={() => navigate("/1/dashboard")}
        className="px-5 py-2.5 bg-[#D4AF37] text-[#101828] font-semibold rounded-xl text-sm">
        Back to Dashboard
      </button>
    </div>
  );
}

// ── Route guard ───────────────────────────────────────────────────────────────
export function RequireSection({ section, children }: { section: string; children: React.ReactNode }) {
  const user = getAuthUser();
  if (!canAccess(user, section)) return <Unauthorized />;
  return <>{children}</>;
}

// ── Main layout ───────────────────────────────────────────────────────────────
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const isPagesActive    = location.pathname.startsWith("/1/pages");
  const isSettingsActive = location.pathname.startsWith("/1/settings");
  const [pagesOpen,    setPagesOpen]    = useState(isPagesActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const u = getAuthUser();
    if (!token || !u) { navigate("/1", { replace: true }); return; }
    setUser(u);
  }, [navigate]);

  useEffect(() => { if (isPagesActive)    setPagesOpen(true);    }, [isPagesActive]);
  useEffect(() => { if (isSettingsActive) setSettingsOpen(true); }, [isSettingsActive]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    toast.success("Logged out successfully");
    navigate("/1");
  };

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
    const active = location.pathname === href;
    return (
      <Link to={href} onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
          active ? "bg-[#D4AF37] text-[#101828]" : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}>
        <Icon className="w-4 h-4 flex-shrink-0" />
        {label}
      </Link>
    );
  };

  const GroupToggle = ({ label, icon: Icon, open, onToggle, active }: any) => (
    <button onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? "text-[#D4AF37]" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  );

  // Filter nav items by role
  const visibleMain   = mainNav.filter(n => canAccess(user, n.section));
  const visiblePages  = pageNav.filter(n => canAccess(user, n.section));
  const visibleGlobal = globalNav.filter(n => canAccess(user, n.section));

  const allNav = [...mainNav, ...pageNav, ...globalNav];
  const currentLabel = allNav.find(n => n.href === location.pathname)?.label || "Admin Panel";

  const roleMeta = ROLE_LABELS[user?.role ?? ""] ?? { label: "Staff", color: "bg-slate-700 text-slate-300" };

  return (
    <div className="min-h-screen bg-[#101828] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-auto`}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700/50 flex-shrink-0">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#101828]" />
          </div>
          <span className="font-bold text-white">TradeFlow Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {visibleMain.map(item => <NavLink key={item.href} {...item} />)}

          {/* Pages group — only if user can access pages */}
          {visiblePages.length > 0 && (
            <div className="pt-2">
              <GroupToggle label="Pages" icon={Home} open={pagesOpen}
                onToggle={() => setPagesOpen(o => !o)} active={isPagesActive} />
              {pagesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                  {visiblePages.map(item => <NavLink key={item.href} {...item} />)}
                </div>
              )}
            </div>
          )}

          {/* Global Settings — only superadmin */}
          {visibleGlobal.length > 0 && (
            <div className="pt-1">
              <GroupToggle label="Global Settings" icon={Settings} open={settingsOpen}
                onToggle={() => setSettingsOpen(o => !o)} active={isSettingsActive} />
              {settingsOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-700/50 pl-3">
                  {visibleGlobal.map(item => <NavLink key={item.href} {...item} />)}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User info + logout */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#D4AF37] text-sm font-bold">
                {user?.username?.[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.username ?? "Admin"}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleMeta.color}`}>
                {roleMeta.label}
              </span>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-900/50 border-b border-slate-700/50 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-white font-semibold">{currentLabel}</h1>
          {/* Role badge in header */}
          <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium hidden sm:inline-flex ${roleMeta.color}`}>
            {roleMeta.label}
          </span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
