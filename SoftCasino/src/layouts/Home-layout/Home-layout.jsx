import styles from "./Home-layout-styles.module.css"

import GameOverview from "../../components/Game-overview/Game-overview";

export default function HomeLayout() {
  return (
    <section className={styles.section}>
      <h3>Official soft games</h3>
      <section className={styles["arcade-section"]}>
        <h3>Arcade games</h3>
        <section className={styles["game-section"]}>
          <GameOverview link="https://www.wikihow.com/images/thumb/3/3a/GenericImage_Slot.jpg/460px-GenericImage_Slot.jpg"></GameOverview>
      </section>
      </section>
      <section className={styles["slot-section"]}>
        <h3>Slot games</h3>
        <section className={styles["game-section"]}>
        <GameOverview link="https://www.wikihow.com/images/thumb/3/3a/GenericImage_Slot.jpg/460px-GenericImage_Slot.jpg"></GameOverview>
        </section>
      </section>
    </section>
  );
}
