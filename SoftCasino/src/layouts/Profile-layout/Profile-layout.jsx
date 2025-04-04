import Button from "../../components/Button/Button";
import Information from "../../components/Information/Information";
import useFetch from "../../hooks/useFetchHook";
import ranks from "../../constant/ranks";

import styles from "./Profile-layout-styles.module.css";
import { useNavigate, useOutletContext } from "react-router";
import useRouteGuard from "../../hooks/useRouteGuard";
import requester from "../../api/requester";
import { useRef } from "react";

export default function ProfileLayout({ showAside }) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  useRouteGuard();
  const reset = useRef(true);
  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    reset.current
  );
  const { setReset } = useOutletContext();
  const navigate = useNavigate();

  return (
    <section style={showAsideClass} className={styles["main-profile-wrapper"]}>
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
            <Information
              text={`Money won: ${profileData.wonAmount}$`}
            ></Information>
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
            <Information text="Welcome to the official soft casino loyality system. Every time you play, your account will gain experience which is used for levels. When you reach new level you will be rewarded with money for playing on our website :). On the first rank the reward will be free for just signing up!"></Information>
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
                  reset.current = !reset.current;
                });
              }}
              text={
                profileData.isPriceTaken === true
                  ? "Reward taken"
                  : "Claim reward"
              }
            ></Button>
            <Information
              h3={true}
              text={`Next rank: ${ranks[profileData.rank + 1] || "Legendary"}`}
            ></Information>
          </div>
        </div>
      </div>
    </section>
  );
}
