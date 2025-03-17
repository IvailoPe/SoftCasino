import Button from "../components/Button/Button";
import styles from "./Main-page-styles.module.css"


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