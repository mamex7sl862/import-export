import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, FileText, BarChart3, Shield, Globe } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Package,
      title: "Cargo Management",
      description: "End-to-end cargo handling from warehousing to final delivery with real-time tracking.",
    },
    {
      icon: Truck,
      title: "Logistics & Transportation",
      description: "Efficient multimodal transportation solutions optimized for cost and speed.",
    },
    {
      icon: FileText,
      title: "Customs Clearance",
      description: "Expert documentation and customs handling for seamless international shipments.",
    },
    {
      icon: BarChart3,
      title: "Supply Chain Optimization",
      description: "Data-driven insights to optimize your supply chain and reduce costs.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive insurance and compliance solutions for your shipments.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to our extensive network of partners in 150+ countries worldwide.",
    },
  ]

  return (
    <section id="services" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Services</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Import-Export Solutions
          </h2>
          <p className="mt-4 text-foreground/70">Everything you need for successful global trade</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Card key={idx} className="border border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70">{service.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
