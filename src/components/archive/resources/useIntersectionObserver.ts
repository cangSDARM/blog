import { useEffect, useRef, useState } from "react";

/**
 * @ref: https://www.emgoto.com/react-table-of-contents/
 */
const useIntersectionObserver = (toc: Element[]) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const callback: IntersectionObserverCallback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      if (visibleHeadings.length === 1) {
        setSelected(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const getIndexFromId = (id: string) =>
          toc.findIndex((heading) => heading.id === id);

        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setSelected(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    toc.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [toc]);

  return selected;
};

export default useIntersectionObserver;
