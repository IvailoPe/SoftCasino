import { useNavigate } from "react-router";
import Information from "../../components/Information/Information";
import Item from "../../components/Item/Item";
import useFetch from "../../hooks/useFetchHook";

import styles from "./Shop-layout-styles.module.css";
import { useContext } from "react";
import { authContext } from "../../context/Auth-context";

export default function ShopLayout({ showAside }) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  const [items] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/items",
    null,
    false,
    []
  );
  const [casinoData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/casino/sold/items",
    null,
    false
  );
  const auth = useContext(authContext);
  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    true,
    {},
    auth.currentUserLogged.isLogged
  );

  const itemsQuantity = items.reduce((acumulator, nextValue) => {
    return acumulator + nextValue.quantity;
  }, 0);

  const navigate = useNavigate();

  return (
    <section style={showAsideClass} className={styles["main-shop-wrapper"]}>
      <div className={styles["shop-wrapper"]}>
        <div className={styles["shop-top"]}>
          <Information text={`Items quantity: ${itemsQuantity}`}></Information>
          <Information
            text={`Sold items: ${casinoData.soldItems}`}
          ></Information>
          {auth.currentUserLogged.isLogged && (
            <Information
              text={`Owned items: ${profileData.ordersMade}`}
            ></Information>
          )}
        </div>
        <div className={styles["shop-main"]}>
          {items.map((item) => {
            return (
              <Item
                key={item._id}
                handleClick={() => {
                  navigate("/item/" + item._id);
                }}
                price={item.price}
                quantity={item.quantity}
                link={item.link}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
