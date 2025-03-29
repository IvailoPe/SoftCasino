import styles from "./Home-layout-styles.module.css";

import GameOverview from "../../components/Game-overview/Game-overview";

export default function HomeLayout() {
  return (
    <section className={styles.section}>
      <div className={styles.upperDiv}>
          <h3>Official soft games</h3>
      </div>
      <section className={styles["arcade-section"]}>
        <h3>Arcade games</h3>
        <section className={styles["game-section"]}>
          <GameOverview link="/arcade/game/1"></GameOverview>
        </section>
      </section>
      <section className={styles["slot-section"]}>
        <h3>Slot games</h3>
        <section className={styles["game-section"]}>
          <GameOverview link="/slot/game/1"></GameOverview>
        </section>
      </section>
    </section>
  );
}
