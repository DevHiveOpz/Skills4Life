"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Sparkles,
  BookOpen,
  Brain,
  Heart,
  Target,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  childName: string;
  childAge: string;
  schoolLevel: string;
  subjects: string[];
  challenges: string[];
  goals: string;
  additionalInfo: string;
}

const schoolLevels = [
  "Primarschule (1.-6. Klasse)",
  "Sekundarschule",
  "Gymnasium",
  "Berufsschule",
  "Andere",
];

const subjectOptions = [
  { id: "math", label: "Mathematik", icon: "📐" },
  { id: "german", label: "Deutsch", icon: "📝" },
  { id: "french", label: "Französisch", icon: "🇫🇷" },
  { id: "english", label: "Englisch", icon: "🇬🇧" },
  { id: "science", label: "Naturwissenschaften", icon: "🔬" },
  { id: "other", label: "Andere Fächer", icon: "📚" },
];

const challengeOptions = [
  { id: "motivation", label: "Fehlende Motivation", icon: Heart },
  { id: "concentration", label: "Konzentrationsprobleme", icon: Brain },
  { id: "organization", label: "Organisation & Planung", icon: Target },
  { id: "exam-anxiety", label: "Prüfungsangst", icon: BookOpen },
  { id: "understanding", label: "Verständnisprobleme", icon: Sparkles },
  { id: "homework", label: "Hausaufgaben-Stress", icon: BookOpen },
];

export function AssessmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    childAge: "",
    schoolLevel: "",
    subjects: [],
    challenges: [],
    goals: "",
    additionalInfo: "",
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "subjects" | "challenges", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.childName && formData.childAge && formData.schoolLevel;
      case 2:
        return formData.subjects.length > 0;
      case 3:
        return formData.challenges.length > 0;
      case 4:
        return formData.goals.trim().length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.recommendation);
      setStep(totalSteps);
    } catch {
      setResult(
        "Vielen Dank für deine Angaben! Wir empfehlen dir ein persönliches Gespräch, um die beste Lösung für dein Kind zu finden. Buche jetzt ein kostenloses Kennenlerngespräch!"
      );
      setStep(totalSteps);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-[#E07B39] rounded-2xl flex items-center justify-center mb-8">
              <Sparkles size={48} className="text-white" />
            </div>
            <h3 className="font-headline text-2xl md:text-3xl text-[#2D2D2D] mb-4">
              Kostenlose Standortbestimmung
            </h3>
            <p className="text-[#5A5A5A] mb-8 max-w-md mx-auto">
              In wenigen Minuten analysieren wir die Situation deines Kindes und
              geben dir eine persönliche Empfehlung.
            </p>
            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="bg-[#E07B39] hover:bg-[#C96A2D] text-white rounded-full px-8"
            >
              Jetzt starten
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-headline text-xl text-[#2D2D2D] mb-6">
              Erzähl uns von deinem Kind
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Vorname des Kindes
                </label>
                <Input
                  value={formData.childName}
                  onChange={(e) => updateFormData("childName", e.target.value)}
                  placeholder="z.B. Tim"
                  className="rounded-xl border-[#E8DCC8] focus:border-[#E07B39] focus:ring-[#E07B39]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Alter
                </label>
                <Input
                  type="number"
                  value={formData.childAge}
                  onChange={(e) => updateFormData("childAge", e.target.value)}
                  placeholder="z.B. 12"
                  min="6"
                  max="20"
                  className="rounded-xl border-[#E8DCC8] focus:border-[#E07B39] focus:ring-[#E07B39]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Schulstufe
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {schoolLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => updateFormData("schoolLevel", level)}
                      className={`p-3 text-left transition-all border rounded-xl ${
                        formData.schoolLevel === level
                          ? "bg-[#E07B39] text-white border-[#E07B39]"
                          : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#E07B39]"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
              In welchen Fächern braucht {formData.childName || "dein Kind"}{" "}
              Unterstützung?
            </h3>
            <p className="text-sm text-[#5A5A5A] mb-6">
              Wähle alle zutreffenden aus
            </p>

            <div className="grid grid-cols-2 gap-3">
              {subjectOptions.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => toggleArrayItem("subjects", subject.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.subjects.includes(subject.id)
                      ? "bg-[#E07B39] text-white border-[#E07B39]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#E07B39]"
                  }`}
                >
                  <span className="text-2xl">{subject.icon}</span>
                  <span className="font-medium">{subject.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
              Welche Herausforderungen siehst du?
            </h3>
            <p className="text-sm text-[#5A5A5A] mb-6">
              Wähle alle zutreffenden aus
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challengeOptions.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => toggleArrayItem("challenges", challenge.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.challenges.includes(challenge.id)
                      ? "bg-[#E07B39] text-white border-[#E07B39]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#E07B39]"
                  }`}
                >
                  <challenge.icon
                    size={24}
                    className={
                      formData.challenges.includes(challenge.id)
                        ? "text-white"
                        : "text-[#E07B39]"
                    }
                  />
                  <span className="font-medium">{challenge.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
              Was sind deine Ziele?
            </h3>
            <p className="text-sm text-[#5A5A5A] mb-6">
              Was möchtest du für {formData.childName || "dein Kind"} erreichen?
            </p>

            <div className="space-y-4">
              <Textarea
                value={formData.goals}
                onChange={(e) => updateFormData("goals", e.target.value)}
                placeholder="z.B. Bessere Noten in Mathe, mehr Selbstvertrauen bei Prüfungen, Spass am Lernen wiederfinden..."
                rows={4}
                className="rounded-xl border-[#E8DCC8] focus:border-[#E07B39] focus:ring-[#E07B39]"
              />

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  Gibt es noch etwas, das wir wissen sollten? (optional)
                </label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    updateFormData("additionalInfo", e.target.value)
                  }
                  placeholder="Besondere Umstände, bereits versuchte Lösungen, etc."
                  rows={3}
                  className="rounded-xl border-[#E8DCC8] focus:border-[#E07B39] focus:ring-[#E07B39]"
                />
              </div>
            </div>
          </motion.div>
        );

      case totalSteps:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto bg-[#E07B39] rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h3 className="font-headline text-2xl text-[#2D2D2D] mb-4">
              Deine persönliche Empfehlung
            </h3>

            <div className="bg-[#FFF8F0] p-6 mb-8 text-left border border-[#E8DCC8] rounded-xl">
              <p className="text-[#2D2D2D] leading-relaxed whitespace-pre-line">
                {result}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-[#E07B39] hover:bg-[#C96A2D] text-white rounded-full"
              >
                <Link href="#booking">
                  Jetzt Kennenlerngespräch buchen
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setResult(null);
                  setFormData({
                    childName: "",
                    childAge: "",
                    schoolLevel: "",
                    subjects: [],
                    challenges: [],
                    goals: "",
                    additionalInfo: "",
                  });
                }}
                className="w-full border-[#E07B39] text-[#E07B39] hover:bg-[#E07B39] hover:text-white rounded-full"
              >
                Neu starten
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="standortbestimmung"
      className="py-24 bg-white"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Kostenlose Analyse
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Standortbestimmung
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Finde heraus, welche Unterstützung am besten zu deinem Kind passt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border border-[#E8DCC8] shadow-xl overflow-hidden rounded-2xl">
            <CardContent className="p-8 md:p-12 bg-white">
              {/* Progress Bar */}
              {step > 0 && step < totalSteps && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-[#5A5A5A] mb-2">
                    <span>
                      Schritt {step} von {totalSteps - 1}
                    </span>
                    <span>
                      {Math.round((step / (totalSteps - 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#FFF0E5] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#E07B39] rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(step / (totalSteps - 1)) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Step Content */}
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              {/* Navigation Buttons */}
              {step > 0 && step < totalSteps && (
                <div className="flex justify-between mt-8 pt-6 border-t border-[#E8DCC8]">
                  <Button
                    variant="ghost"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="text-[#5A5A5A]"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Zurück
                  </Button>

                  {step < totalSteps - 1 ? (
                    <Button
                      onClick={() => setStep((prev) => prev + 1)}
                      disabled={!canProceed()}
                      className="bg-[#E07B39] hover:bg-[#C96A2D] text-white rounded-full px-6"
                    >
                      Weiter
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading || !canProceed()}
                      className="bg-[#E07B39] hover:bg-[#C96A2D] text-white rounded-full px-6"
                    >
                      {isLoading ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                          />
                          Analysiere...
                        </>
                      ) : (
                        <>
                          Empfehlung erhalten
                          <Sparkles size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
