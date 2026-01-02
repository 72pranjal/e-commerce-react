import React from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div key={product.id} style={{ border: "1px solid #ddd", padding: 10 }}>
        <img src={product.image} alt={product.title} width="100" height="100" />
        <h4>{product.title}</h4>
        <p>$ {product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
