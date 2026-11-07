// Texts for the page /familien. Change wording here, not in the components.

export const hero = {
  overline: "Für Familien",
  rating: "5.0 Google Bewertungen",
  headline: "Wir üben keine Schwächen. Wir bauen Stärken auf.",
  lead: "Wir versprechen keine Mathenote. Ihr Kind erlebt Erfolge mit dem, was es gut kann. So wächst sein Selbstvertrauen, und zuhause kehrt wieder Ruhe ein.",
  cta: {
    label: "Situation Ihres Kindes einschätzen",
    href: "#standortbestimmung",
    note: "Kostenlos · 3 Minuten",
  },
  image: {
    src: "/images/Diego_Muniz_15.JPG",
    alt: "Diego, Gründer von Skills4Life, sitzt lächelnd auf einem Tisch",
    caption: "Diego, Gründer von Skills4Life",
  },
};

export type Person = {
  name: string;
  role: string;
  image: string;
  /** Tailwind class for the visible part of the photo, e.g. "object-[25%_center]" */
  focus?: string;
};

export const about = {
  overline: "Wer wir sind",
  headline: "Wir kennen das Gefühl von innen.",
  founderStory:
    "Ich war selbst der Schüler, der immer hörte: Du bist faul. Bis ich verstand: Es lag nicht an mir. Mir fehlte jemand, der meine Stärken sieht. Darum gibt es Skills4Life.",
  founderSignature: "Diego, Gründer",
  teamStory:
    "Wir alle hatten es in der Schule nicht immer leicht. Unterwegs haben wir gelernt, unsere Stärken zu erkennen und darauf aufzubauen. Dieses Selbstvertrauen trägt uns bis heute.",
  teamLabel: "Unser Team",
  team: [
    {
      name: "Diego Muñiz Baez",
      role: "Gründer",
      image: "/images/Diego_Muniz_15.JPG",
      focus: "object-[28%_center]",
    },
    {
      name: "Alilia Katumba",
      role: "Studentin, Universität St.Gallen (HSG)",
      image: "/images/team/alilia-katumba.jpg",
    },
    {
      name: "Natascha Katumba",
      role: "Studentin, Universität St.Gallen (HSG)",
      image: "/images/team/natascha-katumba.jpg",
    },
    {
      name: "Sarah Schildknecht",
      role: "Studentin Maschinenbau, ETH Zürich",
      image: "/images/team/sarah.jpg",
    },
    {
      name: "Til Haumann",
      role: "Master in Chemie, ETH Zürich",
      image: "/images/team/til.jpg",
    },
    {
      name: "Seraphin",
      role: "Physiotherapeut, ZHAW",
      image: "/images/team/seraphin.jpg",
    },
  ] satisfies Person[],
  supportLabel: "Begleitet und unterstützt von",
  coach: {
    name: "Marc Bernegger",
    role: "Job- und Business-Mindset-Coach",
    image: "/images/team/marc-bernegger.jpg",
  } satisfies Person,
  program: {
    name: "HSLU Smart-up",
    role: "Förderprogramm der Hochschule Luzern",
    image: "/images/team/hslu-smart-up.jpg",
    alt: "Logo HSLU Hochschule Luzern Smart-up",
  },
  sliderLabel: "Team von Skills4Life",
  previous: "Vorherige Personen zeigen",
  next: "Weitere Personen zeigen",
};
