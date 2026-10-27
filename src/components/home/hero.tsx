"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

interface HeroSlide {
  eyebrow: string;
  title: [string, string];
  text: [string, string];
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
}

/**
 * Add more objects here to turn the hero into a carousel — the arrows and dots appear
 * automatically as soon as there is more than one slide.
 */
const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Wearflora",
    title: ["Elegant Looks", "for Every Chapter"],
    text: ["Timeless styles. Modern femininity.", "Discover fashion that feels like you."],
    cta: { label: "Shop New Arrivals", href: "/new-arrivals" },
    image: "/wearflora/hero-model.jpg",
    imageAlt: "Woman in a blush satin puff-sleeve top",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const multiple = SLIDES.length > 1;

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section className="mx-auto grid max-w-[1536px] gap-3 lg:grid-cols-[minmax(0,1fr)_28%]" aria-label="Featured">
      {/* Main slide */}
      <div className="relative flex flex-col overflow-hidden bg-gradient-to-r from-brand-100 via-[#F6CDD5] to-[#EBB0BE] dark:from-[#241a20] dark:via-[#3c2732] dark:to-[#522e3d] lg:block lg:h-[440px]">
        {[
          { cls: "left-[6%] top-[10%] h-6 w-6", d: "0s" },
          { cls: "left-[38%] top-[8%] h-4 w-4", d: "-4s" },
          { cls: "left-[44%] bottom-[14%] h-5 w-5", d: "-8s" },
          { cls: "left-[3%] bottom-[10%] h-4 w-4", d: "-2s" },
        ].map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`wf-drift pointer-events-none absolute z-[1] hidden lg:block ${p.cls}`}
            style={{ animationDelay: p.d }}
          >
            <path d="M12 2c5 4 7 9 0 20C5 11 7 6 12 2Z" fill="#fff" fillOpacity="0.55" stroke="#C65D79" strokeOpacity="0.35" strokeWidth="0.6" />
          </svg>
        ))}
        <div
          key={index}
          className="relative z-10 animate-hero-in px-6 pb-2 pt-10 sm:px-10 lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-[54%] lg:flex-col lg:justify-center lg:px-14 lg:py-0"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-700">{slide.eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.7rem] font-semibold leading-[1.02] text-brand-700 sm:text-6xl lg:text-[4.1rem]">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <p className="mt-5 max-w-md font-display text-xl leading-snug text-brand-700/90 sm:text-[1.35rem]">
            {slide.text[0]}
            <br className="hidden sm:block" /> {slide.text[1]}
          </p>
          <div className="mt-7">
            <ButtonLink href={slide.cta.href} size="lg">
              {slide.cta.label}
              <ArrowRight size={17} />
            </ButtonLink>
          </div>
        </div>

        <div className="hero-fade relative h-[380px] w-full sm:h-[460px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[62%]">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 60vw"
            className="object-cover object-[60%_top]"
          />
        </div>

        {multiple && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute bottom-5 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-card transition hover:bg-brand-50"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-card transition hover:bg-brand-50"
            >
              <ArrowRight size={18} />
            </button>
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Slides">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-brand-700" : "bg-brand-700/30"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* New arrivals panel */}
      <div className="relative min-h-[260px] overflow-hidden bg-brand-100 lg:h-[440px]">
        <Image
          src="/wearflora/new-arrivals.jpg"
          alt=""
          fill
          sizes="(max-width:1024px) 100vw, 28vw"
          className="object-cover object-right"
        />
        <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-center px-6 py-10 sm:px-10 lg:px-9">
          <h2 className="font-display text-4xl font-semibold text-brand-700 sm:text-5xl">New Arrivals</h2>
          <p className="mt-3 max-w-[15rem] font-display text-lg leading-snug text-brand-700/90">
            Fresh styles. Same beautiful you.
          </p>
          <div className="mt-6">
            <Link
              href="/new-arrivals"
              className="wf-sheen inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-medium text-white shadow-glow transition hover:bg-brand-600"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
