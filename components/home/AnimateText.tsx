'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
const AnimateText = () => {
  const textOptions = ["Propósito", "Prospera"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [textOptions.length]);
  return (
    <span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.9 }}
          className="text-3xl font-bold"
        >
          {textOptions[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default AnimateText;