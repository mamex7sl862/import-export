import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/providers/language-provider";

export default function QuoteForm() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    cargoType: "",
    weight: "",
    email: "",
    phone: "",
    company: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      origin_country: formData.origin,
      destination_country: formData.destination,
      cargo_type: formData.cargoType,
      weight: parseFloat(formData.weight),
      email: formData.email,
      phone: formData.phone,
      company_name: formData.company || '',
      additional_info: formData.additionalInfo || '',
    };

    try {
      const response = await api.post('/api/quotes/', data);
      console.log('Success:', response.data);
      toast.success("Quote request submitted successfully! We'll contact you within 24 hours.");
      
      // Reset form
      setFormData({
        origin: "",
        destination: "",
        cargoType: "",
        weight: "",
        email: "",
        phone: "",
        company: "",
        additionalInfo: "",
      });
    } catch (error: any) {
      console.error('Error submitting quote:', error.response?.data || error.message);
      toast.error("Failed to submit quote request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote-form" className="w-full py-20 md:py-28 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/asia-trade-ports-business.jpg')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/92 to-slate-900/95" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Wave Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M0 60c20-20 40-20 60 0s40 20 60 0v60H0V60z' fill-opacity='0.1'/%3E%3Cpath d='M0 0c20 20 40 20 60 0s40-20 60 0v60c-20-20-40-20-60 0s-40 20-60 0V0z' fill-opacity='0.05'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Flowing Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              {settings.quote_badge}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {settings.quote_title}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {settings.quote_subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#101828]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">All Cargo Types</h3>
                  <p className="text-slate-300">
                    From small parcels to oversized freight, we handle it all
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#101828]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Global Coverage</h3>
                  <p className="text-slate-300">
                    Door-to-door service to over 150 countries worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#101828]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">24/7 Support</h3>
                  <p className="text-slate-300">
                    Dedicated account managers available around the clock
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="border-2 border-slate-700/50 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{t("quote.form_title")}</CardTitle>
              <CardDescription className="text-slate-300">{t("quote.form_sub")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="text-slate-200">{t("quote.origin")} *</Label>
                    <Input
                      id="origin"
                      placeholder="e.g., United States"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      required
                      className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-slate-200">{t("quote.destination")} *</Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Germany"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      required
                      className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargoType" className="text-slate-200">{t("quote.cargo")} *</Label>
                  <Select
                    value={formData.cargoType}
                    onValueChange={(value) => setFormData({ ...formData, cargoType: value })}
                    required
                  >
                    <SelectTrigger id="cargoType" className="h-11 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder={t("quote.cargo_placeholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="general" className="text-white hover:bg-slate-700">{t("quote.cargo_general")}</SelectItem>
                      <SelectItem value="perishable" className="text-white hover:bg-slate-700">{t("quote.cargo_perishable")}</SelectItem>
                      <SelectItem value="hazardous" className="text-white hover:bg-slate-700">{t("quote.cargo_hazardous")}</SelectItem>
                      <SelectItem value="oversized" className="text-white hover:bg-slate-700">{t("quote.cargo_oversized")}</SelectItem>
                      <SelectItem value="electronics" className="text-white hover:bg-slate-700">{t("quote.cargo_electronics")}</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-slate-700">{t("quote.cargo_other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-slate-200">{t("quote.weight")} *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                    className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">{t("quote.email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-200">{t("quote.phone")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-200">{t("quote.company")}</Label>
                  <Input
                    id="company"
                    placeholder={t("quote.company_placeholder")}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-slate-200">{t("quote.info")}</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder={t("quote.info_placeholder")}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-semibold h-12 text-base min-h-[44px] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit quote request"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#101828] border-t-transparent rounded-full animate-spin mr-2" />
                      {t("quote.submitting")}
                    </>
                  ) : (
                    t("quote.submit")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
