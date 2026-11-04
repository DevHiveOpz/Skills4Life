import { cn } from "@/lib/utils";

// Page width: max. 1200px, 16px side margin on mobile, 24px from 768px
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-page px-space-3 md:px-space-4",
        className,
      )}
      {...props}
    />
  );
}
