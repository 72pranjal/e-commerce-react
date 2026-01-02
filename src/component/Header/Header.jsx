import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const favCount = useSelector(
    state => state.products.favourites.length
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          🏠 Home
        </Link>

        <Link to="/favourites" className={`${styles.link} ${styles.fav}`}>
          ❤️ Favourites ({favCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
