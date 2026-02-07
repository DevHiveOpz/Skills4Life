"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Brain, Target, Users, Clock, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Strukturierte Lernbegleitung",
    description:
      "Fixe Slots, klare Regeln, fester Ablauf. Dein Kind arbeitet in einer ruhigen Umgebung – nicht zuhause im Chaos.",
    features: ["Fixe wöchentliche Termine", "Klare Verhaltensregeln", "Ruhige Lernumgebung"],
    popular: true,
  },
  {
    icon: BookOpen,
    title: "Hausaufgaben-Begleitung",
    description:
      "Hausaufgaben werden vor Ort erledigt. Dein Kind kommt heim – fertig. Kein Streit, keine Diskussion.",
    features: ["Done-by-Exit Prinzip", "Selbständiges Arbeiten", "Kontrolle vor Abschluss"],
    popular: false,
  },
  {
    icon: Brain,
    title: "Lernstrategien & Motivation",
    description:
      "Wir vermitteln Techniken, die bleiben. Dein Kind lernt nicht nur Stoff – es lernt, wie Lernen funktioniert.",
    features: ["Individuelle Methoden", "Motivationsaufbau", "Prüfungsvorbereitung"],
    popular: false,
  },
  {
    icon: Users,
    title: "Eltern-Reporting",
    description:
      "Alle 2 Wochen ein Update: Was läuft? Wo stehen wir? Was sind die nächsten Schritte? Keine Blackbox.",
    features: ["2-Wochen-Updates", "Klare Fortschritte", "Transparente Kommunikation"],
    popular: false,
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 bg-[#FFF8F0]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Was wir bieten
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Ein System, das funktioniert
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Keine Einzelstunden. Keine Chaos-Flexibilität. Sondern strukturierte Begleitung mit klaren Regeln und sichtbaren Fortschritten.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden bg-white rounded-2xl ${
                  service.popular ? "border-[#E07B39] border-2" : "border-[#E8DCC8]"
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#E07B39] text-white hover:bg-[#C96A2D] text-xs rounded-full">
                      Beliebt
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 flex items-center justify-center mb-4 bg-[#FFF0E5] rounded-xl">
                    <service.icon size={28} className="text-[#E07B39]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-[#5A5A5A] text-sm mb-6 flex-grow">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center space-x-2 text-sm text-[#2D2D2D]"
                      >
                        <CheckCircle size={16} className="text-[#E07B39]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#E07B39] text-[#E07B39] hover:bg-[#E07B39] hover:text-white rounded-full"
                  >
                    <Link href="#booking">Mehr erfahren</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#E07B39] p-8 md:p-12 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-white mb-4">
                Bereit für Abende ohne Streit?
              </h3>
              <p className="text-white/90 mb-6">
                In 30 Minuten klären wir, ob unser System zu euch passt. Kostenlos, ohne Verpflichtung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-[#E07B39] rounded-full"
                >
                  <Link
                    href="#standortbestimmung"
                    className="flex items-center space-x-2"
                  >
                    <span>Standortbestimmung starten</span>
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E07B39] rounded-full"
                >
                  <Link href="#booking">Direkt Termin buchen</Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <Clock size={48} className="text-white" />
                  <div>
                    <p className="text-white font-semibold">Schnelle Antwort</p>
                    <p className="text-white/80 text-sm">
                      Innerhalb von 24 Stunden
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
