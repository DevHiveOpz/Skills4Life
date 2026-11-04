import { cn } from "@/lib/utils";

type StageTrackProps = {
  /** The stage the child is at now (1 to total) */
  current: number;
  total?: number;
  className?: string;
};

// Brand element (CLAUDE.md 4.5): reached = filled green, current = gold ring, open = grey ring
export function StageTrack({ current, total = 5, className }: StageTrackProps) {
  const stages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      role="img"
      aria-label={`Etappe ${current} von ${total}`}
      className={cn("flex w-full items-center", className)}
    >
      {stages.map((stage) => {
        const reached = stage < current;
        const isCurrent = stage === current;
        return (
          <div
            key={stage}
            className={cn("flex items-center", stage < total && "flex-1")}
          >
            <span
              className={cn(
                "size-stage-dot shrink-0 rounded-pill border-2",
                reached && "border-success bg-success",
                isCurrent && "border-spark bg-surface",
                !reached && !isCurrent && "border-muted bg-surface",
              )}
            />
            {stage < total && (
              <span
                className={cn(
                  "h-0.5 flex-1",
                  reached ? "bg-success" : "bg-surface-muted",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
