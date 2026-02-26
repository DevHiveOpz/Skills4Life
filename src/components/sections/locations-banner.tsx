"use client";

import { motion } from "framer-motion";
import { MapPin, Monitor, Home } from "lucide-react";

const locations = [
  { name: "Zürich Höngg", type: "location" },
  { name: "Zürich Enge", type: "location" },
  { name: "Zürich Altstetten", type: "location" },
  { name: "Zürich Schwamendingen", type: "location" },
  { name: "Zürich Wiedikon", type: "location" },
  { name: "Zürich Affoltern", type: "location" },
  { name: "Zürich Seebach", type: "location" },
  { name: "Zürich Albisrieden", type: "location" },
  { name: "Wallisellen", type: "location" },
  { name: "Spreitenbach", type: "location" },
  { name: "Regensdorf", type: "location" },
  { name: "Baden", type: "location" },
  { name: "Winterthur", type: "location" },
  { name: "Zug", type: "location" },
  { name: "Rotkreuz", type: "location" },
  { name: "Luzern", type: "location" },
  { name: "Online", type: "online" },
  { name: "Bei dir Zuhause", type: "home" },
];

function LocationItem({ name, type }: { name: string; type: string }) {
  const Icon = type === "online" ? Monitor : type === "home" ? Home : MapPin;
  const isSpecial = type === "online" || type === "home";

  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 mx-2 border rounded-full shadow-sm ${
        isSpecial
          ? "bg-[#2F3E4E] border-[#2F3E4E] text-white"
          : "bg-white border-[#E8DCC8] text-[#2D2D2D]"
      }`}
    >
      <Icon size={14} className={isSpecial ? "text-white" : "text-[#2F3E4E]"} />
      <span className="text-sm font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

export function LocationsBanner() {
  const firstRow = locations.slice(0, Math.ceil(locations.length / 2));
  const secondRow = locations.slice(Math.ceil(locations.length / 2));

  const tripleFirst = [...firstRow, ...firstRow, ...firstRow];
  const tripleSecond = [...secondRow, ...secondRow, ...secondRow];

  return (
    <section className="py-8 bg-[#F3E8D7] overflow-hidden border-y border-[#E8DCC8]">
      <div className="text-center mb-6 px-4">
        <h3 className="text-[#2D2D2D] font-bold text-lg mb-1">
          Begleitung in deiner Nähe
        </h3>
        <p className="text-[#5A5A5A] text-sm">
          Region Zürich, Zug, Luzern und Umgebung, oder bequem online
        </p>
      </div>

      <div className="relative mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F3E8D7] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F3E8D7] to-transparent z-10" />

        <motion.div
          className="flex"
          animate={{ x: [0, -100 * firstRow.length] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
          }}
        >
          {tripleFirst.map((location, index) => (
            <LocationItem key={`first-${location.name}-${index}`} name={location.name} type={location.type} />
          ))}
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F3E8D7] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F3E8D7] to-transparent z-10" />

        <motion.div
          className="flex"
          initial={{ x: -100 * secondRow.length }}
          animate={{ x: [(-100 * secondRow.length), 0] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
          }}
        >
          {tripleSecond.map((location, index) => (
            <LocationItem key={`second-${location.name}-${index}`} name={location.name} type={location.type} />
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-6 px-4">
        <p className="text-[#5A5A5A] text-xs">
          Kein Standort in deiner Nähe? Kein Problem. Wir kommen zu dir oder treffen uns online!
        </p>
      </div>
    </section>
  );
}
