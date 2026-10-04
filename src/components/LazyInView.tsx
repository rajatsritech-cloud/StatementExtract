'use client';

import React, { useEffect, useRef, useState } from "react";

interface LazyInViewProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function LazyInView({
  children,
  rootMargin = "200px 0px",
  threshold = 0.1,
  once = true,
}: LazyInViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
}

export default LazyInView;
