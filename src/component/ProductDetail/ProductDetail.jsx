import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../../store/productThunk";
import { toggleFavourite } from "../../store/productSlice";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { detail, detailLoading, favourites } = useSelector(
    state => state.products
  );

  const isFavourite = favourites.some(
    item => item.id === detail?.id
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (detailLoading)
    return <h2 className={styles.message}>Loading...</h2>;

  if (!detail)
    return <h2 className={styles.message}>Product not found</h2>;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Back
      </Link>

      <div className={styles.wrapper}>
        <img
          src={detail.image}
          alt={detail.title}
          className={styles.image}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>{detail.title}</h2>
          <span className={styles.category}>
            {detail.category}
          </span>
          <div className={styles.rating}>
            <span>⭐ {detail.rating?.rate}</span>
            <span className={styles.count}>
              ({detail.rating?.count} reviews)
            </span>
          </div>
          <p className={styles.description}>{detail.description}</p>
          <h3 className={styles.price}>$ {detail.price}</h3>

          {/* ❤️ Favourite Button */}
          <button
            onClick={() => dispatch(toggleFavourite(detail))}
            className={`${styles.favBtn} ${
              isFavourite ? styles.remove : styles.add
            }`}
          >
            {isFavourite
              ? "❤️ Remove from Favourite"
              : "🤍 Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
