import { useEffect, useState } from "react";
import Marquee from "@/components/ui/marquee";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { publicApi } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/providers/language-provider";

interface Testimonial { id: number; name: string; company: string; role: string; feedback: string; rating: number }

const TestimonialMarquee = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  useEffect(() => {
    publicApi.get("/api/content/testimonials/")
      .then(r => setTestimonials(r.data.results || r.data))
      .catch(() => {})
  }, [])

  return (
    <section className="py-20 md:py-28 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/global-trade-shipping-containers.jpg')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-gray-900/90 to-slate-800/93" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#D4AF37]/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-3xl"></div>
      </div>
      <div className="relative">
        <header className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4">{t("testimonials.badge")}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("testimonials.title")}</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{settings.testimonial_subtitle}</p>
        </header>
        {testimonials.length > 0 && (
          <Marquee className="[--duration:25s]" pauseOnHover>
            {testimonials.map((t) => (
              <Card key={t.id} className="w-[280px] md:w-[320px] mx-3 p-6 shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-[#D4AF37]/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-white">{t.name}</CardTitle>
                  {(t.role || t.company) && (
                    <p className="text-xs text-[#D4AF37]">{t.role}{t.role && t.company ? ' · ' : ''}{t.company}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">"{t.feedback}"</CardDescription>
                  <div className="flex items-center mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(t.rating)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                    </div>
                    <span className="text-xs text-slate-400 ml-2">Verified Client</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default TestimonialMarquee;
