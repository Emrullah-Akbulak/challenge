import React from "react";
import styles from "./FooterItem.module.css";

interface FooterItemProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

function FooterItem({ children, wrapperProps, ...props }: FooterItemProps) {
  return (
    <div {...wrapperProps} className={styles.wrapper}>
      <a {...props} className={styles.anchor}>
        <span className={styles.span}>{children}</span>
      </a>
    </div>
  );
}

export default FooterItem;
