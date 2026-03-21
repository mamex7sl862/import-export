// Importing Hooks👇🏼
import { useRoutes } from "react-router-dom";

// Importing pages using lazy render 👇🏼
import HomePage from "@/pages/client/home/page";
import MainLayout from "@/pages/client/layouts/main-layout";
import NotFoundPage from "@/pages/client/not-found";
import AboutPage from "@/pages/client/about/page";
import ServicesPage from "@/pages/client/services/page";
import ContactPage from "@/pages/client/contact/page";
import BlogPage from "@/pages/client/blog/page";
import AdminLogin from "@/pages/admin/login";
import AdminLayout from "@/pages/admin/layout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminBlog from "@/pages/admin/blog";
import AdminContacts from "@/pages/admin/contacts";
import AdminQuotes from "@/pages/admin/quotes";
import AdminSiteSettings from "@/pages/admin/site-settings";

// Config for all routes👇🏼
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
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    // Admin routes
    { path: "/1", element: <AdminLogin /> },
    {
      path: "/1",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "blog", element: <AdminBlog /> },
        { path: "contacts", element: <AdminContacts /> },
        { path: "quotes", element: <AdminQuotes /> },
        { path: "settings", element: <AdminSiteSettings /> },
      ],
    },
  ]);
};

export default Routes;
