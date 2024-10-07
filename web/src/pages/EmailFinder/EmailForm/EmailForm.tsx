import React, { useCallback, useMemo, useState } from "react";
import styles from "./EmailForm.module.css";

import TextField from "../../../components/TextField/TextField";
import { ReactComponent as PersonIcon } from "../../../assets/svg/PersonIcon.svg";
import { ReactComponent as GlobalIcon } from "../../../assets/svg/GlobalIcon.svg";
import { ReactComponent as SparkIcon } from "../../../assets/svg/SparkIcon.svg";
import { ReactComponent as LoadingIcon } from "../../../assets/svg/LoadingIcon.svg";
import IconButton from "../../../components/IconButton/IconButton";

interface EmailFormProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit?: (firstName: string, lastName: string, domain: string) => void;
  loading?: boolean;
}

function EmailForm({ children, onSubmit, loading, ...props }: EmailFormProps) {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [domain, setDomain] = useState<string | null>(null);

  const isSubmitable = useMemo(() => {
    if (firstName && lastName && domain) {
      return true;
    }

    return false;
  }, [firstName, lastName, domain]);

  const handleSubmit = useCallback(() => {
    if (!isSubmitable) {
      return;
    }

    onSubmit && onSubmit(firstName!, lastName!, domain!);
  }, [onSubmit, isSubmitable, firstName, lastName, domain]);

  return (
    <div {...props} className={`${styles.wrapper} ${props.className}`}>
      <TextField
        onChange={(e) => setFirstName(e.currentTarget.value)}
        Icon={PersonIcon}
        className={styles.infoTextField}
        placeholder="First Name"
      />
      <TextField
        onChange={(e) => setLastName(e.currentTarget.value)}
        Icon={PersonIcon}
        className={styles.infoTextField}
        placeholder="Last Name"
      />
      <TextField
        onChange={(e) => setDomain(e.currentTarget.value)}
        Icon={GlobalIcon}
        className={styles.infoTextField}
        placeholder="Domain"
      />
      <IconButton
        focused={loading}
        onClick={handleSubmit}
        disabled={!isSubmitable}
        className={styles.generateButton}
        Icon={loading ? LoadingIcon : SparkIcon}
      />
    </div>
  );
}

export default EmailForm;
