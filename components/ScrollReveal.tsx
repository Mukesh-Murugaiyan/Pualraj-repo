"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number; // ms
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use IntersectionObserver for 60fps GPU entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-8";
      case "down":
        return "opacity-0 -translate-y-8";
      case "left":
        return "opacity-0 translate-x-8";
      case "right":
        return "opacity-0 -translate-x-8";
      case "fade":
      default:
        return "opacity-0 scale-98";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
}
