"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Video,
  CheckCircle,
  Shield,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
  time: string;
}

const benefits = [
  {
    icon: Clock,
    title: "30 Minuten",
    description: "Kostenloses Erstgespräch",
  },
  {
    icon: Video,
    title: "Online oder Vor Ort",
    description: "Flexibel wie du es brauchst",
  },
  {
    icon: CheckCircle,
    title: "Unverbindlich",
    description: "Ohne Verpflichtungen",
  },
  {
    icon: Shield,
    title: "Vertraulich",
    description: "Deine Daten sind sicher",
  },
];

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setIsLoadingSlots(true);
    setError(null);
    setSelectedSlot(null);

    try {
      const response = await fetch(
        `/api/calendar/available-slots?date=${date.toISOString()}`,
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setAvailableSlots([]);
      } else {
        setAvailableSlots(data.slots || []);
      }
    } catch {
      setError("Fehler beim Laden der verfügbaren Zeiten");
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !formData.name || !formData.email || !formData.phone) {
      setError("Bitte fülle alle Pflichtfelder aus");
      return;
    }

    setIsBooking(true);
    setError(null);

    try {
      const response = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot.start,
          end: selectedSlot.end,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setBookingSuccess(true);
      }
    } catch {
      setError("Fehler bei der Buchung. Bitte versuche es erneut.");
    } finally {
      setIsBooking(false);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (date < today) return true;

    // Disable Sundays (0 = Sunday)
    if (date.getDay() === 0) return true;

    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const days = getDaysInMonth(currentMonth);

  if (bookingSuccess) {
    return (
      <section id="booking" className="py-24 bg-[#F3E8D7]" ref={ref}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="border border-[#E8DCC8] shadow-xl rounded-2xl">
              <CardContent className="p-12">
                <div className="w-20 h-20 mx-auto bg-[#2F3E4E] rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="font-headline text-3xl text-[#2D2D2D] mb-4">
                  Termin bestätigt!
                </h2>
                <p className="text-[#5A5A5A] mb-6">
                  Wir haben dir eine Bestätigung an{" "}
                  <strong>{formData.email}</strong> gesendet. Wir freuen uns auf
                  das Gespräch mit dir!
                </p>
                <p className="text-sm text-[#5A5A5A]">
                  Bei Fragen erreichst du uns unter: +41 78 405 38 30
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-[#F3E8D7]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Jetzt starten
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Buche dein kostenloses Kennenlerngespräch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="border border-[#E8DCC8] shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#2F3E4E] rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#2D2D2D] text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-[#5A5A5A]">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 p-6 bg-white border border-[#E8DCC8] rounded-xl"
            >
              <h4 className="font-semibold text-[#2D2D2D] mb-3">
                Was passiert im Gespräch?
              </h4>
              <ul className="space-y-2 text-sm text-[#5A5A5A]">
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2F3E4E] mt-0.5 flex-shrink-0"
                  />
                  <span>Wir lernen dich und dein Kind kennen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2F3E4E] mt-0.5 flex-shrink-0"
                  />
                  <span>Analyse der aktuellen Situation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2F3E4E] mt-0.5 flex-shrink-0"
                  />
                  <span>Erste Empfehlungen und nächste Schritte</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={16}
                    className="text-[#2F3E4E] mt-0.5 flex-shrink-0"
                  />
                  <span>Alle deine Fragen werden beantwortet</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border border-[#E8DCC8] shadow-xl overflow-hidden rounded-2xl">
              <CardContent className="p-6 md:p-8 bg-white">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Date Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#2D2D2D]">
                        <Calendar size={18} className="inline mr-2" />
                        Wähle ein Datum
                      </h3>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevMonth}
                        aria-label="Vorheriger Monat"
                        className="p-2 hover:bg-[#F3E8D7] rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} className="text-[#2F3E4E]" />
                      </button>
                      <span className="font-semibold text-[#2D2D2D]">
                        {MONTHS[currentMonth.getMonth()]}{" "}
                        {currentMonth.getFullYear()}
                      </span>
                      <button
                        onClick={nextMonth}
                        aria-label="Nächster Monat"
                        className="p-2 hover:bg-[#F3E8D7] rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} className="text-[#2F3E4E]" />
                      </button>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {WEEKDAYS.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-[#5A5A5A] py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((date, index) => (
                        <div key={index} className="aspect-square">
                          {date && (
                            <button
                              onClick={() =>
                                !isDateDisabled(date) && setSelectedDate(date)
                              }
                              disabled={isDateDisabled(date)}
                              className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-all ${
                                isDateSelected(date)
                                  ? "bg-[#2F3E4E] text-white font-semibold"
                                  : isDateDisabled(date)
                                    ? "text-[#C4C4C4] cursor-not-allowed"
                                    : "text-[#2D2D2D] hover:bg-[#F3E8D7]"
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots & Form */}
                  <div>
                    {!selectedDate ? (
                      <div className="h-full flex items-center justify-center text-center p-8">
                        <div>
                          <Clock
                            size={48}
                            className="mx-auto text-[#E8DCC8] mb-4"
                          />
                          <p className="text-[#5A5A5A]">
                            Wähle zuerst ein Datum aus
                          </p>
                        </div>
                      </div>
                    ) : isLoadingSlots ? (
                      <div className="h-full flex items-center justify-center">
                        <Loader2
                          size={32}
                          className="animate-spin text-[#2F3E4E]"
                        />
                      </div>
                    ) : !selectedSlot ? (
                      <div>
                        <h3 className="font-semibold text-[#2D2D2D] mb-4">
                          <Clock size={18} className="inline mr-2" />
                          Verfügbare Zeiten
                        </h3>

                        {availableSlots.length === 0 ? (
                          <p className="text-[#5A5A5A] text-center py-8">
                            Keine verfügbaren Zeiten an diesem Tag.
                            <br />
                            Bitte wähle ein anderes Datum.
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot.start}
                                onClick={() => setSelectedSlot(slot)}
                                className="p-2 text-sm border border-[#E8DCC8] rounded-lg hover:bg-[#2F3E4E] hover:text-white hover:border-[#2F3E4E] transition-all"
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-[#2D2D2D]">
                            Deine Kontaktdaten
                          </h3>
                          <button
                            onClick={() => setSelectedSlot(null)}
                            className="text-sm text-[#2F3E4E] hover:underline"
                          >
                            Zeit ändern
                          </button>
                        </div>

                        <div className="bg-[#F3E8D7] p-3 rounded-lg mb-4 text-sm">
                          <strong>
                            {selectedDate.toLocaleDateString("de-CH", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </strong>{" "}
                          um <strong>{selectedSlot.time} Uhr</strong>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              <User size={14} className="inline mr-1" />
                              Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Dein Name"
                              className="w-full p-2 rounded-lg border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              <Mail size={14} className="inline mr-1" />
                              E-Mail *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              placeholder="deine@email.ch"
                              className="w-full p-2 rounded-lg border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              <Phone size={14} className="inline mr-1" />
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="079 123 45 67"
                              className="w-full p-2 rounded-lg border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                              Nachricht (optional)
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              placeholder="Gibt es etwas, das wir vorab wissen sollten?"
                              rows={2}
                              className="w-full p-2 rounded-lg border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none text-sm resize-none"
                            />
                          </div>

                          {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                          )}

                          <Button
                            onClick={handleBooking}
                            disabled={isBooking}
                            className="w-full bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full"
                          >
                            {isBooking ? (
                              <>
                                <Loader2
                                  size={18}
                                  className="mr-2 animate-spin"
                                />
                                Wird gebucht...
                              </>
                            ) : (
                              "Termin buchen"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-[#5A5A5A] mt-4">
              Oder kontaktiere uns direkt: +41 78 405 38 30
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
