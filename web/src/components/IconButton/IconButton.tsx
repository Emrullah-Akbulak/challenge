import React from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  Icon: React.FC;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  focused?: boolean;
}

function IconButton({
  children,
  Icon,
  onClick,
  disabled,
  focused,
  ...props
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={`${styles.wrapper} ${props.className} ${
        disabled ? styles["disabled"] : ""
      } ${focused ? styles["focused"] : ""}`}
    >
      <div className={styles.icon}>
        <Icon />
      </div>
    </button>
  );
}

export default IconButton;
