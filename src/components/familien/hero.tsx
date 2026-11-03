"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FamilienHero() {
  return (
    <section id="hero" className="relative bg-[#F3E8D7] overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F3E4E]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2F3E4E]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm border border-[#E8DCC8]">
              <span className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#2F3E4E] fill-[#2F3E4E]" />
                ))}
              </span>
              <span className="text-[#2D2D2D] text-sm font-medium">
                5.0 Google Bewertungen
              </span>
            </div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#0B0B0B] leading-[1.1] mb-6">
              Wir helfen Kindern, an sich zu glauben.
            </h1>

            <p className="text-lg md:text-xl text-[#5A5A5A] mb-8 max-w-xl mx-auto lg:mx-0">
              Wir entdecken die Stärken Ihres Kindes und bauen darauf Erfolge
              auf. So wächst Selbstvertrauen, und zuhause kehrt wieder Ruhe ein.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Link href="#standortbestimmung" className="flex items-center space-x-2">
                <span>Situation Ihres Kindes einschätzen</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
            <p className="text-sm text-[#5A5A5A] mt-3">Kostenlos · 3 Minuten</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-first lg:order-last"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/Diego_Muniz_15.JPG"
                alt="Diego, Gründer von Skills4Life"
                width={500}
                height={600}
                className="object-cover w-full h-[280px] lg:h-[480px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E4E]/60 via-transparent to-transparent" />
              <p className="absolute bottom-0 left-0 p-5 text-white font-semibold">
                Diego, Gründer von Skills4Life
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
