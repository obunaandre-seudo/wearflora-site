import Link from "next/link";
import { Logo } from "./logo";
import { NewsletterForm } from "@/components/home/newsletter-form";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Shop all", href: "/products" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Collections", href: "/collections" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Wearflora",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "My account", href: "/account" },
      { label: "Track an order", href: "/account" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "FAQs", href: "/about#faq" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-700 text-brand-100">
      <div className="mx-auto max-w-[1536px] px-4 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug text-white">
              More Than Just Clothes. It&rsquo;s a Lifestyle.
            </p>
            <p className="mt-3 max-w-xs text-sm text-brand-200">
              Timeless styles. Modern femininity. Fashion that feels like you.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-xl font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-brand-100/90 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-white/15 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h4 className="font-display text-2xl font-semibold text-white">Join the Wearflora list</h4>
              <p className="mt-1 text-sm text-brand-200">New arrivals and seasonal edits, straight to your inbox.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-brand-200 sm:flex-row">
          <p>© {new Date().getFullYear()} Wearflora. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
