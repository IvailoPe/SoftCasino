import { useNavigate } from "react-router";
import Information from "../../components/Information/Information";
import Item from "../../components/Item/Item";
import useFetch from "../../hooks/useFetchHook";

import styles from "./Shop-layout-styles.module.css";

export default function ShopLayout() {
  const [items] = useFetch("GET",import.meta.env.VITE_API_ADRESS + "/items",null, false,[]);
  const navigate = useNavigate();

  return (
    <section className={styles["main-shop-wrapper"]}>
      <div className={styles["shop-wrapper"]}>
        <div className={styles["shop-top"]}>
          <Information text="Items quantity: 2355"></Information>
          <Information text="Sold items: 1000"></Information>
          <Information text="Owned items: 0"></Information>
        </div>
        <div className={styles["shop-main"]}>
          {items.map((item) => {
            return <Item key={item._id} handleClick={() => {
               navigate("/item/" + item._id)
            }} price={item.price} quantity={item.quantity} link={item.link}/>
          })}
        </div>
      </div>
    </section>
  );
}
