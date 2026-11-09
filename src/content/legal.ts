// Texts for the Impressum and the Datenschutzerklärung. A string is a
// paragraph, a list of strings is a bullet list.

export type LegalBlock = string | string[];

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDetail = {
  label: string;
  value: string;
  href?: string;
};

export const impressum = {
  overline: "Rechtliches",
  title: "Impressum",
  lead: "Angaben zum Unternehmen, das hinter dieser Webseite steht.",
  details: [
    {
      label: "Unternehmen",
      value:
        "Skills4Life D. Muñiz Baez\nc/o Elisabeth Baez\nHolunderweg 25b\n8050 Zürich\nSchweiz",
    },
    { label: "Inhaber", value: "Diego Muñiz Baez" },
    { label: "Rechtsform", value: "Einzelunternehmen" },
    { label: "Sitz", value: "Zürich" },
    { label: "Standort", value: "Goldregenweg 32, 8050 Zürich" },
    { label: "UID", value: "CHE-482.577.118" },
    { label: "CH-ID", value: "CH-020-1101871-0" },
    { label: "EHRA-ID", value: "1688258" },
    { label: "Telefon", value: "+41 78 405 38 30", href: "tel:+41784053830" },
    {
      label: "E-Mail",
      value: "skills4life.learning@gmail.com",
      href: "mailto:skills4life.learning@gmail.com",
    },
  ] satisfies LegalDetail[],
  sections: [
    {
      heading: "Haftung für Inhalte",
      blocks: [
        "Wir erstellen die Inhalte dieser Webseite mit Sorgfalt. Trotzdem übernehmen wir keine Gewähr dafür, dass sie richtig, vollständig und aktuell sind.",
        "Die Inhalte dienen der allgemeinen Information. Sie ersetzen keine persönliche, medizinische oder therapeutische Beratung.",
        "Soweit gesetzlich zulässig, schliessen wir die Haftung für Schäden aus, die durch die Nutzung oder Nichtnutzung dieser Webseite entstehen.",
      ],
    },
    {
      heading: "Keine Garantie für Noten oder Prüfungen",
      blocks: [
        "Wir begleiten Kinder und Jugendliche mit grosser Sorgfalt. Bestimmte Noten oder das Bestehen einer Prüfung können wir nicht garantieren.",
      ],
    },
    {
      heading: "Links zu anderen Webseiten",
      blocks: [
        "Diese Webseite enthält Links zu Angeboten anderer Anbieter. Auf deren Inhalte haben wir keinen Einfluss. Dafür ist der jeweilige Anbieter verantwortlich.",
      ],
    },
    {
      heading: "Urheberrechte",
      blocks: [
        "Texte, Fotos, Videos und Logos auf dieser Webseite gehören Skills4Life oder den jeweiligen Rechteinhabern. Für eine Verwendung braucht es vorher unsere schriftliche Zustimmung.",
      ],
    },
  ] satisfies LegalSection[],
};

export const datenschutz = {
  overline: "Rechtliches",
  title: "Datenschutzerklärung",
  lead: "Hier lesen Sie, welche Personendaten wir bearbeiten, wofür wir das tun und welche Rechte Sie haben. Stand: November 2026.",
  sections: [
    {
      heading: "1. Worum es geht",
      blocks: [
        "Diese Erklärung gilt für die Webseite skills4life.ch und für den Kontakt mit uns. Massgebend ist das Schweizer Datenschutzgesetz (DSG). Soweit sie anwendbar ist, beachten wir auch die Datenschutz-Grundverordnung der EU (DSGVO).",
        "Wir bearbeiten nur die Daten, die wir für unsere Lernbegleitung und für diese Webseite brauchen. Wir verkaufen keine Personendaten.",
      ],
    },
    {
      heading: "2. Verantwortliche Stelle",
      blocks: [
        "Verantwortlich ist Skills4Life D. Muñiz Baez, c/o Elisabeth Baez, Holunderweg 25b, 8050 Zürich.",
        "Bei Fragen zum Datenschutz erreichen Sie Diego Muñiz Baez unter skills4life.learning@gmail.com oder +41 78 405 38 30.",
      ],
    },
    {
      heading: "3. Besuch der Webseite",
      blocks: [
        "Beim Aufruf der Webseite verarbeitet unser Hosting-Anbieter technische Daten. Dazu gehören IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser und Betriebssystem.",
        "Wir brauchen diese Daten, damit die Webseite funktioniert und sicher bleibt. Wir versuchen nicht, daraus einzelne Personen zu erkennen.",
      ],
    },
    {
      heading: "4. Einschätzung der Situation Ihres Kindes",
      blocks: [
        "Im Formular erfassen wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer und Ihre Antworten. Die Antworten betreffen zum Beispiel Schulfächer, Noten, Lernfreude, Selbstvertrauen und Rückmeldungen der Lehrpersonen.",
        "Das Formular sendet uns diese Angaben per E-Mail, wenn Sie der Bearbeitung zustimmen. Wir nutzen sie nur, um Ihre Anfrage zu bearbeiten und Sie zu beraten. Sie können Ihre Einwilligung jederzeit per E-Mail widerrufen.",
        "Die Einschätzung, die Sie am Schluss sehen, entsteht automatisch nach festen Regeln. Sie dient nur Ihrer Orientierung. Sie ist keine Diagnose, und wir treffen damit keine Entscheidung über Ihr Kind.",
      ],
    },
    {
      heading: "5. Buchung eines Erstgesprächs",
      blocks: [
        "Für die Buchung erfassen wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer und Ihre freiwillige Nachricht. Den Termin tragen wir in unseren Google-Kalender ein. Die Bestätigung erhalten Sie per E-Mail.",
        "Das Erstgespräch kann als Videogespräch über Jitsi Meet (meet.jit.si) stattfinden. Dabei werden Bild, Ton und Verbindungsdaten über diesen Dienst übertragen. Wir zeichnen das Gespräch nicht auf.",
      ],
    },
    {
      heading: "6. Chat",
      blocks: [
        "Der Chat auf dieser Webseite antwortet automatisch mit künstlicher Intelligenz. Ihre Nachrichten gehen dafür an unseren Dienstleister Anthropic. Wir speichern den Chatverlauf nicht in einer eigenen Datenbank.",
        "Bitte geben Sie im Chat keine Namen von Kindern, keine Angaben zur Gesundheit und keine anderen vertraulichen Angaben ein. Antworten des Chats können falsch sein.",
      ],
    },
    {
      heading: "7. Kontakt per E-Mail, Telefon oder WhatsApp",
      blocks: [
        "Wenn Sie uns kontaktieren, bearbeiten wir Ihre Kontaktangaben und den Inhalt Ihrer Nachricht. Für E-Mails nutzen wir Gmail von Google. Wenn Sie uns über WhatsApp schreiben, gelten zusätzlich die Datenschutzhinweise von WhatsApp.",
      ],
    },
    {
      heading: "8. Daten von Kindern und Jugendlichen",
      blocks: [
        "Unser Angebot richtet sich an Eltern von Kindern und Jugendlichen. Bitte geben Sie nur Angaben zu Ihrem Kind an, die für die Begleitung nötig sind. Angaben zur Gesundheit müssen Sie uns nicht mitteilen.",
        "Kinder und Jugendliche sollten das Formular und die Buchung zusammen mit einem Elternteil nutzen.",
        "Namen oder erkennbare Bilder von Kindern und Jugendlichen zeigen wir nur mit schriftlicher Zustimmung der Eltern.",
      ],
    },
    {
      heading: "9. Cookies und lokale Speicherung",
      blocks: [
        "Ihre Wahl im Cookie-Hinweis speichern wir in Ihrem Browser, damit wir Sie nicht jedes Mal fragen müssen. Diese Speicherung ist für die Webseite nötig.",
        "Statistik-Cookies setzen wir nur, wenn Sie zustimmen. Sie können auch in Ihrem Browser festlegen, dass Cookies blockiert oder gelöscht werden.",
      ],
    },
    {
      heading: "10. Statistik mit Google Analytics",
      blocks: [
        "Wenn Sie zustimmen, nutzen wir Google Analytics. So sehen wir, welche Seiten besucht werden und wie die Webseite genutzt wird. Anbieter ist Google. Ohne Ihre Zustimmung wird Google Analytics nicht geladen.",
        "Google Analytics setzt Cookies, die je nach Einstellung bis zu zwei Jahre gespeichert bleiben. Ihre IP-Adresse wird gekürzt, bevor sie weiterverarbeitet wird. Die Daten können in die USA gelangen.",
        "Ihre Wahl können Sie jederzeit ändern. Klicken Sie dazu unten auf der Seite auf «Cookie-Einstellungen». Wenn Sie die Zustimmung zurückziehen, löschen wir die Statistik-Cookies in Ihrem Browser.",
      ],
    },
    {
      heading: "11. Fotos, Videos und Bewertungen",
      blocks: [
        "Auf der Webseite zeigen wir Fotos und Videos unseres Teams und unseres Unterrichts. Abgebildete Personen haben dem zugestimmt.",
        "Wir zeigen Auszüge aus öffentlichen Google-Bewertungen. Eltern nennen wir nur mit Vorname und Initiale. Bei Kindern und Jugendlichen nennen wir ohne schriftliche Zustimmung der Eltern keinen Namen. Wer seinen Auszug entfernen lassen möchte, kann uns jederzeit schreiben.",
      ],
    },
    {
      heading: "12. Unsere Dienstleister",
      blocks: [
        "Für diese Webseite arbeiten wir mit folgenden Dienstleistern. Sie bearbeiten Personendaten für die genannten Zwecke:",
        [
          "Netlify (USA): Hosting der Webseite",
          "Resend (USA): Versand von E-Mails aus den Formularen",
          "Google (Irland und USA): Gmail, Google-Kalender und, mit Ihrer Zustimmung, Google Analytics",
          "Anthropic (USA): künstliche Intelligenz für den Chat",
          "Jitsi Meet: Videogespräche",
        ],
        "Darüber hinaus geben wir Personendaten nur weiter, wenn Sie zustimmen oder wenn das Gesetz uns dazu verpflichtet.",
      ],
    },
    {
      heading: "13. Bekanntgabe ins Ausland",
      blocks: [
        "Einige Dienstleister bearbeiten Daten ausserhalb der Schweiz, insbesondere in den USA. Dort ist der Datenschutz nicht in jedem Fall gleich hoch wie in der Schweiz.",
        "In solchen Fällen stützen wir uns auf die Regelungen, die das DSG vorsieht. Das sind insbesondere die Zertifizierung unter dem Swiss-U.S. Data Privacy Framework, die Standardvertragsklauseln in den Bedingungen der Anbieter oder Ihre Einwilligung.",
      ],
    },
    {
      heading: "14. Wie lange wir Daten aufbewahren",
      blocks: [
        "Wir bewahren Personendaten nur so lange auf, wie wir sie für den jeweiligen Zweck brauchen. Anfragen, aus denen keine Zusammenarbeit entsteht, löschen wir, sobald sie erledigt sind und wir sie nicht mehr benötigen.",
        "Geschäftsunterlagen wie Rechnungen bewahren wir während der gesetzlichen Frist von zehn Jahren auf.",
      ],
    },
    {
      heading: "15. Sicherheit",
      blocks: [
        "Wir schützen Personendaten mit angemessenen technischen und organisatorischen Massnahmen. Die Verbindung zu dieser Webseite ist verschlüsselt. Einen vollständigen Schutz gibt es im Internet aber nicht.",
      ],
    },
    {
      heading: "16. Ihre Rechte",
      blocks: [
        "Im Rahmen des anwendbaren Rechts haben Sie insbesondere folgende Rechte:",
        [
          "Auskunft über Ihre Personendaten",
          "Berichtigung falscher Daten",
          "Löschung oder Einschränkung der Bearbeitung",
          "Widerspruch gegen eine Bearbeitung",
          "Herausgabe oder Übertragung Ihrer Daten",
          "Widerruf einer Einwilligung für die Zukunft",
        ],
        "Schreiben Sie uns dazu an skills4life.learning@gmail.com. Damit wir keine Daten an Unbefugte geben, können wir einen Identitätsnachweis verlangen.",
        "Sie können sich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten wenden (www.edoeb.admin.ch).",
      ],
    },
    {
      heading: "17. Links zu anderen Angeboten",
      blocks: [
        "Unsere Webseite verlinkt auf Instagram, LinkedIn, WhatsApp, Google Maps und andere Angebote. Erst wenn Sie einen solchen Link anklicken, gelangen Daten an den jeweiligen Anbieter. Dort gelten dessen Datenschutzbestimmungen.",
      ],
    },
    {
      heading: "18. Änderungen",
      blocks: [
        "Wir können diese Erklärung anpassen, wenn sich unser Angebot oder das Recht ändert. Es gilt die jeweils auf dieser Webseite veröffentlichte Fassung.",
      ],
    },
  ] satisfies LegalSection[],
};
