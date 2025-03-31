import styles from "./Chat-message-styles.module.css";

export default function ChatMessage({
  message,
  owner,
  isCurrentActiveUser,
  profilePicture,
}) {
  return (
    <div
      className={`${
        isCurrentActiveUser === true
          ? styles["currentUserComment"]
          : styles["chat-message-wrapper"]
      }`}
    >
      <div className={styles["chat-top-wrapper"]}>
        {isCurrentActiveUser === true ? (
          <>
            <span className={styles["chat-username"]}>{owner}</span>
            <img
              className={styles["chat-profile-picture"]}
              src={profilePicture}
            />
          </>
        ) : (
          <>
            <img
              className={styles["chat-profile-picture"]}
              src={profilePicture}
            />
            <span className={styles["chat-username"]}>{owner}</span>
          </>
        )}
      </div>
      <p className={styles["chat-message"]}>{message}</p>
    </div>
  );
}
