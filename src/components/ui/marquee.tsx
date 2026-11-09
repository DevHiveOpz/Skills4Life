import { cn } from "@/lib/utils";

type MarqueeProps = {
  /** Name of the row for screen readers */
  label: string;
  /** <li> elements */
  children: React.ReactNode;
  className?: string;
};

// A row that moves sideways in an endless loop, across the full screen width.
// The content appears twice so the loop has no visible seam. It stops while
// the mouse is on it, a finger holds it or it has keyboard focus.
export function Marquee({ label, children, className }: MarqueeProps) {
  const list = "flex gap-space-4 pr-space-4";

  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "group relative left-1/2 w-screen -translate-x-1/2 overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus",
        className,
      )}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
        <ul className={list}>{children}</ul>
        <ul className={list} aria-hidden="true">
          {children}
        </ul>
      </div>
    </div>
  );
}
