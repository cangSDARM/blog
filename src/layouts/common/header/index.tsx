import React from "react";
import { RxCaretDown } from "react-icons/rx";
import { fixedPopoverMountPoint, siteMetadata } from "@/config";
import clsx from "clsx";
import Button from "@components/Button";
import _ from "lodash";
import Surface, { useSurfaceStyle } from "@components/Surface";
import styles from "./style.module.scss";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Preview from "./preview";
import ListItem from "./item";

const Header: React.FC<{
  imgSrc: string;
  fileList?: Mdx[];
  topic?: string;
}> = ({ imgSrc, topic = "", fileList = [] }) => {
  const surfaceStyle = useSurfaceStyle();

  return (
    <NavigationMenu.Root className={styles["nav-root"]}>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className={clsx(styles["nav-trigger"], styles["nav-logo"])}
            href={siteMetadata.base}
            asChild
          >
            <a>
              <h3>Allen Lee@Blog</h3>
            </a>
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
            <ul className="List two">
              <ListItem
                title="Introduction"
                href="/docs/primitives/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem
                title="Styling"
                href="/docs/primitives/overview/styling"
              >
                Unstyled and compatible with any styling solution.
              </ListItem>
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
