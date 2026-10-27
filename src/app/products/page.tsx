import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductsHeading } from "@/components/products/products-heading";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Wearflora collection of women's fashion.",
};

export const revalidate = 60;

async function getFilterData() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true, slug: true } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, slug: true } }),
  ]);
  return { categories, brands };
}

export default async function ProductsPage() {
  const { categories, brands } = await getFilterData();

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-12 sm:px-8">
      <Suspense>
        <ProductsHeading categories={categories} />
      </Suspense>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Suspense>
          <ProductFilters categories={categories} brands={brands} />
        </Suspense>
        <Suspense>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
}
