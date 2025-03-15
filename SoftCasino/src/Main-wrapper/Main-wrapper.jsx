import styles from "./Main-wrapper-styles.module.css"

import Button from "../components/Button/Button";

export default function Main({children}) {
  return (
    <main className={styles.main}>
      <header>
        <img
          className={styles["header-image"]}
          width="300"
          height="42"
          src="../../public/sitename.png"
        />
        <Button text="Login"/>
        <Button specialClass="right" text="Register"/>
      </header>
      {children}
    </main>
  );
}