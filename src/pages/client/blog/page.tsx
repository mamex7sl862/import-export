import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import PageHeader from "./header";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Navigating Global Trade Regulations in 2025",
    excerpt:
      "Understanding the latest changes in international trade policies and how they impact your business operations.",
    image: "/global-trade-shipping-containers.jpg",
    date: "January 15, 2025",
    author: "Sarah Chen",
    category: "Regulations",
    readTime: "8 min read",
  };

  const blogPosts = [
    {
      id: 2,
      title: "Logistics Cost Optimization Strategies",
      excerpt:
        "Learn proven methods to reduce shipping costs without compromising delivery times.",
      image: "/logistics-warehouse-management.jpg",
      date: "January 12, 2025",
      author: "Michael Rodriguez",
      category: "Logistics",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Digital Transformation in Supply Chain",
      excerpt:
        "How AI and automation are revolutionizing import/export operations.",
      image: "/supply-chain-technology.png",
      date: "January 8, 2025",
      author: "Emma Watson",
      category: "Technology",
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "Market Trends: Asia-Pacific Trade Growth",
      excerpt:
        "Exploring emerging opportunities in the fastest-growing trade corridors.",
      image: "/asia-trade-ports-business.jpg",
      date: "January 5, 2025",
      author: "David Park",
      category: "Market Analysis",
      readTime: "9 min read",
    },
    {
      id: 5,
      title: "Customs Compliance Checklist",
      excerpt:
        "Essential steps to ensure smooth customs clearance for your shipments.",
      image: "/customs-clearance-documentation.jpg",
      date: "December 28, 2024",
      author: "Lisa Anderson",
      category: "Compliance",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Sustainable Export Practices",
      excerpt:
        "Meeting environmental standards while maintaining competitive shipping costs.",
      image: "/green-logistics-sustainability.jpg",
      date: "December 22, 2024",
      author: "James Miller",
      category: "Sustainability",
      readTime: "6 min read",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <PageHeader />

      {/* Featured Post */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-semibold text-primary mb-8 uppercase tracking-wide">
            Featured
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-lg bg-muted h-80 md:h-96 order-2 md:order-1">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded">
                  {featuredPost.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {featuredPost.readTime}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {featuredPost.author}
                </div>
              </div>
              <Link to="#">
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Read Article <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Latest Articles
            </h2>
            <p className="text-muted-foreground">
              Discover new insights from our expert team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
