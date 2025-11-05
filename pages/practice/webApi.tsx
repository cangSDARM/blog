import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";
import Image from "@/components/Image";

const usePointerLock = (
  onChange?: (event: Event, lockedElement: HTMLElement | null) => void
) => {
  const locked = () => !!document.pointerLockElement;
  const lock = (ref: HTMLElement, options?: PointerLockOptions) => {
    ref?.requestPointerLock(options);
  };

  const release = () => {
    document.exitPointerLock();
  };

  React.useEffect(() => {
    const listener = (ev: Event) => {
      onChange?.(ev, document.pointerLockElement as unknown as any);
    };
    document.addEventListener("pointerlockchange", listener);

    return () => {
      document.removeEventListener("pointerlockchange", listener);
    };
  }, [onChange]);

  return { lock, release, locked };
};

const ApiLabel: React.FC<React.PropsWithChildren<{ label: string }>> = ({
  label,
  children,
}) => {
  return (
    <label
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1333333333)",
        padding: "1em 0.5em",
        objectFit: "scale-down",
      }}
    >
      <h3>{label}</h3>
      {children}
    </label>
  );
};

const PointerLocker: React.FC = () => {
  const ref = React.useRef<HTMLImageElement>(null);

  const motions: [number, number] = [0, 0];
  const rotate = (e: MouseEvent) => {
    motions[0] = motions[0] + e.movementX;
    motions[1] = motions[1] + e.movementY;

    if (ref.current)
      ref.current.style.transform = `rotateX(${motions[1]}deg) rotateY(${motions[0]}deg)`;
  };
  const locksmith = usePointerLock((_e, element) => {
    if (element) {
      document.addEventListener("mousemove", rotate, false);
    } else {
      document.removeEventListener("mousemove", rotate, false);
    }
  });

  return (
    <ApiLabel label="Pointer Lock">
      <Image
        src="https://luna-dict-community.nosdn.127.net/db2266e756ded7094c5dcbeebd1e6a8b.png"
        ref={ref}
        onClick={() => {
          if (locksmith.locked()) {
            locksmith.release();
          } else {
            locksmith.lock(ref.current!);
          }
        }}
        style={{
          perspective: 200,
        }}
      />
    </ApiLabel>
  );
};

export default injectLayoutContext(function () {
  return (
    <>
      <Meta />
      <Layout theme="light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <PointerLocker />
        </div>
      </Layout>
    </>
  );
});

export function getStaticProps() {
  const overview = collectionOverview();

  return {
    props: { overview },
  };
}
