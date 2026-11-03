import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { HideOnEntry } from "@/components/hide-on-entry";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Skills4Life | Believe in yourself",
  description:
    "Wir helfen Kindern, an sich zu glauben, indem wir ihre Stärken in den Mittelpunkt stellen. Für Familien, Schulen und Vereine.",
  keywords: [
    "Selbstvertrauen",
    "Stärken",
    "Lernbegleitung",
    "Kinder",
    "Skills4Life",
    "Zürich",
  ],
  authors: [{ name: "Skills4Life" }],
  openGraph: {
    title: "Skills4Life | Believe in yourself",
    description:
      "Wir helfen Kindern, an sich zu glauben, indem wir ihre Stärken in den Mittelpunkt stellen.",
    type: "website",
    locale: "de_CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${nunito.variable} font-sans antialiased`}
      >
        <HideOnEntry>
          <Navigation />
        </HideOnEntry>
        <main className="min-h-screen">{children}</main>
        <HideOnEntry>
          <Footer />
          <ChatWidget />
        </HideOnEntry>
      </body>
    </html>
  );
}
