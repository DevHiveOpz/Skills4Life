import { cn } from "@/lib/utils";

// Vector redraw of the Skills4Life logo (CLAUDE.md 3): mountain above the
// wordmark, centred, in one colour. Size it with a font-size class (e.g. text-lg);
// the protective space around it (= height of the mountain) is up to the caller.

const MOUNTAIN_PATH =
  "M0 41 L40 12 L49 18 L69 0 L91 16 L97 12 L136 41 L101 23 L99 29 L72 13 L66 18 L80 31 L56 25 L41 22 L60 38 L30 27 Z";

const colors = {
  /** Ink on sand or off-white (standard) */
  dark: "text-text",
  /** Off-white on navy */
  light: "text-on-primary",
};

type Variant = keyof typeof colors;

/** The mountain signet on its own (favicon, chat button) */
export function MountainMark({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 136 41"
      className={cn("h-auto", colors[variant], className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={MOUNTAIN_PATH} />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="Skills4Life"
      className={cn("inline-flex min-w-logo flex-col items-center", colors[variant], className)}
    >
      <MountainMark variant={variant} className="mb-[0.18em] w-[1.7em] text-inherit" />
      <span className="font-logo leading-none tracking-[0.02em]">SKILLS4LIFE</span>
    </span>
  );
}
