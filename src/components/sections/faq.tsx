"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Wie läuft das Kennenlerngespräch ab?",
    answer:
      "Das Kennenlerngespräch dauert ca. 30 Minuten und ist kostenlos. Wir lernen dich und dein Kind kennen, besprechen die aktuelle Situation und klären, ob wir zusammenpassen. Kein Verkaufsdruck – wir zeigen dir einfach, wie unser System funktioniert.",
  },
  {
    question: "Wie schnell kann mein Kind starten?",
    answer:
      "In der Regel innerhalb von 7–10 Tagen nach dem Kennenlerngespräch. Wir wissen: Wenn die Entscheidung steht, willst du nicht wochenlang warten. Feste Slots werden direkt reserviert.",
  },
  {
    question: "Wie erfahre ich, ob mein Kind Fortschritte macht?",
    answer:
      "Alle 2 Wochen erhältst du ein kurzes Update: Was wurde erreicht? Wo stehen wir? Was sind die nächsten Schritte? Keine Blackbox – du weisst immer, wofür du zahlst.",
  },
  {
    question: "Was passiert, wenn mein Kind einen Termin verpasst?",
    answer:
      "Wir haben klare Regeln: Absagen bis 24h vorher sind kostenlos. Bei kurzfristigen No-Shows wird die Sitzung berechnet. Das klingt streng – aber genau diese Verbindlichkeit macht den Unterschied. Struktur funktioniert nur mit Konsequenz.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja. Unsere Pakete sind monatlich kündbar mit einer Frist von 14 Tagen zum Monatsende. Keine Knebelverträge, keine versteckten Klauseln. Wenn es nicht passt, trennen wir uns fair.",
  },
  {
    question: "Was unterscheidet euch von normaler Nachhilfe?",
    answer:
      "Normale Nachhilfe erklärt Stoff. Wir bauen ein System: Fixe Slots, klare Regeln, strukturierte Abläufe. Dein Kind lernt nicht nur Mathe – es lernt, selbständig zu arbeiten. Und du bekommst deine Abende zurück.",
  },
  {
    question: "Für welche Kinder ist das geeignet?",
    answer:
      "Für Kinder zwischen 10 und 15 Jahren, bei denen Hausaufgaben regelmässig eskalieren. Kinder, die nicht «faul» sind, sondern einen klaren Rahmen brauchen. Und Eltern, die Verantwortung abgeben wollen – an ein System, das funktioniert.",
  },
  {
    question: "Bleibt Zeit für Hobbys und Sport?",
    answer:
      "Unbedingt. Wir planen die Slots so, dass Fussball, Tanzen oder Musikunterricht weiterlaufen können. Hobbys sind kein Luxus – sie sind wichtig für die Balance. Das Ziel ist Entlastung, nicht noch mehr Termine.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="faq" className="py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Haufige Fragen
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Alles, was du wissen mochtest
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Hier findest du Antworten auf die haufigsten Fragen. Wenn du mehr
            wissen mochtest, sind wir nur einen Klick entfernt.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border border-[#E8DCC8] shadow-lg rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-[#E8DCC8] rounded-xl px-4 data-[state=open]:bg-[#FFF8F0]"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#2D2D2D] hover:text-[#E07B39] hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#5A5A5A] pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="border-none shadow-lg bg-[#E07B39] rounded-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-headline text-xl md:text-2xl text-white mb-2">
                    Noch Fragen?
                  </h3>
                  <p className="text-white/90">
                    Unser Chat-Assistent hilft dir gerne weiter!
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-[#E07B39] rounded-full font-semibold"
                >
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const chatButton = document.querySelector(
                        "[data-chat-trigger]"
                      ) as HTMLButtonElement;
                      if (chatButton) chatButton.click();
                    }}
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle size={20} />
                    <span>Chat starten</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
