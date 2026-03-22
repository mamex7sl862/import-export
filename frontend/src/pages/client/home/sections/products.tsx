import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface Product { id: number; name: string; description: string; image: string; category: string; type: string; price: string; rating: number; reviews: number }

export default function Products() {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.get("/api/content/products/?category=import")
      .then(r => setProducts((r.data.results || r.data).slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <section id="products" className="w-full py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/global-trade-shipping-containers.jpg')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/92 to-slate-800/95" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl"></div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4">{settings.products_badge}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{settings.products_title}</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{settings.products_subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <div className="w-full py-8 flex justify-center items-center relative">
        <Button variant="outline" className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101828] font-semibold px-8 py-3 rounded-xl transition-all duration-300" onClick={() => navigate("/services")}>
          View All Products & Services
        </Button>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="pt-0 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl cursor-pointer group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
      <div className="relative w-full h-48 overflow-hidden bg-slate-700">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#101828] px-3 py-1 rounded-full text-xs font-bold">{product.type}</div>
      </div>
      <CardContent className="p-6 space-y-4 pt-4">
        <div>
          <h3 className="font-bold text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors text-lg">{product.name}</h3>
          <p className="text-sm text-slate-300 line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <span key={i} className={`text-sm ${i < Math.round(product.rating) ? "text-[#D4AF37]" : "text-slate-600"}`}>★</span>)}
          </div>
          <span className="text-sm font-semibold text-white">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          {product.price && <span className="text-sm font-bold text-[#D4AF37]">{product.price}</span>}
          <button className="inline-flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-[#D4AF37] transition-colors">
            View Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
