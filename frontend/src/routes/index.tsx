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
import AdminBlog from "@/pages/admin/blog";
import AdminContacts from "@/pages/admin/contacts";
import AdminQuotes from "@/pages/admin/quotes";
import AdminContent from "@/pages/admin/content";
import SettingsCompany from "@/pages/admin/settings/company";
import SettingsHero from "@/pages/admin/settings/hero";
import SettingsStats from "@/pages/admin/settings/stats";
import SettingsAbout from "@/pages/admin/settings/about";
import SettingsServices from "@/pages/admin/settings/services";
import SettingsQuote from "@/pages/admin/settings/quote";
import SettingsContact from "@/pages/admin/settings/contact";
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
        { path: "blog", element: <AdminBlog /> },
        { path: "contacts", element: <AdminContacts /> },
        { path: "quotes", element: <AdminQuotes /> },
        { path: "content", element: <AdminContent /> },
        // redirect old /1/settings to company page
        { path: "settings", element: <Navigate to="/1/settings/company" replace /> },
        { path: "settings/company", element: <SettingsCompany /> },
        { path: "settings/hero", element: <SettingsHero /> },
        { path: "settings/stats", element: <SettingsStats /> },
        { path: "settings/about", element: <SettingsAbout /> },
        { path: "settings/services", element: <SettingsServices /> },
        { path: "settings/quote", element: <SettingsQuote /> },
        { path: "settings/contact", element: <SettingsContact /> },
        { path: "settings/social", element: <SettingsSocial /> },
      ],
    },
  ]);
};

export default Routes;
