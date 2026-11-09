"use client";

import { useEffect } from "react";

// Makes every link to a section of the current page work on every click.
// The router ignores a click when the address already ends in that #section,
// so these links are handled here, for the whole site, in one place.
export function InPageLinks() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") {
        return;
      }

      const url = new URL(link.href);
      if (
        !url.hash ||
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname
      ) {
        return;
      }

      const section = document.getElementById(url.hash.slice(1));
      if (!section) return;

      event.preventDefault();
      window.history.replaceState(window.history.state, "", url.hash);
      section.scrollIntoView();
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
