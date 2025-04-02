import styles from "./Main-header-styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faWallet } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useContext } from "react";
import { authContext } from "../../context/Auth-context";
import { useNavigate } from "react-router";
import { logOutUser } from "../../utils/userUtils";

export default function MainHeader({ money, setShowAside }) {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  
  return (
    <header className={styles.header}>
      <FontAwesomeIcon onClick={() => {
        setShowAside((prevState) => {
           return !prevState
        })
        
      }} className={styles["hamberger-menu"]} icon={faBars} />
      <img
        onClick={() => {
          navigate("/home")
        }}
        className={styles["header-image"]}
        width="300"
        height="42"
        src="../../public/sitename.png"
      />
      {auth.currentUserLogged.isLogged === true ? (
        <>
          {" "}
          <div className={styles["wallet"]}>
            <FontAwesomeIcon icon={faWallet} />
            <p>{money}$</p>
          </div>
          <Button
            onClick={() => {
              logOutUser();
              auth.setUser({ isLogged: false });
              navigate("/login");
              setShowAside(false);
            }}
            text={"Log out"}
          />
        </>
      ) : (
        <>
          {" "}
          <Button onClick={() => {
            navigate("/login")
            setShowAside(false);
          }} text="Login" />
          <Button onClick={() => {
            navigate("/register")
            setShowAside(false);
          }} specialClass="right" text="Register" />{" "}
        </>
      )}
    </header>
  );
}
