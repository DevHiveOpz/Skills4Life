"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, BookOpen, GraduationCap, Award } from "lucide-react";

function CountUp({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const steps = duration * 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center bg-[#F3E8D7] overflow-visible"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F3E4E]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2F3E4E]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
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
                    className="text-[#2F3E4E] fill-[#2F3E4E]"
                  />
                ))}
              </span>
              <span className="text-[#2D2D2D] text-sm font-medium">
                5.0 Google Bewertungen
              </span>
            </motion.div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] leading-tight mb-6">
              Begleitung statt Nachhilfe. Entlastung statt Stress.
            </h1>

            <p className="text-lg md:text-xl text-[#5A5A5A] mb-8 max-w-xl mx-auto lg:mx-0">
              Dein Kind scheitert nicht, weil es faul ist, sondern weil ihm niemand gezeigt hat, wie Lernen funktioniert. Wir übernehmen Verantwortung, damit zuhause wieder Ruhe einkehrt.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all"
              >
                <Link href="#standortbestimmung" className="flex items-center space-x-2">
                  <span>Situation Ihres Kindes einschätzen</span>
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#E8DCC8]"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <BookOpen size={18} className="text-[#2F3E4E]" />
                  <span className="text-xl font-bold text-[#2D2D2D]"><CountUp target={1200} suffix="+" duration={2} /></span>
                </div>
                <p className="text-[#5A5A5A] text-xs">Lektionen unterrichtet</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <Users size={18} className="text-[#2F3E4E]" />
                  <span className="text-xl font-bold text-[#2D2D2D]"><CountUp target={53} duration={1.5} /></span>
                </div>
                <p className="text-[#5A5A5A] text-xs">Familien begleitet</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <GraduationCap size={18} className="text-[#2F3E4E]" />
                  <span className="text-xl font-bold text-[#2D2D2D]"><CountUp target={93} suffix="%" duration={1.8} /></span>
                </div>
                <p className="text-[#5A5A5A] text-xs">Gymi-Erfolgsquote</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                  <Award size={18} className="text-[#2F3E4E]" />
                  <span className="text-xl font-bold text-[#2D2D2D]"><CountUp target={100} suffix="%" duration={1.5} /></span>
                </div>
                <p className="text-[#5A5A5A] text-xs">QV/LAP bestanden</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-first lg:order-last mb-8 lg:mb-0"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Portrait Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/Diego_Muniz_15.JPG"
                  alt="Diego - Gründer von Skills4Life"
                  width={500}
                  height={600}
                  className="object-cover w-full h-[300px] lg:h-[500px]"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E4E]/60 via-transparent to-transparent" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold">Diego</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">DaZ/DaF</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">Lerntechniken</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">Gymivorbereitung</span>
                  </div>
                </div>
              </div>

              {/* Trust Element */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-[#E8DCC8]">
                <p className="text-[#2D2D2D] font-semibold text-sm">53 Familien</p>
                <p className="text-[#5A5A5A] text-xs">vertrauen uns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
