import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import TanstackQueryProvider from "./providers/tanstack-query-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/providers/language-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TanstackQueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="tradeflow-theme">
          <LanguageProvider>
            <Provider store={store}>
              <App />
              <Toaster />
            </Provider>
          </LanguageProvider>
        </ThemeProvider>
      </TanstackQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
