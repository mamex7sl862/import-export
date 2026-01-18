export default function About() {
  return (
    <section id="about" className="w-full border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">About Us</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Your Global Trade Partner
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left Column */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Who We Are</h3>
              <p className="text-foreground leading-relaxed">
                TradeGlobal has been connecting businesses across continents for over 15 years. We specialize in
                import-export logistics, documentation, customs clearance, and supply chain optimization for businesses
                of all sizes.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Our Mission</h3>
              <p className="text-foreground leading-relaxed">
                To empower businesses globally by removing barriers to international trade, making import-export
                accessible, transparent, and profitable for everyone.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Our Values</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-accent" />
                  <span>Reliability in every shipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-accent" />
                  <span>Transparency in all operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-accent" />
                  <span>Excellence in service delivery</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-muted-foreground">15+</p>
              <p className="mt-2 text-sm text-foreground">Years in Business</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-muted-foreground">500+</p>
              <p className="mt-2 text-sm text-foreground">Partner Companies</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-muted-foreground">150+</p>
              <p className="mt-2 text-sm text-foreground">Countries Served</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-muted-foreground">99%</p>
              <p className="mt-2 text-sm text-foreground">On-Time Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
