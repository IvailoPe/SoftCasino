import Information from "../../components/Information/Information";
import Item from "../../components/Item/Item";
import styles from "./History-layout-styles.module.css"

export default function HistoryLayout() {
  return (
    <section className={styles["main-history-wrapper"]}>
      <div className={styles["history-shop-wrapper"]}>
        <div className={styles["history-shop-top"]}>
          <Information text={"Purchases: 100"} h3={true}></Information>
        </div>
        <div className={styles["history-shop-main"]}>
          <Item link={"https://www.bigjohnson.com/cdn/shop/products/BarAndCasino_FB.jpg?v=1650028783"}></Item>
          <Item link={"https://www.bigjohnson.com/cdn/shop/products/BarAndCasino_FB.jpg?v=1650028783"}></Item>
        </div>
      </div>
    </section>
  );
}
