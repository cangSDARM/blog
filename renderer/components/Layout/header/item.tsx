import React from "react";
import Button from "@/components/Button";
import Truncate from "@/components/Truncate";
import Link from "next/link";
import styles from "./style.module.scss";

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef<any, any>(
  ({ children, title, href = '', ...props }, forwardedRef) => (
    <li className={styles["item"]}>
      <Link href={href} {...props} ref={forwardedRef}>
        <Truncate as="title">{title}</Truncate>
        <Truncate as="p" maxLines={2}>
          {children}
        </Truncate>
      </Link>
    </li>
  )
);

export default ListItem;
