"use client";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronRight } from "lucide-react";
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
    image: "/smartphone-components-circuit-boards.jpg",
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
    image: "/premium-fabrics-textiles-rolls.jpg",
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
    image: "/industrial-machinery-equipment-factory.jpg",
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
    image: "/chemical-compounds-laboratory-containers.jpg",
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
    image: "/raw-metals-ingots-steel-aluminum-copper.jpg",
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
    image: "/plastic-resins-pellets-production.jpg",
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
    image: "/organic-coffee-beans-roasted.jpg",
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
    image: "/artisan-handicrafts-wooden-ceramic-items.jpg",
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
    image: "/premium-spices-cardamom-cinnamon-turmeric.jpg",
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
    image: "/cotton-apparel-clothing-garments-fashion.jpg",
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
    image: "/fresh-seafood-fish-shrimp-cold-storage.jpg",
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
    image: "/tropical-fruits-mangoes-pineapples-fresh.jpg",
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
    <div className="w-full min-h-screen bg-background">
      <PageHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Grid - Simplified */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-card border border-border text-center"
            >
              <p className="font-semibold text-foreground text-sm">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold py-8">Our Proudcts</h2>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "import" | "export")}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6">
            <TabsTrigger value="import" className="text-base">
              Import
            </TabsTrigger>
            <TabsTrigger value="export" className="text-base">
              Export
            </TabsTrigger>
          </TabsList>

          {(["import", "export"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {/* Search and Filter */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Type Filter - Horizontal Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedType === null
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
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
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
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
                    <p className="text-lg text-muted-foreground">
                      No products found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>

              {/* Results Count */}
              {filteredProducts.length > 0 && (
                <p className="text-center text-sm text-muted-foreground">
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
      className="pt-0 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {product.type}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
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
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {product.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {product.price && (
            <span className="text-sm font-semibold text-primary">
              {product.price}
            </span>
          )}
          <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
