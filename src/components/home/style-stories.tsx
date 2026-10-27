import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const STORIES = [
  {
    title: "Soft florals, bold feelings",
    category: "Dresses",
    href: "/products?category=dresses",
    image: "/wearflora/products/p1.jpg",
    alt: "Romantic floral dress from the Wearflora collection",
    note: "A little romance for wherever the day takes you.",
  },
  {
    title: "The art of a good layer",
    category: "Blazers",
    href: "/products?category=blazers",
    image: "/wearflora/products/p2.jpg",
    alt: "Tailored neutral blazer set",
    note: "Easy polish, with room to make it your own.",
  },
  {
    title: "Made for golden hour",
    category: "Tops",
    href: "/products?category=tops",
    image: "/wearflora/products/p3.jpg",
    alt: "A soft pink top with a ruffled neckline",
    note: "The little details make the whole look.",
  },
];

export function StyleStories() {
  return (
    <section className="mx-auto max-w-[1536px] px-4 py-16 sm:px-8 lg:py-24" aria-labelledby="style-stories-title">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-brand-500">
            <Sparkles size={14} aria-hidden="true" />
            A little inspiration
          </p>
          <h2 id="style-stories-title" className="mt-3 font-display text-4xl font-semibold text-brand-700 sm:text-5xl">
            The Wearflora edit
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Find your feeling, follow your own rhythm, and let the little things make the look.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {STORIES.map((story, index) => (
          <Link
            key={story.title}
            href={story.href}
            className={`group relative isolate min-h-[380px] overflow-hidden rounded-2xl bg-brand-100 sm:min-h-[470px] ${
              index === 1 ? "md:mt-10" : ""
            }`}
          >
            <Image
              src={story.image}
              alt={story.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b111e]/85 via-[#2b111e]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/75">{story.category}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{story.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-white/80">{story.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                Explore the edit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-surface-2 px-6 py-8 text-center sm:px-10 md:flex-row md:text-left">
        <div>
          <p className="font-script text-3xl text-brand-500">Wear it your way</p>
          <p className="mt-1 font-display text-2xl text-brand-700 sm:text-3xl">
            Your next favourite is waiting.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Explore the collection <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
