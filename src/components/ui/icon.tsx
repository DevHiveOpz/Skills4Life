import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = {
  /** A Lucide icon, e.g. `import { Heart } from "lucide-react"` */
  icon: LucideIcon;
  /** 20, 24 or 32px (CLAUDE.md 4.6) */
  size?: 20 | 24 | 32;
  /** Only for icons that stand on their own; decorative icons stay hidden from screen readers */
  label?: string;
  className?: string;
};

// The only way to show pictograms: Lucide, line style, stroke 1.75
export function Icon({
  icon: LucideComponent,
  size = 24,
  label,
  className,
}: IconProps) {
  return (
    <LucideComponent
      size={size}
      strokeWidth={1.75}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
