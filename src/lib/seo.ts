import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageSeo = {
  /** Max. 60 characters, otherwise Google cuts it off */
  title: string;
  /** Max. 155 characters */
  description: string;
  /** Path of the page, e.g. "/familien" */
  path: string;
};

// Title, description, canonical URL and social preview for one page
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "de_CH",
      images: [
        {
          url: "/images/og-skills4life.png",
          width: 1200,
          height: 630,
          alt: "Skills4Life: Stärken entdecken, Selbstvertrauen aufbauen. Believe in yourself.",
        },
      ],
    },
  };
}
