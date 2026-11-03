"use client";

import { usePathname } from "next/navigation";

// The entry page ("/") shows only the logo intro and the audience choice,
// so header, footer and chat are hidden there.
export function HideOnEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
