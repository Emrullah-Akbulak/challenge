import React from "react";
import styles from "./TextField.module.css";

interface TextFieldProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  wrapperProps?: React.HtmlHTMLAttributes<HTMLDivElement>;
  Icon?: React.FC;
}

function TextField({ children, wrapperProps, Icon, ...props }: TextFieldProps) {
  return (
    <div {...wrapperProps} className={`${styles.wrapper} ${props.className}`}>
      {Icon && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}
      <input {...props} className={styles.input}></input>
    </div>
  );
}

export default TextField;
