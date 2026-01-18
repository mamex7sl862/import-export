import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const products: any[] = [
    // Import Products
    {
      id: "electronics-import-1",
      name: "Smartphone Components",
      description:
        "High-quality semiconductor and display components from Asia",
      image: "/smartphone-components-circuit-boards.jpg",
      category: "import",
      type: "Electronics",
      price: "Starting from 5,000",
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
      price: "Starting from 2,000",
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
      price: "Starting from 50,000",
      rating: 4.9,
      reviews: 156,
    },
  ];

  return (
    <section id="products" className="w-full bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Catalog
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Products & Services
          </h2>
          <p className="mt-4 text-foreground/70">
            Tailored solutions for every shipping need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full py-6 flex justify-center items-center">
        <Button
          variant={"link"}
          onClick={() => {
            navigate("/services");
          }}
        >
          More services and products
        </Button>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
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

      <CardContent className="p-4 space-y-3 pt-0">
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
              {product.price} ETB
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
