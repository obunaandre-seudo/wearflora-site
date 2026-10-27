import type { ReactNode } from "react";

/** Thin line icons for the fashion categories. Matched by category slug/name so they follow whatever categories are in the database. */
const paths: Record<string, ReactNode> = {
  dress: (
    <>
      <path d="M16 4l2 7-2 6-6 19h20l-6-19-2-6 2-7" />
      <path d="M16 17h8" />
    </>
  ),
  top: <path d="M14 6l-7 5 3 6 4-2v19h12V15l4 2 3-6-7-5c-1 3-11 3-12 0z" />,
  trousers: <path d="M13 5h14l2 30h-7.5L20 15l-1.5 20H11z" />,
  blazer: (
    <>
      <path d="M14 5l6 9 6-9 6 6-3 24H11L8 11z" />
      <path d="M20 14v21M24 22h2" />
    </>
  ),
  skirt: (
    <>
      <path d="M13 8h14l6 25H7z" />
      <path d="M13 12h14" />
    </>
  ),
  outerwear: (
    <>
      <path d="M15 5h10l6 5v25H9V10z" />
      <path d="M20 5v30M15 5l5 7 5-7M13 21h4M23 21h4" />
    </>
  ),
  bag: (
    <>
      <path d="M9 15h22l-2 19H11z" />
      <path d="M15 15v-4a5 5 0 0 1 10 0v4" />
    </>
  ),
  shoes: (
    <>
      <path d="M7 29c5 0 9-6 9-17l5 6c3 3 8 4 12 6v5H7z" />
      <path d="M10 33v3" />
    </>
  ),
  accessories: (
    <>
      <path d="M20 20L8 12v16z" />
      <path d="M20 20l12-8v16z" />
      <circle cx="20" cy="20" r="2.2" />
      <path d="M18 22l-4 9M22 22l4 9" />
    </>
  ),
  default: (
    <>
      <path d="M20 35V17" />
      <circle cx="20" cy="11" r="4" />
      <circle cx="13.5" cy="15" r="3" />
      <circle cx="26.5" cy="15" r="3" />
      <path d="M20 28c-4-1-7-4-8-8 4 0 7 3 8 8z" />
    </>
  ),
};

function keyFor(slug: string, name: string): keyof typeof paths {
  const v = `${slug} ${name}`.toLowerCase();
  if (/dress|gown/.test(v)) return "dress";
  if (/blazer|suit/.test(v)) return "blazer";
  if (/outerwear|coat|jacket|trench/.test(v)) return "outerwear";
  if (/trouser|pant|jean/.test(v)) return "trousers";
  if (/skirt/.test(v)) return "skirt";
  if (/bag|handbag|purse/.test(v)) return "bag";
  if (/shoe|heel|sandal|boot|footwear/.test(v)) return "shoes";
  if (/accessor|jewel|scarf|belt/.test(v)) return "accessories";
  if (/\btops?\b|shirt|blouse|tee|knit/.test(v)) return "top";
  return "default";
}

export function CategoryIcon({ slug, name, size = 30 }: { slug: string; name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[keyFor(slug, name)]}
    </svg>
  );
}
