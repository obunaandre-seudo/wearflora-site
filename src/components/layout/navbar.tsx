"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, Truck, User, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./logo";
import { useCartStore } from "@/store/cart-store";
import { useCurrentUser } from "@/lib/use-current-user";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.count());
  const { user } = useCurrentUser();

  useEffect(() => setMounted(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(`/products${q ? `?q=${encodeURIComponent(q)}` : ""}`);
    setMobileOpen(false);
  }

  const cartCount = mounted ? count : 0;

  return (
    <>
      {/* Announcement bar — uses the store's real flat-rate delivery fee (see /api/checkout). */}
      <div className="bg-brand-400 text-white">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-10">
          <p className="flex items-center gap-2">
            <Truck size={14} aria-hidden="true" />
            <span>Nationwide delivery for a flat ₦5,000 per order</span>
          </p>
          <nav className="hidden items-center gap-4 sm:flex" aria-label="Utility">
            <Link href="/account" className="hover:underline">Track your order</Link>
            <span aria-hidden="true" className="h-3 w-px bg-white/50" />
            <Link href="/shipping-returns" className="hover:underline">Shipping &amp; returns</Link>
            <span aria-hidden="true" className="h-3 w-px bg-white/50" />
            <Link href="/contact" className="hover:underline">Help</Link>
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>

          <Link href="/" aria-label="Wearflora home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "border-b py-1.5 text-sm transition-colors",
                    active ? "border-brand-400 text-brand-500" : "border-transparent text-text hover:text-brand-400"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden w-64 items-center xl:flex" role="search">
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 transition focus-within:border-brand-300">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for styles, brands…"
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted/70"
                aria-label="Search products"
              />
              <button type="submit" aria-label="Search" className="text-brand-700">
                <Search size={17} />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
            <Link
              href="/products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 transition hover:bg-surface-2 xl:hidden"
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>
            <Link
              href={user ? "/account" : "/login"}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-700 transition hover:bg-surface-2 sm:flex"
              aria-label={user ? "Your account" : "Sign in"}
            >
              <User size={20} />
            </Link>
            <Link
              href="/wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-700 transition hover:bg-surface-2 sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-700 transition hover:bg-surface-2"
              aria-label={`Shopping bag, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-brand-950/40" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-bg px-6 py-5"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={submitSearch} className="mt-6 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3" role="search">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for styles…"
                  className="w-full bg-transparent text-base text-text outline-none"
                  aria-label="Search products"
                />
                <button type="submit" aria-label="Search" className="text-brand-700">
                  <Search size={18} />
                </button>
              </form>

              <nav className="mt-6 flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={clsx(
                      "border-b border-border py-4 font-display text-2xl",
                      isActive(pathname, link.href) ? "text-brand-400" : "text-brand-700"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <Link href={user ? "/account" : "/login"} className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-brand-700">
                  <User size={16} /> {user ? "My account" : "Sign in"}
                </Link>
                <Link href="/wishlist" className="flex items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-brand-700">
                  <Heart size={16} /> Wishlist
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
