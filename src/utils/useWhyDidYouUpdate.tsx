import { useEffect, useRef } from "react";

export type IProps = {
  [key: string]: any;
};

export default function useWhyDidYouUpdate(
  props: IProps,
  componentName: string = "Component Update by:"
) {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        if (prevProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}