import Information from "../../components/Information/Information";
import Item from "../../components/Item/Item";

import styles from "./Shop-layout-styles.module.css";

export default function ShopLayout() {
  return (
    <section className={styles["main-shop-wrapper"]}>
      <div className={styles["shop-wrapper"]}>
        <div className={styles["shop-top"]}>
          <Information text="Items quantity: 2355"></Information>
          <Information text="Sold items: 1000"></Information>
          <Information text="Owned items: 0"></Information>
        </div>
        <div className={styles["shop-main"]}>
          <Item price={100} quantity={10} link={"https://www.bigjohnson.com/cdn/shop/products/BarAndCasino_FB.jpg?v=1650028783"}></Item>
          <Item price={100} quantity={10} link={"https://www.bigjohnson.com/cdn/shop/products/BarAndCasino_FB.jpg?v=1650028783"}></Item>
        </div>
      </div>
    </section>
  );
}
