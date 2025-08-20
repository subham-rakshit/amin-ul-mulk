"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  startOnView = false,
  loop = true,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  // Extract the text content from children
  const textContent =
    typeof children === "string" ? children : children?.props?.children || "";

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let typingEffect;

    const typeText = () => {
      typingEffect = setInterval(() => {
        if (i < textContent.length) {
          setDisplayedText(textContent.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingEffect);
          if (loop) {
            setIsTyping(false);
            setTimeout(() => {
              setDisplayedText("");
              i = 0;
              setIsTyping(true);
            }, 1000);
          }
        }
      }, duration);
    };

    if (isTyping) {
      typeText();
    }

    return () => {
      clearInterval(typingEffect);
    };
  }, [textContent, duration, started, isTyping, loop]);

  // Clone the child element and inject the animated text
  const renderAnimatedChild = () => {
    if (typeof children === "string") {
      return (
        <>
          {displayedText}
          {isTyping && (
            <motion.span
              className="inline-block w-1 h-8 bg-current ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </>
      );
    }

    return React.cloneElement(children, {
      ...children.props,
      children: (
        <>
          {displayedText}
          {isTyping && (
            <motion.span
              className="inline-block w-1 h-8 bg-current ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </>
      ),
      ref: elementRef,
    });
  };

  return renderAnimatedChild();
}
