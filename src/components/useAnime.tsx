import Anime from "animejs";
import { useEffect, useRef } from "react";

export default function useAnime() {
  const animeRef = useRef(Anime);

  useEffect(() => {
    if (!animeRef.current) {
      animeRef.current = Anime;
    }
  }, []);

  return animeRef.current;
}

/**
 * @example
 * ```js
 * useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)
  })
 * ```
 * @param {Function} callback 
 */
export const useAnimationFrame = (callback: (time: number) => void) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;

    if (window && window.requestAnimationFrame != null)
      requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (window && window.requestAnimationFrame != null)
      requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (window && window.requestAnimationFrame != null)
        cancelAnimationFrame(requestRef.current || 0);
    };
  }, []); // Make sure the effect runs only once
};
