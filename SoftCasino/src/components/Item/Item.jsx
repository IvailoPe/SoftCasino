import styles from "./Item-styles.module.css";

export default function Item({ link, quantity, price, handleClick }) {  
  return (
    <div className={styles.item} onClick={handleClick}>
      <img width="120" className={styles["item-img"]} height="120" src={link} />
      {price ? (
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
