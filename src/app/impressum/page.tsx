import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Impressum | Skills4Life",
  description: "Impressum von Skills4Life",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#FAFFFE] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#07251F] mb-8"
          style={{ fontFamily: "var(--font-calistoga)" }}
        >
          Impressum
        </h1>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 prose prose-green max-w-none">
            <h2>Angaben gemass Schweizer Recht</h2>

            <h3>Kontaktadresse</h3>
            <p>
              Skills4Life D. Mu&ntilde;iz Baez
              <br />
              Goldregenweg 32
              <br />
              8050 Z&uuml;rich
              <br />
              Schweiz
            </p>

            <h3>Kontakt</h3>
            <p>
              Telefon: +41 78 405 38 30
              <br />
              E-Mail: skills4life.learning@gmail.com
            </p>

            <h3>Social Media</h3>
            <p>
              Instagram: @skills4life.stories
              <br />
              LinkedIn: diego-munizbaez
            </p>

            <h3>Haftungsausschluss</h3>
            <p>
              Der Autor ubernimmt keine Gewahr fur die Richtigkeit,
              Vollstandigkeit und Aktualitat der bereitgestellten Informationen.
              Haftungsanspruche gegen den Autor, die sich auf Schaden
              materieller oder ideeller Art beziehen, welche durch die Nutzung
              oder Nichtnutzung der dargebotenen Informationen verursacht
              wurden, sind grundsatzlich ausgeschlossen.
            </p>

            <h3>Urheberrechte</h3>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos
              oder anderen Dateien auf der Website gehoren ausschliesslich
              Skills4Life oder den speziell genannten Rechteinhabern. Fur die
              Reproduktion jeglicher Elemente ist die schriftliche Zustimmung
              der Urheberrechtstrager im Voraus einzuholen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
