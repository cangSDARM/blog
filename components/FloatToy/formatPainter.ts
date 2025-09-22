import React from "react";

/**
 * work like \<Microsoft Office\> format painter.
 *
 * note:
 * - bind `paintAreaRef` to paint-area
 * - bind `capture` to the "onPointerDown" of the formattable unit
 * - bind `release` to the "onPointerDown" of the formattable unit
 * - acquire initial-format by `getInitialFormat`
 */
export const useFormatPainter = () => {
  const paintAreaRef = React.useRef<HTMLElement>(null);
  const release = () => {
    delete paintAreaRef.current?.dataset?.captured;
    paintAreaRef.current?.removeEventListener("pointerleave", release);
  };
  const capture = (initialIndex: number) => {
    if (!paintAreaRef.current) return;
    paintAreaRef.current.dataset.captured = initialIndex.toString();
    paintAreaRef.current.addEventListener("pointerleave", release);
  };
  const getInitialFormat = () => {
    return paintAreaRef.current?.dataset?.captured;
  };

  return {
    paintAreaRef,
    capture,
    release,
    getInitialFormat,
  };
};
