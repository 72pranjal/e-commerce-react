import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../store/productThunk";
import { toggleFavourite } from '../store/productSlice'

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { detail, detailLoading, favourites } = useSelector(
    state => state.products
  );

  const isFavourite = favourites.some(
    item => item.id === detail.id
  )

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (detailLoading) return <h2>Loading...</h2>;
  if (!detail) return <h2>Product not found</h2>;

  return (
    <div>
      <Link to="/">← Back</Link>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <img src={detail.image} alt={detail.title} width="300" />
        <div>
          <h2>{detail.title}</h2>
          <p>{detail.description}</p>
          <h3>₹ {detail.price}</h3>

           {/* ❤️ Favourite Button */}
            <button
                onClick={() => dispatch(toggleFavourite(detail))}
                style={{
                padding: '10px 20px',
                background: isFavourite ? 'red' : '#ddd',
                color: isFavourite ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer'
                }}
            >
                {isFavourite ? '❤️ Remove from Favourite' : '🤍 Add to Favourite'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
