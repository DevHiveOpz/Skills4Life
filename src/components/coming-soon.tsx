import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function ComingSoon({ audience }: { audience: string }) {
  return (
    <section className="min-h-[100svh] bg-[#F3E8D7] flex items-center justify-center px-4 py-28">
      <div className="text-center max-w-md">
        <Logo className="text-5xl md:text-6xl mb-10" />
        <h1 className="font-headline text-3xl md:text-4xl text-[#0B0B0B] mb-3">
          {audience}: bald verfügbar
        </h1>
        <p className="text-[#5A5A5A] mb-8">
          Diese Seite ist im Aufbau. Bis dahin erreichen Sie uns unter{" "}
          <a
            href="mailto:skills4life.learning@gmail.com"
            className="text-[#2F3E4E] underline font-medium"
          >
            skills4life.learning@gmail.com
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#2F3E4E] font-semibold"
        >
          <ArrowLeft size={16} />
          Zurück zur Auswahl
        </Link>
      </div>
    </section>
  );
}
