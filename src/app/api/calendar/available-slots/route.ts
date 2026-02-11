import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Working hours: 8:00 - 20:00
const START_HOUR = 8;
const END_HOUR = 20;
const SLOT_DURATION_MINUTES = 30;

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

function generateTimeSlots(date: Date): { start: Date; end: Date }[] {
  const slots: { start: Date; end: Date }[] = [];
  const startOfDay = new Date(date);
  startOfDay.setHours(START_HOUR, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(END_HOUR, 0, 0, 0);

  let current = new Date(startOfDay);
  while (current < endOfDay) {
    const slotEnd = new Date(current.getTime() + SLOT_DURATION_MINUTES * 60000);
    if (slotEnd <= endOfDay) {
      slots.push({ start: new Date(current), end: slotEnd });
    }
    current = slotEnd;
  }

  return slots;
}

function isSlotAvailable(
  slot: { start: Date; end: Date },
  busyPeriods: { start: string; end: string }[]
): boolean {
  for (const busy of busyPeriods) {
    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);

    // Check if slot overlaps with busy period
    if (slot.start < busyEnd && slot.end > busyStart) {
      return false;
    }
  }
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const date = new Date(dateParam);
    const now = new Date();

    // Don't allow booking in the past
    if (date < new Date(now.toDateString())) {
      return NextResponse.json({ slots: [] });
    }

    const auth = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // Get the start and end of the requested day
    const timeMin = new Date(date);
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date(date);
    timeMax.setHours(23, 59, 59, 999);

    // Fetch busy periods from Google Calendar
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busyPeriods =
      freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

    // Generate all possible slots for the day
    const allSlots = generateTimeSlots(date);

    // Filter out busy slots and past slots
    const availableSlots = allSlots.filter((slot) => {
      // Skip slots in the past
      if (slot.start <= now) {
        return false;
      }

      return isSlotAvailable(
        slot,
        busyPeriods as { start: string; end: string }[]
      );
    });

    // Format slots for response
    const formattedSlots = availableSlots.map((slot) => ({
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
      time: slot.start.toLocaleTimeString("de-CH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }));

    return NextResponse.json({ slots: formattedSlots });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
