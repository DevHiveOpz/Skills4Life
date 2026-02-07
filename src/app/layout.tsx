import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Skills4Life | Nachhilfe die wirkt",
  description:
    "Wir begleiten Kinder und Jugendliche durch schwierige Schulphasen, damit Lernen gelingt und Familien wieder aufatmen.",
  keywords: [
    "Nachhilfe",
    "Lernbegleitung",
    "Schulhilfe",
    "Prufungsvorbereitung",
    "Skills4Life",
    "Schweiz",
  ],
  authors: [{ name: "Skills4Life" }],
  openGraph: {
    title: "Skills4Life | Nachhilfe die wirkt",
    description:
      "Wir begleiten Kinder und Jugendliche durch schwierige Schulphasen, damit Lernen gelingt und Familien wieder aufatmen.",
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
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
