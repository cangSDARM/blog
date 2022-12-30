import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ScrollSpyItem } from "./scrollspy";

/**
 * @ref: https://www.emgoto.com/react-table-of-contents/
 */
const useIntersectionObserver = (toc: ScrollSpyItem[]) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );
  const [selected, setSelected] = useState<string>("");

  const getItemsNode = useCallback(() => {
    const urls: Element[] = [];
    for (const ele of toc) {
      const documentEle = globalThis?.document?.getElementById(ele.hash);
      if (documentEle) urls.push(documentEle);
    }
    return urls;
  }, [toc]);

  useLayoutEffect(() => {
    const nodes = getItemsNode();
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
          nodes.findIndex((heading) => heading.id === id);

        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setSelected(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    nodes.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [getItemsNode]);

  return selected;
};

export default useIntersectionObserver;
