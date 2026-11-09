// Texts for the page /familien. Change wording here, not in the components.

export const hero = {
  overline: "Für Familien",
  headline: "Wir üben keine Schwächen. Wir bauen Stärken auf.",
  lead: "Wir versprechen keine Mathenote. Ihr Kind erlebt Erfolge mit dem, was es gut kann. So wächst sein Selbstvertrauen, und zuhause kehrt wieder Ruhe ein.",
  cta: {
    label: "Situation Ihres Kindes einschätzen",
    href: "#standortbestimmung",
    note: "Kostenlos · 3 Minuten",
  },
  video: {
    src: "/videos/unterricht.mp4",
    poster: "/images/hero-unterricht.jpg",
    alt: "Diego erklärt an der Wandtafel einen Lernschritt",
    pause: "Video anhalten",
    play: "Video abspielen",
  },
};

type Review = {
  quote: string;
  author: string;
};

// Auszüge aus echten Google-Bewertungen, Wortlaut nicht verändern.
// Ohne schriftliche Zustimmung der Eltern keine Namen von Kindern und
// Jugendlichen nennen. Eltern nur mit Vorname und Initiale.
export const reviews = {
  rating: "5,0 von 5 Sternen, 26 Bewertungen auf Google",
  strip: {
    headline: "Das schreiben Familien auf Google.",
    sliderLabel: "Bewertungen von Familien",
    previous: "Vorherige Bewertungen zeigen",
    next: "Weitere Bewertungen zeigen",
    items: [
      {
        quote:
          "Wir sind sehr dankbar, Skills4Life gefunden zu haben. … Besonders schätzen wir die flexible Terminplanung sowie die menschliche und persönliche Art, mit der die Schülerinnen und Schüler begleitet werden.",
        author: "Gretty G., Elternteil",
      },
      {
        quote:
          "Wir haben eng zusammengearbeitet, und ich habe gelernt, dass es okay ist, Fehler zu machen – solange man sie anerkennt und daraus lernt. Diese Sicherheit hat mir geholfen, den Stoff wirklich zu durchdringen.",
        author: "Google-Bewertung nach der FMS-Vorbereitung",
      },
      {
        quote:
          "Ich würde dich weiterempfehlen, weil du nicht nur fachlich unterstützt, sondern auch Freude am Lernen vermittelst und du unglaublich geduldig bist.",
        author: "Patty, Elternteil",
      },
      {
        quote:
          "Dank Diegos Flexibilität und dem Online-Mathematikunterricht können wir die Lektionen genau auf seine Trainingszeiten abstimmen.",
        author: "Jose V., Elternteil (aus dem Spanischen übersetzt)",
      },
      {
        quote:
          "Sowohl wir Eltern als auch der Lernende waren äusserst zufrieden. Wir fühlten uns jederzeit gut informiert, bestens aufgehoben & hervorragend begleitet.",
        author: "Salih T., Elternteil",
      },
      {
        quote:
          "Ich bekomme jedes Mal ein viel besseres Verständnis für den Stoff, den ich am lernen bin, da er sehr nachvollziehbar erklärt. Ich fühle mich ausserdem sicherer bei den Prüfungen …",
        author: "Google-Bewertung zur Prüfungsvorbereitung",
      },
    ] satisfies Review[],
  },
  spotlight: {
    overline: "Stimmen",
    previous: "Vorherige Stimme zeigen",
    next: "Nächste Stimme zeigen",
    items: [
      {
        quote:
          "Ich bin von Herzen dankbar für die Unterstützung, nicht nur fachlich und methodisch, sondern vor allem auch für die mentale Stärkung. Für das Ermutigen, für das Aufbauen von Selbstvertrauen. Für das Gefühl, gesehen und verstanden zu werden.",
        author: "Manuel C., Elternteil",
      },
      {
        quote:
          "Am wichtigsten ist jedoch, an mich selbst zu glauben: dass ich es schaffen kann, dass ich gut bin, niemals aufgebe und positiv denke.",
        author: "Emanuele",
      },
      {
        quote:
          "Diego, du hast mehr an mich geglaubt, als ich selbst an mich geglaubt habe, und mir immer wieder Mut gemacht, dass ich es schaffen werde.",
        author: "Google-Bewertung zur Prüfungsvorbereitung",
      },
    ] satisfies Review[],
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
