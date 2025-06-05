import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTime = useRef<number | null>(null);
  const startValue = useRef<number>(0);
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target === current) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
        startValue.current = current;
      }

      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newValue = Math.round(
        startValue.current + (target - startValue.current) * easeOutQuart,
      );

      setCurrent(newValue);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
        setIsAnimating(false);
        startTime.current = null;
      }
    };

    setIsAnimating(true);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [target, duration]);

  return { current, isAnimating };
}
