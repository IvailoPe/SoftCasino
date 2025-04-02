import { Outlet } from "react-router";
import styles from "./Main-page-styles.module.css";
import MainHeader from "../components/Main-header/Main-header";
import useFetch from "../hooks/useFetchHook";
import { useContext, useState } from "react";
import { authContext } from "../context/Auth-context";

export default function Main({setShowAside}) {
  const [reset, setReset] = useState(false);
  const auth = useContext(authContext);

  const [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/profile",
    null,
    reset,
    {},
    auth.currentUserLogged.isLogged
  );

  return (
    <main className={styles.main}>
      <MainHeader setShowAside={setShowAside} money={profileData.money} />
      <Outlet context={{ setReset, money: profileData.money }}></Outlet>
    </main>
  );
}
