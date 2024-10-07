import React from "react";
import styles from "./Theme.module.css";

type ThemeVariant = "light";

interface ThemeProps extends React.HtmlHTMLAttributes<React.FC> {
  variant: ThemeVariant;
}

function Theme({ children, variant, ...props }: ThemeProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Theme;
