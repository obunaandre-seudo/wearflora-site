"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Bloom } from "@/components/ui/bloom-loader";

/**
 * Slim top-of-page loading bar for client-side route transitions.
 *
 * The App Router doesn't expose "navigation started" / "navigation finished"
 * events directly, so this uses the same approach most nprogress-style
 * implementations settle on: patch `history.pushState` to catch the moment
 * Next kicks off a transition, and treat a change in the resolved
 * pathname/search params as "done".
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showOverlay, setShowOverlay] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const start = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => setShowOverlay(true), 220);
  }, []);

  const finish = useCallback(() => {
    if (overlayTimeoutRef.current) {
      clearTimeout(overlayTimeoutRef.current);
      overlayTimeoutRef.current = null;
    }
    setShowOverlay(false);
    hideTimeoutRef.current = setTimeout(() => {
      setShowOverlay(false);
    }, 250);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      start();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);
    window.history.pushState = (...args: Parameters<typeof window.history.pushState>) => {
      start();
      return originalPushState(...args);
    };
    // router.replace() (used for things like redirects and search-param
    // updates) calls replaceState, not pushState — without this, those
    // navigations never showed a progress bar at all.
    window.history.replaceState = (...args: Parameters<typeof window.history.replaceState>) => {
      start();
      return originalReplaceState(...args);
    };
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [start]);

  useEffect(() => {
    // Skip the initial mount — there's no "navigation" to finish yet.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    finish();
    // searchParams is intentionally read via toString(): Next returns a new
    // object reference even when the actual params haven't changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  useEffect(
    () => () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    },
    []
  );

  return (
    <>
      {showOverlay && (
        <div className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-bg/60 backdrop-blur-sm" role="status" aria-label="Loading page">
          <Bloom size={88} showOrbit={false} />
        </div>
      )}
    </>
  );
}
