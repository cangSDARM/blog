import React from "react";
import Button from "@components/Button";
import Truncate from "@components/Truncate";
import { Link } from "@radix-ui/react-navigation-menu";
import styles from './style.module.scss';

const ListItem = React.forwardRef<any, any>(
  ({ children, title, ...props }, forwardedRef) => (
    <li className={styles['item']}>
      <Link asChild>
        <a {...props} ref={forwardedRef}>
          <Truncate as="title">{title}</Truncate>
          <Truncate as="p" maxLines={2}>{children}</Truncate>
        </a>
      </Link>
    </li>
  )
);

export default ListItem;
