"use client";

import { useEffect } from "react";

const ScrollToSectionContainer = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Remove the '#' and find the element
        const id = hash.substring(1);
        const element = document.getElementById(id);

        if (element) {
          // Use scrollIntoView with smooth behavior
          // Add delay before scrolling (e.g., 300ms)
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 1000);
        }
      }
    }
  }, []);

  return <>{children}</>;
};

export default ScrollToSectionContainer;
