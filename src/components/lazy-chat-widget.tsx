"use client";

import dynamic from "next/dynamic";

// The chat button is not needed for the first view, so its code loads after
// the page is ready. This keeps the page fast on phones.
export const LazyChatWidget = dynamic(
  () => import("@/components/chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
);
