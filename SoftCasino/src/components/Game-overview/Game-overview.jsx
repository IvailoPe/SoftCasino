import { useNavigate } from "react-router";
import styles from "./Game-overview-styles.module.css"

export default function GameOverview({link}) {
  
  const navigate = useNavigate();
  
  return (
    <img
      onClick={() => {
           navigate(link)
      }}
      className={styles["game-overview"]}
      width="100"
      height="120"
      src="https://www.wikihow.com/images/thumb/3/3a/GenericImage_Slot.jpg/460px-GenericImage_Slot.jpg"
    />
  );
}