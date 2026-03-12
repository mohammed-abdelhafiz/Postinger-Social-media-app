import React from "react";
import type { Theme } from "@/types";
import { flushSync } from "react-dom";

export const useToggleTheme = (setTheme: (theme: Theme) => void) => {
  return (nextTheme: Theme, e?: React.MouseEvent) => {
    const applyTheme = () => setTheme(nextTheme);

    if (!document.startViewTransition) {
      applyTheme();
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    transition.ready.then(() => {
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };
};
