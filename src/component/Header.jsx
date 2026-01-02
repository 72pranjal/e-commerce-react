import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const favCount = useSelector(
    state => state.products.favourites.length
  );

  return (
    <header style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 20 }}>
        🏠 Home
      </Link>

      {/* ❤️ Favourite Link */}
      <Link to="/favourites">
        ❤️ Favourites ({favCount})
      </Link>
    </header>
  );
};

export default Header;
