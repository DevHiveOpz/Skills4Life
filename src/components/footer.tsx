"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FFF8F0] text-[#2D2D2D] border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.jpeg"
                alt="Skills4Life Logo"
                width={48}
                height={48}
                className="object-contain rounded-xl"
              />
              <span className="font-bold text-xl text-[#2D2D2D]">
                Skills4Life
              </span>
            </div>
            <p className="text-[#5A5A5A] text-sm leading-relaxed">
              Wir begleiten Kinder und Jugendliche durch schwierige Schulphasen,
              damit Lernen gelingt und Familien wieder aufatmen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  Angebot
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  Erfolgsgeschichten
                </Link>
              </li>
              <li>
                <Link
                  href="#standortbestimmung"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  Standortbestimmung
                </Link>
              </li>
              <li>
                <Link
                  href="#booking"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  Termin buchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#E07B39]" />
                <Link
                  href="tel:+41784053830"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  +41 78 405 38 30
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#E07B39]" />
                <Link
                  href="mailto:info@skills4life.ch"
                  className="text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
                >
                  info@skills4life.ch
                </Link>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#E07B39] mt-1" />
                <span className="text-[#5A5A5A]">Schweiz</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#2D2D2D]">Folge uns</h4>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/skills4life.stories"
                target="_blank"
                className="w-10 h-10 bg-[#FFF0E5] rounded-full flex items-center justify-center hover:bg-[#E07B39] hover:text-white text-[#E07B39] transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com/in/diego-munizbaez"
                target="_blank"
                className="w-10 h-10 bg-[#FFF0E5] rounded-full flex items-center justify-center hover:bg-[#E07B39] hover:text-white text-[#E07B39] transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://wa.me/41784053830"
                target="_blank"
                className="w-10 h-10 bg-[#FFF0E5] rounded-full flex items-center justify-center hover:bg-[#E07B39] hover:text-white text-[#E07B39] transition-colors"
              >
                <Phone size={20} />
              </Link>
            </div>

            <div className="mt-6">
              <Link
                href="https://yeelen.ch"
                target="_blank"
                className="inline-flex items-center space-x-2 text-[#5A5A5A] hover:text-[#E07B39] transition-colors"
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
              className="text-[#5A5A5A] text-sm hover:text-[#E07B39] transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="text-[#5A5A5A] text-sm hover:text-[#E07B39] transition-colors"
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
