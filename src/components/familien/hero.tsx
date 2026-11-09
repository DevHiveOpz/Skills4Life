import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/background-video";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/layout/section";
import { hero } from "@/content/familien";

// The video is portrait: full width on phones, the right side on large screens
const mediaLayout =
  "absolute inset-y-0 right-0 h-full w-full object-cover object-[center_42%] lg:w-3/5";

export function FamilienHero() {
  return (
    <Section
      id="hero"
      tone="primary"
      className="relative isolate mt-header flex min-h-[calc(100svh-var(--size-header))] items-center"
    >
      <Image
        src={hero.video.poster}
        alt={hero.video.alt}
        fill
        // Shaded and soon replaced by the video, so phones get a small file
        sizes="(min-width: 1024px) 60vw, 50vw"
        preload
        fetchPriority="high"
        className={`-z-30 ${mediaLayout}`}
      />
      <BackgroundVideo
        src={hero.video.src}
        pauseLabel={hero.video.pause}
        playLabel={hero.video.play}
        className={`-z-20 ${mediaLayout}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-primary/75 lg:bg-transparent lg:bg-linear-to-r lg:from-primary lg:from-40% lg:via-primary/85 lg:via-55% lg:to-primary/30"
      />

      <div className="mx-auto max-w-[65ch] text-center lg:mx-0 lg:w-1/2 lg:text-left">
        <p className="mb-space-3 text-overline uppercase text-on-primary">
          {hero.overline}
        </p>

        <h1 className="mb-space-4 text-display text-on-primary">
          {hero.headline}
        </h1>

        <p className="mb-space-5 text-body-lg text-on-primary">{hero.lead}</p>

        <Button
          asChild
          variant="onDark"
          className="px-space-4 whitespace-normal shadow-cta sm:px-space-5"
        >
          <Link href={hero.cta.href}>
            <span>{hero.cta.label}</span>
            <Icon icon={ArrowRight} size={20} />
          </Link>
        </Button>
        <p className="mt-space-2 text-small text-on-primary">{hero.cta.note}</p>
      </div>
    </Section>
  );
}
