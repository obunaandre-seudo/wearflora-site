import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { LifestyleBand } from "@/components/home/lifestyle-band";
import { StyleStories } from "@/components/home/style-stories";
import { CustomerReviews } from "@/components/home/customer-reviews";
import type { ProductCardData } from "@/components/products/product-card";

export const revalidate = 60;

const FEATURED_COUNT = 5;

async function getHomeData() {
  const [categories, products, reviews] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.product.findMany({
      where: {
        status: "PUBLISHED",
        slug: { not: "test-product-checkout-sample" },
      },
      take: FEATURED_COUNT,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        salePrice: true,
        currency: true,
        stockQuantity: true,
        avgRating: true,
        reviewCount: true,
        createdAt: true,
        images: {
          where: { isPrimary: true },
          take: 1,
          select: { url: true, altText: true },
        },
        category: { select: { name: true } },
      },
    }),
    prisma.review.findMany({
      where: { product: { status: "PUBLISHED" } },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        authorName: true,
        rating: true,
        title: true,
        body: true,
        product: { select: { name: true, slug: true } },
      },
    }),
  ]);

  const productCards: ProductCardData[] = products.map((product) => ({
    ...product,
    price: Number(product.price),
    salePrice: product.salePrice === null ? null : Number(product.salePrice),
    avgRating: Number(product.avgRating),
    createdAt: product.createdAt.toISOString(),
  }));

  return { categories, products: productCards, reviews };
}

export default async function HomePage() {
  const { categories, products, reviews } = await getHomeData();

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products} />
      <StyleStories />
      <LifestyleBand />
      <CustomerReviews reviews={reviews} />
    </>
  );
}
