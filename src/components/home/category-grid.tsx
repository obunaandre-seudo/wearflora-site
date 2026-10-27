import Link from "next/link";
import { CategoryIcon } from "./category-icons";

export function CategoryGrid({ categories }: { categories: { name: string; slug: string }[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1536px] bg-bg px-4 py-8 sm:px-8" aria-label="Shop by category">
      <ul className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-2 sm:gap-8 xl:justify-between">
        {categories.map((cat) => (
          <li key={cat.slug} className="snap-start">
            <Link
              href={`/products?category=${cat.slug}`}
              className="group flex min-w-[76px] flex-col items-center gap-3 text-center"
            >
              <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-brand-200/60 bg-brand-100 text-brand-500 transition group-hover:border-brand-300 group-hover:bg-brand-200 group-hover:text-brand-700">
                <CategoryIcon slug={cat.slug} name={cat.name} />
              </span>
              <span className="text-sm text-text">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
