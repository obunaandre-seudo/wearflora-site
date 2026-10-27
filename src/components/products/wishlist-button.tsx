"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { useWishlistStore } from "@/store/wishlist-store";

export function WishlistButton({
  productId,
  className,
  size = 18,
}: {
  productId: string;
  className?: string;
  size?: number;
}) {
  const saved = useWishlistStore((s) => s.ids.includes(productId));
  const load = useWishlistStore((s) => s.load);
  const toggle = useWishlistStore((s) => s.toggle);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    load();
  }, [load]);

  async function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    const result = await toggle(productId);
    setBusy(false);
    if (result.ok) toast.success(result.added ? "Saved to your wishlist" : "Removed from your wishlist");
    else toast.error(result.message || "Could not update wishlist");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-brand-600",
        className
      )}
    >
      <Heart size={size} className={clsx(saved && "fill-brand-400 text-brand-400")} />
    </button>
  );
}
