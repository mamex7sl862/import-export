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

// Config for all routes👇🏼
const Routes = () => {
  // const { is } = useAuth();

  return useRoutes([
    {
      element: <MainLayout />,
      path: "/",
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/services",
          element: <ServicesPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/blog",
          element: <BlogPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};

export default Routes;
