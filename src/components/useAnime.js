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
