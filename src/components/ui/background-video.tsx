"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  src: string;
  pauseLabel: string;
  playLabel: string;
  /** Tailwind classes for the video element, e.g. its layer and crop */
  className?: string;
};

// A silent looping video behind a section. It starts only after the page has
// finished loading, so the poster image below it stays what visitors see first.
// Visitors who prefer less motion or save data keep the still image.
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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const { connection } = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (reduceMotion || connection?.saveData) return;

    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => setActive(true), 1000);
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
        className="absolute bottom-space-3 left-space-3 size-touch px-0 md:left-space-4"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
      >
        <Icon icon={playing ? Pause : Play} size={20} />
      </Button>
    </>
  );
}
