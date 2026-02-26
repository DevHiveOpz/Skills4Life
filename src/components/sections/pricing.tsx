"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Gift } from "lucide-react";

const packages = [
  {
    id: "3months",
    name: "3 Monate Begleitung",
    duration: "90 Min/Woche · 12 Begleitungen",
    priceMonth: "480",
    pricePerSession: "120",
    savings: null,
    featured: false,
    includes: [
      "Wöchentlicher Fixtermin à 90 Minuten",
      "Persönlicher Lernplan von Anfang an",
      "Eltern-Update nach jeder Begleitung",
      "Struktur, Regeln und klarer Ablauf",
    ],
    forWhom: "Für Familien, die erst schauen möchten, wie die Zusammenarbeit läuft.",
    cta: "Situation Ihres Kindes einschätzen",
  },
  {
    id: "6months",
    name: "6 Monate Begleitung",
    duration: "90 Min/Woche · 24 Begleitungen",
    priceMonth: "440",
    pricePerSession: "110",
    savings: "CHF 240 gespart",
    featured: true,
    includes: [
      "Wöchentlicher Fixtermin à 90 Minuten",
      "Persönlicher Lernplan von Anfang an",
      "Eltern-Update nach jeder Begleitung",
      "Struktur, Regeln und klarer Ablauf",
      "Standortbestimmung nach Monat 3",
    ],
    forWhom: "Für Familien, die nachhaltige Veränderung wollen, nicht nur kurzfristige Hilfe.",
    cta: "Situation Ihres Kindes einschätzen",
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Preise & Pakete
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-4">
            Zwei Wege. Ein Ziel.
          </h2>
          <p className="text-[#5A5A5A] text-lg max-w-xl mx-auto">
            Wir begleiten, nicht unterrichten. Jede Woche ein fester Termin, 90 Minuten, mit System.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="h-full"
            >
              <Card
                className={`h-full relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1 ${
                  pkg.featured
                    ? "bg-[#2F3E4E] border-0 shadow-2xl"
                    : "bg-white border border-[#E8DCC8] shadow-lg hover:shadow-xl"
                }`}
              >
                <CardContent className="p-8 flex flex-col h-full">

                  {/* Savings (only on 6 months) */}
                  {pkg.savings && (
                    <div className="mb-4">
                      <span className="inline-block text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">
                        {pkg.savings}
                      </span>
                    </div>
                  )}

                  {/* Name & Duration */}
                  <h3 className={`text-2xl font-bold mb-1 ${pkg.featured ? "text-white" : "text-[#2D2D2D]"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-6 ${pkg.featured ? "text-white/70" : "text-[#5A5A5A]"}`}>
                    {pkg.duration}
                  </p>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-2">
                      <span className={`text-4xl font-bold ${pkg.featured ? "text-white" : "text-[#2D2D2D]"}`}>
                        CHF {pkg.priceMonth}
                      </span>
                      <span className={`text-sm mb-1 ${pkg.featured ? "text-white/70" : "text-[#5A5A5A]"}`}>
                        / Monat
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${pkg.featured ? "text-white/60" : "text-[#9A9A9A]"}`}>
                      CHF {pkg.pricePerSession} pro Begleitung (90 Min)
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`my-6 h-px ${pkg.featured ? "bg-white/20" : "bg-[#E8DCC8]"}`} />

                  {/* Includes */}
                  <ul className="space-y-3 mb-6 flex-grow">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start space-x-3">
                        <CheckCircle
                          size={18}
                          className={`flex-shrink-0 mt-0.5 ${pkg.featured ? "text-white/80" : "text-[#2F3E4E]"}`}
                        />
                        <span className={`text-sm ${pkg.featured ? "text-white/90" : "text-[#2D2D2D]"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* For whom */}
                  <p className={`text-sm mb-6 border-t pt-4 ${
                    pkg.featured
                      ? "text-white/60 border-white/20"
                      : "text-[#5A5A5A] border-[#E8DCC8]"
                  }`}>
                    {pkg.forWhom}
                  </p>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full rounded-full font-semibold ${
                      pkg.featured
                        ? "bg-white text-[#2F3E4E] hover:bg-[#F3E8D7]"
                        : "bg-transparent border-2 border-[#2F3E4E] text-[#2F3E4E] hover:bg-[#2F3E4E] hover:text-white"
                    }`}
                  >
                    <Link href="#standortbestimmung" className="flex items-center justify-center space-x-2">
                      <span>{pkg.cta}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Investment Framing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#F3E8D7] rounded-2xl p-8 mb-8 text-center"
        >
          <p className="text-xs font-semibold text-[#2F3E4E] uppercase tracking-wider mb-2">
            Keine Kosten. Eine Investition.
          </p>
          <p className="text-2xl font-bold text-[#2D2D2D] mb-3">
            CHF 14.67 pro Tag.
          </p>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto">
            Weniger als ein Mittagessen. Diese Investition verändert den Startpunkt deines Kindes im Leben, nicht nur die nächste Prüfung. Viele Familien sind hierher gezogen, damit es ihre Kinder einmal besser haben. Wir helfen, dass dieser Plan aufgeht.
          </p>
        </motion.div>

        {/* Prospect Product: Kostenlose Situationsdiagnose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="border-2 border-[#2F3E4E] rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-[#2F3E4E] rounded-2xl flex items-center justify-center">
              <Gift size={28} className="text-white" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                <h3 className="font-headline text-xl text-[#2D2D2D]">
                  Kostenlose Situationsdiagnose
                </h3>
                <span className="text-xs font-bold bg-[#2F3E4E] text-white px-3 py-1 rounded-full">
                  Wert: CHF 150
                </span>
              </div>
              <p className="text-[#5A5A5A] text-sm">
                60 Minuten. Kein Verkauf. Wir schauen gemeinsam, wo dein Kind steht. Du gehst nach Hause mit drei konkreten Sofortmassnahmen und einer ehrlichen Einschätzung von uns.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                asChild
                className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-6 whitespace-nowrap"
              >
                <Link href="#standortbestimmung">
                  Situation Ihres Kindes einschätzen
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-[#9A9A9A] text-xs mt-6"
        >
          Welches Paket das richtige ist, finden wir gemeinsam heraus, nach der Erstberatung.
        </motion.p>

      </div>
    </section>
  );
}
