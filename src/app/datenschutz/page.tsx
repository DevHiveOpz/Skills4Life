import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz | Skills4Life",
  description:
    "Datenschutzerklärung von Skills4Life: welche Daten wir erheben, wofür wir sie nutzen und welche Rechte Sie haben.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#FAFFFE] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#07251F] mb-8"
          style={{ fontFamily: "var(--font-calistoga)" }}
        >
          Datenschutzerklarung
        </h1>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 prose prose-green max-w-none">
            <h2>1. Datenschutz auf einen Blick</h2>
            <p>
              Der Schutz Ihrer personlichen Daten ist uns ein wichtiges
              Anliegen. Diese Datenschutzerklarung informiert Sie daruber,
              welche Daten wir erheben und wie wir diese verwenden.
            </p>

            <h2>2. Verantwortliche Stelle</h2>
            <p>
              Skills4Life D. Mu&ntilde;iz Baez
              <br />
              Goldregenweg 32
              <br />
              8050 Z&uuml;rich, Schweiz
              <br />
              Telefon: +41 78 405 38 30
              <br />
              E-Mail: skills4life.learning@gmail.com
            </p>

            <h2>3. Datenerfassung auf unserer Website</h2>
            <h3>Kontaktformular und Buchungen</h3>
            <p>
              Wenn Sie uns uber das Kontaktformular oder das Buchungssystem
              kontaktieren, werden die von Ihnen angegebenen Daten zur
              Bearbeitung Ihrer Anfrage gespeichert. Diese Daten geben wir nicht
              ohne Ihre Einwilligung weiter.
            </p>

            <h3>Chat-Funktion</h3>
            <p>
              Unsere Website nutzt einen KI-gesteuerten Chat-Assistenten. Die
              Nachrichten werden zur Beantwortung Ihrer Fragen verarbeitet,
              jedoch nicht dauerhaft gespeichert.
            </p>

            <h3>Statistik mit Google Analytics</h3>
            <p>
              Nur wenn Sie im Cookie-Banner zustimmen, nutzen wir Google
              Analytics, um zu verstehen, wie unsere Website genutzt wird. Ihre
              Wahl können Sie jederzeit unten auf der Seite unter
              «Cookie-Einstellungen» ändern.
            </p>
            <p>[TEXT GOOGLE ANALYTICS: rechtlich geprüfter Text folgt]</p>

            <h2>4. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft uber Ihre gespeicherten
              Daten, deren Berichtigung, Loschung oder Einschrankung der
              Verarbeitung.
            </p>

            <h2>5. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz konnen Sie uns jederzeit unter
              skills4life.learning@gmail.com kontaktieren.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
