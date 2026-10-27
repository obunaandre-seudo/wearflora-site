import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { LifestyleBand } from "@/components/home/lifestyle-band";

export const revalidate = 60;

const FEATURED_COUNT = 5;

async function getHomeData() {
  const include = { images: { orderBy: { position: "asc" as const }, take: 1 }, category: true };

  const [categories, featured] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { status: "PUBLISHED", isFeatured: true },
      take: FEATURED_COUNT,
      orderBy: { createdAt: "desc" },
      include,
    }),
  ]);

  // If fewer than five pieces are marked "featured", top the row up with the newest published products.
  let products = featured;
  if (products.length < FEATURED_COUNT) {
    const extra = await prisma.product.findMany({
      where: { status: "PUBLISHED", id: { notIn: products.map((p) => p.id) } },
      take: FEATURED_COUNT - products.length,
      orderBy: { createdAt: "desc" },
      include,
    });
    products = [...products, ...extra];
  }

  return { categories, products };
}

export default async function HomePage() {
  const { categories, products } = await getHomeData();

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products as any} />
      <LifestyleBand />
    </>
  );
}
