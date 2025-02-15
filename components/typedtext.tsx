"use client";
import React, { useEffect, useRef } from "react";
import Typed, { TypedOptions } from "typed.js";

const TypedText = () => {
  const typedElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const options: TypedOptions = {
      strings: ["Delicious cakes for your sweet moments!"], // Animated slogan
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    };

    if (typedElement.current) {
      const typed = new Typed(typedElement.current, options);
      return () => {
        typed.destroy(); // Cleanup on unmount
      };
    }
  }, []);

  return <span ref={typedElement} style={styles.animatedText}></span>;
};

const styles = {
  animatedText: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "white", // Golden color
  },
};

export default TypedText;
