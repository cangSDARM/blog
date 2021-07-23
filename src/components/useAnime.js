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
export const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;

    if (window && window.requestAnimationFrame)
      requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (window && window.requestAnimationFrame)
      requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (window && window.requestAnimationFrame)
        cancelAnimationFrame(requestRef.current);
    };
  }, []); // Make sure the effect runs only once
};
