import { NextResponse } from "next/server";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface PlacesAPIResponse {
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
  error_message?: string;
}

// Cache reviews for 1 hour to avoid hitting API limits
let cachedReviews: GoogleReview[] | null = null;
let cachedRating: number | null = null;
let cachedTotal: number | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Return cached data if still valid
  if (cachedReviews && Date.now() - lastFetch < CACHE_DURATION) {
    return NextResponse.json({
      reviews: cachedReviews,
      rating: cachedRating,
      totalReviews: cachedTotal,
      cached: true,
    });
  }

  // If no API key or Place ID, return fallback reviews
  if (!apiKey || !placeId) {
    return NextResponse.json({
      reviews: getFallbackReviews(),
      rating: 5.0,
      totalReviews: 4,
      fallback: true,
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=de&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data: PlacesAPIResponse = await response.json();

    if (data.status !== "OK") {
      console.error(
        "Google Places API error:",
        data.status,
        data.error_message,
      );
      return NextResponse.json({
        reviews: getFallbackReviews(),
        rating: 5.0,
        totalReviews: 4,
        fallback: true,
        error: data.error_message,
      });
    }

    const reviews = data.result?.reviews || [];
    const rating = data.result?.rating || 5.0;
    const totalReviews = data.result?.user_ratings_total || reviews.length;

    // Update cache
    cachedReviews = reviews;
    cachedRating = rating;
    cachedTotal = totalReviews;
    lastFetch = Date.now();

    return NextResponse.json({
      reviews,
      rating,
      totalReviews,
      cached: false,
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json({
      reviews: getFallbackReviews(),
      rating: 5.0,
      totalReviews: 4,
      fallback: true,
    });
  }
}

function getFallbackReviews(): GoogleReview[] {
  return [
    {
      author_name: "Nicole B.",
      rating: 5,
      text: "Endlich Abende ohne Streit. Früher war 17 Uhr der Beginn vom täglichen Kampf. Jetzt kommt Lina von Skills4Life heim – Hausaufgaben erledigt, entspannt. Unser Familienleben hat sich komplett verändert.",
      time: Date.now() / 1000,
      relative_time_description: "vor einem Monat",
    },
    {
      author_name: "Thomas M.",
      rating: 5,
      text: "Die fixen Slots und das 2-Wochen-Reporting haben mich überzeugt. Ich weiss genau, wo Luca steht – ohne selbst der Antreiber sein zu müssen. Das System funktioniert.",
      time: Date.now() / 1000,
      relative_time_description: "vor 2 Wochen",
    },
    {
      author_name: "Sandra K.",
      rating: 5,
      text: "Wir hatten alles probiert: Nachhilfe, Belohnungssysteme, Strafen. Nichts half. Bei Skills4Life hat Lena endlich einen Rahmen, der funktioniert. Ihr Hobby kann sie behalten.",
      time: Date.now() / 1000,
      relative_time_description: "vor 3 Wochen",
    },
    {
      author_name: "Marco R.",
      rating: 5,
      text: "Ich war skeptisch – wieder so ein Nachhilfe-Angebot. Aber hier ist es anders: klare Regeln, echter Fortschritt, kein Chaos. Tim macht Hausaufgaben jetzt ohne Diskussion.",
      time: Date.now() / 1000,
      relative_time_description: "vor einem Monat",
    },
  ];
}
