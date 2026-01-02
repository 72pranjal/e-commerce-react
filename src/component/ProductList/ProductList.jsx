import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productThunk";
import { setSearch, setCategory, setSort } from "../../store/productSlice";
import useDebounce from "../../utils/useDebounce";
import ProductCard from "../ProductCard";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, loading, search, category, sort } = useSelector(
    state => state.products
  );

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const categories = ["all", ...new Set(list.map(p => p.category))];

  const filteredAndSortedProducts = [...list]
    .filter(product => {
      const matchTitle = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || product.category === category;

      return matchTitle && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const productToShow = useMemo(
    () => filteredAndSortedProducts,
    [list, search, category, sort]
  );

  if (loading) return <h2 className={styles.message}>Loading...</h2>;

  return (
    <div className={styles.container}>
      {/* 🔍 Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search product..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className={styles.input}
        />

        <div className={styles.categoySelect}>

          <select
            value={category}
            onChange={e => dispatch(setCategory(e.target.value))}
            className={styles.select}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={e => dispatch(setSort(e.target.value))}
            className={styles.select}
          >
            <option value="none">Sort by price</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* 📦 Product Grid */}
      <div className={styles.grid}>
        {productToShow && productToShow.length > 0 ? (
          productToShow.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className={styles.message}>No products found</h3>
        )}
      </div>
    </div>
  );
};

export default ProductList;
