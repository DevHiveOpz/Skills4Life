import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Skills4Life für Schulen",
};

export default function SchulenPage() {
  return <ComingSoon audience="Schulen" />;
}
