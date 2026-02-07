"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const painPoints = [
  {
    time: "16:45",
    scenario: "Dein Kind kommt heim. Müde, hungrig, Handy in der Hand.",
    emotion: "Du sagst: «Zuerst Hausaufgaben.» Augenrollen.",
  },
  {
    time: "17:30",
    scenario: "Das Matheblatt ist halb leer. Du fragst nach.",
    emotion: "Blockade. Du wirst lauter. Tränen.",
  },
  {
    time: "19:10",
    scenario: "Der Abend ist gelaufen. Wieder Streit statt Familie.",
    emotion: "Du denkst: «Ich verliere nicht Mathe – ich verliere Beziehung.»",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Kennst du das?
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Der tägliche Hausaufgabenkrieg
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Du willst Elternteil sein – nicht Polizei. Aber jeden Abend wirst du zum Antreiber.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#E8DCC8] transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.time}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Time bubble */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-16 h-16 bg-[#E07B39] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{point.time}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="border border-[#E8DCC8] shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <p className="text-[#2D2D2D] font-medium mb-2">
                        {point.scenario}
                      </p>
                      <p className="text-[#5A5A5A] text-sm italic">
                        {point.emotion}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Card className="border-2 border-[#E07B39] bg-[#FFF8F0] rounded-2xl inline-block">
            <CardContent className="p-8 md:p-10">
              <p className="text-xl md:text-2xl text-[#2D2D2D] font-medium italic">
                «Ich brauche keinen perfekten Notenschnitt – ich brauche Abende ohne Krieg.»
              </p>
              <p className="text-[#5A5A5A] mt-4">
                — So wie du denken viele Eltern. Du bist nicht allein.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
