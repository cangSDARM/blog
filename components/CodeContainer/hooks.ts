import React from "react";
import { IsolatedContext } from "./sandbox";

type Cleanup = void | (() => void);

export const useContainer = (
  onfind: (container: IsolatedContext, ref: HTMLElement) => Cleanup
) => {
  let cleanup: Cleanup;
  const container = React.useRef<IsolatedContext | null>(null);

  React.useEffect(() => cleanup, [container]);

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
      cleanup = onfind(container.current, ref);
    }
  };
};
