import { useCallback, useState } from "react";
import styles from "./EmailFinder.module.css";

import useRequest from "../../hooks/useRequest";

import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import EmailHistory from "./EmailHistory/EmailHistory";
import EmailForm from "./EmailForm/EmailForm";
import { ServerApiEndpoints } from "../../constants/api";

function EmailFinder() {
  const [history, setHistory] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = useRequest(ServerApiEndpoints.base);

  const handleSubmit = useCallback(
    async (firstName: string, lastName: string, domain: string) => {
      setIsLoading(true);

      const [result, error] = await api.post<{ message: string }>(
        ServerApiEndpoints.generateEmail,
        {
          firstName,
          lastName,
          domain,
        }
      );

      if (error != null) {
        setError(error.message);
      }

      if (result != null) {
        if (value != null) {
          //Push the old value to history
          setHistory([value, ...history]);
        }

        setValue(result.message);

        //Reset error
        setError(null);
      }

      setIsLoading(false);
    },
    [setIsLoading, value, history, api]
  );

  return (
    <DefaultLayout>
      <main className={styles.mainContentWrapper}>
        <div className={styles.infoTextWrapper}>
          <span>Enter User Information</span>
        </div>
        <div className={styles.infoCardWrapper}>
          <div>
            {error && <span className={styles.errorCard}>{error}</span>}
            <EmailForm
              onSubmit={handleSubmit}
              loading={isLoading}
              className={styles.infoFormWrapper}
            />
            <EmailHistory
              value={value}
              history={history}
              className={styles.infoHistoryWrapper}
            />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
export default EmailFinder;
