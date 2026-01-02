import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../store/productSlice";
import { Link } from "react-router-dom";

const FavouriteList = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(
    state => state.products.favourites
  );

  if (favourites.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No favourites added ❤️</h2>
        <Link to="/">Go to products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>❤️ My Favourites</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20
        }}
      >
        {favourites.map(product => (
          <div
            key={product.id}
            style={{ border: "1px solid #ddd", padding: 10 }}
          >
            <img
              src={product.image}
              alt={product.title}
              width="100"
              height="100"
            />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>

            {/* ❌ Remove */}
            <button
              onClick={() => dispatch(toggleFavourite(product))}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer"
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteList;
