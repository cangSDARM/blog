import React from "react";
import Button from "@/components/Button";
import Truncate from "@/components/Truncate";
import Link from "next/link";
import { Link as RLink } from "@radix-ui/react-navigation-menu";
import styles from "./style.module.scss";

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef<any, any>(
  ({ children, title, ...props }, forwardedRef) => (
    <li className={styles["item"]}>
      <RLink asChild>
        <Link {...props} ref={forwardedRef}>
          <Truncate as="title">{title}</Truncate>
          <Truncate as="p" maxLines={2}>
            {children}
          </Truncate>
        </Link>
      </RLink>
    </li>
  )
);

export default ListItem;
