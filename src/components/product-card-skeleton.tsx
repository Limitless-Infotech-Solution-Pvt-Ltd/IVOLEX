import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="relative text-center">
      <Skeleton className="relative w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
      </div>
    </div>
  );
}
