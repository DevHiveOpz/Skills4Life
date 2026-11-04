import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userType,
      name,
      email,
      phone,
      subjects,
      happyWithGrades,
      homeworkHelp,
      enjoysLearning,
      confidence,
      teacherConcerns,
      struggles,
      feelings,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const subjectLabels: Record<string, string> = {
      math: "Mathematik",
      german: "Deutsch",
      french: "Französisch",
      english: "Englisch",
      science: "Naturwissenschaften",
      other: "Andere Fächer",
    };

    const gradeLabels: Record<string, string> = {
      yes: "Ja, ist zufrieden",
      sometimes: "Mal so, mal so",
      no: "Nein, eher frustriert",
    };

    const homeworkLabels: Record<string, string> = {
      rarely: "Selten oder nie",
      sometimes: "Manchmal",
      often: "Fast täglich",
    };

    const learningLabels: Record<string, string> = {
      yes: "Ja, meistens",
      depends: "Kommt aufs Fach an",
      no: "Eher nicht",
    };

    const confidenceLabels: Record<string, string> = {
      confident: "Selbstbewusst",
      okay: "Geht so",
      insecure: "Unsicher",
    };

    const teacherLabels: Record<string, string> = {
      no: "Nein, alles gut",
      sometimes: "Ab und zu",
      yes: "Ja, öfters",
    };

    const parentStrugglesLabels: Record<string, string> = {
      "evening-stress": "Stress am Abend wegen Lernen",
      relationship: "Die Beziehung leidet",
      alone: "Fühlt sich allein damit",
      motivation: "Kind hat keine Motivation",
      fear: "Sorgen um die Zukunft",
      "teacher-role": "Will nicht Lehrer sein",
    };

    const childStrugglesLabels: Record<string, string> = {
      "dont-understand": "Versteht den Stoff nicht",
      "no-motivation": "Keine Lust zu lernen",
      overwhelmed: "Alles zu viel",
      "parents-angry": "Eltern oft genervt",
      "fear-tests": "Angst vor Prüfungen",
      "no-time": "Keine Zeit für Hobbys",
    };

    const strugglesLabels =
      userType === "parent" ? parentStrugglesLabels : childStrugglesLabels;

    // Format the data for email
    const formattedSubjects =
      subjects?.map((s: string) => subjectLabels[s] || s).join(", ") ||
      "Keine angegeben";
    const formattedStruggles =
      struggles?.map((s: string) => strugglesLabels[s] || s).join(", ") ||
      "Keine angegeben";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2F3E4E; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Neuer Lead - Standortbestimmung</h1>
        </div>
        <div style="padding: 30px; background-color: #F3E8D7;">
          <h2 style="color: #2D2D2D; margin-top: 0;">Kontaktdaten</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p style="margin: 5px 0;"><strong>Typ:</strong> ${userType === "parent" ? "Elternteil" : "Schüler/in"}</p>
          </div>

          <h2 style="color: #2D2D2D;">Standortbestimmung</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Fächer:</strong> ${formattedSubjects}</p>
            <p style="margin: 5px 0;"><strong>Zufrieden mit Noten:</strong> ${gradeLabels[happyWithGrades] || happyWithGrades}</p>
            <p style="margin: 5px 0;"><strong>Hilfe beim Lernen:</strong> ${homeworkLabels[homeworkHelp] || homeworkHelp}</p>
            <p style="margin: 5px 0;"><strong>Lernt gerne:</strong> ${learningLabels[enjoysLearning] || enjoysLearning}</p>
            <p style="margin: 5px 0;"><strong>Selbstbewusstsein:</strong> ${confidenceLabels[confidence] || confidence}</p>
            <p style="margin: 5px 0;"><strong>Lehrer-Bedenken:</strong> ${teacherLabels[teacherConcerns] || teacherConcerns}</p>
          </div>

          <h2 style="color: #2D2D2D;">Belastungen</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 5px 0;">${formattedStruggles}</p>
          </div>

          ${
            feelings
              ? `
          <h2 style="color: #2D2D2D;">Persönliche Nachricht</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${feelings}</p>
          </div>
          `
              : ""
          }
        </div>
        <div style="padding: 20px; text-align: center; background-color: #2F3E4E;">
          <a href="tel:${phone}" style="display: inline-block; background-color: white; color: #2F3E4E; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px;">
            Jetzt anrufen
          </a>
          <a href="mailto:${email}" style="display: inline-block; background-color: white; color: #2F3E4E; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px;">
            E-Mail senden
          </a>
        </div>
      </div>
    `;

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Skills4Life <noreply@skills4life.ch>",
          to: ["skills4life.learning@gmail.com"],
          subject: `Neuer Lead: ${name} (${userType === "parent" ? "Elternteil" : "Schüler/in"})`,
          html: emailHtml,
        }),
      });

      const emailResult = await emailResponse.json();
      console.log("Lead email result:", emailResult);

      if (!emailResponse.ok) {
        console.error("Failed to send lead email:", emailResult);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
