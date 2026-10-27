/**
 * OPTIONAL Wearflora demo catalogue.
 *
 *   npm run seed:wearflora
 *
 * Adds the nine Wearflora categories, the five homepage products, and a clearly labeled test listing,
 * so a fresh database looks like the reference design. It only ever CREATES rows that do not
 * exist yet (upsert with an empty `update`): nothing is deleted, reset or overwritten, and
 * existing products, customers and orders are never touched.
 *
 * The prices and stock below are placeholders (NGN) — edit them in /admin/products.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Dresses", slug: "dresses" },
  { name: "Tops", slug: "tops" },
  { name: "Trousers", slug: "trousers" },
  { name: "Blazers", slug: "blazers" },
  { name: "Skirts", slug: "skirts" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Bags", slug: "bags" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
];

const PRODUCTS = [
  { name: "Floral Maxi Dress", slug: "floral-maxi-dress", sku: "WF-DRS-001", category: "dresses", price: 89000, image: "/wearflora/products/p1.jpg", short: "A flowing floral maxi with a fitted bodice and delicate straps." },
  { name: "Tailored Blazer Set", slug: "tailored-blazer-set", sku: "WF-BLZ-001", category: "blazers", price: 129000, image: "/wearflora/products/p2.jpg", short: "A sharp ivory blazer and matching trousers, tailored for a polished finish." },
  { name: "Ruffle Off-Shoulder Top", slug: "ruffle-off-shoulder-top", sku: "WF-TOP-001", category: "tops", price: 59000, image: "/wearflora/products/p3.jpg", short: "A soft pink off-shoulder top with a romantic ruffled neckline." },
  { name: "Satin Midi Dress", slug: "satin-midi-dress", sku: "WF-DRS-002", category: "dresses", price: 79000, image: "/wearflora/products/p4.jpg", short: "A liquid-satin midi dress that drapes beautifully from day to evening." },
  { name: "Classic Trench Coat", slug: "classic-trench-coat", sku: "WF-OUT-001", category: "outerwear", price: 119000, image: "/wearflora/products/p5.jpg", short: "A belted trench coat in blush pink, cut for a clean, timeless line." },
];

async function main() {
  const categoryIds: Record<string, string> = {};
  for (const [i, c] of CATEGORIES.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c, sortOrder: 100 + i },
    });
    categoryIds[c.slug] = row.id;
  }

  const brand = await prisma.brand.upsert({
    where: { slug: "wearflora" },
    update: {},
    create: { name: "Wearflora", slug: "wearflora" },
  });

  for (const p of PRODUCTS) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) continue;
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        description: p.short,
        shortDescription: p.short,
        price: p.price,
        currency: "NGN",
        stockQuantity: 20,
        status: "PUBLISHED",
        isFeatured: true,
        categoryId: categoryIds[p.category],
        brandId: brand.id,
        images: { create: [{ url: p.image, altText: p.name, isPrimary: true, position: 0 }] },
      },
    });
  }

  const testSlug = "test-product-checkout-sample";
  const existingTestProduct = await prisma.product.findUnique({ where: { slug: testSlug } });
  if (!existingTestProduct) {
    await prisma.product.create({
      data: {
        name: "Test Product - Checkout Sample",
        slug: testSlug,
        sku: "WF-TEST-001",
        description:
          "A clearly labeled sample listing for testing product pages, wishlist, cart, and checkout. This is not a real item and must not be fulfilled.",
        shortDescription: "Test listing only - not for fulfillment.",
        price: 1000,
        currency: "NGN",
        stockQuantity: 5,
        status: "PUBLISHED",
        isFeatured: false,
        categoryId: categoryIds.accessories,
        brandId: brand.id,
        images: {
          create: [{ url: "/wearflora/products/p4.jpg", altText: "Test product sample", isPrimary: true, position: 0 }],
        },
      },
    });
  }

  console.log("Wearflora demo catalogue ready (existing records were left untouched).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
