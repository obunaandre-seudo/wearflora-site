"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export function ProductGallery({ images, name }: { images: { url: string; altText?: string | null }[]; name: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : [{ url: "", altText: name }];

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-100">
        {list[active]?.url ? (
          <Image
            src={list[active].url}
            alt={list[active].altText || name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">No image available</div>
        )}
      </div>

      {list.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "relative h-20 w-16 flex-shrink-0 overflow-hidden border-2 transition",
                active === i ? "border-brand-400" : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
            >
              {img.url && <Image src={img.url} alt={img.altText || name} fill className="object-cover" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
