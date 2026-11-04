// Facts about Skills4Life used for search engines (sitemap, structured data).
// Same details as in the Impressum.
export const site = {
  name: "Skills4Life",
  url: "https://skills4life.ch",
  claim: "Believe in yourself.",
  description:
    "Wir helfen Kindern, an sich zu glauben, indem wir ihre Stärken in den Mittelpunkt stellen. Für Familien, Schulen und Vereine.",
  phone: "+41 78 405 38 30",
  email: "skills4life.learning@gmail.com",
  address: {
    street: "Goldregenweg 32",
    postalCode: "8050",
    city: "Zürich",
    country: "CH",
  },
  founder: "Diego Muñiz Baez",
  instagram: "https://instagram.com/skills4life.stories",
};

/** Pages that search engines should know about, most important first */
export const sitemapPages = [
  { path: "/", priority: 1 },
  { path: "/familien", priority: 0.9 },
  { path: "/schulen", priority: 0.5 },
  { path: "/vereine", priority: 0.5 },
  { path: "/impressum", priority: 0.2 },
  { path: "/datenschutz", priority: 0.2 },
];
