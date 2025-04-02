import { useNavigate } from "react-router";
import Information from "../../components/Information/Information";
import Item from "../../components/Item/Item";
import useFetch from "../../hooks/useFetchHook";
import styles from "./History-layout-styles.module.css";
import useRouteGuard from "../../hooks/useRouteGuard";

export default function HistoryLayout({showAside}) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  useRouteGuard();
  const [items] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/items/user/items",
    null,
    false,
    []
  );
  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    true
  );

  const navigate = useNavigate();

  return (
    <section style={showAsideClass} className={styles["main-history-wrapper"]}>
      <div className={styles["history-shop-wrapper"]}>
        <div className={styles["history-shop-top"]}>
          <Information
            text={`Purchases: ${profileData.ordersMade}`}
            h3={true}
          ></Information>
        </div>
        <div className={styles["history-shop-main"]}>
          {items.map((item) => {
            return (
              <Item handleClick={() => {
                navigate("/bought/item/" + item._id)
              }} key={item._id} link={item.link} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
