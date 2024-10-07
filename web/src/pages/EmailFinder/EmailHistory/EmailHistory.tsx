import React from "react";
import styles from "./EmailHistory.module.css";

import EmailHistoryRow from "../EmailHistoryRow/EmailHistoryRow";

interface EmailHistoryProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  value: string | null;
  history: string[];
}

function EmailHistory({
  children,
  value,
  history,
  ...props
}: EmailHistoryProps) {
  return (
    <div {...props} className={styles.wrapper}>
      <div className={styles.current}>
        <EmailHistoryRow
          value={value}
          placeholder="Enter user information for new email"
          variant="selected"
        />
      </div>
      <div className={styles.emailHistory}>
        {history &&
          history.map((h, i) => <EmailHistoryRow key={i} value={h} />)}
        {history.length <= 0 && <span>No History</span>}
      </div>
    </div>
  );
}

export default EmailHistory;
