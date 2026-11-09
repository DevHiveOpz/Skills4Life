import { reviews as reviewTexts } from "@/content/familien";
import { site } from "@/lib/site";

export type GoogleReview = {
  quote: string;
  author: string;
  /** Link to the reviewer's Google profile, which Google asks us to show */
  authorUrl?: string;
};

export type GoogleReviews = {
  rating: number;
  total: number;
  items: GoogleReview[];
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

const ONE_DAY = 60 * 60 * 24;

// Reads rating and reviews from the Google Places API on the server, at most
// once a day. Without a key, or if Google fails, it returns null and the
// review sections stay hidden: the page never shows reviews that are not real.
export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${site.googlePlaceId}?languageCode=de`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: ONE_DAY },
      },
    );
    if (!response.ok) {
      console.error("Google reviews request failed:", response.status);
      return null;
    }

    const place = (await response.json()) as PlaceResponse;
    const hidden = new Set<string>(reviewTexts.hiddenAuthors);
    const items = (place.reviews ?? []).flatMap((review): GoogleReview[] => {
      const quote = (review.originalText?.text ?? review.text?.text)?.trim();
      const author = review.authorAttribution?.displayName;
      if (!quote || !author || hidden.has(author) || review.rating !== 5) {
        return [];
      }
      return [{ quote, author, authorUrl: review.authorAttribution?.uri }];
    });

    if (!items.length || !place.rating || !place.userRatingCount) return null;
    return { rating: place.rating, total: place.userRatingCount, items };
  } catch (error) {
    console.error("Google reviews request failed:", error);
    return null;
  }
}
