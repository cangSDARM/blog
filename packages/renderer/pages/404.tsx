import Link from "next/link";
import styles from "@/styles/404.module.scss";

export default function FourOhFour() {
  return (
    <div className={styles["root"]} data-theme="dark">
      <h1>
        404<span>|</span>Page Not Found
      </h1>
      <br />
      <Link href="/">Go back home</Link>
    </div>
  );
}
