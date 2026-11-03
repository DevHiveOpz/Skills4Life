import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Skills4Life für Vereine",
};

export default function VereinePage() {
  return <ComingSoon audience="Vereine" />;
}
