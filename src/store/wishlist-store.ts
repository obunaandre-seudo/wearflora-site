"use client";

import { create } from "zustand";
import { apiFetch, ClientApiError } from "@/lib/api-client";

interface WishlistState {
  ids: string[];
  signedIn: boolean | null; // null = not checked yet
  loading: boolean;
  load: () => Promise<void>;
  has: (productId: string) => boolean;
  /** Adds or removes a product. Uses the existing /api/wishlist endpoints (signed-in customers only). */
  toggle: (productId: string) => Promise<{ ok: boolean; added?: boolean; needsLogin?: boolean; message?: string }>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  ids: [],
  signedIn: null,
  loading: false,

  load: async () => {
    const { loading, signedIn } = get();
    if (loading || signedIn === true) return;
    set({ loading: true });
    try {
      const items = await apiFetch<{ productId: string }[]>("/api/wishlist");
      set({ ids: items.map((i) => i.productId), signedIn: true });
    } catch {
      set({ ids: [], signedIn: false });
    } finally {
      set({ loading: false });
    }
  },

  has: (productId) => get().ids.includes(productId),

  toggle: async (productId) => {
    const adding = !get().ids.includes(productId);
    try {
      if (adding) {
        await apiFetch("/api/wishlist", { method: "POST", body: JSON.stringify({ productId }) });
        set({ ids: [...get().ids, productId], signedIn: true });
      } else {
        await apiFetch(`/api/wishlist/${productId}`, { method: "DELETE" });
        set({ ids: get().ids.filter((id) => id !== productId) });
      }
      return { ok: true, added: adding };
    } catch (err) {
      if (err instanceof ClientApiError && err.status === 401) {
        set({ signedIn: false });
        return { ok: false, needsLogin: true, message: "Sign in to save items to your wishlist" };
      }
      return { ok: false, message: err instanceof Error ? err.message : "Could not update wishlist" };
    }
  },
}));
