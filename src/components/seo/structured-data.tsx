import { site } from "@/lib/site";

// Tells Google the site name ("Skills4Life" above the link instead of the
// domain) and the organisation behind it, with address and phone.
const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "de-CH",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      slogan: site.claim,
      description: site.description,
      url: site.url,
      logo: `${site.url}/apple-icon.png`,
      image: `${site.url}/images/og-skills4life.png`,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
      founder: { "@type": "Person", name: site.founder },
      sameAs: [site.instagram],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
