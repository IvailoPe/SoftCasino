import Button from "../../components/Button/Button";
import GameOverview from "../../components/Game-overview/Game-overview";
import Information from "../../components/Information/Information";
import useFetch from "../../hooks/useFetchHook";
import ranks from "../../constant/ranks";

import styles from "./Profile-layout-styles.module.css";
import { useNavigate, useOutletContext } from "react-router";
import useRouteGuard from "../../hooks/useRouteGuard";
import requester from "../../api/requester";
import { useRef } from "react";

export default function ProfileLayout() {
  useRouteGuard();
  const reset = useRef(true)
  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    reset.current
  );
  const { setReset } = useOutletContext();
  const navigate = useNavigate();

  return (
    <section className={styles["main-profile-wrapper"]}>
      <div className={styles["profile-wrapper"]}>
        <div className={styles["profile-main"]}>
          <div className={styles["profile-top"]}>
            <img
              className={styles["profile-img"]}
              width="200"
              height="200"
              src={profileData.profilePicture}
            />
            <Information
              h3={true}
              text={`Hello ${profileData.username || ""}`}
            ></Information>
            <Information
              text={`Games played: ${profileData.gamesPlayes}`}
            ></Information>
            <Information text="Money won: 1000$"></Information>
            <Information
              text={`Orders made: ${profileData.ordersMade}`}
            ></Information>
            <div>
              <Button
                onClick={() => {
                  navigate("/profile/edit");
                }}
                text="Update Profile"
              ></Button>
            </div>
          </div>
          <div className={styles["profile-bottom"]}>
            <Information h3={true} text="Loyalty system"></Information>
            <Information
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              itaque voluptatum eaque tempora esse accusamus earum quaerat
              quisquam ducimus soluta, harum asperiores aut laudantium,
              sapiente, quia magnam est architecto tempore? Temporibus
              reiciendis iste molestias sit. Nemo enim quaerat, error natus,
              quis harum quas exercitationem corrupti, possimus voluptates
              dolores! Rerum neque quisquam asperiores velit reprehenderit
              voluptatum deserunt corporis voluptates quis molestiae."
            ></Information>
            <Information h3={true} text="Current rank:"></Information>
            <h3 className={styles["profile-rank"]}>
              {ranks[profileData.rank]}
            </h3>
            <Button
              dissabled={profileData.isPriceTaken === true}
              onClick={() => {
                requester(
                  "GET",
                  import.meta.env.VITE_API_ADRESS + "/casino/reward"
                ).then(() => {
                  setReset((prevState) => {
                    return !prevState;
                  });
                  reset.current = !reset.current
                });
              }}
              text={profileData.isPriceTaken === true ? "Reward taken" : "Claim reward"}
            ></Button>
            <Information
              h3={true}
              text={`Next rank: ${ranks[profileData.rank + 1] || "Legendary"}`}
            ></Information>
          </div>
        </div>
        <div className={styles["game-wrapper"]}>
          <p className={styles["p-fav-games"]}>Favourite games</p>
          <div className={styles["game-section"]}>
            <GameOverview link="https://www.wikihow.com/images/thumb/3/3a/GenericImage_Slot.jpg/460px-GenericImage_Slot.jpg"></GameOverview>
          </div>
        </div>
      </div>
    </section>
  );
}
