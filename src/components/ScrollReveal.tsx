"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade" | "scale";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const animationClass = {
    up: "animate-fade-in-up",
    fade: "animate-fade-in",
    scale: "animate-scale-in",
  }[direction];

  // Render as a transparent pass-through — no opacity on the wrapper itself.
  // The child section keeps its own background visible immediately.
  // We use a CSS variable to pass visibility state down to the inner content container.
  return (
    <div
      ref={ref}
      className={className}
      style={{
        // @ts-expect-error CSS custom property
        "--reveal-opacity": isVisible ? 1 : 0,
        "--reveal-transform": isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <style>{`
        .reveal-content {
          opacity: var(--reveal-opacity, 0);
          transform: var(--reveal-transform, translateY(40px));
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          ${delay ? `transition-delay: ${delay}ms;` : ""}
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-content {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
