import { useParams } from "react-router";
import Information from "../../components/Information/Information";
import styles from "./Bought-item-layout-styles.module.css";
import useFetch from "../../hooks/useFetchHook";

export default function BoughtItemLayout() {
  const params = useParams();
  const [item] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/items/user/items/" + params.id,
    null,
    false,
    []
  );

  return (
    <section className={styles["main-item-wrapper"]}>
      <div className={styles["item-wrapper"]}>
        <img width="500" height="500" src={item.link} />
        <div className={styles["item-information"]}>
          <Information h3={true} text={item.title}></Information>
          <Information text={item.description}></Information>
        </div>
      </div>
    </section>
  );
}
