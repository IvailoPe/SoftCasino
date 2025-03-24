import { useEffect, useState } from "react";
import styles from "./Site-error-styles.module.css";

export default function SiteError({ error, clearError }) {
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    if (error) {
      setAppear(true);
      setTimeout(() => {
        setAppear(false);
        setTimeout(() => {
            clearError("");
        }, 1000);
      }, 2500);
    }
  }, [error]);

  return (
    <p
      className={`${styles.error} ${
        appear === true ? styles["error-appear"] : styles["error-disappear"]
      }`}
    >
      {error}
    </p>
  );
}
