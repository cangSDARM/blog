///cv from https://gist.github.com/iDVB/a041da210605f05e0b36ac03ed403c00
import throttle from "lodash/throttle";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useThrottledOnScroll = (callback, delay, target) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  useEffect(() => {
    if (
      target == null ||
      throttledCallback === noop ||
      typeof target.addEventListener !== "function" ||
      typeof target.removeEventListener !== "function"
    ) {
      return undefined;
    }

    target.addEventListener("scroll", throttledCallback);
    return () => {
      target.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback, target]);
};

const getTarget = (target = window) =>
  target === null
    ? window
    : typeof target === "string" && typeof window !== "undefined"
    ? document.getElementById(target)
    : target;
const noop = () => {};

const useScrollSpy = ({ items = [], target = window } = {}) => {
  const itemsWithNodeRef = useRef([]);
  const trueTarget = useRef(null);
  useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

  useEffect(() => {
    trueTarget.current = getTarget(target);
  }, [target]);

  const [activeState, setActiveState] = useState(null);
  const [lock, setLock] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  const findActiveIndex = useCallback(() => {
    let active;
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (trueTarget.current.scrollTop < 200) {
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
          trueTarget.current.scrollTop + trueTarget.current.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState]);

  const withLockScroll = () => {
    if (lock) return;

    setOnScroll(true);
    findActiveIndex();
    setOnScroll(false);
  };

  useThrottledOnScroll(
    items.length > 0 ? withLockScroll : null,
    166,
    trueTarget.current
  );

  return {
    actived: activeState,
    requireLock: setLock,
    onScroll,
  };
};

const getItemsClient = (items) =>
  items.map(({ hash }) => ({
    hash,
    node: document?.getElementById(hash),
  }));

export default useScrollSpy;
