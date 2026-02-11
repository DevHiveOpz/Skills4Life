"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const painPoints = [
  {
    icon: "😔",
    title: "Die Abende sind zerstört",
    description: "Lernen wird zum Dauerthema. Statt gemeinsamer Zeit gibt es Diskussionen, Frust und Tränen.",
  },
  {
    icon: "💔",
    title: "Die Beziehung leidet",
    description: "Du willst Elternteil sein – nicht Kontrolleur. Aber jeden Abend rutschst du in die Lehrerrolle.",
  },
  {
    icon: "😤",
    title: "Die Motivation schwindet",
    description: "Dein Kind ist nicht faul. Aber ohne die richtigen Strategien verliert es den Glauben an sich selbst.",
  },
  {
    icon: "⚽",
    title: "Hobbys werden gestrichen",
    description: "Fussball, Tanzen, Freunde – alles wird dem Lernen geopfert. Und trotzdem wird es nicht besser.",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="problem" className="py-24 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Das eigentliche Problem
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Kein Fachproblem. Ein Strukturproblem.
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Lernen und Schule belasten nicht nur dein Kind – sie belasten die ganze Familie.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border border-[#E8DCC8] shadow-lg rounded-2xl hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{point.icon}</span>
                    <div>
                      <h3 className="text-[#2D2D2D] font-bold text-lg mb-2">
                        {point.title}
                      </h3>
                      <p className="text-[#5A5A5A]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Card className="border-2 border-[#2F3E4E] bg-[#F3E8D7] rounded-2xl inline-block">
            <CardContent className="p-8 md:p-10">
              <p className="text-xl md:text-2xl text-[#2D2D2D] font-medium italic">
                «Ich schaffe das nicht mehr allein. Und ich habe Angst, dass ich meinem Kind schade, obwohl ich es gut meine.»
              </p>
              <p className="text-[#5A5A5A] mt-4">
                — Das denken viele Eltern. Aber sie sagen es nicht laut. Du bist nicht allein.
              </p>
            </CardContent>
          </Card>

          {/* CTA after pain point identification */}
          <div className="mt-10">
            <p className="text-[#2D2D2D] font-medium mb-4">
              Du musst das nicht alleine tragen. Wir übernehmen Verantwortung.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Link href="#standortbestimmung" className="flex items-center space-x-2">
                <span>Die Situation Ihres Kindes einschätzen</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
