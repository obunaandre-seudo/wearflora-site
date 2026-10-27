import type { Metadata } from "next";
import { RotateCcw, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "How Wearflora delivers your order, and how to return it.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-5xl font-semibold text-brand-700">Shipping &amp; returns</h1>

      <section id="shipping" className="mt-10 rounded-lg border border-border bg-surface p-7">
        <div className="flex items-center gap-3">
          <Truck className="text-brand-400" size={24} />
          <h2 className="font-display text-2xl font-semibold text-brand-700">Shipping</h2>
        </div>
        <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-text/85">
          <li>We deliver nationwide with tracked delivery.</li>
          <li>Delivery costs a flat ₦5,000 per order, shown at checkout before you pay.</li>
          <li>Most orders ship within 2–4 business days and arrive within 3–10 days, depending on your state.</li>
          <li>You can follow every order from your account page under Order history.</li>
        </ul>
      </section>

      <section id="returns" className="mt-6 rounded-lg border border-border bg-surface p-7">
        <div className="flex items-center gap-3">
          <RotateCcw className="text-brand-400" size={24} />
          <h2 className="font-display text-2xl font-semibold text-brand-700">Returns</h2>
        </div>
        <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-text/85">
          <li>Unopened items can be returned within 14 days.</li>
          <li>To start a return, contact us with your order number and we&rsquo;ll guide you through the next steps.</li>
        </ul>
      </section>
    </div>
  );
}
