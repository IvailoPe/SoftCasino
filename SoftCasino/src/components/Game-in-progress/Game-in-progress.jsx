import styles from "./Game-in-progress-styles.module.css";

export default function GameInProgressOverview() {
  return (
    <div className={styles["in-progress-wrapper"]}>
      <img
        className={styles["game-overview"]}
        width="100"
        height="120"
        src="https://www.wikihow.com/images/thumb/3/3a/GenericImage_Slot.jpg/460px-GenericImage_Slot.jpg"
      />
      <img
      className={styles["in-progress"]}
        width="100"
        height="100"
        src="https://cdn-icons-png.flaticon.com/512/5578/5578703.png"
        alt=""
      />
    </div>
  );
}
