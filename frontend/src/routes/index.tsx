import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "@/pages/client/home/page";
import MainLayout from "@/pages/client/layouts/main-layout";
import NotFoundPage from "@/pages/client/not-found";
import AboutPage from "@/pages/client/about/page";
import ServicesPage from "@/pages/client/services/page";
import ContactPage from "@/pages/client/contact/page";
import BlogPage from "@/pages/client/blog/page";
import BlogDetailPage from "@/pages/client/blog/detail";

import AdminLogin from "@/pages/admin/login";
import AdminLayout, { RequireSection } from "@/pages/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminContacts from "@/pages/admin/contacts";
import AdminQuotes from "@/pages/admin/quotes";
import AdminEmployees from "@/pages/admin/employees";
import AdminProducts from "@/pages/admin/products";
import UserManagement from "@/pages/admin/user-management";

// Page admin views
import HomeAdminPage from "@/pages/admin/pages/home-page";
import AboutAdminPage from "@/pages/admin/pages/about-page";
import ServicesAdminPage from "@/pages/admin/pages/services-page";
import ContactAdminPage from "@/pages/admin/pages/contact-page";
import BlogAdminPage from "@/pages/admin/pages/blog-page";
import FooterAdminPage from "@/pages/admin/pages/footer-page";

// Global settings
import SettingsCompany from "@/pages/admin/settings/company";
import SettingsHero from "@/pages/admin/settings/hero";
import SettingsSocial from "@/pages/admin/settings/social";
import SettingsFAQs from "@/pages/admin/settings/faqs";
import SettingsTestimonials from "@/pages/admin/settings/testimonials";

const R = ({ section, el }: { section: string; el: React.ReactNode }) => (
  <RequireSection section={section}>{el}</RequireSection>
);

const Routes = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      path: "/",
      children: [
        { index: true, element: <HomePage /> },
        { path: "/about",        element: <AboutPage /> },
        { path: "/services",     element: <ServicesPage /> },
        { path: "/contact",      element: <ContactPage /> },
        { path: "/blog",         element: <BlogPage /> },
        { path: "/blog/:slug",   element: <BlogDetailPage /> },
        { path: "*",             element: <NotFoundPage /> },
      ],
    },
    { path: "/1", element: <AdminLogin /> },
    {
      path: "/1",
      element: <AdminLayout />,
      children: [
        // All roles
        { path: "dashboard",  element: <R section="dashboard"  el={<AdminDashboard />} /> },
        { path: "contacts",   element: <R section="contacts"   el={<AdminContacts />} /> },
        { path: "quotes",     element: <R section="quotes"     el={<AdminQuotes />} /> },
        { path: "products",         element: <R section="products"   el={<AdminProducts />} /> },
        { path: "user-management",  element: <R section="employees"  el={<UserManagement />} /> },

        // Superadmin only
        { path: "employees",  element: <R section="employees"  el={<AdminEmployees />} /> },

        // Manager + superadmin
        { path: "pages/home",     element: <R section="pages" el={<HomeAdminPage />} /> },
        { path: "pages/about",    element: <R section="pages" el={<AboutAdminPage />} /> },
        { path: "pages/services", element: <R section="pages" el={<ServicesAdminPage />} /> },
        { path: "pages/contact",  element: <R section="pages" el={<ContactAdminPage />} /> },
        { path: "pages/blog",     element: <R section="pages" el={<BlogAdminPage />} /> },
        { path: "pages/footer",   element: <R section="pages" el={<FooterAdminPage />} /> },

        // Superadmin only
        { path: "settings/company",      element: <R section="settings" el={<SettingsCompany />} /> },
        { path: "settings/hero",         element: <R section="settings" el={<SettingsHero />} /> },
        { path: "settings/social",       element: <R section="settings" el={<SettingsSocial />} /> },
        { path: "settings/faqs",         element: <R section="settings" el={<SettingsFAQs />} /> },
        { path: "settings/testimonials", element: <R section="settings" el={<SettingsTestimonials />} /> },

        // Legacy redirects
        { path: "blog",     element: <Navigate to="/1/pages/blog"     replace /> },
        { path: "users",    element: <Navigate to="/1/employees"       replace /> },
        { path: "content",  element: <Navigate to="/1/pages/services"  replace /> },
        { path: "settings", element: <Navigate to="/1/settings/company" replace /> },
      ],
    },
  ]);
};

export default Routes;
