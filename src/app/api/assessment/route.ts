import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const subjectLabels: Record<string, string> = {
  math: "Mathematik",
  german: "Deutsch",
  french: "Franzosisch",
  english: "Englisch",
  science: "Naturwissenschaften",
  other: "Andere Facher",
};

const challengeLabels: Record<string, string> = {
  motivation: "Fehlende Motivation",
  concentration: "Konzentrationsprobleme",
  organization: "Organisation & Planung",
  "exam-anxiety": "Prufungsangst",
  understanding: "Verstandnisprobleme",
  homework: "Hausaufgaben-Stress",
};

interface AssessmentData {
  childName: string;
  childAge: string;
  schoolLevel: string;
  subjects: string[];
  challenges: string[];
  goals: string;
  additionalInfo: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: AssessmentData = await req.json();

    const subjects = data.subjects
      .map((s) => subjectLabels[s] || s)
      .join(", ");
    const challenges = data.challenges
      .map((c) => challengeLabels[c] || c)
      .join(", ");

    const prompt = `Du bist ein erfahrener Lernberater bei Skills4Life, einem Nachhilfe- und Lerncoaching-Service in der Schweiz.

Basierend auf folgenden Informationen uber ein Kind, erstelle eine personliche, warmherzige und hilfreiche Empfehlung:

**Kind:** ${data.childName}, ${data.childAge} Jahre alt
**Schulstufe:** ${data.schoolLevel}
**Facher mit Unterstutzungsbedarf:** ${subjects}
**Herausforderungen:** ${challenges}
**Ziele der Familie:** ${data.goals}
${data.additionalInfo ? `**Zusatzliche Infos:** ${data.additionalInfo}` : ""}

Erstelle eine Empfehlung, die:
1. Das Kind beim Namen nennt und personlich anspricht
2. Verstandnis fur die Situation zeigt
3. 2-3 konkrete Empfehlungen gibt, welche unserer Services am besten passen wurden (Nachhilfe, Prufungsvorbereitung, Lerncoaching, Familienberatung)
4. Ermutigt, ein kostenloses Kennenlerngesprach zu buchen
5. Positiv und motivierend ist

Halte die Antwort auf 150-200 Worter. Schreibe auf Deutsch.`;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Fallback recommendation if no API key
      return NextResponse.json({
        recommendation: `Vielen Dank fur die Informationen uber ${data.childName}!

Basierend auf deinen Angaben empfehlen wir:

1. **Individuelle Nachhilfe** in ${subjects} - damit ${data.childName} die Grundlagen festigt und Lucken schliesst.

2. **Lerncoaching** - um ${challenges.toLowerCase()} gezielt anzugehen und nachhaltige Lernstrategien zu entwickeln.

3. **Regelmasige Check-ins** - damit wir den Fortschritt begleiten und bei Bedarf anpassen konnen.

Jedes Kind lernt anders, und ${data.childName} verdient einen Ansatz, der genau passt. In einem kostenlosen Kennenlerngesprach konnen wir die Situation genauer besprechen und einen individuellen Plan erstellen.

Wir freuen uns darauf, ${data.childName} auf dem Weg zu mehr Lernerfolg und Selbstvertrauen zu begleiten!`,
      });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    const recommendation = textContent && "text" in textContent
      ? textContent.text
      : "Wir empfehlen ein personliches Kennenlerngesprach, um die beste Losung fur dein Kind zu finden.";

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error("Assessment API error:", error);

    return NextResponse.json({
      recommendation:
        "Vielen Dank fur deine Angaben! Wir empfehlen dir ein personliches Gesprach, um die beste Losung fur dein Kind zu finden. Buche jetzt ein kostenloses Kennenlerngesprach - wir freuen uns darauf, euch kennenzulernen!",
    });
  }
}
