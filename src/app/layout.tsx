import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LazyChatWidget } from "@/components/lazy-chat-widget";
import { HideOnEntry } from "@/components/hide-on-entry";
import { Analytics } from "@/components/analytics/analytics";
import { StructuredData } from "@/components/seo/structured-data";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  ...pageMetadata({
    title: "Skills4Life | Stärken entdecken, Selbstvertrauen aufbauen",
    description: site.description,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${nunito.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <HideOnEntry>
          <Navigation />
        </HideOnEntry>
        <main className="min-h-screen">{children}</main>
        <HideOnEntry>
          <Footer />
          <LazyChatWidget />
        </HideOnEntry>
        <Analytics />
        <StructuredData />
      </body>
    </html>
  );
}
