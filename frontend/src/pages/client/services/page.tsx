"use client";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronRight, Ship, FileCheck, Truck, Shield, Globe2, Package, Clock, HeadphonesIcon } from "lucide-react";
import PageHeader from "./header";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "import" | "export";
  type: string;
  price?: string;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  // Import Products
  {
    id: "electronics-import-1",
    name: "Smartphone Components",
    description: "High-quality semiconductor and display components from Asia",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    category: "import",
    type: "Electronics",
    price: "Starting from $5,000",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "textiles-import-1",
    name: "Premium Fabrics",
    description: "Cotton, silk, and synthetic fabrics from Indian mills",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea1f1f57?q=80&w=2074&auto=format&fit=crop",
    category: "import",
    type: "Textiles",
    price: "Starting from $2,000",
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "machinery-import-1",
    name: "Industrial Equipment",
    description:
      "CNC machines and manufacturing equipment from Germany and Japan",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    category: "import",
    type: "Machinery",
    price: "Starting from $50,000",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "chemicals-import-1",
    name: "Chemical Compounds",
    description:
      "Industrial chemicals and raw materials from certified suppliers",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
    category: "import",
    type: "Chemicals",
    price: "Starting from $3,000",
    rating: 4.6,
    reviews: 127,
  },
  {
    id: "metals-import-1",
    name: "Raw Metals",
    description: "Aluminum, copper, and steel ingots from mines",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop",
    category: "import",
    type: "Metals",
    price: "Starting from $10,000",
    rating: 4.8,
    reviews: 198,
  },
  {
    id: "plastics-import-1",
    name: "Plastic Resins",
    description: "Virgin and recycled plastic pellets for manufacturing",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop",
    category: "import",
    type: "Plastics",
    price: "Starting from $1,500",
    rating: 4.5,
    reviews: 134,
  },

  // Export Products
  {
    id: "agricultural-export-1",
    name: "Organic Coffee Beans",
    description:
      "Premium arabica and robusta coffee from certified plantations",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061&auto=format&fit=crop",
    category: "export",
    type: "Agriculture",
    price: "Starting from $8,000",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "handicrafts-export-1",
    name: "Artisan Handcrafted Items",
    description: "Traditional wooden and ceramic crafts from local artisans",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
    category: "export",
    type: "Handicrafts",
    price: "Starting from $1,000",
    rating: 4.7,
    reviews: 267,
  },
  {
    id: "spices-export-1",
    name: "Premium Spice Blends",
    description: "Organic spices including turmeric, cardamom, and cinnamon",
    image: "https://images.unsplash.com/photo-1596040033229-a0b3b83b2e4f?q=80&w=2070&auto=format&fit=crop",
    category: "export",
    type: "Spices",
    price: "Starting from $2,500",
    rating: 4.8,
    reviews: 289,
  },
  {
    id: "apparel-export-1",
    name: "Cotton Apparel",
    description: "Ready-made clothing and garments for retail distribution",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    category: "export",
    type: "Apparel",
    price: "Starting from $3,000",
    rating: 4.6,
    reviews: 201,
  },
  {
    id: "seafood-export-1",
    name: "Fresh Seafood",
    description:
      "Frozen and chilled fish, shrimp, and shellfish with cold chain",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2069&auto=format&fit=crop",
    category: "export",
    type: "Seafood",
    price: "Starting from $15,000",
    rating: 4.9,
    reviews: 278,
  },
  {
    id: "fruit-export-1",
    name: "Tropical Fruits",
    description: "Mangoes, pineapples, and tropical fruits shipped fresh",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070&auto=format&fit=crop",
    category: "export",
    type: "Agriculture",
    price: "Starting from $5,000",
    rating: 4.7,
    reviews: 234,
  },
];

const highlights = [
  { label: "Fast Shipping", description: "Delivery in 7-14 days" },
  { label: "Secure Payments", description: "SSL encrypted transactions" },
  { label: "Quality Verified", description: "All products inspected" },
  { label: "24/7 Support", description: "Always here to help" },
];

const services = [
  {
    icon: Ship,
    title: "International Shipping",
    description: "Reliable sea, air, and land freight solutions connecting you to over 50 countries worldwide with real-time tracking.",
    features: ["Sea Freight", "Air Freight", "Land Transport", "Express Delivery"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Expert handling of all customs documentation, tariff classification, and regulatory compliance to ensure smooth border crossings.",
    features: ["Documentation", "Tariff Classification", "Duty Calculation", "Compliance"],
    color: "from-[#D4AF37] to-yellow-600"
  },
  {
    icon: Package,
    title: "Warehousing & Storage",
    description: "Secure, climate-controlled storage facilities with inventory management and distribution services at strategic locations.",
    features: ["Climate Control", "Inventory Management", "Pick & Pack", "Distribution"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Cargo Insurance",
    description: "Comprehensive insurance coverage protecting your shipments against loss, damage, and unforeseen circumstances during transit.",
    features: ["Full Coverage", "Claims Support", "Risk Assessment", "Quick Processing"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe2,
    title: "Trade Consulting",
    description: "Expert guidance on international trade regulations, market entry strategies, and business expansion opportunities.",
    features: ["Market Research", "Regulatory Advice", "Strategy Planning", "Risk Management"],
    color: "from-indigo-500 to-blue-600"
  },
  {
    icon: Truck,
    title: "Door-to-Door Delivery",
    description: "Complete logistics solution from pickup at origin to final delivery at destination with full tracking visibility.",
    features: ["Pickup Service", "Last Mile Delivery", "Real-time Tracking", "Signature Confirmation"],
    color: "from-orange-500 to-red-500"
  },
];

export default function ImportExportServices() {
  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = product.category === activeTab;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType ? product.type === selectedType : true;
      return matchesCategory && matchesSearch && matchesType;
    });
  }, [activeTab, searchQuery, selectedType]);

  const types = useMemo(() => {
    return Array.from(
      new Set(
        products.filter((p) => p.category === activeTab).map((p) => p.type)
      )
    ).sort();
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <PageHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-[#D4AF37]">Services</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Comprehensive import-export solutions designed to streamline your global trade operations
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="group relative overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                <CardContent className="p-6">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-center">
              <Clock className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Fast Processing</h4>
              <p className="text-sm text-slate-300">Quick turnaround on all shipments</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-center">
              <Shield className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Secure & Safe</h4>
              <p className="text-sm text-slate-300">Full insurance coverage available</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-center">
              <Globe2 className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Global Network</h4>
              <p className="text-sm text-slate-300">Presence in 50+ countries</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-center">
              <HeadphonesIcon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">24/7 Support</h4>
              <p className="text-sm text-slate-300">Always here when you need us</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-900 px-6 py-2 text-slate-400 text-sm font-medium rounded-full border border-slate-700/50">
              Browse Our Products
            </span>
          </div>
        </div>

        {/* Features Grid - Simplified */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-center hover:border-[#D4AF37]/50 transition-colors"
            >
              <p className="font-semibold text-white text-sm">
                {item.label}
              </p>
              <p className="text-xs text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold py-8 text-white">Our Products</h2>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "import" | "export")}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="import" className="text-base data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#101828]">
              Import
            </TabsTrigger>
            <TabsTrigger value="export" className="text-base data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#101828]">
              Export
            </TabsTrigger>
          </TabsList>

          {(["import", "export"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {/* Search and Filter */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                </div>

                {/* Type Filter - Horizontal Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedType === null
                        ? "bg-[#D4AF37] text-[#101828]"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
                  >
                    All Types
                  </button>
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        selectedType === type
                          ? "bg-[#D4AF37] text-[#101828]"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid - Simplified layout with 3 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-lg text-slate-300">
                      No products found
                    </p>
                    <p className="text-sm text-slate-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>

              {/* Results Count */}
              {filteredProducts.length > 0 && (
                <p className="text-center text-sm text-slate-400">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="pt-0 overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-900">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#101828] px-3 py-1 rounded-full text-xs font-semibold">
          {product.type}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <div>
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating)
                    ? "text-[#D4AF37]"
                    : "text-slate-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-white">
            {product.rating}
          </span>
          <span className="text-xs text-slate-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          {product.price && (
            <span className="text-sm font-semibold text-[#D4AF37]">
              {product.price}
            </span>
          )}
          <button className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors">
            View
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
