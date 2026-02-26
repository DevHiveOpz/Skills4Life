"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Sparkles,
  Heart,
  User,
  Users,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

type UserType = "parent" | "child" | null;

interface FormData {
  userType: UserType;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  happyWithGrades: string;
  homeworkHelp: string;
  enjoysLearning: string;
  confidence: string;
  teacherConcerns: string;
  struggles: string[];
  feelings: string;
  goals: string;
}

const subjectOptions = [
  { id: "math", label: "Mathematik", icon: "📐" },
  { id: "german", label: "Deutsch", icon: "📝" },
  { id: "french", label: "Französisch", icon: "🇫🇷" },
  { id: "english", label: "Englisch", icon: "🇬🇧" },
  { id: "science", label: "Naturwissenschaften", icon: "🔬" },
  { id: "other", label: "Andere Fächer", icon: "📚" },
];

const parentStruggles = [
  { id: "evening-stress", label: "Stress am Abend wegen Lernen", icon: "😩" },
  { id: "relationship", label: "Die Beziehung leidet", icon: "💔" },
  { id: "alone", label: "Ich fühle mich allein damit", icon: "😔" },
  { id: "motivation", label: "Mein Kind hat keine Motivation", icon: "😤" },
  { id: "fear", label: "Ich mache mir Sorgen um die Zukunft", icon: "😰" },
  { id: "teacher-role", label: "Ich will nicht Lehrer sein", icon: "🙅" },
];

const childStruggles = [
  { id: "dont-understand", label: "Ich verstehe den Stoff nicht", icon: "😕" },
  { id: "no-motivation", label: "Ich habe keine Lust zu lernen", icon: "😴" },
  { id: "overwhelmed", label: "Es ist alles zu viel", icon: "😰" },
  { id: "parents-angry", label: "Meine Eltern sind oft genervt", icon: "😞" },
  { id: "fear-tests", label: "Ich habe Angst vor Prüfungen", icon: "😨" },
  { id: "no-time", label: "Ich habe keine Zeit für Hobbys", icon: "⚽" },
];

const gradeOptions = [
  { id: "yes", label: "Ja, ist zufrieden", icon: "😊" },
  { id: "sometimes", label: "Mal so, mal so", icon: "😐" },
  { id: "no", label: "Nein, eher frustriert", icon: "😔" },
];

const homeworkHelpOptions = [
  { id: "rarely", label: "Selten oder nie", icon: "👍" },
  { id: "sometimes", label: "Manchmal", icon: "🤔" },
  { id: "often", label: "Fast täglich", icon: "😓" },
];

const enjoysLearningOptions = [
  { id: "yes", label: "Ja, meistens", icon: "🌟" },
  { id: "depends", label: "Kommt aufs Fach an", icon: "🎯" },
  { id: "no", label: "Eher nicht", icon: "😴" },
];

const confidenceOptions = [
  { id: "confident", label: "Selbstbewusst", icon: "💪" },
  { id: "okay", label: "Geht so", icon: "😐" },
  { id: "insecure", label: "Unsicher", icon: "😟" },
];

const teacherConcernsOptions = [
  { id: "no", label: "Nein, alles gut", icon: "✅" },
  { id: "sometimes", label: "Ab und zu", icon: "⚠️" },
  { id: "yes", label: "Ja, öfters", icon: "🚨" },
];

export function AssessmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [datenschutzAccepted, setDatenschutzAccepted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: null,
    name: "",
    email: "",
    phone: "",
    subjects: [],
    happyWithGrades: "",
    homeworkHelp: "",
    enjoysLearning: "",
    confidence: "",
    teacherConcerns: "",
    struggles: [],
    feelings: "",
    goals: "",
  });

  const totalSteps = 11;

  const updateFormData = (field: keyof FormData, value: string | string[] | UserType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "subjects" | "struggles", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return phone.replace(/\s/g, "").length >= 10;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.userType !== null;
      case 2:
        return formData.subjects.length > 0;
      case 3:
        return formData.happyWithGrades !== "";
      case 4:
        return formData.homeworkHelp !== "";
      case 5:
        return formData.enjoysLearning !== "";
      case 6:
        return formData.confidence !== "";
      case 7:
        return formData.teacherConcerns !== "";
      case 8:
        return formData.struggles.length > 0;
      case 9:
        return formData.name.trim() !== "" && isValidEmail(formData.email) && isValidPhone(formData.phone);
      case 10:
        return datenschutzAccepted;
      default:
        return true;
    }
  };

  const generateEmpathicResponse = () => {
    const isParent = formData.userType === "parent";
    const struggles = formData.struggles;
    const subjects = formData.subjects.map(id =>
      subjectOptions.find(s => s.id === id)?.label || id
    ).join(", ");

    // Analyze the diagnostic answers
    const needsSupport =
      formData.happyWithGrades === "no" ||
      formData.homeworkHelp === "often" ||
      formData.confidence === "insecure" ||
      formData.teacherConcerns === "yes";

    const moderateSupport =
      formData.happyWithGrades === "sometimes" ||
      formData.homeworkHelp === "sometimes" ||
      formData.confidence === "okay" ||
      formData.teacherConcerns === "sometimes";

    if (isParent) {
      let response = "";

      // Address diagnostic findings first
      if (needsSupport) {
        response += `Was du beschreibst, zeigt ein klares Bild: Dein Kind braucht jetzt Unterstützung, nicht irgendwann, sondern jetzt. `;
        if (formData.confidence === "insecure") {
          response += `Dass dein Kind unsicher ist, kommt nicht von ungefähr. Das Selbstvertrauen leidet, wenn man immer wieder das Gefühl hat, nicht mitzukommen. `;
        }
        if (formData.teacherConcerns === "yes") {
          response += `Wenn auch die Lehrer Bedenken äussern, ist das ein deutliches Signal. `;
        }
        response += `Aber: Das lässt sich ändern.\n\n`;
      } else if (moderateSupport) {
        response += `Die Situation ist noch nicht kritisch, aber sie könnte kippen. Jetzt zu handeln, bevor es eskaliert, ist der klügere Weg.\n\n`;
      }

      if (formData.homeworkHelp === "often") {
        response += `Dass du fast täglich helfen musst, zeigt: Das aktuelle System funktioniert nicht. Nicht weil du es falsch machst, sondern weil dein Kind noch nicht gelernt hat, selbständig zu arbeiten. Genau da setzen wir an.\n\n`;
      }

      if (struggles.includes("evening-stress") || struggles.includes("relationship")) {
        response += `Der Stress am Abend, die Diskussionen ums Lernen: das zermürbt. Du willst das Beste für dein Kind, aber irgendwie führt jeder Abend zum gleichen Konflikt. Das ist erschöpfend.\n\n`;
      }

      if (struggles.includes("alone")) {
        response += `Du musst das nicht alleine tragen. Wirklich nicht. Viele Eltern fühlen sich genauso, und keiner spricht darüber. Aber es ist keine Schwäche, Hilfe anzunehmen. Es ist Stärke.\n\n`;
      }

      if (struggles.includes("teacher-role")) {
        response += `Du bist Mutter/Vater, nicht Lehrer. Dass du diese Rollen nicht mehr vermischen willst, ist absolut nachvollziehbar. Dein Kind braucht dich als Elternteil, nicht als Kontrolleur.\n\n`;
      }

      if (struggles.includes("motivation")) {
        response += `Dein Kind ist nicht faul. Wirklich nicht. Oft fehlt einfach das Wissen, WIE man richtig lernt. Das können wir ändern.\n\n`;
      }

      if (formData.enjoysLearning === "no") {
        response += `Dass dein Kind keine Freude am Lernen hat, ist ein Symptom, nicht die Ursache. Wenn Lernen nur mit Frust verbunden ist, verliert man die Motivation. Wir können das umdrehen.\n\n`;
      }

      response += `Bei ${subjects} können wir gezielt unterstützen, mit Struktur, Lerntechniken und ohne den täglichen Kampf zuhause.\n\n`;
      response += `Mein Vorschlag: Lass uns in einem kostenlosen Erstgespräch herausfinden, wie wir euch konkret entlasten können. Ganz ohne Druck, ganz ohne Verkauf. Einfach ein ehrliches Gespräch.`;

      return response;
    } else {
      let response = "";

      // Address diagnostic findings for child
      if (formData.happyWithGrades === "no") {
        response += `Du bist nicht zufrieden mit deinen Noten, das nervt, wir wissen das. Aber Noten sagen nicht aus, wie schlau du bist. Sie sagen nur, ob du gerade weisst, wie man lernt. Und das kann man ändern.\n\n`;
      }

      if (formData.confidence === "insecure") {
        response += `Dass du dich unsicher fühlst in der Schule, das ist hart. Aber weisst du was? Die meisten, die so fühlen, sind nicht dümmer als andere. Sie haben nur noch nicht den richtigen Weg gefunden. Und genau dabei können wir helfen.\n\n`;
      }

      if (struggles.includes("dont-understand")) {
        response += `Wenn alle anderen es zu verstehen scheinen und du sitzt da und denkst: "Was ist falsch mit mir?" Nichts ist falsch mit dir. Manchmal braucht man einfach jemanden, der es anders erklärt.\n\n`;
      }

      if (struggles.includes("no-motivation")) {
        response += `Keine Lust zu lernen? Das verstehe ich total. Vor allem, wenn man nicht weiss, warum man das alles überhaupt macht. Oder wenn man schon so oft gescheitert ist, dass man gar nicht mehr anfangen will.\n\n`;
      }

      if (struggles.includes("overwhelmed")) {
        response += `Wenn sich alles wie ein Berg anfühlt, den man nie schaffen kann: das kennen wir. Aber man muss nicht den ganzen Berg auf einmal bezwingen. Schritt für Schritt. Und mit jemandem an der Seite geht's leichter.\n\n`;
      }

      if (struggles.includes("parents-angry")) {
        response += `Wenn zuhause die Stimmung kippt, sobald es ums Lernen geht, das ist hart. Deine Eltern wollen nur das Beste für dich, aber manchmal drücken sie es falsch aus. Das können wir ändern.\n\n`;
      }

      if (struggles.includes("no-time")) {
        response += `Deine Hobbys sind wichtig: Fussball, Freunde, was auch immer. Das soll nicht wegfallen. Wir finden einen Weg, dass beides funktioniert.\n\n`;
      }

      if (struggles.includes("fear-tests")) {
        response += `Prüfungsangst ist echt, und du bist nicht der einzige. Aber mit den richtigen Techniken und etwas Übung wird das besser. Versprochen.\n\n`;
      }

      response += `Bei ${subjects} können wir dir helfen, aber nicht wie ein Lehrer, der nur Stoff reindrückt. Sondern so, dass du verstehst, WIE du am besten lernst. Das ist ein Gamechanger.\n\n`;
      response += `Sag deinen Eltern, dass ihr euch gerne bei uns melden könnt. Kein Stress, kein Druck, einfach mal reden.`;

      return response;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Send lead data to API
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: formData.userType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subjects: formData.subjects,
          happyWithGrades: formData.happyWithGrades,
          homeworkHelp: formData.homeworkHelp,
          enjoysLearning: formData.enjoysLearning,
          confidence: formData.confidence,
          teacherConcerns: formData.teacherConcerns,
          struggles: formData.struggles,
          feelings: formData.feelings,
        }),
      });
    } catch (error) {
      console.error("Failed to send lead:", error);
    }

    const empathicResponse = generateEmpathicResponse();
    setResult(empathicResponse);
    setStep(totalSteps);
    setIsLoading(false);
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
            <div className="w-24 h-24 mx-auto bg-[#2F3E4E] rounded-2xl flex items-center justify-center mb-8">
              <Heart size={48} className="text-white" />
            </div>
            <h3 className="font-headline text-2xl md:text-3xl text-[#2D2D2D] mb-4">
              Lass uns gemeinsam schauen
            </h3>
            <p className="text-[#5A5A5A] mb-8 max-w-md mx-auto">
              In wenigen Minuten verstehen wir eure Situation besser und können euch eine ehrliche Einschätzung geben.
            </p>
            <Button
              onClick={() => setStep(1)}
              size="lg"
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8"
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
            <div className="text-center mb-8">
              <h3 className="font-headline text-2xl text-[#2D2D2D] mb-2">
                Wer bist du?
              </h3>
              <p className="text-[#5A5A5A]">
                Damit wir dich richtig ansprechen können
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateFormData("userType", "parent")}
                className={`p-8 text-center transition-all border-2 rounded-2xl ${
                  formData.userType === "parent"
                    ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                    : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                }`}
              >
                <Users
                  size={48}
                  className={`mx-auto mb-4 ${formData.userType === "parent" ? "text-white" : "text-[#2F3E4E]"}`}
                />
                <span className="font-semibold text-lg block">Elternteil</span>
                <span className={`text-sm ${formData.userType === "parent" ? "text-white/80" : "text-[#5A5A5A]"}`}>
                  Mein Kind braucht Unterstützung
                </span>
              </button>

              <button
                onClick={() => updateFormData("userType", "child")}
                className={`p-8 text-center transition-all border-2 rounded-2xl ${
                  formData.userType === "child"
                    ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                    : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                }`}
              >
                <User
                  size={48}
                  className={`mx-auto mb-4 ${formData.userType === "child" ? "text-white" : "text-[#2F3E4E]"}`}
                />
                <span className="font-semibold text-lg block">Schüler/in</span>
                <span className={`text-sm ${formData.userType === "child" ? "text-white/80" : "text-[#5A5A5A]"}`}>
                  Ich brauche selbst Hilfe
                </span>
              </button>
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
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? `In welchen Fächern braucht dein Kind Unterstützung?`
                  : `In welchen Fächern brauchst du Hilfe?`
                }
              </h3>
              <p className="text-sm text-[#5A5A5A]">
                Wähle alle aus, die zutreffen
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {subjectOptions.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => toggleArrayItem("subjects", subject.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.subjects.includes(subject.id)
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
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
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Ist dein Kind zufrieden mit seinen Noten?"
                  : "Bist du zufrieden mit deinen Noten?"
                }
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {gradeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("happyWithGrades", option.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.happyWithGrades === option.id
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
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
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Wie oft braucht dein Kind Hilfe beim Lernen?"
                  : "Wie oft brauchst du Hilfe beim Lernen?"
                }
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {homeworkHelpOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("homeworkHelp", option.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.homeworkHelp === option.id
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Lernt dein Kind gerne neue Themen?"
                  : "Lernst du gerne neue Themen?"
                }
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {enjoysLearningOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("enjoysLearning", option.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.enjoysLearning === option.id
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Wie selbstbewusst ist dein Kind in der Schule?"
                  : "Wie selbstbewusst fühlst du dich in der Schule?"
                }
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {confidenceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("confidence", option.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.confidence === option.id
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Haben Lehrer Bedenken geäussert?"
                  : "Haben deine Lehrer Bedenken geäussert?"
                }
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {teacherConcernsOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFormData("teacherConcerns", option.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.teacherConcerns === option.id
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 8:
        const struggles = formData.userType === "parent" ? parentStruggles : childStruggles;
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Was belastet dich am meisten?"
                  : "Was nervt dich am meisten?"
                }
              </h3>
              <p className="text-sm text-[#5A5A5A]">
                Sei ehrlich, hier urteilt niemand
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {struggles.map((struggle) => (
                <button
                  key={struggle.id}
                  onClick={() => toggleArrayItem("struggles", struggle.id)}
                  className={`p-4 text-left transition-all flex items-center space-x-3 border rounded-xl ${
                    formData.struggles.includes(struggle.id)
                      ? "bg-[#2F3E4E] text-white border-[#2F3E4E]"
                      : "bg-white text-[#2D2D2D] border-[#E8DCC8] hover:border-[#2F3E4E]"
                  }`}
                >
                  <span className="text-2xl">{struggle.icon}</span>
                  <span className="font-medium text-sm">{struggle.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                Fast geschafft. Wie erreichen wir dich?
              </h3>
              <p className="text-sm text-[#5A5A5A]">
                Damit wir dir deine persönliche Einschätzung senden können
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  <User size={14} className="inline mr-2" />
                  Dein Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder={formData.userType === "parent" ? "z.B. Sarah Müller" : "z.B. Tim"}
                  className="w-full p-3 rounded-xl border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  <Mail size={14} className="inline mr-2" />
                  E-Mail Adresse *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="deine@email.ch"
                  className="w-full p-3 rounded-xl border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                  <Phone size={14} className="inline mr-2" />
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="079 123 45 67"
                  className="w-full p-3 rounded-xl border border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-1 focus:ring-[#2F3E4E] outline-none"
                />
              </div>

              <p className="text-xs text-[#5A5A5A] text-center pt-2">
                Wir behandeln deine Daten vertraulich und geben sie nicht weiter.
              </p>
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-headline text-xl text-[#2D2D2D] mb-2">
                {formData.userType === "parent"
                  ? "Möchtest du uns noch etwas mitteilen?"
                  : "Willst du uns noch was sagen?"
                }
              </h3>
              <p className="text-sm text-[#5A5A5A]">
                Optional, aber hilft uns, euch besser zu verstehen
              </p>
            </div>

            <Textarea
              value={formData.feelings}
              onChange={(e) => updateFormData("feelings", e.target.value)}
              placeholder={formData.userType === "parent"
                ? "Erzähl mir, wie es dir geht. Was hast du schon alles versucht? Was wünschst du dir?"
                : "Wie fühlst du dich gerade mit der Schule? Was würdest du dir wünschen?"
              }
              rows={5}
              className="rounded-xl border-[#E8DCC8] focus:border-[#2F3E4E] focus:ring-[#2F3E4E]"
            />

            {/* Datenschutz Einwilligung */}
            <div className="mt-6 p-4 bg-[#F9F5EF] rounded-xl border border-[#E8DCC8]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={datenschutzAccepted}
                  onChange={(e) => setDatenschutzAccepted(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-[#E8DCC8] text-[#2F3E4E] focus:ring-[#2F3E4E] shrink-0 accent-[#2F3E4E]"
                />
                <span className="text-sm text-[#5A5A5A] leading-relaxed">
                  Ich bin damit einverstanden, dass meine Angaben aus diesem Formular
                  (Name, E-Mail, Telefonnummer sowie die Antworten der Standortbestimmung)
                  zur Bearbeitung meiner Anfrage erhoben, verarbeitet und per E-Mail an
                  Skills4Life D. Mu&ntilde;iz Baez uebermittelt werden. Die Daten werden ausschliesslich zur
                  Kontaktaufnahme und individuellen Beratung verwendet und nicht an Dritte
                  weitergegeben. Ich kann diese Einwilligung jederzeit per E-Mail an{" "}
                  <a href="mailto:skills4life.learning@gmail.com" className="text-[#2F3E4E] underline font-medium">
                    skills4life.learning@gmail.com
                  </a>{" "}
                  widerrufen. Es gilt die{" "}
                  <a href="/datenschutz" target="_blank" className="text-[#2F3E4E] underline font-medium">
                    Datenschutzerklaerung
                  </a>
                  . *
                </span>
              </label>
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
            <div className="w-20 h-20 mx-auto bg-[#2F3E4E] rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h3 className="font-headline text-2xl text-[#2D2D2D] mb-4">
              {formData.userType === "parent" ? "Meine Einschätzung für dich" : "Meine Nachricht an dich"}
            </h3>

            <div className="bg-[#F3E8D7] p-6 mb-8 text-left border border-[#E8DCC8] rounded-xl">
              <p className="text-[#2D2D2D] leading-relaxed whitespace-pre-line">
                {result}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full"
              >
                <Link href="#booking">
                  Kostenloses Erstgespräch buchen
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setResult(null);
                  setDatenschutzAccepted(false);
                  setFormData({
                    userType: null,
                    name: "",
                    email: "",
                    phone: "",
                    subjects: [],
                    happyWithGrades: "",
                    homeworkHelp: "",
                    enjoysLearning: "",
                    confidence: "",
                    teacherConcerns: "",
                    struggles: [],
                    feelings: "",
                    goals: "",
                  });
                }}
                className="w-full border-[#2F3E4E] text-[#2F3E4E] hover:bg-[#2F3E4E] hover:text-white rounded-full"
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
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Kostenlose Einschätzung
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Wo steht dein Kind gerade?
          </h2>
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
                  <div className="h-2 bg-[#EBE0D0] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#2F3E4E] rounded-full"
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
                      className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-6"
                    >
                      Weiter
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-6"
                    >
                      {isLoading ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                          />
                          Einen Moment...
                        </>
                      ) : (
                        <>
                          Meine Einschätzung
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
