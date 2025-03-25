import { useNavigate, useOutletContext, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Information from "../../components/Information/Information";

import styles from "./Item-layout-styles.module.css";
import useFetch from "../../hooks/useFetchHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { authContext } from "../../context/Auth-context";
import requester from "../../api/requester";

export default function ItemLayout() {
  const navigate = useNavigate();
  const setReset = useOutletContext();
  const params = useParams();
  const [item] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/items/" + params.id,
    null,
    false
  );
  const auth = useContext(authContext);
  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    true
  );
  const [buyAmount, setBuyAmount] = useState(0);

  const canBuy = profileData.money / item.price;

  return (
    <section className={styles["main-item-wrapper"]}>
      <div className={styles["item-wrapper"]}>
        <img width="500" height="500" src={item.link} />
        <div className={styles["item-information"]}>
          <Information h3={true} text={item.title}></Information>
          <Information text={item.description}></Information>
          <Information
            h3={true}
            text={"Quantity: " + item.quantity}
          ></Information>
          <Information
            h3={true}
            text={"Price: " + item.price + "$"}
          ></Information>
          {auth.currentUserLogged.username !== "Admin" && (
            <div className={styles["quantity-btns-wrapper"]}>
              <button
                onClick={() => {
                  setBuyAmount((prevBuyAmount) => {
                    if (prevBuyAmount > 0) {
                      return prevBuyAmount - 1;
                    }
                    return 0;
                  });
                }}
                className={styles["quantity-btn"]}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className={styles["quantity-value"]}>{buyAmount}</span>
              <button
                disabled={canBuy < buyAmount + 1 || buyAmount === item.quantity}
                onClick={() => {
                  setBuyAmount((prevBuyAmount) => {
                    return prevBuyAmount + 1;
                  });
                }}
                className={styles["quantity-btn"]}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
          <div className={styles.bottomButtons}>
            {auth.currentUserLogged.username === "Admin" && (
              <>
                <Button
                  onClick={() => {
                    navigate("/item/edit/" + item._id);
                  }}
                  text="Update"
                ></Button>
                <Button
                  onClick={async () => {
                    let data = await requester(
                      "DELETE",
                      import.meta.env.VITE_API_ADRESS + "/items/" + item._id
                    );
                    if (data.error) {
                      alert(data.error);
                      return;
                    }
                    navigate("/shop");
                  }}
                  text="Delete"
                ></Button>
              </>
            )}
            {auth.currentUserLogged.username !== "Admin" && (
              <>
                <Button
                  onClick={async () => {
                     await requester(
                      "POST",
                      import.meta.env.VITE_API_ADRESS +
                        "/items/buy/" +
                        item._id,
                      {
                        quantity: buyAmount,
                      }
                    );
                    setReset((prevState) => {
                      return !prevState;
                    });                    
                    navigate("/shop/history")
                  }}
                  dissabled={buyAmount === 0}
                  text="Buy"
                ></Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
