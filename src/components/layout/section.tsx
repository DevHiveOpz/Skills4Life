import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const tones = {
  bg: "bg-bg text-text",
  surface: "bg-surface text-text",
  primary: "bg-primary text-on-primary",
};

type SectionProps = React.ComponentProps<"section"> & {
  /** Background of the section: sand (default), off-white or navy */
  tone?: keyof typeof tones;
};

// One message per section: 64px padding on mobile, 96px on desktop
export function Section({ tone = "bg", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-space-7 lg:py-space-8", tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
