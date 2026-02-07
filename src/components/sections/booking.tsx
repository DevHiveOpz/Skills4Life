"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Video, CheckCircle, Shield } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "30 Minuten",
    description: "Kostenloses Erstgespräch",
  },
  {
    icon: Video,
    title: "Online oder Vor Ort",
    description: "Flexibel wie du es brauchst",
  },
  {
    icon: CheckCircle,
    title: "Unverbindlich",
    description: "Ohne Verpflichtungen",
  },
  {
    icon: Shield,
    title: "Vertraulich",
    description: "Deine Daten sind sicher",
  },
];

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://app.cal.com/embed/embed.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="booking" className="py-24 bg-[#FFF8F0]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Jetzt starten
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Buche dein kostenloses Kennenlerngespräch
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            In 30 Minuten lernen wir uns kennen, besprechen die Situation deines
            Kindes und finden gemeinsam den besten Weg.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="border border-[#E8DCC8] shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#E07B39] rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2D2D2D] text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-[#5A5A5A]">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 p-6 bg-white border border-[#E8DCC8] rounded-xl"
            >
              <h4 className="font-semibold text-[#2D2D2D] mb-3">
                Was passiert im Gespräch?
              </h4>
              <ul className="space-y-2 text-sm text-[#5A5A5A]">
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#E07B39] mt-0.5 flex-shrink-0"
                  />
                  <span>Wir lernen dich und dein Kind kennen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#E07B39] mt-0.5 flex-shrink-0"
                  />
                  <span>Analyse der aktuellen Situation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#E07B39] mt-0.5 flex-shrink-0"
                  />
                  <span>Erste Empfehlungen und nächste Schritte</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#E07B39] mt-0.5 flex-shrink-0"
                  />
                  <span>Alle deine Fragen werden beantwortet</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Calendar Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border border-[#E8DCC8] shadow-xl overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div
                  className="min-h-[600px] bg-white flex items-center justify-center"
                  id="cal-embed"
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto bg-[#E07B39] rounded-2xl flex items-center justify-center mb-6">
                      <Clock size={40} className="text-white" />
                    </div>
                    <h3 className="font-headline text-xl text-[#2D2D2D] mb-3">
                      Kalender wird geladen...
                    </h3>
                    <p className="text-[#5A5A5A] mb-6">
                      Wähle einen passenden Termin für dein kostenloses
                      Kennenlerngespräch.
                    </p>
                    <a
                      href="https://cal.com/skills4life/kennenlernen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#E07B39] hover:bg-[#C96A2D] text-white px-6 py-3 font-semibold transition-colors rounded-full"
                    >
                      <span>Termin buchen</span>
                    </a>

                    <p className="text-sm text-[#5A5A5A] mt-4">
                      Oder kontaktiere uns direkt: +41 78 405 38 30
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
