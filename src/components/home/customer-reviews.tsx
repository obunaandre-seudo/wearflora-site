import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

interface CustomerReview {
  id: string;
  authorName: string;
  rating: number;
  title: string | null;
  body: string | null;
  product: { name: string; slug: string } | null;
}

const SAMPLE_REVIEWS: CustomerReview[] = [
  {
    id: "sample-1",
    authorName: "Amara J.",
    rating: 5,
    title: "Beautiful from the moment I opened it",
    body: "The fabric feels lovely and the fit is just right. I can already tell this will be one of my favourite pieces.",
    product: null,
  },
  {
    id: "sample-2",
    authorName: "Nia W.",
    rating: 5,
    title: "Effortlessly elegant",
    body: "I wore it to dinner and got so many compliments. It feels polished without being uncomfortable.",
    product: null,
  },
  {
    id: "sample-3",
    authorName: "Zara K.",
    rating: 5,
    title: "A new wardrobe favourite",
    body: "The details are even prettier in person, and it was easy to style. I would happily shop Wearflora again.",
    product: null,
  },
  {
    id: "sample-4",
    authorName: "Tomi A.",
    rating: 5,
    title: "Lovely quality and fit",
    body: "It fits beautifully and feels thoughtfully made. Exactly the kind of timeless piece I was looking for.",
    product: null,
  },
  {
    id: "sample-5",
    authorName: "Leila R.",
    rating: 5,
    title: "Made getting dressed feel special",
    body: "The style is so feminine and versatile. I dressed it up for an event and can see myself wearing it casually too.",
    product: null,
  },
];

export function CustomerReviews({ reviews }: { reviews: CustomerReview[] }) {
  const displayedReviews = reviews.length > 0 ? reviews : SAMPLE_REVIEWS;
  const showingSamples = reviews.length === 0;

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface px-4 py-16 sm:px-8 lg:py-24" aria-labelledby="customer-reviews-title">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-500">Kind words, good things</p>
          <h2 id="customer-reviews-title" className="mt-3 font-display text-4xl font-semibold text-brand-700 sm:text-5xl">
            Love from the community
          </h2>
          <p className="mt-3 text-sm text-muted" role={showingSamples ? "note" : undefined}>
            {showingSamples
              ? "Sample reviews shown for preview. Verified customer reviews will appear here as they come in."
              : "Real thoughts from people who found a piece that feels like them."}
          </p>
        </div>

        {displayedReviews.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {displayedReviews.map((review) => (
              <article key={review.id} className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6 shadow-card sm:p-7">
                <Quote size={25} className="text-brand-300" aria-hidden="true" />
                {showingSamples && (
                  <span className="mt-3 w-fit rounded-full bg-brand-100 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    Sample review
                  </span>
                )}
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
                  {review.product && (
                    <Link href={`/products/${review.product.slug}`} className="mt-1 inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700">
                      {review.product.name} <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
