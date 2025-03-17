import Button from "../../components/Button/Button";
import ChatMessage from "../../components/Chat-message/Chat-message";
import styles from "./Chat-layout-styles.module.css"


export default function ChatLayout() {
  return (
    <section className={styles["main-chat-wrapper"]}>
      <div className={styles["chat-wrapper"]}>
        <ChatMessage isCurrentActiveUser={false} owner={"Ivailo"} message={"Oho kakvo stava pichove"}></ChatMessage>
        <ChatMessage isCurrentActiveUser={true} owner={"Ivailo"} message={"Oho kakvo stava pichove"}></ChatMessage>
      </div>
      <div className={styles["chat-bottom"]}>
        <input
          type="text"
          className={styles["chat-bottom-input"]}
          placeholder="Just won 1 million dollars..."
        />
        <Button text="Send"></Button>
      </div>
    </section>
  );
}
