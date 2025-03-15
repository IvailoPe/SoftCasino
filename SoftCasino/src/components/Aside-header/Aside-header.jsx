import styles from "./Aside-header-styles.module.css"

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <img width="140" height="140" src="../../public/logo.png" alt="" />
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.li}>Home</li>
          <li className={styles.li}>Favourite games</li>
          <li className={styles.li}>Shop</li>
          <li className={styles.li}>Live chat</li>
          <li className={styles.li}>Add funds</li>
          <li className={styles.li}>About us</li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.li}>Login</li>
          <li className={styles.li}>Register</li>
          <li className={styles.li}>Contact us</li>
        </ul>
      </nav>
    </aside>
  );
}
