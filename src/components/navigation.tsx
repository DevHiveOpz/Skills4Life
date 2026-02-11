"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Phone, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "#hero", label: "Start" },
  { href: "#about", label: "Über uns" },
  { href: "#how-it-works", label: "So funktioniert's" },
  { href: "#pricing", label: "Preise" },
  { href: "#testimonials", label: "Erfolgsgeschichten" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpeg"
              alt="Skills4Life Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span
              className={`font-bold text-xl transition-colors ${
                isScrolled ? "text-[#2D2D2D]" : "text-[#2D2D2D]"
              }`}
            >
              Skills4Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#2F3E4E] ${
                  isScrolled ? "text-[#5A5A5A]" : "text-[#5A5A5A]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Social */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://instagram.com/skills4life.stories"
              target="_blank"
              className={`transition-colors hover:text-[#2F3E4E] ${
                isScrolled ? "text-[#5A5A5A]" : "text-[#5A5A5A]"
              }`}
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/diego-munizbaez"
              target="_blank"
              className={`transition-colors hover:text-[#4A9B7F] ${
                isScrolled ? "text-[#5A5A5A]" : "text-[#5A5A5A]"
              }`}
            >
              <Linkedin size={20} />
            </Link>
            <Button
              asChild
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-6"
            >
              <Link href="#standortbestimmung">Situation einschätzen</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#2D2D2D]"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#F3E8D7] border-none w-full sm:w-80"
            >
              <div className="flex flex-col h-full pt-12">
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[#2D2D2D] text-2xl font-bold hover:text-[#2F3E4E] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pb-8">
                  <Button
                    asChild
                    className="w-full bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full py-6 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="#standortbestimmung">Die Situation Ihres Kindes einschätzen</Link>
                  </Button>

                  <div className="flex items-center justify-center space-x-6 mt-8">
                    <Link
                      href="https://instagram.com/skills4life.stories"
                      target="_blank"
                      className="text-[#2F3E4E] hover:text-[#1A2530]"
                    >
                      <Instagram size={24} />
                    </Link>
                    <Link
                      href="https://linkedin.com/in/diego-munizbaez"
                      target="_blank"
                      className="text-[#4A9B7F] hover:text-[#3A8B6F]"
                    >
                      <Linkedin size={24} />
                    </Link>
                    <Link
                      href="tel:+41784053830"
                      className="text-[#6B7FD7] hover:text-[#5B6FC7]"
                    >
                      <Phone size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
