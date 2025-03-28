import SlotImage from "../../components/Slot-image/Slot-image";
import styles from "./Arcade-game-classic-styles.module.css";
import imgBomb from "../../constant/symbols/bomb.png";

const initialGameField = (
  <>
    <div className={styles.symbolsContainer}>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
    </div>
    <div className={styles.symbolsContainer}>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
    </div>
    <div className={styles.symbolsContainer}>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
    </div>
    <div className={styles.symbolsContainer}>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
    </div>
    <div className={styles.symbolsContainer}>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
      <div className={styles.bombContainer}>
        <SlotImage imgSrc={imgBomb} />
      </div>
    </div>
  </>
);

export default initialGameField;
