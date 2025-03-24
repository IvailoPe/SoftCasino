import { useEffect, useState } from "react";
import styles from "./Notification-styles.module.css";

export default function Notification({ notification, clearNotification, clearForm }) {
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    if (notification) {
      setAppear(true);
      setTimeout(() => {
        setAppear(false);
        setTimeout(() => {
            clearForm();
            clearNotification("");
        }, 1000);
      }, 2500);
    }
  }, [notification]);

  return (
    <p
      className={`${styles.notification} ${
        appear === true ? styles["notification-appear"] : styles["notification-disappear"]
      }`}
    >
      {notification}
    </p>
  );
}
