import { useContext, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import ChatMessage from "../../components/Chat-message/Chat-message";
import useChat from "../../hooks/useChatHook";
import styles from "./Chat-layout-styles.module.css";
import { authContext } from "../../context/Auth-context";

export default function ChatLayout() {
  const auth = useContext(authContext);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef("");
  let username = auth.currentUserLogged.username;
  let id = auth.currentUserLogged.id;

  const [sendMessage, messages, setMessages] = useChat(
    import.meta.env.VITE_API_ADRESS + "/chat",
    username,
    id
  );

  if (messages.length - 1 === 30) {
    let newMessages = JSON.parse(JSON.stringify(messages));
    newMessages.shift();
    setMessages([...newMessages]);
  }

  return (
    <section className={styles["main-chat-wrapper"]}>
      <div className={styles["chat-wrapper"]}>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              isCurrentActiveUser={message?.currentUser}
              owner={message.username}
              message={message.message}
            />
          );
        })}
      </div>
      <div className={styles["chat-bottom"]}>
        <input
          ref={inputRef}
          value={inputText}
          type="text"
          className={styles["chat-bottom-input"]}
          placeholder="Just won 1 million dollars..."
          onChange={(e) => {
            setInputText(e.currentTarget.value);
          }}
        />
        <Button
          onClick={() => {
            if (inputText !== "") {
              sendMessage(username, inputText);
              setMessages((prevData) => {
                return [
                  {
                    username,
                    message: inputText,
                    action: "message",
                    currentUser: true,
                  },
                  ...prevData
                ];
              });
              setInputText("");
              inputRef.current.focus();
            }
          }}
          text="Send"
        ></Button>
      </div>
    </section>
  );
}
