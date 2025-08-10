import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/definitions";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 group-hover:shadow-md">
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
