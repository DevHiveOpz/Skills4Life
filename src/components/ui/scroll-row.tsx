"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type ScrollRowProps = {
  /** Name of the row for screen readers, e.g. "Team von Skills4Life" */
  label: string;
  previousLabel: string;
  nextLabel: string;
  children: React.ReactNode;
  className?: string;
};

// A row of cards that slides sideways: swipe on phones, arrow buttons or
// keyboard (arrow keys inside the row) on larger screens. Children should be
// <li> elements.
export function ScrollRow({
  label,
  previousLabel,
  nextLabel,
  children,
  className,
}: ScrollRowProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoOn, setCanGoOn] = useState(true);

  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    setCanGoBack(list.scrollLeft > 1);
    setCanGoOn(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function slide(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector("li");
    const step = card ? card.getBoundingClientRect().width : list.clientWidth;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list.scrollBy({
      left: direction * step,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div className={cn("flex flex-col gap-space-4", className)}>
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={0}
        className="-mx-space-3 flex snap-x snap-mandatory gap-space-4 overflow-x-auto scroll-px-space-3 px-space-3 pb-space-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:mx-0 md:scroll-px-0 md:px-0"
      >
        {children}
      </ul>
      <div className="hidden justify-center gap-space-2 md:flex">
        <Button
          variant="secondary"
          className="size-touch px-0"
          onClick={() => slide(-1)}
          disabled={!canGoBack}
          aria-label={previousLabel}
        >
          <Icon icon={ChevronLeft} size={24} />
        </Button>
        <Button
          variant="secondary"
          className="size-touch px-0"
          onClick={() => slide(1)}
          disabled={!canGoOn}
          aria-label={nextLabel}
        >
          <Icon icon={ChevronRight} size={24} />
        </Button>
      </div>
    </div>
  );
}
