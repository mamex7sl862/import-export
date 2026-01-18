import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col h-full rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-md transition">
      {/* Image */}
      <div className="overflow-hidden bg-muted h-48">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wide rounded">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            {post.author}
          </div>
        </div>

        {/* Link */}
        <Link
          to="#"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm group/link"
        >
          Read More{" "}
          <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition" />
        </Link>
      </div>
    </article>
  );
}
