"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Props {
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  unitPrice: number;
  stockQuantity: number;
}

export function ProductBuyBox({ productId, name, slug, image, unitPrice, stockQuantity }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [wishlisting, setWishlisting] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const saved = useWishlistStore((s) => s.ids.includes(productId));
  const loadWishlist = useWishlistStore((s) => s.load);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const outOfStock = stockQuantity <= 0;

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  function handleAdd() {
    const result = addItem({ productId, name, slug, image, unitPrice, stockQuantity }, qty);
    if (result.ok) toast.success(`${name} added to your bag`);
    else toast.error(result.message || "Could not add to bag");
  }

  function handleBuyNow() {
    const result = addItem({ productId, name, slug, image, unitPrice, stockQuantity }, qty);
    if (result.ok) router.push("/cart");
    else toast.error(result.message || "Could not add to bag");
  }

  async function handleWishlist() {
    setWishlisting(true);
    const result = await toggleWishlist(productId);
    setWishlisting(false);
    if (result.ok) toast.success(result.added ? "Saved to your wishlist" : "Removed from your wishlist");
    else toast.error(result.message || "Could not update wishlist");
  }

  return (
    <div>
      <div className="flex items-center gap-3 rounded-full border border-brand-200 bg-surface p-1.5">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 hover:bg-brand-100"
          aria-label="Decrease quantity"
        >
          <Minus size={15} />
        </button>
        <span className="w-8 text-center text-sm font-medium text-brand-700" aria-live="polite">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => Math.min(stockQuantity, q + 1))}
          disabled={qty >= stockQuantity}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 hover:bg-brand-100 disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <Plus size={15} />
        </button>
        <span className="ml-auto pr-4 text-xs text-muted">{stockQuantity} in stock</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleAdd} disabled={outOfStock} size="lg" variant="secondary" className="flex-1">
          <ShoppingBag size={16} /> Add to bag
        </Button>
        <Button onClick={handleBuyNow} disabled={outOfStock} size="lg" className="flex-1">
          Buy now
        </Button>
        <Button
          onClick={handleWishlist}
          disabled={wishlisting}
          size="lg"
          variant="outline"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
        >
          <Heart size={16} className={clsx(saved && "fill-brand-400")} />
        </Button>
      </div>
    </div>
  );
}
