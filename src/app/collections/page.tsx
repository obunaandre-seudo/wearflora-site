import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CategoryIcon } from "@/components/home/category-icons";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse every Wearflora collection — dresses, tops, trousers, blazers and more.",
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: { where: { status: "PUBLISHED" } } } },
      products: {
        where: { status: "PUBLISHED" },
        take: 1,
        orderBy: { createdAt: "desc" },
        include: { images: { take: 1, orderBy: { position: "asc" } } },
      },
    },
  });

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-12 sm:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-brand-700">Collections</h1>
        <p className="mt-2 font-display text-xl text-text/80">Find your next favourite piece, one collection at a time.</p>
      </div>

      {categories.length === 0 ? (
        <p className="py-16 text-center text-muted">Collections will appear here soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const img = c.image || c.products[0]?.images[0]?.url;
            return (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden bg-brand-100"
              >
                {img ? (
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-brand-300">
                    <CategoryIcon slug={c.slug} name={c.name} size={72} />
                  </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
                <span className="relative p-6 text-white">
                  <span className="block font-display text-3xl font-semibold">{c.name}</span>
                  <span className="text-sm text-white/85">
                    {c._count.products} piece{c._count.products === 1 ? "" : "s"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
