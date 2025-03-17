import styles from "./Item-styles.module.css";

export default function Item({ link, quantity, price }) {
  return (
    <div className={styles.item}>
      <img width="120" className={styles["item-img"]} height="120" src={link} />
      {quantity ? (
        <>
          <p>Quantity {quantity}</p>
          <p>
            <i>Price {price}$</i>
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
