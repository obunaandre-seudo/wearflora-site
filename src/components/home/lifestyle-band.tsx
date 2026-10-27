function Blossom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="#EFB7C3" stroke="#C65D79" strokeWidth="1" strokeOpacity="0.5">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="60" cy="30" rx="18" ry="28" transform={`rotate(${deg} 60 60)`} fillOpacity="0.75" />
        ))}
      </g>
      <circle cx="60" cy="60" r="8" fill="#C9A46A" />
    </svg>
  );
}

/** Brand statement band that closes the homepage, right above the footer. */
export function LifestyleBand() {
  return (
    <section className="relative overflow-hidden bg-brand-100 py-14 text-center sm:py-16">
      <Blossom className="absolute -left-10 -top-6 h-40 w-40 opacity-80 sm:h-56 sm:w-56" />
      <Blossom className="absolute -bottom-10 -right-8 h-44 w-44 opacity-80 sm:h-60 sm:w-60" />
      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-brand-700">More Than Just Clothes</p>
        <div className="mt-3 flex items-center justify-center gap-5 px-6">
          <span className="hidden h-px w-24 bg-brand-500/60 sm:block" aria-hidden="true" />
          <p className="font-display text-5xl italic text-brand-700 sm:text-6xl">It&rsquo;s a lifestyle</p>
          <span className="hidden h-px w-24 bg-brand-500/60 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
