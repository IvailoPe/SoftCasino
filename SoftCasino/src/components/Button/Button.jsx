import styles from "./Button-styles.module.css"

export default function Button({text, specialClass, dissabled, onClick}) {

  let additionalClass = specialClass === "right" ? styles["btn-right"] : "";

  let classes = `${styles.btn} ${additionalClass}`

  return (
        <button onClick={onClick || undefined} disabled={dissabled} className={classes}>{text}</button>
  );
}