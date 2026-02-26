"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
    question: "Wie läuft das Erstgespräch ab?",
    answer:
      "Das Erstgespräch dauert ca. 30 Minuten und ist kostenlos. Wir lernen dich und dein Kind kennen, besprechen die aktuelle Situation und klären, ob wir zusammenpassen. Kein Verkaufsdruck. Wir zeigen dir einfach, wie unser System funktioniert.",
  },
  {
    question: "Wie schnell kann mein Kind starten?",
    answer:
      "In der Regel innerhalb von 7 bis 10 Tagen nach dem Erstgespräch. Wir wissen: Wenn die Entscheidung steht, willst du nicht wochenlang warten. Feste Slots werden direkt reserviert.",
  },
  {
    question: "Was unterscheidet euch von normaler Nachhilfe?",
    answer:
      "Nachhilfe erklärt Stoff. Wir bieten Begleitung: Fixe Slots, klare Regeln, strukturierte Abläufe. Dein Kind lernt nicht nur Inhalte, es lernt, wie Lernen funktioniert. Und du bekommst deine Abende zurück.",
  },
  {
    question: "Für welche Familien ist das geeignet?",
    answer:
      "Für Eltern, die nicht mehr alles alleine tragen wollen. Für Kinder zwischen 10 und 15 Jahren, die nicht «faul» sind, sondern einen klaren Rahmen brauchen. Und für Familien, bei denen Lernen regelmässig zu Streit führt.",
  },
  {
    question: "Versprecht ihr bessere Noten?",
    answer:
      "Nein. Wir versprechen Verhalten, Struktur und Entlastung, keine Noten. Innerhalb von 3 Monaten: Strukturiertes Lernen an mindestens 4 von 5 Tagen, selbständiges Starten ohne Diskussion, und Eltern raus aus der Lehrerrolle.",
  },
  {
    question: "Kann ich jederzeit kündigen?",
    answer:
      "Ja. Unsere Pakete sind monatlich kündbar mit einer Frist von 14 Tagen zum Monatsende. Keine Knebelverträge, keine versteckten Klauseln. Wenn es nicht passt, trennen wir uns fair.",
  },
  {
    question: "Bleibt Zeit für Hobbys und Sport?",
    answer:
      "Unbedingt. Wir planen die Slots so, dass Fussball, Tanzen oder Musikunterricht weiterlaufen können. Hobbys sind kein Luxus, sie sind wichtig für die Balance. Das Ziel ist Entlastung, nicht noch mehr Termine.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Häufige Fragen
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Das fragen uns Eltern am häufigsten
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Hier findest du Antworten auf die wichtigsten Fragen. Falls etwas offen bleibt, schreib uns einfach.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border border-[#E8DCC8] shadow-lg rounded-2xl bg-white p-6 md:p-8">
              {mounted ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-[#E8DCC8] rounded-xl px-4 data-[state=open]:bg-[#F3E8D7] last:border-b"
                    >
                      <AccordionTrigger className="text-left font-semibold text-[#2D2D2D] hover:text-[#2F3E4E] hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#5A5A5A] pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-[#E8DCC8] rounded-xl px-4 py-4"
                    >
                      <p className="font-semibold text-[#2D2D2D]">{faq.question}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="border-none shadow-lg bg-[#2F3E4E] rounded-2xl">
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
                  className="bg-white hover:bg-gray-100 text-[#2F3E4E] rounded-full font-semibold"
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
