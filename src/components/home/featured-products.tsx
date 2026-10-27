import Link from "next/link";
import { ArrowRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import { ProductCard, ProductCardData } from "@/components/products/product-card";
import { SectionHeading } from "./section-heading";

const PROMISES = [
  { icon: Truck, title: "Nationwide delivery", text: "Flat ₦5,000 per order" },
  { icon: ShieldCheck, title: "Secure payments", text: "Card payments handled by Paystack" },
  { icon: Headphones, title: "Customer support", text: "We're here to help — just ask" },
];

export function FeaturedProducts({ products }: { products: ProductCardData[] }) {
  return (
    <section className="mx-auto max-w-[1536px] px-4 py-10 sm:px-8 lg:py-12">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Featured Collection" description="Our most loved pieces, handpicked for you." />
            <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700">
              View All Collections <ArrowRight size={15} />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-brand-200 bg-surface p-8 text-center text-sm text-muted">
              New pieces are on their way. Check back soon.
            </p>
          )}
        </div>

        <aside className="self-start rounded-lg bg-brand-100 p-7 sm:p-9" aria-label="Why shop with Wearflora">
          <ul className="divide-y divide-brand-200/70">
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-5 py-5 first:pt-0">
                <Icon size={38} strokeWidth={1.2} className="shrink-0 text-brand-500" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl font-semibold text-brand-700">{title}</p>
                  <p className="text-sm text-text/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center font-script text-5xl text-brand-500" aria-hidden="true">
            Wearflora
          </p>
        </aside>
      </div>
    </section>
  );
}
