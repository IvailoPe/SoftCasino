import { useContext } from "react";
import styles from "./Aside-header-styles.module.css";

import { NavLink, useNavigate } from "react-router";
import { authContext } from "../../context/Auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faCreditCard, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

export default function Aside() {
  const auth = useContext(authContext);
  const navigate = useNavigate()

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.specialLi}>
            <img onClick={() => {
              navigate("/home")
            }} width="140" height="140" src="../../public/logo.png" alt="" />
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.li}>
          <FontAwesomeIcon icon={faHouse} />
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.activeLink : styles.inactiveLink;
              }}
              to={"/home"}
            >
              Home
            </NavLink>
          </li>
          {auth.currentUserLogged.isLogged && (
            <li className={styles.li}>
              <FontAwesomeIcon icon={faUser} />
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.activeLink : styles.inactiveLink;
                }}
                to={"/profile"}
              >
                Profile
              </NavLink>
            </li>
          )}
          <li className={styles.li}>
            <FontAwesomeIcon icon={faCartShopping} />
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.activeLink : styles.inactiveLink;
              }}
              to={"/shop"}
            >
              Shop
            </NavLink>
          </li>
          {auth.currentUserLogged?.username === "Admin" && (
            <li className={styles.li}>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.activeLink : styles.inactiveLink;
                }}
                to={"/item/create"}
              >
                Add Item
              </NavLink>
            </li>
          )}
          {auth.currentUserLogged.isLogged && (
            <li className={styles.li}>
              <FontAwesomeIcon icon={faRocketchat} />
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.activeLink : styles.inactiveLink;
                }}
                to={"/chat"}
              >
                Live chat
              </NavLink>
            </li>
          )}
          {auth.currentUserLogged.isLogged && (
            <li className={styles.li}>
              <FontAwesomeIcon icon={faCreditCard} />
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.activeLink : styles.inactiveLink;
                }}
                to={"/add-funds"}
              >
                Add funds
              </NavLink>
            </li>
          )}
          {auth.currentUserLogged.isLogged && (
            <li className={styles.li}>
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <NavLink
                className={({ isActive }) => {
                  return isActive ? styles.activeLink : styles.inactiveLink;
                }}
                to={"/shop/history"}
              >
                History
              </NavLink>
            </li>
          )}
        </ul>
        <ul className={styles.ul}>
          {auth.currentUserLogged.isLogged === false ? (
            <>
              <li className={styles.li}>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? styles.activeLink : styles.inactiveLink;
                  }}
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li className={styles.li}>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? styles.activeLink : styles.inactiveLink;
                  }}
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
          <li className={styles.li}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.activeLink : styles.inactiveLink;
              }}
            >
              Contact us
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
