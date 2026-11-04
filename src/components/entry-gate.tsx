"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, School, Trophy } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const audiences = [
  {
    href: "/familien",
    title: "Familien",
    text: "Für Eltern, deren Kind wieder an sich glauben soll.",
    icon: Heart,
  },
  {
    href: "/schulen",
    title: "Schulen",
    text: "Für Lehrpersonen und Schulen.",
    icon: School,
  },
  {
    href: "/vereine",
    title: "Vereine",
    text: "Für Trainer und Vereine.",
    icon: Trophy,
  },
];

// How long the logo is shown on its own before it blurs into the background
const INTRO_MS = 1600;

export function EntryGate() {
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChoices(true), INTRO_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] bg-[#F3E8D7] flex items-center justify-center overflow-hidden px-4 py-12"
      onClick={() => setShowChoices(true)}
    >
      {/* Logo: appears, then blurs and fades into the background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          showChoices
            ? { opacity: 0.22, filter: "blur(10px)" }
            : { opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: showChoices ? 1.1 : 0.9, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Logo className="text-[13vw] sm:text-7xl md:text-8xl" />
      </motion.div>

      {/* Choices */}
      <motion.div
        initial={false}
        animate={showChoices ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, delay: showChoices ? 0.35 : 0 }}
        className={`relative w-full max-w-4xl ${showChoices ? "" : "pointer-events-none"}`}
        aria-hidden={!showChoices}
      >
        <h1 className="text-center font-headline text-2xl md:text-3xl text-[#0B0B0B] mb-2">
          Believe in yourself.
        </h1>
        <p className="text-center text-[#5A5A5A] mb-8 md:mb-10">
          Für wen dürfen wir da sein?
        </p>

        <div className="grid gap-3 md:gap-4 md:grid-cols-3">
          {audiences.map(({ href, title, text, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              tabIndex={showChoices ? 0 : -1}
              className="group flex items-center gap-4 md:block rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8DCC8] p-5 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-white transition-all"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#F3E8D7] flex items-center justify-center md:mb-4 text-[#2F3E4E]">
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <h2 className="font-headline text-xl md:text-2xl text-[#0B0B0B] md:mb-2">
                  {title}
                </h2>
                <p className="text-[#5A5A5A] text-sm md:mb-6">{text}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-[#2F3E4E] font-semibold text-sm">
                <span className="hidden md:inline">Weiter</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
