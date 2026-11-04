"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { openConsentSettings } from "@/lib/analytics";
import { consent } from "@/content/consent";
import { Instagram, Linkedin, Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3E8D7] text-[#2D2D2D] border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo className="text-xl" />
            <p className="text-[#5A5A5A] text-sm leading-relaxed">
              Wir helfen Kindern, an sich zu glauben, indem wir ihre Stärken in
              den Mittelpunkt stellen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/familien"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
                >
                  Familien
                </Link>
              </li>
              <li>
                <Link
                  href="/schulen"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
                >
                  Schulen
                </Link>
              </li>
              <li>
                <Link
                  href="/vereine"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
                >
                  Vereine
                </Link>
              </li>
              <li>
                <Link
                  href="/familien#standortbestimmung"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors font-semibold"
                >
                  Situation Ihres Kindes einschätzen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#2F3E4E]" />
                <Link
                  href="tel:+41784053830"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
                >
                  +41 78 405 38 30
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#2F3E4E]" />
                <Link
                  href="mailto:skills4life.learning@gmail.com"
                  className="text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
                >
                  skills4life.learning@gmail.com
                </Link>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#2F3E4E] mt-1" />
                <span className="text-[#5A5A5A]">
                  Goldregenweg 32, 8050 Z&uuml;rich
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">Folge uns</h4>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/skills4life.stories"
                aria-label="Skills4Life auf Instagram"
                target="_blank"
                className="w-10 h-10 bg-[#EBE0D0] rounded-full flex items-center justify-center hover:bg-[#2F3E4E] hover:text-white text-[#2F3E4E] transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com/in/diego-munizbaez"
                aria-label="Diego auf LinkedIn"
                target="_blank"
                className="w-10 h-10 bg-[#EBE0D0] rounded-full flex items-center justify-center hover:bg-[#2F3E4E] hover:text-white text-[#2F3E4E] transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://wa.me/41784053830"
                aria-label="WhatsApp an Skills4Life"
                target="_blank"
                className="w-10 h-10 bg-[#EBE0D0] rounded-full flex items-center justify-center hover:bg-[#2F3E4E] hover:text-white text-[#2F3E4E] transition-colors"
              >
                <Phone size={20} />
              </Link>
            </div>

            <div className="mt-6">
              <Link
                href="https://yeelen.ch"
                target="_blank"
                className="inline-flex items-center space-x-2 text-[#5A5A5A] hover:text-[#2F3E4E] transition-colors"
              >
                <Heart size={16} className="text-red-400" />
                <span className="text-sm">Unser Spendenprojekt</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#E8DCC8] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#5A5A5A] text-sm">
            {currentYear} Skills4Life. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/datenschutz"
              className="text-[#5A5A5A] text-sm hover:text-[#2F3E4E] transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="text-[#5A5A5A] text-sm hover:text-[#2F3E4E] transition-colors"
            >
              Impressum
            </Link>
            <button
              type="button"
              onClick={openConsentSettings}
              className="text-small text-muted transition-colors hover:text-primary"
            >
              {consent.settingsLink}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
