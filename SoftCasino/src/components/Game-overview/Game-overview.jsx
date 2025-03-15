import styles from "./Game-overview-styles.module.css"

export default function GameOverview({link}) {
  return (
    <img
      className={styles["game-overview"]}
      width="100"
      height="120"
      src={link}
    />
  );
}