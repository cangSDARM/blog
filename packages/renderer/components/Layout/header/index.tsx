import React from "react";
import { RxCaretDown } from "react-icons/rx";
import clsx from "clsx";
import Button from "@/components/Button";
import _ from "lodash";
import { useSurfaceStyle } from "@/components/Surface";
import styles from "./style.module.scss";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Preview from "./preview";
import Link from "next/link";
import { useLC } from "../context";

const Header: React.FC<{
  imgSrc: string;
  fileList?: any[];
  topic?: string;
  style?: React.CSSProperties;
}> = ({ imgSrc, topic = "", fileList = [], style }) => {
  const surfaceStyle = useSurfaceStyle();
  const { overview } = useLC();

  return (
    <header data-theme="dark" className={styles["nav-root"]} style={style}>
      <section className={styles["nav-section"]}>
        <Link className={styles["nav-logo"]} href={"/"}>
          <h3>Allen Lee@Blog</h3>
        </Link>
        <NavigationMenu.Root className={styles["nav-menus"]}>
          <NavigationMenu.List>
            {topic && (
              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={styles["nav-trigger"]}
                  asChild
                >
                  <Button appearance="subtle">
                    {_.capitalize(topic)}
                    <RxCaretDown aria-hidden />
                  </Button>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={styles["nav-surface"]}>
                  <Preview imgSrc={imgSrc} fileList={fileList} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            )}

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles["nav-trigger"]} asChild>
                <Button appearance="subtle">
                  Overview <RxCaretDown aria-hidden />
                </Button>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={styles["nav-surface"]}>
                <ul className={styles["overviews"]}>
                  {overview.map((item: any) => {
                    return (
                      <li key={item.name}>
                        <Link href={"/tags/" + item.name}>
                          <span>{item.name}</span>
                          <span data-layer="count">
                            {item.posts?.length || 0}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className={styles["nav-indicator"]}>
              <i />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <NavigationMenu.Viewport
            className={clsx(styles["nav-viewport"], surfaceStyle)}
          />
        </NavigationMenu.Root>
      </section>
    </header>
  );
};

export default Header;
