// copied from https://floating-ui.com/docs/popover#examples

// import React from "react";
// import {
//   useFloating,
//   autoUpdate,
//   offset,
//   flip,
//   shift,
//   safePolygon,
//   useDismiss,
//   useRole,
//   useInteractions,
//   useMergeRefs,
//   Placement,
//   FloatingPortal,
//   FloatingFocusManager,
//   useId,
//   useHover,
// } from "@floating-ui/react";

// type AsProp = {
//   /**
//    * An override of the default HTML tag.
//    * Can also be another React component.
//    */
//   as?: React.ElementType;
// };

// interface PopoverOptions {
//   initialOpen?: boolean;
//   placement?: Placement;
//   modal?: boolean;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
//   trigger?: "click" | "hover";
// }

// export function usePopoverState({
//   initialOpen = false,
//   placement = "bottom",
//   modal,
//   open: controlledOpen,
//   onOpenChange: setControlledOpen,
// }: PopoverOptions = {}) {
//   const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
//   const [labelId, setLabelId] = React.useState<string | undefined>();
//   const [descriptionId, setDescriptionId] = React.useState<
//     string | undefined
//   >();

//   const open = controlledOpen ?? uncontrolledOpen;
//   const setOpen = setControlledOpen ?? setUncontrolledOpen;
//   const controlled = controlledOpen !== null;

//   const data = useFloating({
//     placement,
//     open,
//     onOpenChange: setOpen,
//     whileElementsMounted: autoUpdate,
//     middleware: [
//       offset(5),
//       flip({
//         fallbackAxisSideDirection: "end",
//       }),
//       shift({ padding: 5 }),
//     ],
//   });

//   const context = data.context;

//   const dismiss = useDismiss(context);
//   const role = useRole(context);

//   return React.useMemo(
//     () => ({
//       open,
//       setOpen,
//       controlled,
//       ...data,
//       modal,
//       labelId,
//       descriptionId,
//       setLabelId,
//       setDescriptionId,
//       defaultInteractions: [dismiss, role],
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [open, setOpen, data, modal, controlled, labelId, descriptionId]
//   );
// }

// export function usePopover(
//   popoverState: Omit<ReturnType<typeof usePopoverState>, "defaultInteractions">,
//   interactions: ReturnType<typeof useInteractions>
// ) {
//   return { ...popoverState, ...interactions };
// }

// type ContextType =
//   | (ReturnType<typeof usePopover> & {
//       setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
//       setDescriptionId: React.Dispatch<
//         React.SetStateAction<string | undefined>
//       >;
//     })
//   | null;

// const PopoverContext = React.createContext<ContextType>(null);

// export const usePopoverContext = () => {
//   const context = React.useContext(PopoverContext);

//   if (context == null) {
//     throw new Error("Popover components must be wrapped in <Popover />");
//   }

//   return context;
// };

// function ClickPopover({
//   children,
//   modal = false,
//   trigger = "click",
//   ...restOptions
// }: {
//   children: React.ReactNode;
// } & PopoverOptions) {
//   // This can accept any props as options, e.g. `placement`,
//   // or other positioning options.
//   const { defaultInteractions, ...popoverState } = usePopoverState({
//     modal,
//     ...restOptions,
//   });

//   const click = useHover(popoverState.context, {
//     enabled: popoverState.controlled,
//   });

//   const interactions = useInteractions([click, ...defaultInteractions]);

//   const popover = usePopover(popoverState, interactions);

//   return (
//     <PopoverContext.Provider value={popover}>
//       {children}
//     </PopoverContext.Provider>
//   );
// }

// function HoverPopover({
//   children,
//   modal = false,
//   trigger = "click",
//   ...restOptions
// }: {
//   children: React.ReactNode;
// } & PopoverOptions) {
//   // This can accept any props as options, e.g. `placement`,
//   // or other positioning options.
//   const { defaultInteractions, ...popoverState } = usePopoverState({
//     modal,
//     ...restOptions,
//   });

//   const hover = useHover(popoverState.context, {
//     enabled: popoverState.controlled,
//     handleClose: safePolygon(),
//   });

//   const interactions = useInteractions([hover, ...defaultInteractions]);

//   const popover = usePopover(popoverState, interactions);

//   return (
//     <PopoverContext.Provider value={popover}>
//       {children}
//     </PopoverContext.Provider>
//   );
// }

// export const Popover = {
//   Click: ClickPopover,
//   Hover: HoverPopover,
// };

// export const PopoverTrigger = React.forwardRef<
//   HTMLElement,
//   React.PropsWithChildren<React.HTMLProps<HTMLElement>>
// >(function PopoverTrigger({ children, ...props }, propRef) {
//   const context = usePopoverContext();
//   const childrenRef = (children as any).ref;
//   const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

//   if (React.isValidElement(children)) {
//     return React.cloneElement(
//       children,
//       context.getReferenceProps({
//         ref,
//         ...props,
//         ...children.props,
//         "data-state": context.open ? "open" : "closed",
//       })
//     );
//   }

//   throw new Error("child is not a valid element for attaching popover state");
// });

// export const PopoverContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLProps<HTMLDivElement> & { asChild?: boolean }
// >(function PopoverContent(props, propRef) {
//   const { context: floatingContext, ...context } = usePopoverContext();
//   const ref = useMergeRefs([context.refs.setFloating, propRef]);

//   const style = React.useMemo(
//     () => ({
//       position: context.strategy,
//       top: context.y ?? 0,
//       left: context.x ?? 0,
//       width: "max-content",
//       ...props.style,
//     }),
//     [props.style, context.strategy, context.y, context.x]
//   );

//   return (
//     <FloatingPortal>
//       {context.open && (
//         <FloatingFocusManager context={floatingContext} modal={context.modal}>
//           <div
//             {...props}
//             ref={ref}
//             style={style}
//             aria-labelledby={context.labelId}
//             aria-describedby={context.descriptionId}
//             {...context.getFloatingProps(props)}
//           >
//             {props.children}
//           </div>
//         </FloatingFocusManager>
//       )}
//     </FloatingPortal>
//   );
// });

// export const PopoverHeading = React.forwardRef<
//   HTMLHeadingElement,
//   React.HTMLProps<HTMLHeadingElement> & AsProp
// >(function PopoverHeading({ children, as, ...props }, ref) {
//   const { setLabelId } = usePopoverContext();
//   const id = useId();
//   const Tag = as || "h2";

//   // Only sets `aria-labelledby` on the Popover root element
//   // if this component is mounted inside it.
//   React.useLayoutEffect(() => {
//     setLabelId(id);
//     return () => setLabelId(undefined);
//   }, [id, setLabelId]);

//   return (
//     <Tag {...props} ref={ref} id={id}>
//       {children}
//     </Tag>
//   );
// });

// export const PopoverDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLProps<HTMLParagraphElement> & AsProp
// >(function PopoverDescription({ children, as, ...props }, ref) {
//   const { setDescriptionId } = usePopoverContext();
//   const id = useId();
//   const Tag = as || "p";

//   // Only sets `aria-describedby` on the Popover root element
//   // if this component is mounted inside it.
//   React.useLayoutEffect(() => {
//     setDescriptionId(id);
//     return () => setDescriptionId(undefined);
//   }, [id, setDescriptionId]);

//   return (
//     <Tag {...props} ref={ref} id={id}>
//       {children}
//     </Tag>
//   );
// });

// export const PopoverClose: React.FC<{
//   children: React.ReactElement<any>;
//   /** @default 'onClick' */
//   work?: string;
// }> = function PopoverClose({ children, work = "onClick" }) {
//   const { setOpen } = usePopoverContext();
//   const oriFn = React.useRef<(...args: any[]) => any>();
//   const propsProxy = React.useRef<typeof children.props>();

//   React.useEffect(() => {
//     const worker = children?.props?.[work];
//     if (typeof worker === "function") {
//       oriFn.current = worker?.bind(React);
//     }
//     propsProxy.current = {
//       [work]: (...props: Parameters<Defined<typeof oriFn.current>>) => {
//         oriFn.current?.(...props);
//         setOpen(false);
//       },
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [children.props?.[work]]);

//   if (!React.isValidElement(children)) {
//     console.error("PopoverClose should wrap for a element to close");
//     return children;
//   }

//   return React.cloneElement(children, {
//     ...(children.props as any),
//     ...propsProxy.current,
//   });
// };
