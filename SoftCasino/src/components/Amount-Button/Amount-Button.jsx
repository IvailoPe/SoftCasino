import styles from "./Amount-Button-styles.module.css";

export default function AmountButton({
  text,
  specialClass,
  dissabled,
  onClick,
  reference,
  autoPlay,
  styleObj = {}
}) {
  let additionalClass = specialClass === "right" ? styles["btn-right"] : "";

  let classes = `${styles.btn} ${additionalClass}`;

  return (
    <button
      style={
        autoPlay === true ? {
          backgroundColor: "white",
          color:"black",
          ...styleObj 
        }
        : {}
      }
      ref={reference}
      onClick={onClick || undefined}
      disabled={dissabled}
      className={classes}
    >
      {text}
    </button>
  );
}
