import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, RotateCcw, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Wearflora",
  description: "Wearflora is women's fashion with timeless styles and modern femininity.",
};

const FAQS = [
  { q: "How long does delivery take?", a: "Most orders ship within 2–4 business days and arrive within 3–10 days depending on your state." },
  { q: "How much is delivery?", a: "Delivery is a flat ₦5,000 per order, shown at checkout before you pay." },
  { q: "Can I return an item?", a: "Unopened items can be returned within 14 days. Contact us with your order number to start a return." },
  { q: "How do I track my order?", a: "Sign in and open your account. Every order and its status is listed under Order history." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-5xl font-semibold text-brand-700">About Wearflora</h1>
        <p className="mt-4 font-display text-2xl italic text-brand-500">More Than Just Clothes. It&rsquo;s a Lifestyle.</p>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-text/85">
        Wearflora is women&rsquo;s fashion for every chapter: timeless styles, modern femininity, and pieces that feel
        like you. Browse dresses, tops, trousers, blazers and more, save your favourites to a wishlist, and check out
        securely online.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <Link href="/shipping-returns#shipping" className="rounded-lg border border-border bg-surface p-6 transition hover:border-brand-300">
          <Truck className="text-brand-400" size={24} />
          <h2 className="mt-3 font-display text-2xl font-semibold text-brand-700">Shipping</h2>
          <p className="mt-2 text-sm text-text/80">Nationwide, tracked delivery for a flat ₦5,000 per order.</p>
        </Link>
        <Link href="/shipping-returns#returns" className="rounded-lg border border-border bg-surface p-6 transition hover:border-brand-300">
          <RotateCcw className="text-brand-400" size={24} />
          <h2 className="mt-3 font-display text-2xl font-semibold text-brand-700">Returns</h2>
          <p className="mt-2 text-sm text-text/80">Unopened items can be returned within 14 days.</p>
        </Link>
      </div>

      <div id="faq" className="mt-14">
        <div className="flex items-center gap-3">
          <HelpCircle className="text-brand-400" size={24} />
          <h2 className="font-display text-3xl font-semibold text-brand-700">Frequently asked questions</h2>
        </div>
        <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-surface">
          {FAQS.map((f) => (
            <div key={f.q} className="p-5">
              <h3 className="text-sm font-semibold text-brand-700">{f.q}</h3>
              <p className="mt-1.5 text-sm text-text/80">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
