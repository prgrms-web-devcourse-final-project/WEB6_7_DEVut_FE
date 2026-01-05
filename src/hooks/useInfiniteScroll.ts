import { useEffect, useRef } from "react";

export const useInfiniteScroll = (onIntersect: () => void, enabled: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return ref;
};
