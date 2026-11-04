import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("Missing Google Calendar credentials");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { start, end, name, email, phone, userType, subjects, message } =
      body;

    if (!start || !end || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // Create event description
    const description = `
Kostenloses Erstgespräch - Skills4Life

Name: ${name}
E-Mail: ${email}
Telefon: ${phone}
${userType ? `Typ: ${userType === "parent" ? "Elternteil" : "Schüler/in"}` : ""}
${subjects ? `Fächer: ${subjects}` : ""}
${message ? `\nNachricht:\n${message}` : ""}

---
Gebucht über skills4life.ch
    `.trim();

    // Generate a unique Jitsi Meet link (free, no setup required)
    const meetingId = `skills4life-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const meetLink = `https://meet.jit.si/${meetingId}`;

    // Create calendar event with Jitsi Meet link in description
    const descriptionWithMeet = `${description}\n\n---\nVideo-Call: ${meetLink}`;

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Erstgespräch: ${name}`,
        description: descriptionWithMeet,
        start: {
          dateTime: start,
          timeZone: "Europe/Zurich",
        },
        end: {
          dateTime: end,
          timeZone: "Europe/Zurich",
        },
        reminders: {
          useDefault: true,
        },
      },
    });

    // Send confirmation email
    const eventDate = new Date(start).toLocaleDateString("de-CH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const eventTime = new Date(start).toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send email via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Skills4Life <noreply@skills4life.ch>",
            to: [email],
            subject: "Dein Erstgespräch bei Skills4Life ist bestätigt",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #2F3E4E; padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Skills4Life</h1>
                </div>
                <div style="padding: 30px; background-color: #F3E8D7;">
                  <h2 style="color: #2D2D2D;">Hallo ${name}!</h2>
                  <p style="color: #5A5A5A; font-size: 16px;">
                    Dein kostenloses Erstgespräch wurde erfolgreich gebucht.
                  </p>
                  <div style="background-color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Datum:</strong> ${eventDate}</p>
                    <p style="margin: 5px 0;"><strong>Uhrzeit:</strong> ${eventTime} Uhr</p>
                    ${meetLink ? `<p style="margin: 5px 0;"><strong>Video-Link:</strong> <a href="${meetLink}">${meetLink}</a></p>` : ""}
                  </div>
                  ${
                    meetLink
                      ? `
                  <a href="${meetLink}" style="display: inline-block; background-color: #2F3E4E; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                    Zum Video-Call
                  </a>
                  `
                      : ""
                  }
                  <p style="color: #5A5A5A; font-size: 14px; margin-top: 30px;">
                    Wir freuen uns auf das Gespräch mit dir!<br><br>
                    Bei Fragen erreichst du uns unter:<br>
                    <strong>+41 78 405 38 30</strong>
                  </p>
                </div>
                <div style="padding: 20px; text-align: center; color: #5A5A5A; font-size: 12px;">
                  Skills4Life - Begleitung statt Nachhilfe
                </div>
              </div>
            `,
          }),
        });
        const emailResult = await emailResponse.json();
        console.log("Email send result:", emailResult);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY not configured - skipping email");
    }

    return NextResponse.json({
      success: true,
      eventId: event.data.id,
      htmlLink: event.data.htmlLink,
      meetLink,
    });
  } catch (error) {
    console.error("Calendar booking error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 },
    );
  }
}
