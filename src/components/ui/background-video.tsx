"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// Phones wait until the page has settled before the download starts
const PHONE_START_DELAY = 3000;

type BackgroundVideoProps = {
  src: string;
  pauseLabel: string;
  playLabel: string;
  /** Tailwind classes for the video element, e.g. its layer and crop */
  className?: string;
};

// A silent looping video behind a section. It starts by itself once the page
// has loaded, on top of a poster image showing its first frame. The pause
// button only appears for keyboard users.
export function BackgroundVideo({
  src,
  pauseLabel,
  playLabel,
  className,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const { connection } = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (connection?.saveData) return;

    let timer: number | undefined;
    const start = () => {
      const delay = window.matchMedia("(min-width: 1024px)").matches
        ? 0
        : PHONE_START_DELAY;
      timer = window.setTimeout(() => setActive(true), delay);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setPlaying(false));
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  if (!active) return null;

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => setVisible(true)}
        className={cn(
          "transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
      />
      <Button
        variant="onDarkOutline"
        className="pointer-events-none absolute bottom-space-3 left-space-3 size-touch px-0 opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-100 md:left-space-4"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
      >
        <Icon icon={playing ? Pause : Play} size={20} />
      </Button>
    </>
  );
}
