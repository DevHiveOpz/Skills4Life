// Vector redraw of the Skills4Life logo (mountain + wordmark), so it stays
// sharp at any size and has no background box like the old logo.jpeg.

const MOUNTAIN_PATH =
  "M0 41 L40 12 L49 18 L69 0 L91 16 L97 12 L136 41 L101 23 L99 29 L72 13 L66 18 L80 31 L56 25 L41 22 L60 38 L30 27 Z";

export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 136 41"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={MOUNTAIN_PATH} />
    </svg>
  );
}

type LogoProps = {
  /** "stacked" = mountain above the wordmark (like the original), "inline" = side by side for the header */
  variant?: "stacked" | "inline";
  className?: string;
};

export function Logo({ variant = "inline", className = "" }: LogoProps) {
  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-center text-[#0B0B0B] ${className}`}
        aria-label="Skills4Life"
        role="img"
      >
        <MountainMark className="w-[28%] h-auto mb-[3%]" />
        <span className="font-logo leading-none tracking-[0.02em]">
          SKILLS4LIFE
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[#0B0B0B] ${className}`}
      aria-label="Skills4Life"
      role="img"
    >
      <MountainMark className="w-9 h-auto" />
      <span className="font-logo text-lg leading-none tracking-[0.04em]">
        SKILLS4LIFE
      </span>
    </span>
  );
}
