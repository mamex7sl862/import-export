import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.products": "Products",
    "nav.blog": "Blog",
    "nav.contact": "Contact Us",
    "nav.contactBtn": "Contact Us",

    // Hero
    "hero.badge": "TRUSTED BY 5,000+ GLOBAL ENTERPRISES",
    "hero.cta_primary": "Request a Quote",
    "hero.cta_secondary": "Our Products",

    // Products
    "products.badge": "PRODUCT CATALOG",
    "products.title": "Premium Import Solutions",
    "products.subtitle": "Discover our curated selection of high-quality products from trusted global suppliers",
    "products.tab_all": "All",
    "products.tab_import": "Import",
    "products.tab_export": "Export",
    "products.quote": "Request Quote",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive import-export solutions designed to streamline your global trade operations",
    "services.browse_products": "Browse Our Products",
    "services.our_products": "Our Products",
    "services.search_placeholder": "Search products...",
    "services.hl_fast": "Fast Shipping",
    "services.hl_fast_desc": "Delivery in 7-14 days",
    "services.hl_secure": "Secure Payments",
    "services.hl_secure_desc": "SSL encrypted transactions",
    "services.hl_quality": "Quality Verified",
    "services.hl_quality_desc": "All products inspected",
    "services.hl_support": "24/7 Support",
    "services.hl_support_desc": "Always here to help",
    "services.feat_fast": "Fast Processing",
    "services.feat_fast_desc": "Quick turnaround on all shipments",
    "services.feat_secure": "Secure & Safe",
    "services.feat_secure_desc": "Full insurance coverage available",
    "services.feat_global": "Global Network",
    "services.feat_global_desc": "Presence in 50+ countries",
    "services.feat_support": "24/7 Support",
    "services.feat_support_desc": "Always here when you need us",

    // About
    "about.title": "About Us",
    "about.badge": "Our Story",
    "about.page_title": "About Us",

    // Blog
    "blog.title": "Our Blog",
    "blog.badge": "Insights & Updates",
    "blog.read_more": "Read More",

    // Contact
    "contact.title": "Get in Touch",
    "contact.badge": "Contact Us",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.company": "Company Name",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.subject": "Subject",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.links": "Quick Links",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.blog": "Blog & News",
    "footer.contact_us": "Contact Us",
    "footer.careers": "Careers",
    "footer.partners": "Partners",
    "footer.svc_ocean": "Ocean Freight",
    "footer.svc_air": "Air Freight",
    "footer.svc_customs": "Customs Brokerage",
    "footer.svc_warehouse": "Warehousing",
    "footer.svc_supply": "Supply Chain",
    "footer.newsletter_title": "Stay Ahead in Global Trade",
    "footer.newsletter_sub": "Subscribe to our newsletter for industry insights, market trends, and exclusive logistics updates.",
    "footer.newsletter_placeholder": "Enter your email address",
    "footer.subscribe": "Subscribe",

    // Quote
    "quote.title": "Request a Custom Quote",
    "quote.badge": "Get Started",
    "quote.submit": "Request Quote",
    "quote.submitting": "Submitting...",
    "quote.form_title": "Quote Request Form",
    "quote.form_sub": "Fill in your shipment details below",
    "quote.email": "Email Address",
    "quote.phone": "Phone Number",
    "quote.company": "Company Name",
    "quote.company_placeholder": "Your Company (optional)",
    "quote.origin": "Origin Country",
    "quote.destination": "Destination Country",
    "quote.cargo": "Cargo Type",
    "quote.cargo_placeholder": "Select cargo type",
    "quote.cargo_general": "General Cargo",
    "quote.cargo_perishable": "Perishable Goods",
    "quote.cargo_hazardous": "Hazardous Materials",
    "quote.cargo_oversized": "Oversized Freight",
    "quote.cargo_electronics": "Electronics",
    "quote.cargo_other": "Other",
    "quote.weight": "Approximate Weight (kg)",
    "quote.info": "Additional Information",
    "quote.info_placeholder": "Any special requirements or additional details...",

    // Stats
    "stats.years": "Years Experience",
    "stats.countries": "Countries Served",
    "stats.shipments": "Shipments Delivered",
    "stats.success": "Success Rate",
    "stats.partners": "Active Partners",

    // Testimonials
    "testimonials.badge": "CLIENT SUCCESS STORIES",
    "testimonials.title": "Trusted by Global Leaders",

    // General
    "general.loading": "Loading...",
    "general.error": "Something went wrong",
    "general.readMore": "Read More",
    "general.learnMore": "Learn More",
    "general.viewAll": "View All",
    "lang.toggle": "አማርኛ",
  },
  am: {
    // Nav
    "nav.home": "መነሻ",
    "nav.about": "ስለ እኛ",
    "nav.services": "አገልግሎቶች",
    "nav.products": "ምርቶች",
    "nav.blog": "ብሎግ",
    "nav.contact": "ያግኙን",
    "nav.contactBtn": "ያግኙን",

    // Hero
    "hero.badge": "በ5,000+ ዓለም አቀፍ ድርጅቶች የሚታመን",
    "hero.cta_primary": "ዋጋ ጠይቅ",
    "hero.cta_secondary": "ምርቶቻችን",

    // Products
    "products.badge": "የምርት ካታሎግ",
    "products.title": "ምርጥ የማስመጣት መፍትሄዎች",
    "products.subtitle": "ከታመኑ ዓለም አቀፍ አቅራቢዎች የተዘጋጀ ምርጥ ምርቶቻችንን ያግኙ",
    "products.tab_all": "ሁሉም",
    "products.tab_import": "ማስመጣት",
    "products.tab_export": "መላክ",
    "products.quote": "ዋጋ ጠይቅ",

    // Services
    "services.title": "አገልግሎቶቻችን",
    "services.subtitle": "ዓለም አቀፍ የንግድ ሥራዎን ለማቀላጠፍ የተዘጋጁ ሁሉን አቀፍ የማስመጣት-መላክ መፍትሄዎች",
    "services.browse_products": "ምርቶቻችንን ያስሱ",
    "services.our_products": "ምርቶቻችን",
    "services.search_placeholder": "ምርቶችን ይፈልጉ...",
    "services.hl_fast": "ፈጣን ማጓጓዝ",
    "services.hl_fast_desc": "በ7-14 ቀናት ውስጥ ማድረስ",
    "services.hl_secure": "ደህንነቱ የተጠበቀ ክፍያ",
    "services.hl_secure_desc": "SSL ምስጠራ ግብይቶች",
    "services.hl_quality": "ጥራት የተረጋገጠ",
    "services.hl_quality_desc": "ሁሉም ምርቶች ተፈትሸዋል",
    "services.hl_support": "24/7 ድጋፍ",
    "services.hl_support_desc": "ሁልጊዜ ለመርዳት ዝግጁ",
    "services.feat_fast": "ፈጣን ሂደት",
    "services.feat_fast_desc": "ለሁሉም ጭነቶች ፈጣን አፈጻጸም",
    "services.feat_secure": "ደህንነቱ የተጠበቀ",
    "services.feat_secure_desc": "ሙሉ የኢንሹራንስ ሽፋን ይገኛል",
    "services.feat_global": "ዓለም አቀፍ አውታር",
    "services.feat_global_desc": "በ50+ ሀገሮች ውስጥ ተገኝነት",
    "services.feat_support": "24/7 ድጋፍ",
    "services.feat_support_desc": "ሲፈልጉን ሁልጊዜ ዝግጁ",

    // About
    "about.title": "ስለ እኛ",
    "about.badge": "ታሪካችን",
    "about.page_title": "ስለ እኛ",

    // Blog
    "blog.title": "ብሎጋችን",
    "blog.badge": "ዜናዎች እና ዝማኔዎች",
    "blog.read_more": "ተጨማሪ ያንብቡ",

    // Contact
    "contact.title": "ያግኙን",
    "contact.badge": "ያግኙን",
    "contact.name": "ሙሉ ስም",
    "contact.email": "የኢሜይል አድራሻ",
    "contact.phone": "የስልክ ቁጥር",
    "contact.company": "የድርጅት ስም",
    "contact.message": "መልዕክት",
    "contact.send": "መልዕክት ላክ",
    "contact.subject": "ርዕሰ ጉዳይ",

    // Footer
    "footer.rights": "መብቱ በሕግ የተጠበቀ ነው።",
    "footer.links": "ፈጣን አገናኞች",
    "footer.services": "አገልግሎቶች",
    "footer.contact": "ያግኙን",
    "footer.company": "ድርጅት",
    "footer.about": "ስለ እኛ",
    "footer.blog": "ብሎግ እና ዜናዎች",
    "footer.contact_us": "ያግኙን",
    "footer.careers": "ሥራ ዕድሎች",
    "footer.partners": "አጋሮች",
    "footer.svc_ocean": "የባህር ጭነት",
    "footer.svc_air": "የአየር ጭነት",
    "footer.svc_customs": "የጉምሩክ አገልግሎት",
    "footer.svc_warehouse": "መጋዘን",
    "footer.svc_supply": "የአቅርቦት ሰንሰለት",
    "footer.newsletter_title": "በዓለም አቀፍ ንግድ ቀድሞ ይሁኑ",
    "footer.newsletter_sub": "ለኢንዱስትሪ ዜናዎች፣ የገበያ አዝማሚያዎች እና ልዩ የሎጂስቲክስ ዝማኔዎች ለጋዜጣ ይመዝገቡ።",
    "footer.newsletter_placeholder": "የኢሜይል አድራሻዎን ያስገቡ",
    "footer.subscribe": "ይመዝገቡ",

    // Quote
    "quote.title": "ብጁ ዋጋ ጠይቅ",
    "quote.badge": "ጀምር",
    "quote.submit": "ዋጋ ጠይቅ",
    "quote.submitting": "በማስገባት ላይ...",
    "quote.form_title": "የዋጋ ጥያቄ ቅጽ",
    "quote.form_sub": "የጭነት ዝርዝሮችዎን ይሙሉ",
    "quote.email": "የኢሜይል አድራሻ",
    "quote.phone": "የስልክ ቁጥር",
    "quote.company": "የድርጅት ስም",
    "quote.company_placeholder": "ድርጅትዎ (አማራጭ)",
    "quote.origin": "የመነሻ ሀገር",
    "quote.destination": "የመድረሻ ሀገር",
    "quote.cargo": "የጭነት አይነት",
    "quote.cargo_placeholder": "የጭነት አይነት ይምረጡ",
    "quote.cargo_general": "ጠቅላላ ጭነት",
    "quote.cargo_perishable": "የሚበላሹ ዕቃዎች",
    "quote.cargo_hazardous": "አደገኛ ቁሳቁሶች",
    "quote.cargo_oversized": "ትልቅ ጭነት",
    "quote.cargo_electronics": "ኤሌክትሮኒክስ",
    "quote.cargo_other": "ሌላ",
    "quote.weight": "ግምታዊ ክብደት (ኪ.ግ)",
    "quote.info": "ተጨማሪ መረጃ",
    "quote.info_placeholder": "ማናቸውም ልዩ መስፈርቶች ወይም ተጨማሪ ዝርዝሮች...",

    // Stats
    "stats.years": "ዓመታት ልምድ",
    "stats.countries": "የሚያገለግሉ ሀገሮች",
    "stats.shipments": "የተላኩ ጭነቶች",
    "stats.success": "የስኬት መጠን",
    "stats.partners": "ንቁ አጋሮች",

    // Testimonials
    "testimonials.badge": "የደንበኞች ስኬት ታሪኮች",
    "testimonials.title": "በዓለም አቀፍ መሪዎች የሚታመን",

    // General
    "general.loading": "በመጫን ላይ...",
    "general.error": "ችግር ተፈጥሯል",
    "general.readMore": "ተጨማሪ ያንብቡ",
    "general.learnMore": "ተጨማሪ ይወቁ",
    "general.viewAll": "ሁሉንም ይመልከቱ",
    "lang.toggle": "English",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "en";
  });

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "am" : "en";
    setLanguage(next);
    localStorage.setItem("language", next);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
