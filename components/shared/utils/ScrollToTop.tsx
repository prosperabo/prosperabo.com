"use client";
// components/ScrollToTop.js
import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to the top of the page
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
};

export default ScrollToTop;
