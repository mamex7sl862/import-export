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
import AdminLayout from "@/pages/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminContacts from "@/pages/admin/contacts";
import AdminQuotes from "@/pages/admin/quotes";

// Unified page admin views
import HomeAdminPage from "@/pages/admin/pages/home-page";
import AboutAdminPage from "@/pages/admin/pages/about-page";
import ServicesAdminPage from "@/pages/admin/pages/services-page";
import ContactAdminPage from "@/pages/admin/pages/contact-page";
import BlogAdminPage from "@/pages/admin/pages/blog-page";

// Global settings
import SettingsCompany from "@/pages/admin/settings/company";
import SettingsHero from "@/pages/admin/settings/hero";
import SettingsSocial from "@/pages/admin/settings/social";

const Routes = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      path: "/",
      children: [
        { index: true, element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/services", element: <ServicesPage /> },
        { path: "/contact", element: <ContactPage /> },
        { path: "/blog", element: <BlogPage /> },
        { path: "/blog/:slug", element: <BlogDetailPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    { path: "/1", element: <AdminLogin /> },
    {
      path: "/1",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "blog", element: <Navigate to="/1/pages/blog" replace /> },
        { path: "contacts", element: <AdminContacts /> },
        { path: "quotes", element: <AdminQuotes /> },

        // Unified page admin routes
        { path: "pages/home", element: <HomeAdminPage /> },
        { path: "pages/about", element: <AboutAdminPage /> },
        { path: "pages/services", element: <ServicesAdminPage /> },
        { path: "pages/contact", element: <ContactAdminPage /> },
        { path: "pages/blog", element: <BlogAdminPage /> },

        // Global settings
        { path: "settings/company", element: <SettingsCompany /> },
        { path: "settings/hero", element: <SettingsHero /> },
        { path: "settings/social", element: <SettingsSocial /> },

        // Legacy redirects
        { path: "content", element: <Navigate to="/1/pages/services" replace /> },
        { path: "settings", element: <Navigate to="/1/settings/company" replace /> },
      ],
    },
  ]);
};

export default Routes;
