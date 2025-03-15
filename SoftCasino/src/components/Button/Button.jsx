import styles from "./Button-styles.module.css"

export default function Button({text, specialClass}) {

  let additionalClass = specialClass === "right" ? styles["btn-right"] : "";

  let classes = `${styles.btn} ${additionalClass}`

  return (
        <button className={classes}>{text}</button>
  );
}