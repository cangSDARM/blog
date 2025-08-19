import clsx from "clsx";
import React, { Fragment, useState } from "react";
import Image from "@/components/Image";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./style.module.scss";
import Conf from "@/conf";
import { displayComment, displayExpansion } from "./utils";

export const TableBody = (props: any) => <tbody {...props}></tbody>;
export const TableCell = ({ component: Comp = "td", ...props }: any) => (
  <Comp {...props} />
);
export const TableHead = (props: any) => <thead {...props}></thead>;
export const TableRow = (props: any) => <tr {...props}></tr>;
export const STable = (props: any) => <table {...props}></table>;

let QueryList: any[] = [];

export const CommentList = function <T extends any[]>(list: T) {
  QueryList = list;
};

type ModalImageState =
  | {
      src: string;
      width: number;
      height: number;
    }
  | undefined;
export const ModalContext = React.createContext({
  load: async (about: string) => undefined as ModalImageState,
});

const useModalContext = (about: string) => {
  const [curImageState, setCurImageState] = React.useState<ModalImageState>();
  const { load } = React.useContext(ModalContext);

  React.useEffect(() => {
    load(about).then(setCurImageState);
  }, [about, load]);

  return curImageState;
};

export const ModalContextProvider: React.FC<
  React.PropsWithChildren<{
    images: string[];
  }>
> = ({ children, images }) => {
  const ImageLists = React.useMemo(() => images, [images]);

  return (
    <ModalContext.Provider
      value={{
        load: async (about) => {
          if (typeof window === "undefined") return;

          const imageSrc = ImageLists[parseInt(about.replace("@", "")) - 1];
          const realSrc = `/images/graphics/${imageSrc}.png`;

          const image = new window.Image();
          image.src = Conf.site.baseUrl + realSrc;

          return new Promise((resolve, reject) => {
            image.onload = function (e) {
              const target = e.target as HTMLImageElement;
              resolve({
                src: realSrc,
                width: target.naturalWidth,
                height: target.naturalHeight,
              });
            };
            image.onerror = reject;
          });
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const Table: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  children,
  title,
  ...otherProps
}) => {
  //@ts-ignore
  const colSpan = Array.from(children[0]?.cells)?.length ?? 2;
  return (
    <STable size="small" {...otherProps}>
      {title && (
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={colSpan}
              style={{ fontSize: 20 }}
            >
              {title}
            </TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {/** @ts-ignore */}
        {children?.map((row, key) => (
          <TableRow key={key} style={row.style}>
            {Array.from(row.cells).map((cell, ckey) => {
              const props = row.props ? row.props[ckey] : {};
              return (
                <TableCell
                  {...props}
                  component={row.component ? row.component[ckey] : undefined}
                  key={ckey}
                  style={row.cellStyle}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </STable>
  );
};

export const Tab: React.FC<
  React.PropsWithChildren<{ expan: boolean; vicinage: boolean }>
> = ({ children, expan, vicinage }) => {
  const classes: string[] = [styles.Tab];
  if (expan) classes.push(styles.hidden);

  return vicinage ? (
    //@ts-ignore
    <div className={styles.Tab} vicinage="true" />
  ) : children ? (
    <Fragment>
      <div className={clsx(classes)}>{children}</div>
      {expan && <br />}
    </Fragment>
  ) : (
    <div className={clsx(classes)} />
  );
};

export const Expansion: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div
      role="expansion"
      className={styles.Expansion}
      onClick={(e) => {
        displayExpansion(e.currentTarget, styles);
      }}
    >
      {children}
    </div>
  );
};

export const Aphorism: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: `100%`,
        textAlign: `center`,
        margin: `0.5rem auto`,
      }}
    >
      <span className={styles.aphorism}>{children}</span>
    </div>
  );
};

export const Model: React.FC<React.PropsWithChildren<{ about: string }>> = ({
  about,
  children,
}) => {
  const [curr, setCurr] = useState(false);
  const imageState = useModalContext(about);

  return (
    <Dialog.Root
      open={curr}
      onOpenChange={(open) => {
        setCurr(open);
      }}
    >
      <Dialog.Trigger asChild>
        <span className={styles.ModelTrigger}>{children}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.ModalOverlay} data-theme="dark" />
        <Dialog.Content className={styles.ModalContent} data-theme="dark">
          {imageState ? (
            <Image
              alt={imageState.src}
              src={imageState.src}
              height={imageState.height}
              width={imageState.width}
              style={{ maxWidth: "unset" }}
            />
          ) : (
            <></>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const Quote: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  const focus = () => {
    if (QueryList[parseInt(id.replace("#", "")) - 1])
      displayComment.onOver(QueryList[parseInt(id.replace("#", "")) - 1]);
    else
      displayComment.onOver(
        `Warn: no such Quote be found in ${QueryList} at ${id}`
      );
  };

  const blur = () => displayComment.onOut();

  return (
    <span
      className={styles.Quote}
      id={id}
      onMouseOver={focus}
      onFocus={focus}
      onMouseOut={blur}
      onBlur={blur}
    >
      {children}
    </span>
  );
};

export const Anchor: React.FC<React.PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => {
  if (!name) {
    name = children?.toString() || "";
  }
  return (
    <h3>
      {/** @ts-ignore */}
      <span name={name}>{children}</span>
    </h3>
  );
};
