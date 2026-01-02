import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productThunk'
import { setSearch, setCategory, setSort} from '../store/productSlice'
import useDebounce from '../utils/useDebounce'

const ProductList = () => {
  const dispatch = useDispatch()
  const { list, loading, search, category, sort } = useSelector(state => state.products)

  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 500)

  // API call only once
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Debounced value → redux store
  useEffect(() => {
    dispatch(setSearch(debouncedSearch))
  }, [debouncedSearch, dispatch])

  // unique categories
  const categories = ['all', ...new Set(list.map(p => p.category))]

  const filteredAndSortedProducts = [...list]
  .filter(product => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      category === 'all' || product.category === category

    return matchTitle && matchCategory
  })
  .sort((a, b) => {
    if (sort === 'price-asc') {
      return a.price - b.price
    }
    if (sort === 'price-desc') {
      return b.price - a.price
    }
    return 0
  })

  const productToShow = useMemo(() => filteredAndSortedProducts, [list, search, category, sort])

  if (loading) return <h2>Loading...</h2>

  return (
    <>
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search product..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ padding: 10, width: '300px', marginBottom: 20 }}
      />

      {/* 🏷 Category Filter */}
      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        style={{ padding: 10, marginLeft: 10 }}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        style={{ padding: 10, marginLeft: 10 }}
        >
        <option value="none">Sort by price</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>

      {/* 📦 Listing */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {productToShow && productToShow.length > 0 ? productToShow.map(product => (
        <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
          <div key={product.id} style={{ border: '1px solid #ddd', padding: 10 }}>
            <img src={product.image} alt={product.title} width="100" height="100" />
            <h4>{product.title}</h4>
            <p>$ {product.price}</p>
          </div>
        </Link>
        )) : <h3>No products found</h3>}
      </div>
    </>
  )
}

export default ProductList
