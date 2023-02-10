import React from "react";
import { RxCaretDown } from "react-icons/rx";
import clsx from "clsx";
import Button from "@/components/Button";
import _ from "lodash";
import Surface, { useSurfaceStyle } from "@/components/Surface";
import styles from "./style.module.scss";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Preview from "./preview";
import ListItem from "./item";
import Link from "next/link";
import { useLC } from "../context";

const Header: React.FC<{
  imgSrc: string;
  fileList?: any[];
  topic?: string;
}> = ({ imgSrc, topic = "", fileList = [] }) => {
  const surfaceStyle = useSurfaceStyle();
  const overview = useLC();

  return (
    <NavigationMenu.Root className={styles["nav-root"]}>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className={clsx(styles["nav-trigger"], styles["nav-logo"])}
            asChild
          >
            <Link href={"/"}>
              <h3>Allen Lee@Blog</h3>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {topic && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles["nav-trigger"]} asChild>
              <Button appearance="subtle">
                {_.capitalize(topic)}
                <RxCaretDown className="CaretDown" aria-hidden />
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
              Overview <RxCaretDown className="CaretDown" aria-hidden />
            </Button>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles["nav-surface"]}>
            <ul>
              {overview.map((item: any) => {
                return (
                  <li key={item.name} className={styles.tags}>
                    <Link href={"/tags/" + item.name}>
                      <span>{item.name}</span>
                      <span data-layer="count">{item.posts?.length || 0}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className={styles["nav-indicator"]}>
          <div className={styles["nav-arrow"]} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.Viewport
        className={clsx(styles["nav-viewport"], surfaceStyle)}
      />
    </NavigationMenu.Root>
  );
};

export default Header;
