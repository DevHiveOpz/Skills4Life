"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  BookOpen,
  Brain,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Kennenlerngespräch",
    description:
      "30 Minuten, kostenlos. Wir klären, ob wir zusammenpassen – ohne Verkaufsdruck.",
    detail: "Innerhalb von 48h",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Fixe Slots reservieren",
    description:
      "Dein Kind bekommt feste Zeiten. Kein Hin-und-Her, keine Diskussion.",
    detail: "Start in 7–10 Tagen",
  },
  {
    number: "03",
    icon: Users,
    title: "Strukturierte Begleitung",
    description:
      "Klare Regeln, fester Ablauf. Hausaufgaben werden erledigt – nicht zuhause.",
    detail: "Wöchentliche Sitzungen",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Sichtbare Fortschritte",
    description:
      "Alle 2 Wochen ein Update: Was läuft gut? Was sind die nächsten Schritte?",
    detail: "Transparentes Reporting",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Fixe Slots & klare Regeln",
    description: "Verbindlicher Rahmen, keine Chaos-Flexibilität",
  },
  {
    icon: BookOpen,
    title: "Done-by-Exit Prinzip",
    description: "Hausaufgaben werden vor Ort erledigt, nicht zuhause",
  },
  {
    icon: Brain,
    title: "Lernstrategien & Motivation",
    description: "Dein Kind lernt nicht nur Stoff – es lernt, wie Lernen funktioniert",
  },
  {
    icon: MessageSquare,
    title: "2-Wochen-Reporting",
    description: "Klare Fortschritte, transparente Kommunikation, keine Blackbox",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="how-it-works" className="py-24 bg-[#FFF8F0]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            So funktioniert's
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Ein System – kein Termin
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Von der ersten Anfrage bis zum regelmässigen Fortschritt: So läuft
            die Zusammenarbeit.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#E8DCC8] z-0"
                  style={{ width: "calc(100% - 2rem)" }}
                />
              )}

              <Card className="h-full border border-[#E8DCC8] shadow-lg bg-white rounded-2xl relative z-10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-[#E07B39]">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 bg-[#E07B39] rounded-xl flex items-center justify-center">
                      <step.icon className="text-white" size={24} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-[#5A5A5A] text-sm mb-4">
                    {step.description}
                  </p>

                  <div className="inline-block bg-[#FFF0E5] px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-[#E07B39]">
                      {step.detail}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="font-headline text-2xl text-[#2D2D2D] text-center mb-10">
            Was du bekommst
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="bg-white p-6 rounded-2xl border border-[#E8DCC8] shadow-md h-full">
                  <div className="w-12 h-12 bg-[#E07B39] rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-bold text-[#2D2D2D] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-[#5A5A5A] text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-[#E07B39] p-8 md:p-12 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-white mb-4">
                Bereit für Abende ohne Streit?
              </h3>
              <p className="text-white/90 mb-6">
                In 30 Minuten klären wir, ob unser System zu euch passt.
                Kostenlos, ohne Verpflichtung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-[#E07B39] rounded-full"
                >
                  <Link href="#booking" className="flex items-center space-x-2">
                    <span>Kennenlerngespräch buchen</span>
                    <ArrowRight size={18} />
                  </Link>
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
