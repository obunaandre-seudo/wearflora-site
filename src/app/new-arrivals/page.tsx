import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Fresh styles. Same beautiful you. See the newest pieces at Wearflora.",
};

export const revalidate = 60;

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 24,
    include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
  });

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-12 sm:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-brand-700">New Arrivals</h1>
        <p className="mt-2 font-display text-xl text-text/80">Fresh styles. Same beautiful you.</p>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-muted">New pieces are on their way. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <ButtonLink href="/products?sort=newest" variant="outline">Browse the full catalog</ButtonLink>
      </div>
    </div>
  );
}
