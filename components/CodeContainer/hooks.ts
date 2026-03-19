import React from "react";
import { contextname, IsolatedContext } from "./sandbox";

export const useContainer = (
  onfind: (container: IsolatedContext, ref: HTMLElement) => void
) => {
  const container = React.useRef<IsolatedContext | null>(null);

  return (ref?: HTMLElement | null) => {
    if (!ref) return;
    if (container.current) return;

    const element = ref.parentElement?.querySelector(
      "[data-code-container]"
    ) as HTMLIFrameElement;

    if (element instanceof HTMLIFrameElement) {
      container.current = (
        ref.parentElement?.querySelector(
          "[data-code-container]"
        ) as HTMLIFrameElement
      ).contentWindow as any;
    } else {
      container.current = window as any;
    }

    if (container.current) {
      (container.current as any)[contextname] = element.id;
      onfind(container.current, ref);
    }
  };
};
