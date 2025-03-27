import { Outlet } from "react-router";
import styles from "./Main-page-styles.module.css";
import MainHeader from "../components/Main-header/Main-header";
import useFetch from "../hooks/useFetchHook";
import { useState } from "react";

export default function Main() {
  const [reset, setReset] = useState(false)
  const [profileData] = useFetch("GET",import.meta.env.VITE_API_ADRESS + "/users/profile",null, reset);
  
  return (
    <main className={styles.main}>
      <MainHeader money={profileData.money}/>
      <Outlet context={{setReset, money:profileData.money}}></Outlet>
    </main>
  );
}
