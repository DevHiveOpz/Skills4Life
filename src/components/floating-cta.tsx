"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBooking, setIsAtBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      const scrolled = window.scrollY > 500;
      setIsVisible(scrolled);

      // Hide when near the standortbestimmung section
      const assessmentSection = document.getElementById("standortbestimmung");
      if (assessmentSection) {
        const rect = assessmentSection.getBoundingClientRect();
        const isNearBooking = rect.top < window.innerHeight && rect.bottom > 0;
        setIsAtBooking(isNearBooking);
      }
    };

    // The page can already be scrolled when this loads
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isAtBooking && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pr-24 bg-gradient-to-t from-[#F3E8D7] via-[#F3E8D7]/95 to-transparent md:hidden"
        >
          <Button
            asChild
            size="lg"
            className="w-full bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full py-6 text-lg font-semibold shadow-xl"
          >
            <Link
              href="#standortbestimmung"
              className="flex items-center justify-center space-x-2"
            >
              <span>Situation einschätzen</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
