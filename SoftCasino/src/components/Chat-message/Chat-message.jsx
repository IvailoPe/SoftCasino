import styles from "./Chat-message-styles.module.css"

export default function ChatMessage({message, owner, isCurrentActiveUser}) {  
  return (
    <div className={`${styles["chat-message-wrapper"]} ${isCurrentActiveUser && styles["currentUserComment"]}`}>
      <span className={styles["chat-username"]}>{owner}</span>
      <p className={styles["chat-message"]}>{message}</p>
    </div>
  );
}
