"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { ProductCard, ProductCardData } from "@/components/products/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { apiFetch, ClientApiError } from "@/lib/api-client";
import { useWishlistStore } from "@/store/wishlist-store";

type WishlistItem = { id: string; product: ProductCardData };

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[] | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedIds = useWishlistStore((s) => s.ids);

  useEffect(() => {
    let active = true;
    apiFetch<WishlistItem[]>("/api/wishlist")
      .then((res) => active && setItems(res))
      .catch((err) => {
        if (!active) return;
        if (err instanceof ClientApiError && err.status === 401) setNeedsLogin(true);
        else setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  // Items removed with the heart disappear from the page straight away.
  const visible = items?.filter((i) => savedIds.length === 0 || savedIds.includes(i.product.id)) ?? null;

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-12 sm:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-brand-700">Wishlist</h1>
        <p className="mt-2 font-display text-xl text-text/80">The pieces you love, saved for later.</p>
      </div>

      {needsLogin ? (
        <EmptyState
          icon={<Heart size={36} />}
          title="Sign in to see your wishlist"
          description="Your saved pieces are kept with your account."
          action={<ButtonLink href="/login?next=/wishlist">Sign in</ButtonLink>}
        />
      ) : error ? (
        <EmptyState title="We couldn't load your wishlist" description={error} />
      ) : visible === null ? (
        <p className="py-16 text-center text-muted">Loading your wishlist…</p>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<Heart size={36} />}
          title="Your wishlist is empty"
          description="Tap the heart on any piece to save it here."
          action={<ButtonLink href="/products">Start browsing</ButtonLink>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((i) => (
            <ProductCard key={i.id} product={i.product} />
          ))}
        </div>
      )}
    </div>
  );
}
