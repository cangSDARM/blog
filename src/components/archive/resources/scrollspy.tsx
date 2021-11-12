///cv from https://gist.github.com/iDVB/a041da210605f05e0b36ac03ed403c00
import throttle from "lodash/throttle";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useThrottledOnScroll = <T extends (...args: any) => any>(
  callback: T | null,
  delay: number,
  target: ReturnType<typeof getTarget>
) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  useEffect(() => {
    if (
      target == null ||
      typeof target == "string" ||
      throttledCallback === noop ||
      typeof target.addEventListener !== "function" ||
      typeof target.removeEventListener !== "function"
    ) {
      return undefined;
    }

    target.addEventListener("scroll", throttledCallback as any);
    return () => {
      target.removeEventListener("scroll", throttledCallback as any);
      //@ts-ignore
      throttledCallback?.cancel();
    };
  }, [throttledCallback, target]);
};

const getTarget = (
  target: (Window & typeof globalThis) | string | null | HTMLElement = window
) =>
  target === null
    ? window
    : typeof target === "string" && typeof window !== "undefined"
    ? document.getElementById(target)
    : target;
const noop = () => {};

type ScrollSpyItem = { hash: string };

interface ScrollSpyConfig<T extends ScrollSpyItem> {
  items: T[];
  target?: (Window & typeof globalThis) | string | null | HTMLElement;
}

const useScrollSpy: <T extends ScrollSpyItem>(
  data: ScrollSpyConfig<T>
) => {
  activated: string | null;
  requireLock: React.Dispatch<React.SetStateAction<boolean>>;
  onScroll: boolean;
} = ({ items = [], target = window }) => {
  const itemsWithNodeRef = useRef<ReturnType<typeof getItemsClient>>([]);
  const trueTarget = useRef<ReturnType<typeof getTarget>>(null);

  useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

  useEffect(() => {
    trueTarget.current = getTarget(target);
  }, [target]);

  const [activeState, setActiveState] = useState<null | string>(null);
  const [lock, setLock] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  const findActiveIndex = useCallback(() => {
    let active;
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      // @ts-ignore
      if (trueTarget.current?.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = itemsWithNodeRef.current[i];

      if (process.env.NODE_ENV !== "production") {
        if (!item.node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          );
        }
      }

      if (
        item.node &&
        item.node.offsetTop <
          //@ts-ignore
          trueTarget.current?.scrollTop + trueTarget.current?.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState]);

  const withLockScroll = useCallback(() => {
    if (lock) return;

    setOnScroll(true);
    findActiveIndex();
    setOnScroll(false);
  }, [lock]);

  useThrottledOnScroll(
    items.length > 0 ? withLockScroll : null,
    166,
    trueTarget.current
  );

  return {
    activated: activeState,
    requireLock: setLock,
    onScroll,
  };
};

const getItemsClient = <T extends ScrollSpyItem>(items: T[]) =>
  items.map(({ hash }) => ({
    hash,
    node: document?.getElementById(hash),
  }));

export default useScrollSpy;
