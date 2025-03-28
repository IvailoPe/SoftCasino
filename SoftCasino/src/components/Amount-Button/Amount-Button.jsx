import styles from "./Amount-Button-styles.module.css";

export default function AmountButton({ text, styleObj }) {
  let classes = `${styles.btn}`;

  console.log(1);
  
  if (text === "easy") {
    classes += " " + styles.easy;
  } else if (text === "medium") {
    classes += " " + styles.medium;
  } else if (text === "hard") {
    classes += " " + styles.hard;
  }

  return <button className={classes} style={{...styleObj}}>{text}</button>;
}
