"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex items-center bg-[#FFF8F0] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E07B39]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E07B39]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm border border-[#E8DCC8]"
            >
              <span className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-[#E07B39] fill-[#E07B39]"
                  />
                ))}
              </span>
              <span className="text-[#2D2D2D] text-sm font-medium">
                5-Sterne Bewertungen
              </span>
            </motion.div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] leading-tight mb-6">
              Schluss mit Hausaufgabenkrieg. Abende ohne Streit.
            </h1>

            <p className="text-lg md:text-xl text-[#5A5A5A] mb-8 max-w-xl mx-auto lg:mx-0">
              Strukturierte Lernbegleitung mit fixen Slots, klaren Regeln und sichtbaren Fortschritten – damit zuhause wieder Ruhe einkehrt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#E07B39] hover:bg-[#C96A2D] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all"
              >
                <Link href="#booking" className="flex items-center space-x-2">
                  <span>Kennenlerngespräch buchen</span>
                  <ArrowRight size={20} />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#E07B39] text-[#E07B39] hover:bg-[#E07B39] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-all"
              >
                <Link href="#standortbestimmung">Standortbestimmung</Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#E8DCC8]"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <Users size={20} className="text-[#E07B39]" />
                  <span className="text-2xl font-bold text-[#2D2D2D]">100+</span>
                </div>
                <p className="text-[#5A5A5A] text-sm">Schüler begleitet</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <Award size={20} className="text-[#E07B39]" />
                  <span className="text-2xl font-bold text-[#2D2D2D]">98%</span>
                </div>
                <p className="text-[#5A5A5A] text-sm">Erfolgsquote</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <Star size={20} className="text-[#E07B39]" />
                  <span className="text-2xl font-bold text-[#2D2D2D]">5.0</span>
                </div>
                <p className="text-[#5A5A5A] text-sm">Bewertung</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-8 border border-[#E8DCC8] shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FFF0E5] flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">📅</span>
                    </div>
                    <div>
                      <h3 className="text-[#2D2D2D] font-bold text-lg">
                        Fixe Slots & klare Regeln
                      </h3>
                      <p className="text-[#5A5A5A] text-sm">
                        Verbindlicher Rahmen, keine Chaos-Flexibilität
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FFF0E5] flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">✅</span>
                    </div>
                    <div>
                      <h3 className="text-[#2D2D2D] font-bold text-lg">
                        Rückmeldung alle 2 Wochen
                      </h3>
                      <p className="text-[#5A5A5A] text-sm">
                        Sichtbare Fortschritte, keine Blackbox
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FFF0E5] flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🏠</span>
                    </div>
                    <div>
                      <h3 className="text-[#2D2D2D] font-bold text-lg">
                        Entlastung zuhause
                      </h3>
                      <p className="text-[#5A5A5A] text-sm">
                        Hobby bleibt, Abende gehören der Familie
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-[#E07B39] text-white px-5 py-2 text-sm font-bold rounded-full shadow-lg">
                Start in 7 Tagen
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
