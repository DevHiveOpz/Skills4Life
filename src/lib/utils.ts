import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the brand token classes from globals.css, so that e.g.
// "text-sm" and "text-button" are recognised as conflicting font sizes.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "h1",
        "h2",
        "h3",
        "body-lg",
        "body",
        "small",
        "overline",
        "button",
      ],
      spacing: [
        "space-1",
        "space-2",
        "space-3",
        "space-4",
        "space-5",
        "space-6",
        "space-7",
        "space-8",
        "touch",
        "step",
        "stage-dot",
        "logo",
        "header",
      ],
      radius: ["pill"],
      shadow: ["cta"],
      container: ["page"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
