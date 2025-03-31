import { useContext, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import ChatMessage from "../../components/Chat-message/Chat-message";
import useChat from "../../hooks/useChatHook";
import styles from "./Chat-layout-styles.module.css";
import { authContext } from "../../context/Auth-context";
import useRouteGuard from "../../hooks/useRouteGuard";

export default function ChatLayout() {
  useRouteGuard();
  const auth = useContext(authContext);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef("");
  let username = auth.currentUserLogged.username;
  let id = auth.currentUserLogged.id;
  let picture = auth.currentUserLogged.picture  

  const [sendMessage, messages, setMessages] = useChat(
    import.meta.env.VITE_API_ADRESS + "/chat",
    username,
    id,
    picture
  );

  if (messages.length - 1 === 30) {
    let newMessages = JSON.parse(JSON.stringify(messages));
    newMessages.pop();
    setMessages([...newMessages]);
  }

  console.log(messages);
  

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
              profilePicture={message.currentUser !== undefined ? picture : message.picture}
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
