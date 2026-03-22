import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, FileText, BarChart3, Shield, Globe, Anchor, Plane, Ship } from "lucide-react"
import { useSiteSettings } from "@/hooks/useSiteSettings"

export default function Services() {
  const { settings } = useSiteSettings();
  const services = [
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions with full container load (FCL) and less than container load (LCL) options.",
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Express air cargo services for time-sensitive shipments with door-to-door delivery.",
    },
    {
      icon: FileText,
      title: "Customs Brokerage",
      description: "Expert customs clearance and documentation handling for seamless cross-border trade.",
    },
    {
      icon: Package,
      title: "Warehousing & Distribution",
      description: "State-of-the-art storage facilities with inventory management and order fulfillment.",
    },
    {
      icon: BarChart3,
      title: "Supply Chain Consulting",
      description: "Strategic optimization of your end-to-end supply chain for maximum efficiency.",
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive coverage protecting your goods throughout the entire shipping journey.",
    },
  ]

  return (
    <section id="services" className="w-full py-20 md:py-28 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/logistics-warehouse-management.jpg')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,24,40,0.4),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#d4af37] mb-3">{settings.services_title}</p>
          <h2 className="text-balance text-4xl font-bold text-white md:text-5xl mb-4">
            End-to-End Logistics Solutions
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            {settings.services_subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Card 
                key={idx} 
                className="border-2 border-slate-700/50 hover:border-[#d4af37] hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all duration-300 group bg-slate-800/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[#1a2a6c] group-hover:bg-[#d4af37] transition-colors duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
