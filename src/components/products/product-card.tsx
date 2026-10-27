"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatCurrency } from "@/lib/format";
import { StarRating } from "@/components/ui/star-rating";
import { WishlistButton } from "@/components/products/wishlist-button";
import { useCartStore } from "@/store/cart-store";

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  salePrice?: number | string | null;
  currency: string;
  stockQuantity: number;
  avgRating: number | string;
  reviewCount: number;
  createdAt?: string | Date;
  images: { url: string; altText?: string | null }[];
  category?: { name: string } | null;
}

const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export function ProductCard({ product }: { product: ProductCardData }) {
  const addItem = useCartStore((s) => s.addItem);
  const price = Number(product.price);
  const salePrice = product.salePrice ? Number(product.salePrice) : null;
  const image = product.images[0]?.url;
  const outOfStock = product.stockQuantity <= 0;
  const isNew = product.createdAt ? Date.now() - new Date(product.createdAt).getTime() < NEW_WINDOW_MS : false;
  const badge = outOfStock ? "Sold out" : salePrice ? "Sale" : isNew ? "New" : null;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    const result = addItem(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: image ?? null,
        unitPrice: salePrice ?? price,
        stockQuantity: product.stockQuantity,
      },
      1
    );
    if (result.ok) toast.success(`${product.name} added to your bag`);
    else toast.error(result.message || "Could not add to bag");
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[6/7] w-full overflow-hidden bg-brand-100">
        <Link href={`/products/${product.slug}`} className="block h-full w-full" aria-label={product.name}>
          {image ? (
            <Image
              src={image}
              alt={product.images[0]?.altText || product.name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1280px) 33vw, 20vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-script text-3xl text-brand-300">Wearflora</div>
          )}
        </Link>

        {badge && (
          <span
            className={
              badge === "Sold out"
                ? "absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-muted"
                : "absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-medium text-white"
            }
          >
            {badge}
          </span>
        )}

        <WishlistButton productId={product.id} className="absolute right-3 top-3" />

        {!outOfStock && (
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-glow transition hover:bg-brand-600 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100"
          >
            <ShoppingBag size={17} />
          </button>
        )}
      </div>

      <div className="pt-3">
        <h3 className="line-clamp-2 text-sm text-text">
          <Link href={`/products/${product.slug}`} className="hover:text-brand-500">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-baseline gap-2 text-sm">
          <span className="font-medium text-brand-700">{formatCurrency(salePrice ?? price, product.currency)}</span>
          {salePrice && <span className="text-xs text-muted line-through">{formatCurrency(price, product.currency)}</span>}
        </p>
        {product.reviewCount > 0 && (
          <div className="mt-1.5">
            <StarRating rating={Number(product.avgRating)} count={product.reviewCount} size={12} />
          </div>
        )}
      </div>
    </article>
  );
}
