import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/layout/section";
import { hero } from "@/content/familien";

export function FamilienHero() {
  return (
    <Section id="hero" className="mt-header pt-space-5 lg:pt-space-8">
      <div className="grid items-center gap-space-5 lg:grid-cols-[1.2fr_1fr] lg:gap-space-8">
        <div className="text-center lg:text-left">
          <p className="mb-space-3 text-overline uppercase text-muted">
            {hero.overline}
          </p>

          <h1 className="mb-space-4 text-display text-text">{hero.headline}</h1>

          <p className="mx-auto mb-space-5 max-w-[65ch] text-body-lg text-muted lg:mx-0">
            {hero.lead}
          </p>

          <Button asChild variant="primary" className="shadow-cta">
            <Link href={hero.cta.href}>
              <span>{hero.cta.label}</span>
              <Icon icon={ArrowRight} size={20} />
            </Link>
          </Button>
          <p className="mt-space-2 text-small text-muted">{hero.cta.note}</p>

          <p className="mt-space-5 inline-flex items-center gap-space-1 rounded-pill bg-surface px-space-3 py-space-2 text-small text-text shadow-sm">
            <Icon icon={Star} size={20} className="text-primary" />
            <span>{hero.rating}</span>
          </p>
        </div>

        <figure className="order-first mx-auto w-full max-w-sm lg:order-last lg:max-w-none">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={2835}
            height={1890}
            className="aspect-video w-full rounded-lg object-cover object-[25%_center] lg:aspect-4/5"
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 100vw"
            preload
            fetchPriority="high"
          />
          <figcaption className="mt-space-2 text-small text-muted">
            {hero.image.caption}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
