import { useContext } from "react";
import styles from "./Aside-header-styles.module.css";

import { NavLink } from "react-router";
import { authContext } from "../../context/Auth-context";

export default function Aside() {
  const auth = useContext(authContext);

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.specialLi}>
            <img width="140" height="140" src="../../public/logo.png" alt="" />
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.li}>
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
          <li className={styles.li}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.activeLink : styles.inactiveLink;
              }}
              to={"/shop/history"}
            >
              Purchases history
            </NavLink>
          </li>
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
