"use client";

import { useSearchParams } from "next/navigation";

export function ProductsHeading({ categories }: { categories: { name: string; slug: string }[] }) {
  const params = useSearchParams();
  const q = params.get("q")?.trim();
  const category = categories.find((c) => c.slug === params.get("category"));
  const featured = params.get("featured") === "true";

  let title = "Shop";
  let sub = "Timeless styles. Modern femininity. Discover fashion that feels like you.";
  if (q) {
    title = `Results for “${q}”`;
    sub = "Showing pieces that match your search.";
  } else if (category) {
    title = category.name;
    sub = "Browse the collection.";
  } else if (featured) {
    title = "Featured Collection";
    sub = "Our most loved pieces, handpicked for you.";
  }

  return (
    <div className="mb-10 text-center">
      <h1 className="font-display text-4xl font-semibold text-brand-700 sm:text-5xl">{title}</h1>
      <p className="mt-2 font-display text-xl text-text/80">{sub}</p>
    </div>
  );
}
