import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

interface CustomerReview {
  id: string;
  authorName: string;
  rating: number;
  title: string | null;
  body: string | null;
  product: { name: string; slug: string };
}

export function CustomerReviews({ reviews }: { reviews: CustomerReview[] }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface px-4 py-16 sm:px-8 lg:py-24" aria-labelledby="customer-reviews-title">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Kind words, good things</p>
          <h2 id="customer-reviews-title" className="mt-3 font-display text-4xl font-semibold text-brand-700 sm:text-5xl">
            Notes from the community
          </h2>
          <p className="mt-3 text-sm text-muted">
            Real thoughts from people who found a piece that feels like them.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6 shadow-card sm:p-7">
                <Quote size={25} className="text-brand-300" aria-hidden="true" />
                <div className="mt-5 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={15}
                      className={index < review.rating ? "fill-solar-500 text-solar-500" : "text-border"}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {review.title && <h3 className="mt-4 font-display text-xl font-semibold text-brand-700">{review.title}</h3>}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text/85">
                  {review.body || "A customer shared a rating for this piece."}
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-text">{review.authorName}</p>
                  <Link href={`/products/${review.product.slug}`} className="mt-1 inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700">
                    {review.product.name} <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-brand-300/70 bg-bg px-6 py-10 text-center sm:px-12">
            <p className="font-script text-3xl text-brand-500">Your story belongs here</p>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
              Our community is just getting dressed. Once shoppers share product reviews, their real words will appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Find your first favourite <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
