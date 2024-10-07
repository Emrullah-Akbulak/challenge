import React, { useCallback, useState } from "react";
import styles from "./EmailHistoryRow.module.css";

import { ReactComponent as ClipboardIcon } from "../../../assets/svg/ClipboardIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/svg/TickIcon.svg";

import IconButton from "../../../components/IconButton/IconButton";

type EmailHistoryRowVariant = "selected" | "default";

interface EmailHistoryRowProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  variant?: EmailHistoryRowVariant;
  value?: string | null;
  placeholder?: string;
}

function EmailHistoryRow({
  children,
  value,
  variant = "default",
  placeholder,
  ...props
}: EmailHistoryRowProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    if (!value) {
      return;
    }

    setCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setCopied(false), 2000);
  }, [value, setCopied]);

  return (
    <div
      {...props}
      className={`${styles.wrapper} ${props.className ?? ""} ${
        styles[variant]
      }`}
    >
      <span className={styles.span}>{value ? value : placeholder}</span>
      {value && (
        <IconButton
          onClick={handleCopy}
          focused={copied}
          className={`${styles.clipboardButton} ${
            copied ? styles["copied"] : ""
          }`}
          Icon={copied ? TickIcon : ClipboardIcon}
        />
      )}
    </div>
  );
}

export default EmailHistoryRow;
