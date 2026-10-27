import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skeleton rounded-xl", className)} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="mb-3 aspect-[6/7] w-full !rounded-none" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}
