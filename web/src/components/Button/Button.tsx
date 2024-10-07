import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.wrapper}>
      <span className={styles.span}>{children}</span>
    </button>
  );
}

export default Button;
