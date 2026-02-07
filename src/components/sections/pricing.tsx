"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar } from "lucide-react";

const packages = [
  {
    name: "Basis",
    frequency: "1×/Woche",
    duration: "45 Min",
    price: "260",
    features: [
      "Strukturierte Lernbegleitung",
      "Wöchentliche Sitzung",
      "Individuelle Betreuung",
    ],
    popular: false,
  },
  {
    name: "Standard",
    frequency: "1×/Woche",
    duration: "90 Min",
    price: "440",
    features: [
      "Strukturierte Lernbegleitung",
      "Doppelte Sitzungsdauer",
      "Vertiefte Betreuung",
      "Mehr Zeit für Übungen",
    ],
    popular: true,
  },
  {
    name: "Intensiv",
    frequency: "2×/Woche",
    duration: "je 90 Min",
    price: "720",
    features: [
      "Strukturierte Lernbegleitung",
      "Zwei Sitzungen pro Woche",
      "Maximale Entlastung",
      "Intensive Betreuung",
      "Schnellere Fortschritte",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Begleitung statt Nachhilfe
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Unsere Begleitungspakete
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Alle Pakete beinhalten strukturierte Lernbegleitung. Der Unterschied
            liegt im Grad der Entlastung.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden rounded-2xl ${
                  pkg.popular
                    ? "border-[#E07B39] border-2 bg-white"
                    : "border-[#E8DCC8] bg-white"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-[#E07B39] text-white text-center py-2 text-sm font-semibold">
                    Beste Wahl
                  </div>
                )}

                <CardContent className={`p-8 flex flex-col h-full ${pkg.popular ? "pt-14" : ""}`}>
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">
                    {pkg.name}
                  </h3>

                  <div className="flex items-center space-x-4 mb-6 text-[#5A5A5A]">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-[#E07B39]" />
                      <span className="text-sm">{pkg.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-[#E07B39]" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#2D2D2D]">
                      CHF {pkg.price}
                    </span>
                    <span className="text-[#5A5A5A] ml-2">/ Monat</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start space-x-3 text-[#2D2D2D]"
                      >
                        <CheckCircle
                          size={20}
                          className="text-[#E07B39] flex-shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full rounded-full ${
                      pkg.popular
                        ? "bg-[#E07B39] hover:bg-[#C96A2D] text-white"
                        : "bg-transparent border-2 border-[#E07B39] text-[#E07B39] hover:bg-[#E07B39] hover:text-white"
                    }`}
                  >
                    <Link href="#booking">Jetzt buchen</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#5A5A5A] text-sm">
            Feste Begleitungspakete für spürbare Entlastung im Familienalltag.
            <br />
            Keine Einzelstunden. Keine Nachhilfe. Nur strukturierte Begleitung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
