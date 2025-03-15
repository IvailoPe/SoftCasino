import Button from "../../components/Button/Button";

import styles from "./Pay-layout-styles.module.css";

export default function PayLayout() {
  return (
    <section className={styles["pay-wrapper"]}>
      <form action="">
        <section className={styles["credit-card-wrapper"]}>
          <div className={styles["credit-card-images"]}>
            <img
              width="40"
              height="30"
              src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
            />
            <img
              width="40"
              height="30"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png"
            />
          </div>
          <div className={styles["credit-card-main-info"]}>
            <p>Card number</p>
            <input
              type="tel"
              className={`${styles.input} ${styles["input-main-numbers"]}`}
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className={styles["credit-card-additional-info"]}>
            <div>
              <p>Month and date</p>
              <input
                className={`${styles["input-additional"]} ${styles.input}`}
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="2"
                placeholder="00"
              />
              <span>/</span>
              <input
                className={`${styles["input-additional"]} ${styles.input}`}
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="2"
                placeholder="00"
              />
            </div>
            <div>
              <p>CVV code</p>
              <input
                type="password"
                className={`${styles["input-cvv"]} ${styles.input}`}
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="3"
                placeholder="000"
              />
            </div>
          </div>
        </section>
        <div className={styles["pay-wrapper-down"]}>
          <p>Amount</p>
          <input type="number" className="input" placeholder="0000" maxLength="4" />
          <Button text="Add amount"/>
        </div>
      </form>
    </section>
  );
}
